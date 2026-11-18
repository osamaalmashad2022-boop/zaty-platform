// Service Worker for ICT Prep 3 Term 1 PWA (Orchid RTL)
// Strategy:
// 1. Precache core app shell, offline Skulpt Python engine, and robot illustrations.
// 2. Cache-on-demand for heavy media (/media/*.mp4, *.mp3, *.vtt) — NO auto-download on install.
// 3. RFC 7233 HTTP Range Request (206 Partial Content) support from Cache Storage for Safari iOS & Chrome video/audio seeking,
//    with graceful fallback to network streaming if range slicing fails.

const SHELL_CACHE = 'ict-prep3-shell-v2';
const PAGES_CACHE = 'ict-prep3-pages-v2';
const MEDIA_CACHE = 'ict-prep3-media-v2';

const PRECACHE_URLS = [
  '/',
  '/review',
  '/exam',
  '/progress',
  '/manifest.webmanifest',
  '/icon.svg',
  '/vendor/skulpt/skulpt.min.js',
  '/vendor/skulpt/skulpt-stdlib.js',
  '/workers/skulpt-worker.js',
  '/media/robot-puzzle.png',
  '/media/robot-path.png',
  '/media/robot-shield.png',
];

const inFlightMediaCaches = new Set();

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(SHELL_CACHE).then(async (cache) => {
      // Add each URL individually so one missing optional asset never fails SW install
      await Promise.allSettled(
        PRECACHE_URLS.map((url) =>
          cache.add(new Request(url, { cache: 'reload' })).catch(() => undefined)
        )
      );
    }).then(() => self.skipWaiting())
  );
});

self.addEventListener('activate', (event) => {
  const allowed = new Set([SHELL_CACHE, PAGES_CACHE, MEDIA_CACHE]);
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(
        keys.map((key) => {
          if (!allowed.has(key)) {
            return caches.delete(key);
          }
          return Promise.resolve(false);
        })
      )
    ).then(() => self.clients.claim())
  );
});

self.addEventListener('message', (event) => {
  if (!event.data) return;
  if (event.data.type === 'SKIP_WAITING') {
    self.skipWaiting();
    return;
  }
  if (event.data.type === 'CACHE_STATION_MEDIA' && Array.isArray(event.data.urls)) {
    const urls = event.data.urls;
    event.waitUntil(
      caches.open(MEDIA_CACHE).then(async (cache) => {
        await Promise.allSettled(
          urls.map(async (url) => {
            const res = await fetch(new Request(url));
            if (res.ok && res.status === 200) {
              await cache.put(url, res);
            }
          })
        );
      })
    );
  }
});

function isMediaAsset(pathname) {
  return /\.(mp4|webm|mp3|wav|ogg|m4a|vtt)$/i.test(pathname);
}

function isStaticAsset(pathname) {
  return (
    pathname.startsWith('/_next/static/') ||
    pathname.startsWith('/vendor/') ||
    pathname.startsWith('/workers/') ||
    pathname.startsWith('/media/') ||
    /\.(woff2|woff|ttf|png|jpg|jpeg|svg|webp|ico|css|js)$/i.test(pathname)
  );
}

function guessContentType(pathname) {
  if (/\.mp4$/i.test(pathname)) return 'video/mp4';
  if (/\.webm$/i.test(pathname)) return 'video/webm';
  if (/\.mp3$/i.test(pathname)) return 'audio/mpeg';
  if (/\.ogg$/i.test(pathname)) return 'audio/ogg';
  if (/\.m4a$/i.test(pathname)) return 'audio/mp4';
  if (/\.wav$/i.test(pathname)) return 'audio/wav';
  if (/\.vtt$/i.test(pathname)) return 'text/vtt; charset=utf-8';
  return 'application/octet-stream';
}

async function createRangeResponse(cachedResponse, rangeHeader, pathname) {
  try {
    const arrayBuffer = await cachedResponse.arrayBuffer();
    const totalLength = arrayBuffer.byteLength;
    const match = /bytes=(\d*)-(\d*)/i.exec(rangeHeader);
    if (!match) {
      return cachedResponse;
    }

    let start = match[1] ? parseInt(match[1], 10) : 0;
    let end = match[2] ? parseInt(match[2], 10) : totalLength - 1;

    if (!match[1] && match[2]) {
      // Suffix byte range: bytes=-500
      const suffixLength = parseInt(match[2], 10);
      start = Math.max(0, totalLength - suffixLength);
      end = totalLength - 1;
    }

    if (Number.isNaN(start) || Number.isNaN(end) || start >= totalLength || start > end) {
      return new Response(null, {
        status: 416,
        statusText: 'Range Not Satisfiable',
        headers: {
          'Content-Range': `bytes */${totalLength}`,
        },
      });
    }

    end = Math.min(end, totalLength - 1);
    const sliced = arrayBuffer.slice(start, end + 1);
    const headers = new Headers({
      'Content-Type': cachedResponse.headers.get('Content-Type') || guessContentType(pathname),
      'Content-Range': `bytes ${start}-${end}/${totalLength}`,
      'Content-Length': String(sliced.byteLength),
      'Accept-Ranges': 'bytes',
    });

    return new Response(sliced, {
      status: 206,
      statusText: 'Partial Content',
      headers,
    });
  } catch {
    return null;
  }
}

