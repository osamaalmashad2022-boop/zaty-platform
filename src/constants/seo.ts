/**
 * Zaty (ذاتي) - SEO & Brand Identity Constants
 * Single source of truth for Platform Identity, URLs, OpenGraph, and Structured Data
 */

export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, '') || 'https://zaty.app';

export const SITE_NAME = 'ذاتي (Zaty)';
export const SITE_NAME_AR = 'ذاتي';
export const SITE_TAGLINE = 'منصتك للتعلّم الذاتي التفاعلي';
export const SITE_TITLE_DEFAULT = 'ذاتي (Zaty) | منصتك للتعلّم الذاتي التفاعلي';
export const SITE_TITLE_TEMPLATE = '%s | ذاتي (Zaty)';
export const SITE_DESCRIPTION =
  'منصة ذاتي للتعلّم الذاتي التفاعلي — تبدأ بمقرر الكمبيوتر وتكنولوجيا المعلومات للصف الثالث الإعدادي (الترم الأول) بتدريبات بايثون التفاعلية والذكاء الاصطناعي والأمن السيبراني بدون إنترنت.';

export const SITE_LOCALE = 'ar_EG';
export const SITE_HANDLE = '@zatyapp';

export const OG_IMAGE_PATH = '/og-image.png';
export const OG_IMAGE_WIDTH = 1200;
export const OG_IMAGE_HEIGHT = 630;
export const OG_IMAGE_ALT =
  'شعار منصة ذاتي (Zaty) وبطاقة التعلّم الذاتي التفاعلي لكود بايثون والذكاء الاصطناعي بدون إنترنت';

export const THEME_COLOR = '#006E5A';
export const THEME_COLOR_LIGHT = '#F6FAF9';
export const THEME_COLOR_DARK = '#0F2929';

export const SITE_KEYWORDS = [
  'ذاتي',
  'منصة ذاتي',
  'Zaty',
  'تعلّم ذاتي',
  'بايثون',
  'الكمبيوتر وتكنولوجيا المعلومات',
  'الصف الثالث الإعدادي',
  'الترم الأول',
  'تعلّم بايثون بدون إنترنت',
  'الذكاء الاصطناعي في التعليم',
  'أمن المعلومات والسيبراني',
  'تطبيق تعليمي PWA',
];

export const EDUCATIONAL_PROGRAM = {
  courseName: 'الكمبيوتر وتكنولوجيا المعلومات والاتصالات',
  grade: 'الصف الثالث الإعدادي',
  term: 'الفصل الدراسي الأول',
  curriculum: 'وزارة التربية والتعليم والتعليم الفني - مصر',
};

/**
 * Returns a canonical, normalized absolute URL.
 * Never concatenate paths manually.
 */
export function canonicalUrl(path: string = ''): string {
  const normalized = path.startsWith('/') ? path : `/${path}`;
  if (normalized === '/') return SITE_URL;
  const withoutTrailing = normalized.endsWith('/')
    ? normalized.slice(0, -1)
    : normalized;
  return `${SITE_URL}${withoutTrailing}`;
}
