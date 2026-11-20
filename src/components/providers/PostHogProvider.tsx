'use client';

import posthog from 'posthog-js';
import { PostHogProvider as PHProvider } from 'posthog-js/react';
import { useEffect, useState, Suspense } from 'react';
import { usePathname, useSearchParams } from 'next/navigation';

function PostHogPageView() {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    if (pathname && typeof window !== 'undefined') {
      let url = window.origin + pathname;
      const search = searchParams?.toString();
      if (search) {
        url = `${url}?${search}`;
      }
      posthog.capture('$pageview', {
        $current_url: url,
      });
    }
  }, [pathname, searchParams]);

  return null;
}

export function PostHogProvider({ children }: { children: React.ReactNode }) {
  const [initialized, setInitialized] = useState(false);

  useEffect(() => {
    const posthogKey = process.env.NEXT_PUBLIC_POSTHOG_KEY;
    const posthogHost =
      process.env.NEXT_PUBLIC_POSTHOG_HOST || 'https://us.i.posthog.com';

    if (typeof window !== 'undefined' && posthogKey) {
      if (!posthog.__loaded) {
        posthog.init(posthogKey, {
          api_host: posthogHost,
          capture_pageview: false, // Handled by PostHogPageView for client route changes
          capture_pageleave: true,
          autocapture: true,
          person_profiles: 'identified_only',
          loaded: () => {
            setInitialized(true);
          },
        });
      } else {
        setInitialized(true);
      }
    }
  }, []);

  return (
    <PHProvider client={posthog}>
      {initialized && (
        <Suspense fallback={null}>
          <PostHogPageView />
        </Suspense>
      )}
      {children}
    </PHProvider>
  );
}