async function serveFromMediaCache(mediaCache, request, pathname) {
  const cached = await mediaCache.match(pathname);
  if (!cached) return null;

  const rangeHeader = request.headers.get('range');
  if (rangeHeader) {
    const ranged = await createRangeResponse(cached, rangeHeader, pathname);
    if (ranged) return ranged;
    return cached;
  }
  return cached;
}

async function handleMediaRequest(request, url, event) {
  const mediaCache = await caches.open(MEDIA_CACHE);
  const isOnline = !self.navigator || self.navigator.onLine !== false;

  if (!isOnline) {
    const cachedOffline = await serveFromMediaCache(mediaCache, request, url.pathname);
    if (cachedOffline) return cachedOffline;
    return new Response('Media unavailable offline', {
      status: 503,
      statusText: 'Service Unavailable',
      headers: { 'Content-Type': 'text/plain; charset=utf-8' },
    });
  }

  // Online: stream from network first while warming MEDIA_CACHE cleanly in the background
  try {
    const networkResponse = await fetch(request);

    if (networkResponse.ok) {
      const existing = await mediaCache.match(url.pathname);
      if (!existing) {
        if (networkResponse.status === 200) {
          event.waitUntil(mediaCache.put(url.pathname, networkResponse.clone()));
        } else if (networkResponse.status === 206 && !inFlightMediaCaches.has(url.pathname)) {
          // Cache API does not allow storing 206 responses directly.
          // Fetch full 200 resource cleanly in the background so future offline plays succeed.
          inFlightMediaCaches.add(url.pathname);
          event.waitUntil(
            fetch(new Request(url.pathname))
              .then((fullRes) => {
                if (fullRes.ok && fullRes.status === 200) {
                  return mediaCache.put(url.pathname, fullRes);
                }
                return undefined;
              })
              .catch(() => undefined)
              .finally(() => {
                inFlightMediaCaches.delete(url.pathname);
              })
          );
        }
      }
    }

    return networkResponse;
  } catch {
    const cachedFallback = await serveFromMediaCache(mediaCache, request, url.pathname);
    if (cachedFallback) return cachedFallback;
    // Offline & not cached: return 503 so MediaPlayerBlock switches cleanly to Arabic transcript fallback
    return new Response('Media unavailable offline', {
      status: 503,
      statusText: 'Service Unavailable',
      headers: { 'Content-Type': 'text/plain; charset=utf-8' },
    });
  }
}

self.addEventListener('fetch', (event) => {
  const { request } = event;
  if (request.method !== 'GET') return;

  const url = new URL(request.url);
  if (url.origin !== self.location.origin) return;

  // 1. Media files (.mp4, .mp3, .vtt) -> Cache-on-demand + Range Request support
  if (isMediaAsset(url.pathname)) {
    event.respondWith(handleMediaRequest(request, url, event));
    return;
  }

  // 2. Navigation / HTML routes -> Network-first, fall back to cached page or home shell
  if (request.mode === 'navigate') {
    event.respondWith(
      fetch(request)
        .then((response) => {
          if (response.ok) {
            const copy = response.clone();
            event.waitUntil(
              caches.open(PAGES_CACHE).then((cache) => cache.put(request, copy))
            );
          }
          return response;
        })
        .catch(async () => {
          const pagesCache = await caches.open(PAGES_CACHE);
          const cachedPage = await pagesCache.match(request);
          if (cachedPage) return cachedPage;
          const shellCache = await caches.open(SHELL_CACHE);
          const cachedHome = (await shellCache.match(url.pathname)) || (await shellCache.match('/'));
          if (cachedHome) return cachedHome;
          return new Response(
            '<html lang="ar" dir="rtl"><body style="font-family:sans-serif;background:#F6FAF9;color:#163A3A;padding:2rem;text-align:center;"><h1>أنت بدون إنترنت حاليًا</h1><p>ارجع للصفحة الرئيسية لمتابعة الدروس المحفوظة.</p></body></html>',
            { status: 503, headers: { 'Content-Type': 'text/html; charset=utf-8' } }
          );
        })
    );
    return;
  }

  // 3. Static shell / scripts / fonts / images -> Cache-first with background refresh
  if (isStaticAsset(url.pathname)) {
    event.respondWith(
      caches.open(SHELL_CACHE).then(async (cache) => {
        const cached = await cache.match(request);
        if (cached) {
          // Refresh non-immutable assets quietly in background when online
          if (!url.pathname.startsWith('/_next/static/')) {
            event.waitUntil(
              fetch(request)
                .then((res) => (res.ok ? cache.put(request, res) : undefined))
                .catch(() => undefined)
            );
          }
          return cached;
        }
        try {
          const networkResponse = await fetch(request);
          if (networkResponse.ok) {
            event.waitUntil(cache.put(request, networkResponse.clone()));
          }
          return networkResponse;
        } catch {
          return new Response('', { status: 504 });
        }
      })
    );
    return;
  }

  // 4. Default (e.g. RSC flight requests / JSON) -> Network-first with cache fallback
  event.respondWith(
    fetch(request)
      .then((response) => {
        if (response.ok) {
          const copy = response.clone();
          event.waitUntil(
            caches.open(PAGES_CACHE).then((cache) => cache.put(request, copy))
          );
        }
        return response;
      })
      .catch(async () => {
        const pagesCache = await caches.open(PAGES_CACHE);
        const cached = await pagesCache.match(request);
        return cached || new Response('', { status: 503 });
      })
  );
});
