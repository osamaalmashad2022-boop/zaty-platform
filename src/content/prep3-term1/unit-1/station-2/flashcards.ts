import type { FlashcardItem } from '@/types/curriculum';

export const STATION_2_FLASHCARDS: FlashcardItem[] = [
  {
    id: 'fc-2-1',
    stationId: 'station-2',
    microLessonId: '2.1',
    termAr: 'الخوارزمية',
    termEn: 'Algorithm',
    definition: 'مجموعة من الخطوات المرتبة ترتيبًا منطقيًا لحل مشكلة معينة.',
  },
  {
    id: 'fc-2-2',
    stationId: 'station-2',
    microLessonId: '2.1',
    termAr: 'رموز خريطة التدفق',
    termEn: 'Flowchart Symbols',
    definition: 'البيضاوي للبداية والنهاية، متوازي الأضلاع للإدخال والإخراج، المستطيل للعمليات، والمعيّن للقرار.',
  },
  {
    id: 'fc-2-3',
    stationId: 'station-2',
    microLessonId: '2.2',
    termAr: 'خوارزميات البحث والترتيب',
    termEn: 'Search & Sort',
    definition: 'البحث يعثر على عنصر داخل البيانات، والترتيب ينظم القائمة تصاعديًا عبر دالة sort().',
    code: 'nums = [8, 3, 1]\nnums.sort()',
  },
  {
    id: 'fc-2-4',
    stationId: 'station-2',
    microLessonId: '2.3',
    termAr: 'تعلم الآلة',
    termEn: 'Machine Learning',
    definition: 'نوع من الذكاء الاصطناعي يجعل الكمبيوتر يتعلم من البيانات والأمثلة دون برمجة كل قاعدة صراحة.',
  },
  {
    id: 'fc-2-5',
    stationId: 'station-2',
    microLessonId: '2.3',
    termAr: 'التعلم العميق',
    termEn: 'Deep Learning',
    definition: 'نوع متطور من تعلم الآلة يستخدم الشبكات العصبية لمحاكاة دماغ الإنسان في الصور والصوت.',
  },
  {
    id: 'fc-2-6',
    stationId: 'station-2',
    microLessonId: '2.4',
    termAr: 'التقليدية مقابل الذكاء الاصطناعي',
    termEn: 'Rule-based vs AI',
    definition: 'التقليدية خطوات ثابتة لا تتغير، بينما الذكاء الاصطناعي يتعلم من البيانات ويتحسن بالتدريب.',
  },
];
