import type { Metadata, Viewport } from 'next';
import { IBM_Plex_Sans_Arabic, JetBrains_Mono } from 'next/font/google';
import './globals.css';
import { AppShell } from '@/components/layout/AppShell';

const ibmPlexArabic = IBM_Plex_Sans_Arabic({
  subsets: ['arabic', 'latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-ibm-plex-sans-arabic',
  display: 'swap',
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-jetbrains-mono',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'ذاتي (Zaty) | منصتك للتعلّم الذاتي التفاعلي',
  description:
    'منصة ذاتي للتعلّم الذاتي التفاعلي لمختلف الصفوف والمواد — تبدأ بمقرر الكمبيوتر وتكنولوجيا المعلومات (الصف الثالث الإعدادي · الترم الأول) بتدريبات Python والذكاء الاصطناعي والأمن السيبراني بدون إنترنت.',
  manifest: '/manifest.webmanifest',
  appleWebApp: {
    capable: true,
    statusBarStyle: 'default',
    title: 'ذاتي',
  },
  applicationName: 'ذاتي',
};

export const viewport: Viewport = {
  themeColor: '#006E5A',
  width: 'device-width',
  initialScale: 1,
  viewportFit: 'cover',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="ar"
      dir="rtl"
      data-scroll-behavior="smooth"
      className={`${ibmPlexArabic.variable} ${jetbrainsMono.variable}`}
    >
      <body className="antialiased bg-[#F6FAF9] text-[#3B5A58]">
        <AppShell>{children}</AppShell>
      </body>
    </html>
  );
}
