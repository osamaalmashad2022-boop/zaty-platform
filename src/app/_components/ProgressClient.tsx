'use client';

import React, { useEffect, useMemo, useState } from 'react';
import Link from 'next/link';
import {
  AlertTriangle,
  ArrowLeft,
  Award,
  CheckCircle2,
  Cloud,
  Copy,
  Crown,
  Download,
  Flag,
  Flame,
  KeyRound,
  LogIn,
  LogOut,
  RefreshCw,
  Rocket,
  Share2,
  ShieldCheck,
  Smartphone,
  Trash2,
  Trophy,
  Upload,
  UserPlus,
} from 'lucide-react';
import {
  deriveLearnerStats,
  exportProgressBackup,
  getLearnerStats,
  importProgressBackup,
  requestPersistentStorage,
} from '@/lib/storage/progress';
import {
  DEFAULT_COURSE_ID,
  getCourseManifest,
  getStoredActiveCourseId,
} from '@/content/catalog';
import {
  deleteUserAccount,
  fetchCurrentUser,
  loginWithEmail,
  logoutUser,
  redeemActivationCode,
  registerWithEmail,
  requestOAuthLogin,
  syncProgressWithCloud,
  type CloudUser,
} from '@/lib/sync/cloudSync';
import type { BadgeId, LearnerStats } from '@/types/curriculum';

export interface ProgressStationInfo {
  id: string;
  unitId: string;
  number: number;
  title: string;
  termId?: string;
  packId?: string;
  lessons: Array<{ id: string; title: string }>;
}

export interface ProgressClientProps {
  stations: ProgressStationInfo[];
}

interface BeforeInstallPromptEvent extends Event {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: 'accepted' | 'dismissed' }>;
}

const BADGE_ICONS: Record<
  BadgeId,
  React.ComponentType<{ className?: string }>
> = {
  first_lesson: Rocket,
  first_station: Flag,
  perfect_quiz: Award,
  streak_3: Flame,
  unit_1_hero: Trophy,
  term_1_complete: Crown,
};

const BLOCK_TYPE_LABELS: Record<string, string> = {
  quizQuestion: 'سؤال تحقق',
  quiz: 'اختبار',
  codeLab: 'مختبر بايثون',
  sortingBuckets: 'نشاط تصنيف',
  matchingPairs: 'نشاط توصيل',
  orderFlowBuilder: 'ترتيب / خريطة تدفق',
  listBlock: 'قائمة مراجعة',
};

function notifyAuthChanged() {
  if (typeof window !== 'undefined') {
    window.dispatchEvent(new Event('sl-auth-changed'));
  }
}

interface StatusBanner {
  kind: 'success' | 'error' | 'info';
  text: string;
}

