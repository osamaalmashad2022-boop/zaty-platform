import type { MetadataRoute } from 'next';
import {
  SITE_NAME,
  SITE_NAME_AR,
  SITE_DESCRIPTION,
  THEME_COLOR,
  THEME_COLOR_LIGHT,
} from '@/constants/seo';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: SITE_NAME,
    short_name: SITE_NAME_AR,
    description: SITE_DESCRIPTION,
    start_url: '/',
    display: 'standalone',
    orientation: 'portrait-primary',
    background_color: THEME_COLOR_LIGHT,
    theme_color: THEME_COLOR,
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
        src: '/brand/zaty-icon-512.png',
        sizes: '512x512',
        type: 'image/png',
        purpose: 'maskable',
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
