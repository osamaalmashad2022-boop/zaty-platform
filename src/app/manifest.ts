import type { MetadataRoute } from 'next';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'منصة تعلّم ICT — الثالث الإعدادي',
    short_name: 'تعلّم ICT',
    description:
      'منصة تعلّم ذاتي تفاعلية لمادة الكمبيوتر وتكنولوجيا المعلومات للصف الثالث الإعدادي (الترم الأول): Python والذكاء الاصطناعي والأمن السيبراني بدون إنترنت.',
    start_url: '/',
    display: 'standalone',
    orientation: 'portrait-primary',
    background_color: '#F6FAF9',
    theme_color: '#009179',
    dir: 'rtl',
    lang: 'ar',
    categories: ['education', 'utilities'],
    icons: [
      {
        src: '/icon.svg',
        sizes: 'any',
        type: 'image/svg+xml',
        purpose: 'any',
      },
      {
        src: '/media/robot-puzzle.png',
        sizes: '512x512',
        type: 'image/png',
        purpose: 'any',
      },
    ],
  };
}