export function ProgressClient({ stations }: ProgressClientProps) {
  const [stats, setStats] = useState<LearnerStats>(() =>
    deriveLearnerStats([], []),
  );
  const [persisted, setPersisted] = useState<boolean | null>(null);
  const [backupCode, setBackupCode] = useState('');
  const [exportStatus, setExportStatus] = useState('');
  const [importInput, setImportInput] = useState('');
  const [importStatus, setImportStatus] = useState<{
    kind: 'success' | 'error';
    text: string;
  } | null>(null);
  const [installPrompt, setInstallPrompt] =
    useState<BeforeInstallPromptEvent | null>(null);

  // v2 Account & Cloud Sync state
  const [cloudUser, setCloudUser] = useState<CloudUser | null>(null);
  const [authLoaded, setAuthLoaded] = useState(false);
  const [authTab, setAuthTab] = useState<'login' | 'register'>('login');
  const [authName, setAuthName] = useState('');
  const [authEmail, setAuthEmail] = useState('');
  const [authPassword, setAuthPassword] = useState('');
  const [guardianConsent, setGuardianConsent] = useState(false);
  const [authBusy, setAuthBusy] = useState(false);
  const [syncBusy, setSyncBusy] = useState(false);
  const [oauthBusy, setOauthBusy] = useState<'google' | 'facebook' | null>(null);
  const [accountFeedback, setAccountFeedback] = useState<StatusBanner | null>(
    null,
  );
  const [deleteConfirmOpen, setDeleteConfirmOpen] = useState(false);
  const [deleteBusy, setDeleteBusy] = useState(false);

  // v3 Activation Code state
  const [activationInput, setActivationInput] = useState('');
  const [activationBusy, setActivationBusy] = useState(false);
  const [activationFeedback, setActivationFeedback] =
    useState<StatusBanner | null>(null);

  // Active course tracking
  const [activeCourseId, setActiveCourseId] = useState<string>(DEFAULT_COURSE_ID);

  const activeCourse = useMemo(
    () => getCourseManifest(activeCourseId),
    [activeCourseId],
  );

  const activeStations = useMemo(() => {
    const targetPack = activeCourse.packId || activeCourseId;
    const hasTermMeta = stations.some((s) => s.termId || s.packId);
    if (!hasTermMeta) return stations;
    const filtered = stations.filter(
      (s) =>
        s.termId === targetPack ||
        s.packId === targetPack ||
        (targetPack === 'prep3-term1' && s.number <= 9) ||
        (targetPack.includes('term2') && s.number >= 10),
    );
    return filtered.length > 0 ? filtered : stations;
  }, [stations, activeCourse, activeCourseId]);

  useEffect(() => {
    let cancelled = false;
    const stored = getStoredActiveCourseId();
    const effectiveCourse = stored || DEFAULT_COURSE_ID;
    if (stored) {
      setActiveCourseId(stored);
    }

    getLearnerStats(undefined, { courseId: effectiveCourse })
      .then((s) => {
        if (!cancelled) setStats(s);
      })
      .catch(() => undefined);

    const handleCourseChanged = (e: Event) => {
      const customEvent = e as CustomEvent<string>;
      const newCourseId = customEvent.detail || getStoredActiveCourseId();
      setActiveCourseId(newCourseId);
      getLearnerStats(undefined, { courseId: newCourseId })
        .then((s) => !cancelled && setStats(s))
        .catch(() => undefined);
    };
    window.addEventListener('sl-course-changed', handleCourseChanged);

    fetchCurrentUser()
      .then((user) => {
        if (!cancelled) {
          setCloudUser(user);
          setAuthLoaded(true);
        }
      })
      .catch(() => {
        if (!cancelled) setAuthLoaded(true);
      });

    requestPersistentStorage()
      .then((res) => {
        if (!cancelled) setPersisted(res.persisted);
      })
      .catch(() => undefined);

    const handleInstallPrompt = (e: Event) => {
      e.preventDefault();
      setInstallPrompt(e as BeforeInstallPromptEvent);
    };

    window.addEventListener('beforeinstallprompt', handleInstallPrompt);
    return () => {
      cancelled = true;
      window.removeEventListener('beforeinstallprompt', handleInstallPrompt);
      window.removeEventListener('sl-course-changed', handleCourseChanged);
    };
  }, []);

  const totalTermLessons = useMemo(
    () => activeStations.reduce((sum, s) => sum + s.lessons.length, 0) || 29,
    [activeStations],
  );

  const lessonTitleMap = useMemo(() => {
    const map = new Map<string, string>();
    for (const s of stations) {
      for (const l of s.lessons) {
        map.set(l.id, l.title);
      }
    }
    return map;
  }, [stations]);

  const handleExportBackup = async () => {
    try {
      const code = await exportProgressBackup();
      setBackupCode(code);
      let copied = false;
      if (
        typeof navigator !== 'undefined' &&
        navigator.clipboard &&
        typeof navigator.clipboard.writeText === 'function'
      ) {
        await navigator.clipboard.writeText(code).catch(() => undefined);
        copied = true;
      }
      setExportStatus(
        copied
          ? 'تم إنشاء ونسخ كود التقدم الاحتياطي ✓ احتفظ به في الملاحظات'
          : 'تم إنشاء كود التقدم الاحتياطي ✓ انسخه من الصندوق بالأسفل',
      );
    } catch {
      setExportStatus('تعذّر إنشاء النسخة الاحتياطية حاليًا.');
    }
  };

  const handleImportBackup = async () => {
    if (!importInput.trim()) {
      setImportStatus({
        kind: 'error',
        text: 'من فضلك الصق كود التقدم (SL1:...) أولًا.',
      });
      return;
    }

    try {
      const res = await importProgressBackup(importInput);
      setStats(res.stats);
      setImportStatus({
        kind: 'success',
        text: `تمت استعادة ${res.importedEvents} حدث تعليمي بنجاح ✓`,
      });
      setImportInput('');
    } catch (err) {
      setImportStatus({
        kind: 'error',
        text:
          err instanceof Error
            ? err.message
            : 'كود النسخة الاحتياطية غير صالح.',
      });
    }
  };

  const handleInstallPwa = async () => {
    if (!installPrompt) return;
    await installPrompt.prompt();
    await installPrompt.userChoice;
    setInstallPrompt(null);
  };

  const handleAuthSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (authBusy) return;

    const trimmedEmail = authEmail.trim();
    if (!trimmedEmail || !authPassword) {
      setAccountFeedback({
        kind: 'error',
        text: 'من فضلك أدخل البريد الإلكتروني وكلمة المرور.',
      });
      return;
    }

    if (authTab === 'register' && !guardianConsent) {
      setAccountFeedback({
        kind: 'error',
        text: 'يجب الإقرار بموافقة ولي الأمر وفق قانون حماية البيانات الشخصية 151 لسنة 2020 قبل إنشاء الحساب.',
      });
      return;
    }

    setAuthBusy(true);
    setAccountFeedback(null);

    try {
      const result =
        authTab === 'register'
          ? await registerWithEmail({
              email: trimmedEmail,
              password: authPassword,
              name: authName.trim() || undefined,
              guardianConsent,
            })
          : await loginWithEmail({
              email: trimmedEmail,
              password: authPassword,
            });

      if (!result.ok || !result.user) {
        setAccountFeedback({
          kind: 'error',
          text: result.error ?? 'تعذّر إتمام العملية حاليًا.',
        });
        return;
      }

      setCloudUser(result.user);
      setAuthPassword('');
      notifyAuthChanged();

      // Merge local IndexedDB events with the cloud account immediately
      const synced = await syncProgressWithCloud();
      if (synced.ok) {
        if (synced.user) setCloudUser(synced.user);
        if (synced.stats) setStats(synced.stats);
        setAccountFeedback({
          kind: 'success',
          text:
            authTab === 'register'
              ? 'تم إنشاء الحساب ومزامنة تقدمك مع السحابة بنجاح ✓'
              : 'تم تسجيل الدخول ومزامنة تقدمك بنجاح ✓',
        });
      } else {
        setAccountFeedback({
          kind: 'success',
          text:
            authTab === 'register'
              ? 'تم إنشاء حسابك بنجاح ✓ يمكنك مزامنة تقدمك في أي وقت.'
              : 'تم تسجيل الدخول بنجاح ✓',
        });
      }
    } finally {
      setAuthBusy(false);
    }
  };

  const handleOAuthClick = async (provider: 'google' | 'facebook') => {
    if (oauthBusy) return;
    setOauthBusy(provider);
    setAccountFeedback(null);
    try {
      const res = await requestOAuthLogin(provider);
      if (res.ok && res.configured && res.authUrl) {
        window.location.assign(res.authUrl);
        return;
      }
      setAccountFeedback({
        kind: 'info',
        text: res.message,
      });
    } finally {
      setOauthBusy(null);
    }
  };

  const handleSyncNow = async () => {
    if (syncBusy) return;
    setSyncBusy(true);
    setAccountFeedback(null);
    try {
      const res = await syncProgressWithCloud();
      if (!res.ok) {
        setAccountFeedback({
          kind: 'error',
          text: res.error ?? 'تعذّر مزامنة التقدم حاليًا.',
        });
        return;
      }
      if (res.user) setCloudUser(res.user);
      setStats(res.stats ?? (await getLearnerStats()));
      setAccountFeedback({
        kind: 'success',
        text: `تمت مزامنة التقدم مع السحابة بنجاح ✓ (${res.serverEventCount ?? 0} حدث محفوظ)`,
      });
    } finally {
      setSyncBusy(false);
    }
  };

  const handleLogout = async () => {
    setAccountFeedback(null);
    const res = await logoutUser();
    if (!res.ok) {
      setAccountFeedback({
        kind: 'error',
        text: res.error ?? 'تعذّر تسجيل الخروج حاليًا.',
      });
      return;
    }
    setCloudUser(null);
    setDeleteConfirmOpen(false);
    notifyAuthChanged();
    setAccountFeedback({
      kind: 'info',
      text: 'تم تسجيل الخروج. ما زال تقدمك محفوظًا محليًا على هذا الجهاز.',
    });
  };

  const handleConfirmDeleteAccount = async () => {
    if (deleteBusy) return;
    setDeleteBusy(true);
    setAccountFeedback(null);
    try {
      const res = await deleteUserAccount();
      if (!res.ok) {
        setAccountFeedback({
          kind: 'error',
          text: res.error ?? 'تعذّر حذف الحساب حاليًا.',
        });
        return;
      }
      setCloudUser(null);
      setDeleteConfirmOpen(false);
      setStats(await getLearnerStats());
      notifyAuthChanged();
      setAccountFeedback({
        kind: 'success',
        text:
          res.message ??
          'تم حذف الحساب وجميع بياناتك وسجل التعلم نهائيًا.',
      });
    } finally {
      setDeleteBusy(false);
    }
  };

  const handleRedeemCode = async (e: React.FormEvent) => {
    e.preventDefault();
    if (activationBusy) return;
    const code = activationInput.trim();
    if (!code) {
      setActivationFeedback({
        kind: 'error',
        text: 'من فضلك أدخل كود التفعيل أولًا (مثل ICT-2027-PRO).',
      });
      return;
    }

    setActivationBusy(true);
    setActivationFeedback(null);
    try {
      const res = await redeemActivationCode(code);
      if (!res.ok) {
        setActivationFeedback({
          kind: 'error',
          text: res.error ?? 'كود التفعيل غير صالح أو منتهي الصلاحية.',
        });
        return;
      }

      if (res.user) {
        setCloudUser(res.user);
      } else if (cloudUser) {
        setCloudUser({ ...cloudUser, tier: res.tier ?? 'premium' });
      }
      setActivationInput('');
      notifyAuthChanged();
      setActivationFeedback({
        kind: 'success',
        text: res.message ?? 'تم تفعيل النسخة الكاملة بنجاح!',
      });
    } finally {
      setActivationBusy(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Summary Header */}
      <section className="orchid-card p-5 sm:p-6 space-y-4">
        <div className="space-y-1">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-[#E5F1EE] px-3 py-1 text-xs font-bold text-[#006E5A]">
            <Trophy className="w-3.5 h-3.5" />
            <span>سجل إنجاز المتعلم</span>
          </span>
          <h1 className="text-2xl font-bold text-[#163A3A]">تقدمك والشارات</h1>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          <div className="rounded-xl border border-[#E2ECE9] bg-[#F6FAF9] p-4 space-y-1">
            <span className="text-xs text-[#3B5A58]">الدروس المكتملة</span>
            <p className="text-xl sm:text-2xl font-bold text-[#163A3A] tabular-nums">
              {stats.totalCompletedLessons} / {totalTermLessons}
            </p>
          </div>

          <div className="rounded-xl border border-[#E2ECE9] bg-[#F6FAF9] p-4 space-y-1">
            <span className="text-xs text-[#3B5A58]">السلسلة اليومية</span>
            <p className="text-xl sm:text-2xl font-bold text-[#B91C3C] tabular-nums flex items-center gap-1.5">
              <Flame className="w-5 h-5 text-[#E14B63] shrink-0" />
              <span>{stats.streakDays} يوم</span>
            </p>
          </div>

          <div className="rounded-xl border border-[#E2ECE9] bg-[#F6FAF9] p-4 space-y-1">
            <span className="text-xs text-[#3B5A58]">إجمالي النقاط</span>
            <p className="text-xl sm:text-2xl font-bold text-[#006E5A] tabular-nums">
              {stats.xp} XP
            </p>
          </div>

          <div className="rounded-xl border border-[#E2ECE9] bg-[#F6FAF9] p-4 space-y-1">
            <span className="text-xs text-[#3B5A58]">أطول سلسلة</span>
            <p className="text-xl sm:text-2xl font-bold text-[#163A3A] tabular-nums">
              {stats.longestStreakDays} يوم
            </p>
          </div>
        </div>
      </section>

      {/* Account & Cloud Sync (v2) */}
      <section className="orchid-card p-5 sm:p-6 space-y-5">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2.5">
            <Cloud className="w-5 h-5 text-[#006E5A] shrink-0" />
            <h2 className="text-lg sm:text-xl font-bold text-[#163A3A]">
              حسابك والمزامنة السحابية (v2)
            </h2>
          </div>

          {cloudUser && (
            <span
              data-testid="account-tier-badge"
              className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-bold border ${
                cloudUser.tier === 'premium'
                  ? 'bg-[#E5F1EE] text-[#006E5A] border-[#006E5A]/40'
                  : 'bg-[#F6FAF9] text-[#163A3A] border-[#E2ECE9]'
              }`}
            >
              {cloudUser.tier === 'premium' ? (
                <>
                  <Crown className="w-3.5 h-3.5 shrink-0" />
                  <span>النسخة الكاملة ★</span>
                </>
              ) : (
                <span>الباقة المجانية</span>
              )}
            </span>
          )}
        </div>

        {!authLoaded ? (
          <div className="rounded-xl border border-[#E2ECE9] bg-[#F6FAF9] p-4 text-sm text-[#3B5A58]">
            جاري التحقق من حالة الحساب...
          </div>
        ) : cloudUser ? (
          <div className="space-y-4">
            <div className="rounded-xl border border-[#E2ECE9] bg-[#F6FAF9] p-4 flex flex-wrap items-center justify-between gap-3">
              <div className="space-y-0.5 min-w-0">
                <p className="text-base font-bold text-[#163A3A]">
                  {cloudUser.name}
                </p>
                <p
                  dir="ltr"
                  className="text-xs sm:text-sm text-[#3B5A58] font-mono text-right break-all"
                >
                  {cloudUser.email}
                </p>
              </div>
              <span className="inline-flex items-center gap-1.5 rounded-full bg-[#E5F1EE] px-3 py-1 text-xs font-bold text-[#006E5A]">
                <CheckCircle2 className="w-3.5 h-3.5 shrink-0" />
                <span>المزامنة السحابية جاهزة</span>
              </span>
            </div>

            <div className="flex flex-wrap items-center gap-3">
              <button
                type="button"
                onClick={handleSyncNow}
                disabled={syncBusy}
                className="orchid-btn-primary"
              >
                <RefreshCw
                  className={`w-4 h-4 shrink-0 ${syncBusy ? 'animate-spin' : ''}`}
                />
                <span>{syncBusy ? 'جاري المزامنة...' : 'مزامنة التقدم الآن'}</span>
              </button>

              <button
                type="button"
                onClick={handleLogout}
                className="orchid-btn-secondary"
              >
                <LogOut className="w-4 h-4 text-[#006E5A] shrink-0" />
                <span>تسجيل الخروج</span>
              </button>

              <button
                type="button"
                onClick={() => setDeleteConfirmOpen(true)}
                className="inline-flex items-center justify-center gap-2 min-h-[48px] px-4 py-2 rounded-lg border border-[#E14B63]/40 bg-[#FBEAEC] text-[#B91C3C] text-sm font-bold hover:border-[#E14B63]"
              >
                <Trash2 className="w-4 h-4 shrink-0" />
                <span>حذف الحساب وجميع بياناتي نهائيًا</span>
              </button>
            </div>

            {deleteConfirmOpen && (
              <div
                role="alertdialog"
                aria-label="تأكيد حذف الحساب"
                className="rounded-xl border border-[#E14B63] bg-[#FBEAEC] p-4 space-y-3"
              >
                <p className="text-sm font-bold text-[#163A3A]">
                  هل أنت متأكد من حذف حسابك وجميع بياناتك نهائيًا؟
                </p>
                <p className="text-xs sm:text-sm text-[#3B5A58]">
                  وفقًا لقانون حماية البيانات الشخصية 151 لسنة 2020، سيتم مسح
                  حسابك وسجل تقدمك من السحابة ومن هذا الجهاز فورًا ولا يمكن
                  التراجع عن هذا الإجراء.
                </p>
                <div className="flex flex-wrap items-center gap-3">
                  <button
                    type="button"
                    onClick={handleConfirmDeleteAccount}
                    disabled={deleteBusy}
                    className="inline-flex items-center justify-center gap-2 min-h-[48px] px-5 rounded-lg bg-[#B91C3C] text-white text-sm font-bold hover:bg-[#9F1239] disabled:opacity-50"
                  >
                    <Trash2 className="w-4 h-4 shrink-0" />
                    <span>
                      {deleteBusy ? 'جاري الحذف...' : 'تأكيد الحذف النهائي'}
                    </span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setDeleteConfirmOpen(false)}
                    disabled={deleteBusy}
                    className="orchid-btn-secondary text-sm"
                  >
                    إلغاء
                  </button>
                </div>
              </div>
            )}
          </div>
        ) : (
          <div className="space-y-4">
            <p className="text-sm text-[#3B5A58]">
              اربط حسابك لحفظ تقدمك سحابيًا ومزامنته بين الهاتف وأي جهاز آخر،
              مع بقاء الدروس والتشغيل بدون إنترنت على جهازك.
            </p>

            {/* Login / Signup Tabs */}
            <div
              role="tablist"
              aria-label="اختيار وضع الحساب"
              className="grid grid-cols-2 gap-2 rounded-xl bg-[#F6FAF9] p-1.5 border border-[#E2ECE9]"
            >
              <button
                type="button"
                role="tab"
                aria-selected={authTab === 'login'}
                onClick={() => {
                  setAuthTab('login');
                  setAccountFeedback(null);
                }}
                className={`min-h-[48px] rounded-lg px-3 py-2 text-sm font-bold flex items-center justify-center gap-2 transition-colors ${
                  authTab === 'login'
                    ? 'bg-[#006E5A] text-white shadow-sm'
                    : 'text-[#163A3A] hover:bg-white'
                }`}
              >
                <LogIn className="w-4 h-4 shrink-0" />
                <span>تسجيل الدخول</span>
              </button>
              <button
                type="button"
                role="tab"
                aria-selected={authTab === 'register'}
                onClick={() => {
                  setAuthTab('register');
                  setAccountFeedback(null);
                }}
                className={`min-h-[48px] rounded-lg px-3 py-2 text-sm font-bold flex items-center justify-center gap-2 transition-colors ${
                  authTab === 'register'
                    ? 'bg-[#006E5A] text-white shadow-sm'
                    : 'text-[#163A3A] hover:bg-white'
                }`}
              >
                <UserPlus className="w-4 h-4 shrink-0" />
                <span>إنشاء حساب جديد</span>
              </button>
            </div>

            <form onSubmit={handleAuthSubmit} noValidate className="space-y-3.5">
              {authTab === 'register' && (
                <div className="space-y-1.5">
                  <label
                    htmlFor="auth-name-input"
                    className="block text-sm font-bold text-[#163A3A]"
                  >
                    اسم المتعلم (اختياري)
                  </label>
                  <input
                    id="auth-name-input"
                    type="text"
                    value={authName}
                    onChange={(e) => setAuthName(e.target.value)}
                    placeholder="اكتب اسمك الأول"
                    className="w-full min-h-[48px] rounded-xl border border-[#E2ECE9] bg-white px-3.5 py-2.5 text-sm text-[#163A3A]"
                  />
                </div>
              )}

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="space-y-1.5">
                  <label
                    htmlFor="auth-email-input"
                    className="block text-sm font-bold text-[#163A3A]"
                  >
                    البريد الإلكتروني
                  </label>
                  <input
                    id="auth-email-input"
                    type="email"
                    dir="ltr"
                    value={authEmail}
                    onChange={(e) => setAuthEmail(e.target.value)}
                    placeholder="learner@example.com"
                    className="w-full min-h-[48px] rounded-xl border border-[#E2ECE9] bg-white px-3.5 py-2.5 text-sm text-[#163A3A] text-left font-mono"
                  />
                </div>

                <div className="space-y-1.5">
                  <label
                    htmlFor="auth-password-input"
                    className="block text-sm font-bold text-[#163A3A]"
                  >
                    كلمة المرور
                  </label>
                  <input
                    id="auth-password-input"
                    type="password"
                    dir="ltr"
                    value={authPassword}
                    onChange={(e) => setAuthPassword(e.target.value)}
                    placeholder="••••••••"
                    className="w-full min-h-[48px] rounded-xl border border-[#E2ECE9] bg-white px-3.5 py-2.5 text-sm text-[#163A3A] text-left font-mono"
                  />
                </div>
              </div>

              {authTab === 'register' && (
                <label className="flex items-start gap-3 rounded-xl border border-[#E2ECE9] bg-[#F6FAF9] p-3.5 min-h-[48px] cursor-pointer">
                  <input
                    type="checkbox"
                    checked={guardianConsent}
                    onChange={(e) => setGuardianConsent(e.target.checked)}
                    className="mt-1 w-5 h-5 accent-[#006E5A] shrink-0"
                  />
                  <span className="text-xs sm:text-sm font-medium text-[#163A3A] leading-relaxed">
                    أقر بموافقة ولي الأمر على إنشاء الحساب وحفظ تقدمي التعليمي
                    وفق قانون حماية البيانات الشخصية 151 لسنة 2020
                  </span>
                </label>
              )}

              <button
                type="submit"
                disabled={authBusy}
                className="orchid-btn-primary w-full sm:w-auto"
              >
                {authTab === 'register' ? (
                  <UserPlus className="w-4 h-4 shrink-0" />
                ) : (
                  <LogIn className="w-4 h-4 shrink-0" />
                )}
                <span>
                  {authBusy
                    ? 'جاري التنفيذ...'
                    : authTab === 'register'
                      ? 'إنشاء حساب جديد'
                      : 'تسجيل الدخول'}
                </span>
              </button>
            </form>

            {/* Quick OAuth Login */}
            <div className="border-t border-[#E2ECE9] pt-4 space-y-2.5">
              <p className="text-xs font-bold text-[#3B5A58]">
                أو الدخول السريع عبر:
              </p>
              <div className="flex flex-wrap gap-3">
                <button
                  type="button"
                  onClick={() => handleOAuthClick('google')}
                  disabled={oauthBusy !== null}
                  className="orchid-btn-secondary flex-1 min-w-[160px] text-sm"
                >
                  <span>
                    {oauthBusy === 'google'
                      ? 'جاري التحويل...'
                      : 'تسجيل الدخول عبر Google'}
                  </span>
                </button>
                <button
                  type="button"
                  onClick={() => handleOAuthClick('facebook')}
                  disabled={oauthBusy !== null}
                  className="orchid-btn-secondary flex-1 min-w-[160px] text-sm"
                >
                  <span>
                    {oauthBusy === 'facebook'
                      ? 'جاري التحويل...'
                      : 'تسجيل الدخول عبر Facebook'}
                  </span>
                </button>
              </div>
            </div>
          </div>
        )}

        {accountFeedback && (
          <p
            role="status"
            className={`rounded-xl border p-3.5 text-sm font-bold ${
              accountFeedback.kind === 'error'
                ? 'border-[#E14B63]/40 bg-[#FBEAEC] text-[#B91C3C]'
                : accountFeedback.kind === 'success'
                  ? 'border-[#006E5A]/30 bg-[#E5F1EE] text-[#006E5A]'
                  : 'border-[#E2ECE9] bg-[#F6FAF9] text-[#163A3A]'
            }`}
          >
            {accountFeedback.text}
          </p>
        )}
      </section>

      {/* Premium Activation (v3) */}
      <section className="orchid-card p-5 sm:p-6 space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2.5">
            <KeyRound className="w-5 h-5 text-[#006E5A] shrink-0" />
            <h2 className="text-lg sm:text-xl font-bold text-[#163A3A]">
              تفعيل النسخة الكاملة (v3)
            </h2>
          </div>

          <span
            className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-bold border ${
              cloudUser?.tier === 'premium'
                ? 'bg-[#E5F1EE] text-[#006E5A] border-[#006E5A]/40'
                : 'bg-[#F6FAF9] text-[#3B5A58] border-[#E2ECE9]'
            }`}
          >
            {cloudUser?.tier === 'premium'
              ? 'النسخة الكاملة ★'
              : 'الباقة المجانية'}
          </span>
        </div>

        <p className="text-sm text-[#3B5A58]">
          أدخل كود تفعيل النسخة الكاملة لفتح جميع مزايا الحساب السحابي والمحتوى
          المميز.{' '}
          <span className="font-semibold text-[#163A3A]">
            (كود التجربة: <code dir="ltr">ICT-2027-PRO</code>)
          </span>
        </p>

        <form
          onSubmit={handleRedeemCode}
          noValidate
          className="flex flex-col sm:flex-row sm:items-end gap-3"
        >
          <div className="flex-1 space-y-1.5">
            <label
              htmlFor="activation-code-input"
              className="block text-sm font-bold text-[#163A3A]"
            >
              كود التفعيل
            </label>
            <input
              id="activation-code-input"
              type="text"
              dir="ltr"
              value={activationInput}
              onChange={(e) => setActivationInput(e.target.value)}
              placeholder="ICT-2027-PRO"
              className="w-full min-h-[48px] rounded-xl border border-[#E2ECE9] bg-white px-3.5 py-2.5 text-sm text-[#163A3A] text-left font-mono"
            />
          </div>

          <button
            type="submit"
            disabled={activationBusy}
            className="orchid-btn-primary shrink-0"
          >
            <Crown className="w-4 h-4 shrink-0" />
            <span>{activationBusy ? 'جاري التفعيل...' : 'تفعيل الكود'}</span>
          </button>
        </form>

        {activationFeedback && (
          <p
            role="status"
            className={`rounded-xl border p-3.5 text-sm font-bold ${
              activationFeedback.kind === 'error'
                ? 'border-[#E14B63]/40 bg-[#FBEAEC] text-[#B91C3C]'
                : 'border-[#006E5A]/30 bg-[#E5F1EE] text-[#006E5A]'
            }`}
          >
            {activationFeedback.text}
          </p>
        )}
      </section>

      {/* 6 Badges */}
      <section className="orchid-card p-5 sm:p-6 space-y-4">
        <h2 className="text-lg sm:text-xl font-bold text-[#163A3A]">
          الشارات الست ({stats.badges.filter((b) => b.unlocked).length} / 6)
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {stats.badges.map((badge) => {
            const Icon = BADGE_ICONS[badge.id];
            return (
              <div
                key={badge.id}
                className={`rounded-xl border p-4 flex items-start gap-3 transition-colors ${
                  badge.unlocked
                    ? 'border-[#006E5A]/40 bg-[#E5F1EE]/60'
                    : 'border-[#E2ECE9] bg-[#F6FAF9] opacity-75'
                }`}
              >
                <span
                  className={`w-11 h-11 rounded-xl flex items-center justify-center shrink-0 ${
                    badge.unlocked
                      ? 'bg-[#006E5A] text-white'
                      : 'bg-white border border-[#E2ECE9] text-[#3B5A58]'
                  }`}
                >
                  <Icon className="w-5 h-5" />
                </span>
                <div className="space-y-0.5 min-w-0">
                  <div className="flex items-center gap-1.5">
                    <h3 className="text-sm font-bold text-[#163A3A]">
                      {badge.title}
                    </h3>
                    {badge.unlocked && (
                      <CheckCircle2 className="w-4 h-4 text-[#006E5A] shrink-0" />
                    )}
                  </div>
                  <p className="text-xs text-[#3B5A58] leading-relaxed">
                    {badge.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Per-Station Bars */}
      <section className="orchid-card p-5 sm:p-6 space-y-4">
        <div className="flex items-center justify-between gap-2 flex-wrap">
          <h2 className="text-lg sm:text-xl font-bold text-[#163A3A]">
            التقدم في كل محطة
          </h2>
          <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-[#E5F1EE] text-[#006E5A]">
            {activeCourse.gradeLabel} · {activeCourse.termLabel}
          </span>
        </div>

        <div className="space-y-3">
          {activeStations.map((st) => {
            const sum = stats.stationProgress[st.id];
            const total = st.lessons.length || sum?.totalLessons || 0;
            const done = sum?.completedLessons ?? 0;
            const pct = total > 0 ? Math.round((done / total) * 100) : 0;

            return (
              <Link
                key={st.id}
                href={`/station/${st.id}`}
                className="block rounded-xl border border-[#E2ECE9] bg-[#F6FAF9] hover:border-[#006E5A] p-4 space-y-2 transition-colors"
              >
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <span className="text-sm sm:text-base font-bold text-[#163A3A]">
                    المحطة {st.number}: {st.title}
                  </span>
                  <div className="flex items-center gap-3 text-xs font-bold tabular-nums">
                    {sum?.bestQuizScore !== null &&
                      sum?.bestQuizScore !== undefined && (
                        <span className="text-[#006E5A]">
                          أعلى اختبار: {sum.bestQuizScore}٪
                        </span>
                      )}
                    <span className="text-[#163A3A]">
                      {done} / {total} ({pct}٪)
                    </span>
                  </div>
                </div>
                <div className="w-full h-2 rounded-full bg-[#E2ECE9] overflow-hidden">
                  <div
                    className="h-full bg-[#006E5A] rounded-full transition-all duration-300"
                    style={{ width: `${pct}%` }}
                  />
                </div>
              </Link>
            );
          })}
        </div>
      </section>

      {/* Friction Weak Spots */}
      <section className="orchid-card p-5 sm:p-6 space-y-4">
        <div className="flex items-center gap-2">
          <AlertTriangle className="w-5 h-5 text-[#E14B63]" />
          <h2 className="text-lg sm:text-xl font-bold text-[#163A3A]">
            نقاط تحتاج لمراجعة سريعة
          </h2>
        </div>

        {stats.weakSpots.length === 0 ? (
          <p className="rounded-xl bg-[#E5F1EE]/60 border border-[#006E5A]/20 p-4 text-sm text-[#163A3A]">
            ممتاز! لم تُسجَّل نقاط تعثر متكررة حتى الآن. استمر بنفس التركيز.
          </p>
        ) : (
          <ul className="space-y-2.5">
            {stats.weakSpots.slice(0, 6).map((spot) => (
              <li
                key={`${spot.lessonId}-${spot.blockId}`}
                className="rounded-xl border border-[#E2ECE9] bg-[#F6FAF9] p-3.5 flex flex-wrap items-center justify-between gap-3"
              >
                <div className="space-y-0.5">
                  <div className="text-xs font-bold text-[#B91C3C]">
                    {BLOCK_TYPE_LABELS[spot.blockType] ?? 'نشاط تفاعلي'} ·{' '}
                    {spot.wrongAttempts} محاولات إضافية
                  </div>
                  <p className="text-sm font-bold text-[#163A3A]">
                    الدرس {spot.lessonId}:{' '}
                    {lessonTitleMap.get(spot.lessonId) ?? ''}
                  </p>
                </div>

                <Link
                  href={`/lesson/${spot.lessonId}`}
                  className="inline-flex items-center gap-1.5 min-h-[48px] px-4 rounded-lg bg-white border border-[#006E5A] text-sm font-bold text-[#006E5A] hover:bg-[#E5F1EE]"
                >
                  <span>راجع الدرس</span>
                  <ArrowLeft className="w-4 h-4 shrink-0" />
                </Link>
              </li>
            ))}
          </ul>
        )}
      </section>

      {/* Export / Import Backup Code */}
      <section className="orchid-card p-5 sm:p-6 space-y-5">
        <div className="space-y-1">
          <h2 className="text-lg sm:text-xl font-bold text-[#163A3A]">
            نسخ واستعادة كود التقدم (Backup Code)
          </h2>
          <p className="text-sm text-[#3B5A58]">
            انسخ كود تقدمك واحفظه لنقله إلى جهاز آخر أو لحمايته في حالة مسح
            بيانات المتصفح.
          </p>
        </div>

        <div className="space-y-3">
          <button
            type="button"
            onClick={handleExportBackup}
            className="orchid-btn-primary"
          >
            <Copy className="w-4 h-4 shrink-0" />
            <span>نسخ كود التقدم</span>
          </button>

          {exportStatus && (
            <p role="status" className="text-sm font-bold text-[#006E5A]">
              {exportStatus}
            </p>
          )}

          {backupCode && (
            <textarea
              dir="ltr"
              readOnly
              value={backupCode}
              rows={3}
              aria-label="كود التقدم الاحتياطي"
              className="w-full rounded-xl border border-[#E2ECE9] bg-[#F6FAF9] p-3 font-mono text-xs text-[#163A3A] text-left"
            />
          )}
        </div>

        <div className="border-t border-[#E2ECE9] pt-4 space-y-3">
          <label
            htmlFor="import-backup-input"
            className="block text-sm font-bold text-[#163A3A]"
          >
            استعادة التقدم من كود محفوظ
          </label>
          <textarea
            id="import-backup-input"
            dir="ltr"
            value={importInput}
            onChange={(e) => setImportInput(e.target.value)}
            placeholder="SL1:..."
            rows={2}
            className="w-full rounded-xl border border-[#E2ECE9] bg-white p-3 font-mono text-xs text-[#163A3A] text-left"
          />
          <button
            type="button"
            onClick={handleImportBackup}
            className="orchid-btn-secondary"
          >
            <Upload className="w-4 h-4 text-[#006E5A] shrink-0" />
            <span>استعادة التقدم</span>
          </button>

          {importStatus && (
            <p
              role="status"
              className={`text-sm font-bold ${
                importStatus.kind === 'success'
                  ? 'text-[#006E5A]'
                  : 'text-[#B91C3C]'
              }`}
            >
              {importStatus.text}
            </p>
          )}
        </div>
      </section>

      {/* PWA Home-Screen Install Guide & Persistent Storage */}
      <section className="orchid-card p-5 sm:p-6 space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2.5">
            <Smartphone className="w-5 h-5 text-[#006E5A]" />
            <h2 className="text-lg font-bold text-[#163A3A]">
              تثبيت التطبيق على الشاشة الرئيسية (بدون إنترنت)
            </h2>
          </div>

          {persisted !== null && (
            <span className="inline-flex items-center gap-1.5 rounded-full bg-[#E5F1EE] px-3 py-1 text-xs font-bold text-[#006E5A]">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>
                {persisted
                  ? 'التخزين الدائم مفعّل ✓'
                  : 'يُنصح بالتثبيت لحماية البيانات'}
              </span>
            </span>
          )}
        </div>

        {installPrompt && (
          <button
            type="button"
            onClick={handleInstallPwa}
            className="orchid-btn-primary"
          >
            <Download className="w-4 h-4 shrink-0" />
            <span>تثبيت التطبيق الآن</span>
          </button>
        )}

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm">
          <div className="rounded-xl border border-[#E2ECE9] bg-[#F6FAF9] p-4 space-y-1.5">
            <h3 className="font-bold text-[#163A3A] flex items-center gap-2">
              <Share2 className="w-4 h-4 text-[#006E5A]" />
              <span>أجهزة iPhone / iPad (Safari)</span>
            </h3>
            <p className="text-xs sm:text-sm text-[#3B5A58]">
              اضغط زر <strong>المشاركة</strong> في أسفل المتصفح، ثم اختر{' '}
              <strong>«إضافة إلى الشاشة الرئيسية» (Add to Home Screen)</strong>
              لحماية تقدمك في IndexedDB ومنع مسحه بعد ٧ أيام.
            </p>
          </div>

          <div className="rounded-xl border border-[#E2ECE9] bg-[#F6FAF9] p-4 space-y-1.5">
            <h3 className="font-bold text-[#163A3A] flex items-center gap-2">
              <Download className="w-4 h-4 text-[#006E5A]" />
              <span>أجهزة Android (Chrome)</span>
            </h3>
            <p className="text-xs sm:text-sm text-[#3B5A58]">
              اضغط قائمة النقاط الثلاث <strong>⋮</strong> في أعلى Chrome، ثم اختر{' '}
              <strong>«تثبيت التطبيق» (Install App)</strong> ليفتح مثل أي
              تطبيق ويعمل أوفلاين.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
