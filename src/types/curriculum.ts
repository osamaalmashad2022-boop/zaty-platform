/**
 * Core curriculum, 15-block lesson schema, multi-grade/subject catalog,
 * quiz/flashcard banks, and event-sourced learner progress types for Zaty (ذاتي).
 */

// ---------------------------------------------------------------------------
// 1. Block Types (All 20 reusable blocks)
// ---------------------------------------------------------------------------

export type BlockType =
  | 'heroHook'
  | 'richText'
  | 'listBlock'
  | 'imageBlock'
  | 'mediaPlayer'
  | 'codeView'
  | 'processStepper'
  | 'tableBlock'
  | 'accordionBlock'
  | 'flipCards'
  | 'comparisonTabs'
  | 'calloutWarning'
  | 'quizQuestion'
  | 'sortingBuckets'
  | 'matchingPairs'
  | 'orderFlowBuilder'
  | 'codeLab'
  | 'predictOutput'
  | 'spotBug'
  | 'interactiveSim';

export interface HeroStarterChallengeOption {
  id: string;
  text: string;
  isCorrect: boolean;
  feedback: string;
}

export interface HeroStarterChallenge {
  prompt: string;
  options: HeroStarterChallengeOption[];
  revealNote?: string;
}

export interface HeroHookData {
  title: string;
  durationMin: number;
  goal: string;
  hook: string;
  image?: string;
  stationLabel?: string;
  starterChallenge?: HeroStarterChallenge;
}

export interface RichTextData {
  heading?: string;
  body: string;
  calloutStyle?: 'default' | 'highlight' | 'summary' | 'note';
}

export interface ListItem {
  id: string;
  text: string;
  detail?: string;
}

export interface ListBlockData {
  heading?: string;
  mode: 'bullet' | 'numbered' | 'checkbox';
  items: ListItem[];
}

export interface ImageBlockData {
  src: string;
  alt: string;
  caption?: string;
  aspectRatio?: string;
}

export interface MediaPlayerData {
  kind: 'video' | 'audio';
  title?: string;
  src: string;
  vttSrc?: string;
  poster?: string;
  transcript?: string;
  durationSec: number;
  /** Video orientation hint to prevent portrait/landscape layout shift before metadata loads */
  aspect?: 'landscape' | 'portrait';
  /** True when the video already renders burned-in captions (keeps WebVTT track optional, not forced default) */
  burnedInCaptions?: boolean;
}

export interface CodeViewData {
  title?: string;
  code: string;
  caption?: string;
  highlightLines?: number[];
  runnable?: boolean;
}

export interface ProcessStep {
  id: string;
  title: string;
  detail: string;
  visual?: string;
  code?: string;
}

export interface ProcessStepperData {
  heading?: string;
  steps: ProcessStep[];
}

export interface TableBlockData {
  heading?: string;
  caption?: string;
  headers: string[];
  rows: string[][];
  highlightColumn?: number;
}

export interface AccordionItem {
  id: string;
  title: string;
  body: string;
  code?: string;
}

export interface AccordionBlockData {
  heading?: string;
  openMode: 'single' | 'multiple';
  items: AccordionItem[];
}

export interface FlipCardItem {
  id: string;
  frontLabel?: string;
  frontTitle: string;
  frontHint?: string;
  backTitle?: string;
  backBody: string;
  backExample?: string;
  code?: string;
}

export interface FlipCardsData {
  heading?: string;
  instruction?: string;
  cards: FlipCardItem[];
}

export interface ComparisonTabItem {
  id: string;
  label: string;
  badge?: string;
  tone?: 'emerald' | 'coral' | 'neutral';
  body: string;
  bullets?: string[];
  code?: string;
}

export interface ComparisonTabsData {
  heading?: string;
  instruction?: string;
  tabs: ComparisonTabItem[];
}

export interface CalloutWarningData {
  variant: 'warning' | 'tip' | 'transition';
  title: string;
  body: string;
}

export interface QuizOption {
  id: string;
  text: string;
  isCorrect: boolean;
  feedback: string;
}

