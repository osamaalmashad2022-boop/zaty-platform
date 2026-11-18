import type { MetadataRoute } from 'next';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'ذاتي (Zaty) | منصتك للتعلّم الذاتي التفاعلي',
    short_name: 'ذاتي',
    description:
      'منصة ذاتي للتعلّم الذاتي التفاعلي لمختلف الصفوف والمواد الدراسية، وتبدأ بمقرر الكمبيوتر وتكنولوجيا المعلومات للصف الثالث الإعدادي (الترم الأول) بدون إنترنت.',
    start_url: '/',
    display: 'standalone',
    orientation: 'portrait-primary',
    background_color: '#F6FAF9',
    theme_color: '#006E5A',
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
