import type {
  CourseGradeId,
  CourseManifest,
  CourseTermId,
  GradeCatalogItem,
  TermCatalogItem,
} from '@/types/curriculum';

export const PLATFORM_BRAND = {
  nameAr: 'ذاتي',
  nameEn: 'Zaty',
  tagline: 'منصتك للتعلّم الذاتي التفاعلي',
  fullTitle: 'ذاتي | منصتك للتعلّم الذاتي التفاعلي',
  repoSlug: 'zaty-platform',
} as const;

export const DEFAULT_COURSE_ID = 'prep3-term1';
export const ACTIVE_COURSE_STORAGE_KEY = 'zaty_active_course_id';

export const CATALOG_GRADES: GradeCatalogItem[] = [
  {
    id: 'prep-1',
    title: 'الصف الأول الإعدادي',
    shortTitle: 'أولى إعدادي',
    stage: 'preparatory',
    order: 1,
  },
  {
    id: 'prep-2',
    title: 'الصف الثاني الإعدادي',
    shortTitle: 'تانية إعدادي',
    stage: 'preparatory',
    order: 2,
  },
  {
    id: 'prep-3',
    title: 'الصف الثالث الإعدادي',
    shortTitle: 'تالتة إعدادي',
    stage: 'preparatory',
    order: 3,
  },
  {
    id: 'sec-1',
    title: 'الصف الأول الثانوي',
    shortTitle: 'أولى ثانوي',
    stage: 'secondary',
    order: 4,
  },
];

export const CATALOG_TERMS_META: TermCatalogItem[] = [
  {
    id: 'term-1',
    title: 'الفصل الدراسي الأول',
    shortTitle: 'الترم الأول',
    order: 1,
  },
  {
    id: 'term-2',
    title: 'الفصل الدراسي الثاني',
    shortTitle: 'الترم الثاني',
    order: 2,
  },
];

