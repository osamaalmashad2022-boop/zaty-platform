import Dexie, { type DexieOptions, type Table } from 'dexie';
import type {
  CachedLessonRecord,
  FrictionEvent,
  LearningEvent,
} from '@/types/curriculum';

export interface PreferenceRecord {
  key: string;
  value: string;
  updatedAt: number;
}

export class IctDatabase extends Dexie {
  learningEvents!: Table<LearningEvent, number>;
  frictionEvents!: Table<FrictionEvent, number>;
  cachedLessons!: Table<CachedLessonRecord, string>;
  preferences!: Table<PreferenceRecord, string>;

  constructor(name = 'ict-prep3-db', options?: DexieOptions) {
    super(name, options);

    this.version(1).stores({
      learningEvents: '++id, &eventId, type, lessonId, stationId, cairoDate, createdAt',
      frictionEvents: '++id, &eventId, lessonId, stationId, blockId, blockType, createdAt',
      cachedLessons: '&lessonId, contentVersion, cachedAt',
      preferences: '&key, updatedAt',
    });

    this.version(2).stores({
      learningEvents:
        '++id, &eventId, courseId, type, lessonId, stationId, cairoDate, createdAt',
      frictionEvents:
        '++id, &eventId, courseId, lessonId, stationId, blockId, blockType, createdAt',
      cachedLessons: '&lessonId, courseId, contentVersion, cachedAt',
      preferences: '&key, updatedAt',
    });
  }
}

let singletonDb: IctDatabase | null = null;

export const db = new IctDatabase();

export function isIndexedDbAvailable(): boolean {
  return typeof globalThis !== 'undefined' && typeof globalThis.indexedDB !== 'undefined';
}

export function getDb(): IctDatabase {
  if (!isIndexedDbAvailable()) {
    throw new Error('IndexedDB is only available in browser environments.');
  }
  if (!singletonDb) {
    singletonDb = db;
  }
  return singletonDb;
}

export function resetDbInstance(): void {
  if (singletonDb) {
    singletonDb.close();
    singletonDb = null;
  }
}
