'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, Layers, ClipboardCheck, Trophy, WifiOff, Code2, ArrowRight } from 'lucide-react';

interface NavItem {
  href: string;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
  match: (pathname: string) => boolean;
}

const NAV_ITEMS: NavItem[] = [
  {
    href: '/',
    label: 'الرئيسية',
    icon: Home,
    match: (p) => p === '/' || p.startsWith('/station/'),
  },
  {
    href: '/review',
    label: 'المراجعة',
    icon: Layers,
    match: (p) => p.startsWith('/review'),
  },
  {
    href: '/exam',
    label: 'الامتحان',
    icon: ClipboardCheck,
    match: (p) => p.startsWith('/exam'),
  },
  {
    href: '/progress',
    label: 'تقدمي',
    icon: Trophy,
    match: (p) => p.startsWith('/progress'),
  },
];

export interface AppShellProps {
  children: React.ReactNode;
  title?: string;
  backHref?: string;
  backLabel?: string;
}

export function AppShell({ children, title, backHref, backLabel }: AppShellProps) {
  const pathname = usePathname() || '/';
  const [isOffline, setIsOffline] = useState(false);

  // Focused full-screen mode inside the lesson player hides the bottom nav and global header
  // so the learner gets clean RTL card navigation and thumb-friendly Prev/Next controls.
  const isLessonPlayer = pathname.startsWith('/lesson/');

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const updateStatus = () => setIsOffline(!window.navigator.onLine);
    updateStatus();

    window.addEventListener('online', updateStatus);
    window.addEventListener('offline', updateStatus);

    if ('serviceWorker' in window.navigator) {
      window.navigator.serviceWorker
        .register('/sw.js', { scope: '/' })
        .catch(() => {
          // Service worker registration may be unavailable in restricted contexts
        });
    }

    if (window.navigator.storage?.persist) {
      window.navigator.storage.persist().catch(() => undefined);
    }

    return () => {
      window.removeEventListener('online', updateStatus);
      window.removeEventListener('offline', updateStatus);
    };
  }, []);

  if (isLessonPlayer) {
    return (
      <div className="min-h-dvh bg-[#F6FAF9] text-[#3B5A58]" dir="rtl">
        {isOffline && (
          <div
            role="status"
            className="bg-[#163A3A] text-white text-xs sm:text-sm py-1.5 px-4 flex items-center justify-center gap-2"
          >
            <WifiOff className="w-4 h-4 text-[#00D2B2] shrink-0" />
            <span>وضع المذاكرة بدون إنترنت — الكود والبطاقات المحفوظة تعمل بشكل طبيعي</span>
          </div>
        )}
        {children}
      </div>
    );
  }

  return (
    <div className="min-h-dvh flex flex-col bg-[#F6FAF9] text-[#3B5A58]" dir="rtl">
      {/* Desktop & Mobile Top Header */}
      <header className="sticky top-0 z-30 bg-white/95 backdrop-blur border-b border-[#E2ECE9]">
        <div className="max-w-5xl mx-auto px-4 h-16 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3 min-w-0">
            {backHref ? (
              <Link
                href={backHref}
                className="min-h-[48px] px-2 -mr-2 inline-flex items-center gap-1.5 text-sm font-semibold text-[#006E5A] hover:text-[#163A3A]"
              >
                <ArrowRight className="w-4 h-4 shrink-0" />
                <span>{backLabel ?? 'رجوع'}</span>
              </Link>
            ) : (
              <Link
                href="/"
                className="flex items-center gap-3 min-h-[48px] focus-visible:rounded-lg"
              >
                <span className="w-10 h-10 rounded-xl bg-[#006E5A] text-white flex items-center justify-center shadow-sm shrink-0">
                  <Code2 className="w-5 h-5" />
                </span>
                <span className="flex flex-col leading-tight">
                  <span className="text-base sm:text-lg font-bold text-[#163A3A]">
                    {title ?? 'تعلّم ICT'}
                  </span>
                  <span className="text-xs text-[#3B5A58]/80">
                    ٣ إعدادي · الترم الأول
                  </span>
                </span>
              </Link>
            )}
          </div>

          {/* Desktop Navigation */}
          <nav aria-label="التنقل الرئيسي" className="hidden md:flex items-center gap-2">
            {NAV_ITEMS.map((item) => {
              const active = item.match(pathname);
              const Icon = item.icon;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`min-h-[48px] px-4 py-2 rounded-lg flex items-center gap-2 text-sm font-semibold transition-colors ${
                    active
                      ? 'bg-[#E5F1EE] text-[#006E5A]'
                      : 'text-[#3B5A58] hover:bg-[#F6FAF9] hover:text-[#163A3A]'
                  }`}
                >
                  <Icon className="w-4 h-4 shrink-0" />
                  <span>{item.label}</span>
                </Link>
              );
            })}
          </nav>

          {/* Offline status pill */}
          <div className="flex items-center gap-2">
            {isOffline ? (
              <span
                role="status"
                className="inline-flex items-center gap-1.5 rounded-full bg-[#163A3A] text-white px-3 py-1.5 text-xs font-medium"
              >
                <WifiOff className="w-3.5 h-3.5 text-[#00D2B2]" />
                <span>بدون نت</span>
              </span>
            ) : (
              <span className="hidden sm:inline-flex items-center gap-1.5 rounded-full bg-[#E5F1EE] text-[#006E5A] px-3 py-1 text-xs font-semibold">
                <span className="w-2 h-2 rounded-full bg-[#006E5A]" />
                <span>جاهز للمذاكرة</span>
              </span>
            )}
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 w-full max-w-5xl mx-auto px-4 pt-5 pb-32 md:pb-12">
        {children}
      </main>

      {/* Mobile Bottom Navigation */}
      <nav
        aria-label="شريط التنقل السفلي"
        className="md:hidden fixed bottom-0 inset-x-0 z-40 bg-white/95 backdrop-blur border-t border-[#E2ECE9] pb-[env(safe-area-inset-bottom)]"
      >
        <div className="grid grid-cols-4 h-16 max-w-lg mx-auto">
          {NAV_ITEMS.map((item) => {
            const active = item.match(pathname);
            const Icon = item.icon;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex flex-col items-center justify-center gap-1 min-h-[48px] text-xs font-semibold transition-colors ${
                  active ? 'text-[#006E5A]' : 'text-[#3B5A58] hover:text-[#163A3A]'
                }`}
              >
                <span
                  className={`px-3 py-1 rounded-full transition-colors ${
                    active ? 'bg-[#E5F1EE]' : 'bg-transparent'
                  }`}
                >
                  <Icon className="w-5 h-5" />
                </span>
                <span>{item.label}</span>
              </Link>
            );
          })}
        </div>
      </nav>
    </div>
  );
}