export interface QuizQuestionData {
  question: string;
  code?: string;
  options: QuizOption[];
  multiple: boolean;
  scored: boolean;
  sourceTag?: string;
  explanation?: string;
  randomizeOptions?: boolean;
}

export interface SortingBucket {
  id: string;
  label: string;
  description?: string;
}

export interface SortingItem {
  id: string;
  text: string;
  bucketId: string;
}

export interface SortingBucketsData {
  prompt: string;
  buckets: SortingBucket[];
  items: SortingItem[];
  feedback: {
    correct: string;
    incorrect: string;
  };
}

export interface MatchingPair {
  id: string;
  left: string;
  right: string;
}

export interface MatchingPairsData {
  prompt: string;
  pairs: MatchingPair[];
  feedback: {
    correct: string;
    incorrect: string;
  };
}

export type FlowchartShape = 'oval' | 'parallelogram' | 'rectangle' | 'diamond';

export interface OrderFlowItem {
  id: string;
  label: string;
  shape?: FlowchartShape;
}

export interface OrderFlowBuilderData {
  mode: 'steps' | 'flowchart';
  prompt: string;
  items: OrderFlowItem[];
  correctOrder: string[];
  feedback: {
    correct: string;
    incorrect: string;
  };
}

export interface CodeLabCheck {
  id: string;
  label?: string;
  stdin: string[];
  expectedOutputRegex?: string;
  contains?: string | string[];
}

export interface CodeLabData {
  mode: 'fillLine' | 'freeRun';
  title?: string;
  prompt: string;
  starterCode: string;
  hiddenPrefix?: string;
  solutionCode: string;
  checks: CodeLabCheck[];
  hint: string;
  /** Optional progressive multi-level hints (Level 1 strategic -> Level 2 conceptual -> Level 3 procedural) */
  hints?: string[];
  /** Optional tappable code/line tokens above the editor for mobile-friendly entry */
  quickChips?: string[];
}

export interface PredictOutputOption {
  id: string;
  text: string;
  isCorrect: boolean;
  feedback: string;
}

export interface PredictOutputData {
  title?: string;
  prompt: string;
  code?: string;
  scenario?: string;
  stdin?: string[];
  runnable?: boolean;
  expectedOutput?: string;
  options: PredictOutputOption[];
  explanation: string;
}

export interface SpotBugStepItem {
  id: string;
  text: string;
  wrongFeedback?: string;
}

export interface SpotBugData {
  mode: 'code' | 'steps';
  title?: string;
  prompt: string;
  code?: string;
  codeLines?: string[];
  lineFeedback?: Record<number, string>;
  bugLine?: number;
  items?: SpotBugStepItem[];
  bugItemId?: string;
  fixedLine: string;
  fixExplanation: string;
  cleanLineFeedback?: string;
}

export interface InteractiveLinearModelData {
  mode: 'linearModel';
  title?: string;
  prompt: string;
  xLabel?: string;
  yLabel?: string;
  wLabel?: string;
  bLabel?: string;
  initialX?: number;
  initialW?: number;
  initialB?: number;
  minX?: number;
  maxX?: number;
  stepX?: number;
  minW?: number;
  maxW?: number;
  stepW?: number;
  minB?: number;
  maxB?: number;
  stepB?: number;
  maxY?: number;
  unitSuffix?: string;
  targetChallenge?: {
    prompt: string;
    targetY: number;
    tolerance?: number;
    lockX?: number;
    successFeedback: string;
  };
}

export type TrapDetectorScene = 'gamePopup' | 'aiChat' | 'newsPost' | 'privacyAlert';

export interface TrapDetectorItem {
  id: string;
  label: string;
  detail?: string;
  isTrap: boolean;
  clueAr: string;
  trapTag?: string;
}

export interface InteractiveTrapDetectorData {
  mode: 'trapDetector';
  scene?: TrapDetectorScene;
  title?: string;
  prompt: string;
  cardTitle: string;
  cardSubtitle?: string;
  cardBody?: string;
  items: TrapDetectorItem[];
  completionNote?: string;
}