export const COURSE_CATALOG: CourseManifest[] = [
  {
    id: 'prep3-term1',
    gradeId: 'prep-3',
    gradeLabel: 'الصف الثالث الإعدادي',
    termId: 'term-1',
    termLabel: 'الفصل الدراسي الأول',
    subjectId: 'ict',
    subjectName: 'الكمبيوتر وتكنولوجيا المعلومات',
    title: 'الكمبيوتر وتكنولوجيا المعلومات — ٣ إعدادي (الترم الأول)',
    description:
      'منهج التفكير الحاسوبي ولغة Python والذكاء الاصطناعي والأمن السيبراني في جلسات قصيرة ٧–١٠ دقائق تعمل بدون إنترنت.',
    status: 'available',
    access: 'free',
    stationsCount: 9,
    lessonsCount: 29,
    quizCount: 295,
    hasCodeLab: true,
    packId: 'prep3-term1',
  },
  {
    id: 'prep3-term1-science',
    gradeId: 'prep-3',
    gradeLabel: 'الصف الثالث الإعدادي',
    termId: 'term-1',
    termLabel: 'الفصل الدراسي الأول',
    subjectId: 'science',
    subjectName: 'العلوم',
    title: 'العلوم — ٣ إعدادي (الترم الأول)',
    description:
      'الحركة في اتجاه واحد والمرايا والعدسات والانقسام الخلوي والتكاثر بتدريبات تفاعلية وبنك أسئلة متدرج.',
    status: 'coming_soon',
    access: 'free',
    stationsCount: 8,
    lessonsCount: 24,
    quizCount: 240,
    hasCodeLab: false,
  },
  {
    id: 'prep3-term1-math',
    gradeId: 'prep-3',
    gradeLabel: 'الصف الثالث الإعدادي',
    termId: 'term-1',
    termLabel: 'الفصل الدراسي الأول',
    subjectId: 'math',
    subjectName: 'الرياضيات (الجبر والهندسة)',
    title: 'الرياضيات (الجبر والهندسة) — ٣ إعدادي (الترم الأول)',
    description:
      'العلاقات والدوال والنسبة والتناسب وحساب المثلثات والهندسة التحليلية خطوة بخطوة للمتعلم الذاتي.',
    status: 'coming_soon',
    access: 'free',
    stationsCount: 10,
    lessonsCount: 30,
    quizCount: 300,
    hasCodeLab: false,
  },
  {
    id: 'prep3-term1-social',
    gradeId: 'prep-3',
    gradeLabel: 'الصف الثالث الإعدادي',
    termId: 'term-1',
    termLabel: 'الفصل الدراسي الأول',
    subjectId: 'social',
    subjectName: 'الدراسات الاجتماعية',
    title: 'الدراسات الاجتماعية — ٣ إعدادي (الترم الأول)',
    description:
      'تضاريس ومناخ قارات العالم وتاريخ مصر الحديث عبر خرائط ذهنية ومقارنات تفاعلية سريعة.',
    status: 'coming_soon',
    access: 'free',
    stationsCount: 8,
    lessonsCount: 24,
    quizCount: 220,
    hasCodeLab: false,
  },
  {
    id: 'prep3-term2-ict',
    gradeId: 'prep-3',
    gradeLabel: 'الصف الثالث الإعدادي',
    termId: 'term-2',
    termLabel: 'الفصل الدراسي الثاني',
    subjectId: 'ict',
    subjectName: 'الكمبيوتر وتكنولوجيا المعلومات',
    title: 'الكمبيوتر وتكنولوجيا المعلومات — ٣ إعدادي (الترم الثاني)',
    description:
      'استكمال تطبيقات Python وهياكل البيانات والمشروعات الرقمية والذكاء الاصطناعي التطبيقي.',
    status: 'available',
    access: 'free',
    stationsCount: 6,
    lessonsCount: 18,
    quizCount: 85,
    hasCodeLab: true,
    packId: 'prep3-term2',
  },
  {
    id: 'prep1-term1-ict',
    gradeId: 'prep-1',
    gradeLabel: 'الصف الأول الإعدادي',
    termId: 'term-1',
    termLabel: 'الفصل الدراسي الأول',
    subjectId: 'ict',
    subjectName: 'الكمبيوتر وتكنولوجيا المعلومات',
    title: 'الكمبيوتر وتكنولوجيا المعلومات — ١ إعدادي (الترم الأول)',
    description:
      'أساسيات أنظمة الكمبيوتر والشبكات والحوسبة السحابية والأمان الرقمي للمتعلم المبتدئ.',
    status: 'coming_soon',
    access: 'free',
    stationsCount: 8,
    lessonsCount: 24,
    quizCount: 200,
    hasCodeLab: false,
  },
  {
    id: 'prep2-term1-ict',
    gradeId: 'prep-2',
    gradeLabel: 'الصف الثاني الإعدادي',
    termId: 'term-1',
    termLabel: 'الفصل الدراسي الأول',
    subjectId: 'ict',
    subjectName: 'الكمبيوتر وتكنولوجيا المعلومات',
    title: 'الكمبيوتر وتكنولوجيا المعلومات — ٢ إعدادي (الترم الأول)',
    description:
      'تصميم مواقع الويب التفاعلية وأساسيات المنطق البرمجي وبناء المشروعات خطوة بخطوة.',
    status: 'coming_soon',
    access: 'free',
    stationsCount: 8,
    lessonsCount: 24,
    quizCount: 220,
    hasCodeLab: true,
  },
  {
    id: 'sec1-term1-ict',
    gradeId: 'sec-1',
    gradeLabel: 'الصف الأول الثانوي',
    termId: 'term-1',
    termLabel: 'الفصل الدراسي الأول',
    subjectId: 'ict',
    subjectName: 'البرمجة والذكاء الاصطناعي',
    title: 'البرمجة والذكاء الاصطناعي — ١ ثانوي (الترم الأول)',
    description:
      'الخوارزميات المتقدمة وبناء النماذج وتطبيقات الذكاء الاصطناعي التوليدي للمتعلم في المرحلة الثانوية.',
    status: 'coming_soon',
    access: 'free',
    stationsCount: 10,
    lessonsCount: 30,
    quizCount: 300,
    hasCodeLab: true,
  },
];

export function getCourseCatalog(): CourseManifest[] {
  return COURSE_CATALOG;
}

export function getCourseManifest(
  courseId: string = DEFAULT_COURSE_ID,
): CourseManifest {
  return (
    COURSE_CATALOG.find(
      (c) => c.id === courseId || c.packId === courseId,
    ) ?? COURSE_CATALOG[0]
  );
}

export function getCoursesByFilter(
  gradeId?: CourseGradeId,
  termId?: CourseTermId,
): CourseManifest[] {
  return COURSE_CATALOG.filter((course) => {
    if (gradeId && course.gradeId !== gradeId) return false;
    if (termId && course.termId !== termId) return false;
    return true;
  });
}

export function getStoredActiveCourseId(): string {
  if (typeof window === 'undefined') return DEFAULT_COURSE_ID;
  try {
    const raw = window.localStorage?.getItem(ACTIVE_COURSE_STORAGE_KEY);
    if (!raw) return DEFAULT_COURSE_ID;
    const match = COURSE_CATALOG.find((c) => c.id === raw);
    return match ? match.id : DEFAULT_COURSE_ID;
  } catch {
    return DEFAULT_COURSE_ID;
  }
}

export function setStoredActiveCourseId(courseId: string): string {
  const validCourse = getCourseManifest(courseId);
  if (typeof window !== 'undefined') {
    try {
      window.localStorage?.setItem(ACTIVE_COURSE_STORAGE_KEY, validCourse.id);
    } catch {
      // Ignore storage quota or private browsing errors
    }
  }
  return validCourse.id;
}
