import type { FlashcardItem } from '@/types/curriculum';

export const STATION_9_FLASHCARDS: FlashcardItem[] = [
  {
    id: 'fc-9-1',
    stationId: 'station-9',
    microLessonId: '9.1',
    termAr: 'التزييف العميق',
    termEn: 'Deepfake',
    definition: 'استخدام الذكاء الاصطناعي لإنشاء صور أو فيديوهات أو أصوات مزيفة تبدو حقيقية جدًا.',
  },
  {
    id: 'fc-9-2',
    stationId: 'station-9',
    microLessonId: '9.1',
    termAr: 'الشبكات التوليدية التنافسية',
    termEn: 'GANs (Generator vs Discriminator)',
    definition: 'نظام من جزئين متنافسين: المولّد ينشئ بيانات مزيفة والمميّز يكتشف المزيف من الحقيقي.',
  },
  {
    id: 'fc-9-3',
    stationId: 'station-9',
    microLessonId: '9.2',
    termAr: 'علامات كشف Deepfake',
    termEn: 'Visual Forensics',
    definition: 'رمش العين غير الطبيعي، عدم اتساق إضاءة الوجه، عدم تطابق الصوت والشفاه، وضبابية الحواف.',
  },
  {
    id: 'fc-9-4',
    stationId: 'station-9',
    microLessonId: '9.2',
    termAr: 'أدوات كشف التزييف',
    termEn: 'Deepware / Sensity AI / Video Authenticator',
    definition: 'أدوات ذكاء اصطناعي تحلل الفيديوهات والصور لاكتشاف التلاعبات غير الطبيعية.',
  },
];