export interface GansArenaRound {
  id: string;
  roundNumber: number;
  generatorOutput: string;
  visualHint?: string;
  realismScore: number;
  fooledDiscriminator: boolean;
  flawCue?: string;
  feedbackCorrect: string;
  feedbackWrong: string;
}

export interface InteractiveGansArenaData {
  mode: 'gansArena';
  title?: string;
  prompt: string;
  generatorLabel?: string;
  discriminatorLabel?: string;
  rounds: GansArenaRound[];
  completionNote?: string;
}

export type InteractiveSimData =
  | InteractiveLinearModelData
  | InteractiveTrapDetectorData
  | InteractiveGansArenaData;

export interface HeroHookBlock {
  id: string;
  type: 'heroHook';
  data: HeroHookData;
}

export interface RichTextBlock {
  id: string;
  type: 'richText';
  data: RichTextData;
}

export interface ListBlock {
  id: string;
  type: 'listBlock';
  data: ListBlockData;
}

export interface ImageBlock {
  id: string;
  type: 'imageBlock';
  data: ImageBlockData;
}

export interface MediaPlayerBlock {
  id: string;
  type: 'mediaPlayer';
  data: MediaPlayerData;
}

export interface CodeViewBlock {
  id: string;
  type: 'codeView';
  data: CodeViewData;
}

export interface ProcessStepperBlock {
  id: string;
  type: 'processStepper';
  data: ProcessStepperData;
}

export interface TableBlock {
  id: string;
  type: 'tableBlock';
  data: TableBlockData;
}

export interface AccordionBlock {
  id: string;
  type: 'accordionBlock';
  data: AccordionBlockData;
}

export interface FlipCardsBlock {
  id: string;
  type: 'flipCards';
  data: FlipCardsData;
}

export interface ComparisonTabsBlock {
  id: string;
  type: 'comparisonTabs';
  data: ComparisonTabsData;
}

export interface CalloutWarningBlock {
  id: string;
  type: 'calloutWarning';
  data: CalloutWarningData;
}

export interface QuizQuestionBlock {
  id: string;
  type: 'quizQuestion';
  data: QuizQuestionData;
}

export interface SortingBucketsBlock {
  id: string;
  type: 'sortingBuckets';
  data: SortingBucketsData;
}

export interface MatchingPairsBlock {
  id: string;
  type: 'matchingPairs';
  data: MatchingPairsData;
}

export interface OrderFlowBuilderBlock {
  id: string;
  type: 'orderFlowBuilder';
  data: OrderFlowBuilderData;
}

export interface CodeLabBlock {
  id: string;
  type: 'codeLab';
  data: CodeLabData;
}

export interface PredictOutputBlock {
  id: string;
  type: 'predictOutput';
  data: PredictOutputData;
}

export interface SpotBugBlock {
  id: string;
  type: 'spotBug';
  data: SpotBugData;
}

export interface InteractiveSimBlock {
  id: string;
  type: 'interactiveSim';
  data: InteractiveSimData;
}

export type LessonBlock =
  | HeroHookBlock
  | RichTextBlock
  | ListBlock
  | ImageBlock
  | MediaPlayerBlock
  | CodeViewBlock
  | ProcessStepperBlock
  | TableBlock
  | AccordionBlock
  | FlipCardsBlock
  | ComparisonTabsBlock
  | CalloutWarningBlock
  | QuizQuestionBlock
  | SortingBucketsBlock
  | MatchingPairsBlock
  | OrderFlowBuilderBlock
  | CodeLabBlock
  | PredictOutputBlock
  | SpotBugBlock
  | InteractiveSimBlock;

// ---------------------------------------------------------------------------
// 2. Lesson, NotebookLM Additional Sources, Station, Unit, Quiz & Flashcards
// ---------------------------------------------------------------------------

export type LessonCardRole =
  | 'hero'
  | 'concept'
  | 'example'
  | 'tryIt'
  | 'quickCheck'
  | 'warning'
  | 'summary';

export interface LessonCard {
  id: string;
  title: string;
  role?: LessonCardRole;
  blocks: LessonBlock[];
  requireInteraction?: boolean;
}

export interface MindmapNode {
  id: string;
  label: string;
  children?: MindmapNode[];
}

export type AdditionalSource =
  | {
      id: string;
      type: 'summary';
      title: string;
      content: string;
      bullets?: string[];
    }
  | {
      id: string;
      type: 'faq';
      title: string;
      items: Array<{
        id: string;
        question: string;
        answer: string;
      }>;
    }
  | {
      id: string;
      type: 'mindmap';
      title: string;
      root: MindmapNode;
    }
  | {
      id: string;
      type: 'glossary';
      title: string;
      terms: Array<{
        id: string;
        termAr: string;
        termEn: string;
        definition: string;
      }>;
    }
  | {
      id: string;
      type: 'audio';
      title: string;
      src: string;
      durationSec: number;
      transcript: string;
      notes?: string[];
    };

export interface SourceReference {
  id: string;
  kind: 'textbook' | 'notebooklm' | 'reference';
  label: string;
  detail: string;
  pages?: string;
}

export interface LessonNextStep {
  kind: 'lesson' | 'stationQuiz';
  targetId: string;
  label: string;
  description?: string;
}

export type ContentAccess = 'free' | 'premium';
export type ContentStatus = 'ready' | 'draft' | 'awaiting_pack';

export interface LessonPack {
  id: string;
  stationId: string;
  unitId: string;
  order: number;
  title: string;
  subtitle?: string;
  durationMin: number;
  contentVersion: number;
  access: ContentAccess;
  status: ContentStatus;
  objectives: string[];
  cards: LessonCard[];
  summary: string;
  additionalSources: AdditionalSource[];
  sources: SourceReference[];
  nextStep: LessonNextStep;
}

export interface QuizItem {
  id: string;
  stationId: string;
  microLessonId: string;
  kind: 'trueFalse' | 'mcq' | 'code';
  question: string;
  code?: string;
  options: QuizOption[];
  multiple?: boolean;
  explanation: string;
  sourceTag: string;
}

export interface FlashcardItem {
  id: string;
  stationId: string;
  microLessonId: string;
  termAr: string;
  termEn: string;
  definition: string;
  example?: string;
  code?: string;
}

export interface StationPack {
  id: string;
  unitId: string;
  number: number;
  title: string;
  description: string;
  textbookPages: string;
  access: ContentAccess;
  status: ContentStatus;
  objectives: string[];
  lessons: LessonPack[];
  quizBank: QuizItem[];
  flashcards: FlashcardItem[];
  mediaAssets?: string[];
}

export interface UnitPack {
  id: string;
  number: number;
  title: string;
  description: string;
  textbookPages: string;
  stations: StationPack[];
}

export interface TermPack {
  id: string;
  courseId?: string;
  title: string;
  grade: string;
  term: string;
  units: UnitPack[];
}

export type CourseGradeId = 'prep-1' | 'prep-2' | 'prep-3' | 'sec-1';
export type CourseTermId = 'term-1' | 'term-2';
export type CourseSubjectId =
  | 'ict'
  | 'science'
  | 'math'
  | 'social'
  | 'arabic'
  | 'english';
export type CourseCatalogStatus = 'available' | 'coming_soon';

export interface GradeCatalogItem {
  id: CourseGradeId;
  title: string;
  shortTitle: string;
  stage: 'preparatory' | 'secondary';
  order: number;
}

export interface TermCatalogItem {
  id: CourseTermId;
  title: string;
  shortTitle: string;
  order: number;
}

export interface CourseManifest {
  id: string;
  gradeId: CourseGradeId;
  gradeLabel: string;
  termId: CourseTermId;
  termLabel: string;
  subjectId: CourseSubjectId;
  subjectName: string;
  title: string;
  description: string;
  status: CourseCatalogStatus;
  access: ContentAccess;
  stationsCount: number;
  lessonsCount: number;
  quizCount: number;
  hasCodeLab: boolean;
  packId?: string;
}

// ---------------------------------------------------------------------------
// 3. Event-Sourced Progress, Friction Tracking, Badges & Derived Stats
// ---------------------------------------------------------------------------

export type LearningEventType =
  | 'card_viewed'
  | 'lesson_completed'
  | 'quiz_submitted'
  | 'flashcard_reviewed'
  | 'activity_attempt'
  | 'station_unlocked';

export interface CardViewedPayload {
  cardId: string;
  cardIndex: number;
  totalCards: number;
}

export interface LessonCompletedPayload {
  durationSec?: number;
  xpAwarded?: number;
}

export interface QuizSubmittedPayload {
  mode: 'station' | 'exam';
  stationId?: string;
  score: number;
  total: number;
  percentage: number;
  wrongQuestionIds: string[];
  wrongMicroLessonIds: string[];
  stationBreakdown?: Record<string, { correct: number; total: number }>;
}

export interface FlashcardReviewedPayload {
  cardId: string;
  stationId: string;
  result: 'known' | 'review_again';
}

export interface ActivityAttemptPayload {
  blockId: string;
  blockType: BlockType | 'quiz';
  isCorrect: boolean;
  attemptNumber: number;
  errorKind?: string;
}

export interface StationUnlockedPayload {
  stationId: string;
  reason: 'early_challenge';
}

export interface LearningEvent {
  id?: number;
  eventId: string;
  courseId?: string;
  type: LearningEventType;
  lessonId: string;
  stationId?: string;
  payloadJson: string;
  cairoDate: string;
  createdAt: number;
}

export interface FrictionEvent {
  id?: number;
  eventId: string;
  courseId?: string;
  lessonId: string;
  stationId?: string;
  blockId: string;
  blockType: BlockType | 'quiz';
  attemptCount: number;
  isCorrect: boolean;
  errorKind?: string;
  cairoDate: string;
  createdAt: number;
}

export type BadgeId =
  | 'first_lesson'
  | 'first_station'
  | 'perfect_quiz'
  | 'streak_3'
  | 'unit_1_hero'
  | 'term_1_complete';

export interface BadgeStatus {
  id: BadgeId;
  title: string;
  description: string;
  icon: string;
  unlocked: boolean;
  unlockedAt: number | null;
}

export interface StationProgressSummary {
  stationId: string;
  completedLessons: number;
  totalLessons: number;
  completedLessonIds: string[];
  bestQuizScore: number | null;
  lastQuizScore: number | null;
  earlyChallengeUnlocked: boolean;
}

export interface QuizAttemptSummary {
  eventId: string;
  mode: 'station' | 'exam';
  stationId?: string;
  score: number;
  total: number;
  percentage: number;
  wrongMicroLessonIds: string[];
  stationBreakdown?: Record<string, { correct: number; total: number }>;
  createdAt: number;
}

export interface FlashcardReviewState {
  cardId: string;
  status: 'known' | 'review_again';
  reviewCount: number;
  lastReviewedAt: number;
}

export interface FrictionSummary {
  lessonId: string;
  stationId?: string;
  blockId: string;
  blockType: BlockType | 'quiz';
  wrongAttempts: number;
  totalAttempts: number;
  lastErrorKind?: string;
}

export interface LearnerStats {
  xp: number;
  streakDays: number;
  longestStreakDays: number;
  lastActiveCairoDate: string | null;
  todayLessonsCount: number;
  completedLessonIds: string[];
  totalCompletedLessons: number;
  viewedCardsByLesson: Record<string, string[]>;
  lastLessonId: string | null;
  lastCardIndexByLesson: Record<string, number>;
  badges: BadgeStatus[];
  stationProgress: Record<string, StationProgressSummary>;
  quizHistory: QuizAttemptSummary[];
  flashcardStates: Record<string, FlashcardReviewState>;
  weakSpots: FrictionSummary[];
}

export interface CachedLessonRecord {
  lessonId: string;
  courseId?: string;
  contentVersion: number;
  pack: LessonPack;
  cachedAt: number;
}
