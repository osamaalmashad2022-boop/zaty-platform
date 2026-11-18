// @vitest-environment jsdom
import '@testing-library/jest-dom/vitest';
import fs from 'node:fs';
import path from 'node:path';
import { cleanup, fireEvent, render, screen, waitFor } from '@testing-library/react';
import { afterEach, describe, expect, it, vi } from 'vitest';
import * as skulptRunner from '@/lib/python/skulptRunner';
import { CodeLabBlock } from '../CodeLabBlock';
import { HeroHookBlock } from '../HeroHookBlock';
import { InteractiveSimBlock } from '../InteractiveSimBlock';
import { PredictOutputBlock } from '../PredictOutputBlock';
import { SpotBugBlock } from '../SpotBugBlock';

describe('New anti-boredom interactive blocks and upgrades', () => {
  afterEach(() => {
    cleanup();
    vi.restoreAllMocks();
  });

  it('renders HeroHookBlock starterChallenge with 1-tap feedback and stays backwards compatible when omitted', () => {
    const { unmount } = render(
      <HeroHookBlock
        data={{
          title: 'درس تمهيدي',
          durationMin: 6,
          goal: 'تفهم الفكرة',
          hook: 'سؤال يومي بسيط',
        }}
      />,
    );
    expect(screen.queryByText(/تحدي البداية السريع/)).not.toBeInTheDocument();
    unmount();

    const onAttempt = vi.fn();
    const onComplete = vi.fn();
    render(
      <HeroHookBlock
        blockId="hero-1"
        onAttempt={onAttempt}
        onComplete={onComplete}
        data={{
          title: 'تخمين المخرجات',
          durationMin: 7,
          goal: 'تتوقع ناتج input()',
          hook: 'لو أدخلت 5 و 3 في جمع نصي، إيه الناتج؟',
          starterChallenge: {
            prompt: 'تخمينك السريع:',
            options: [
              { id: 'a', text: '8', isCorrect: false, feedback: 'input() بترجع نص مش رقم!' },
              { id: 'b', text: '53', isCorrect: true, feedback: 'ممتاز! دمج النصوص بيلزقهم جنب بعض.' },
            ],
            revealNote: 'علشان تجمع كأرقام لازم تحوّل بـ int().',
          },
        }}
      />,
    );

    expect(screen.getByText(/تحدي البداية السريع/)).toBeInTheDocument();
    fireEvent.click(screen.getByRole('button', { name: '53' }));
    expect(screen.getByText(/ممتاز! دمج النصوص بيلزقهم جنب بعض\./)).toBeInTheDocument();
    expect(screen.getByText(/علشان تجمع كأرقام لازم تحوّل بـ int\(\)\./)).toBeInTheDocument();
    expect(onAttempt).toHaveBeenCalledWith({ isCorrect: true, attemptNumber: 1 });
    expect(onComplete).toHaveBeenCalledWith(true);
  });

  it('enforces predict-before-run in PredictOutputBlock and runs Skulpt to reveal truth', async () => {
    const runSpy = vi.spyOn(skulptRunner, 'runPython').mockResolvedValueOnce({
      ok: true,
      stdout: '53\n',
      durationMs: 10,
    });

    const onAttempt = vi.fn();
    const onComplete = vi.fn();

    render(
      <PredictOutputBlock
        blockId="po-1"
        onAttempt={onAttempt}
        onComplete={onComplete}
        data={{
          title: 'توقّع قبل التشغيل',
          prompt: 'لو أدخلنا 5 ثم 3، هيطبع إيه؟',
          code: 'a = input()\nb = input()\nprint(a + b)',
          stdin: ['5', '3'],
          options: [
            { id: 'o1', text: '8', isCorrect: false, feedback: 'ده لو كان في int() حول input().' },
            { id: 'o2', text: '53', isCorrect: true, feedback: 'صحيح! الجمع بين نصين بيدمجهم.' },
          ],
          explanation: 'دالة input() ترجع نص دائمًا ما لم نحوله بـ int().',
        }}
      />,
    );

    const runBtn = screen.getByRole('button', { name: /شغّل الكود واكتشف الحقيقة/ });
    expect(runBtn).toBeDisabled();

    fireEvent.click(screen.getByRole('button', { name: '8' }));
    expect(runBtn).toBeEnabled();
    expect(onComplete).not.toHaveBeenCalled();

    fireEvent.click(runBtn);

    await waitFor(() => expect(runSpy).toHaveBeenCalledTimes(1));
    expect(screen.getByText('النتيجة الفعلية من بايثون')).toBeInTheDocument();
    expect(document.querySelector('pre')).toHaveTextContent('53');
    expect(screen.getByText(/ده لو كان في int\(\) حول input\(\)\./)).toBeInTheDocument();
    expect(screen.getByText(/دالة input\(\) ترجع نص دائمًا/)).toBeInTheDocument();
    expect(onAttempt).toHaveBeenCalledWith({ isCorrect: false, attemptNumber: 1 });
    expect(onComplete).toHaveBeenCalledWith(false);
  });

  it('supports non-runnable scenario mode in PredictOutputBlock cleanly', () => {
    const onComplete = vi.fn();
    render(
      <PredictOutputBlock
        onComplete={onComplete}
        data={{
          prompt: 'إيه المتوقع في خطوات التحليل؟',
          scenario: 'عندك مشكلة كبيرة في جدول المدرسة.',
          runnable: false,
          expectedOutput: 'تقسيم المشكلة لـ 3 خطوات صغيرة',
          options: [
            { id: 'p1', text: 'كتابة الكود فورًا', isCorrect: false, feedback: 'التسرع يسبب أخطاء.' },
            { id: 'p2', text: 'تقسيمها لأجزاء', isCorrect: true, feedback: 'ده التفكيك الصحيح!' },
          ],
          explanation: 'التفكيك يبدأ بتقسيم المشكلة قبل كتابة أي سطر.',
        }}
      />,
    );

    fireEvent.click(screen.getByRole('button', { name: 'تقسيمها لأجزاء' }));
    fireEvent.click(screen.getByRole('button', { name: /اكشف الإجابة والتفسير/ }));
    expect(screen.getByText('تقسيم المشكلة لـ 3 خطوات صغيرة')).toBeInTheDocument();
    expect(onComplete).toHaveBeenCalledWith(true);
  });

  it('lets learners tap lines directly in SpotBugBlock (code and steps modes) with diagnostic feedback', () => {
    const onAttempt = vi.fn();
    const onComplete = vi.fn();

    const { unmount } = render(
      <SpotBugBlock
        blockId="sb-code"
        onAttempt={onAttempt}
        onComplete={onComplete}
        data={{
          mode: 'code',
          prompt: 'اضغط على السطر اللي فيه خطأ في الفهرسة:',
          codeLines: [
            'name = "Zaty"',
            'print(name[1])  # نريد الحرف الأول',
          ],
          lineFeedback: {
            1: 'تعريف النص سليم 100%.',
          },
          bugLine: 2,
          fixedLine: 'print(name[0])',
          fixExplanation: 'الفهرسة في بايثون تبدأ من 0 وليس 1.',
        }}
      />,
    );

    fireEvent.click(screen.getByRole('button', { name: /فحص السطر 1/ }));
    expect(screen.getByText('تعريف النص سليم 100%.')).toBeInTheDocument();
    expect(onAttempt).toHaveBeenCalledWith({
      isCorrect: false,
      attemptNumber: 1,
      errorKind: 'wrong_bug_line',
    });
    expect(onComplete).not.toHaveBeenCalled();

    fireEvent.click(screen.getByRole('button', { name: /فحص السطر 2/ }));
    expect(screen.getByText('الخطأ هنا!')).toBeInTheDocument();
    expect(screen.getByText(/الفهرسة في بايثون تبدأ من 0/)).toBeInTheDocument();
    expect(onComplete).toHaveBeenCalledWith(true);
    unmount();

    const onStepComplete = vi.fn();
    render(
      <SpotBugBlock
        blockId="sb-steps"
        onComplete={onStepComplete}
        data={{
          mode: 'steps',
          prompt: 'أي خطوة ترتيبها غلط؟',
          items: [
            { id: 's1', text: 'إدخال البطاقة', wrongFeedback: 'البداية بالإدخال منطقية.' },
            { id: 's2', text: 'طباعة التذكرة قبل الدفع' },
          ],
          bugItemId: 's2',
          fixedLine: 'الدفع أولًا ثم طباعة التذكرة',
          fixExplanation: 'لازم نتحقق من الدفع قبل إصدار التذكرة.',
        }}
      />,
    );

    fireEvent.click(screen.getByRole('button', { name: /إدخال البطاقة/ }));
    expect(screen.getByText('البداية بالإدخال منطقية.')).toBeInTheDocument();
    expect(onStepComplete).not.toHaveBeenCalled();

    fireEvent.click(screen.getByRole('button', { name: /طباعة التذكرة قبل الدفع/ }));
    expect(screen.getByText('الدفع أولًا ثم طباعة التذكرة')).toBeInTheDocument();
    expect(onStepComplete).toHaveBeenCalledWith(true);
  });

  it('runs all 3 InteractiveSimBlock modes: linearModel, trapDetector, and gansArena', () => {
    // 1. linearModel
    const onLinearComplete = vi.fn();
    const { unmount: unmountLinear } = render(
      <InteractiveSimBlock
        onComplete={onLinearComplete}
        data={{
          mode: 'linearModel',
          prompt: 'اضبط النموذج ليصل إلى الدرجة المستهدفة:',
          initialX: 4,
          initialW: 10,
          initialB: 10,
          stepB: 5,
          targetChallenge: {
            prompt: 'اجعل الدرجة المتوقعة = 60',
            targetY: 60,
            lockX: 4,
            successFeedback: 'برافو! المعادلة حققت 60 بالظبط.',
          },
        }}
      />,
    );

    // Initially y = 10 * 4 + 10 = 50 -> check should fail
    fireEvent.click(screen.getByRole('button', { name: 'تحقق من النموذج' }));
    expect(screen.getByText(/لسه أقل من الهدف \(60\)/)).toBeInTheDocument();
    expect(onLinearComplete).not.toHaveBeenCalled();

    // Increase bias (b) by +5 twice -> 10 -> 15 -> 20 => y = 10*4 + 20 = 60
    const incB = screen.getByRole('button', { name: /زيادة الانحياز/ });
    fireEvent.click(incB);
    fireEvent.click(incB);
    fireEvent.click(screen.getByRole('button', { name: 'تحقق من النموذج' }));
    expect(screen.getByText('برافو! المعادلة حققت 60 بالظبط.')).toBeInTheDocument();
    expect(onLinearComplete).toHaveBeenCalledWith(true);
    unmountLinear();

    // 2. trapDetector
    const onTrapAttempt = vi.fn();
    const onTrapComplete = vi.fn();
    const { unmount: unmountTrap } = render(
      <InteractiveSimBlock
        onAttempt={onTrapAttempt}
        onComplete={onTrapComplete}
        data={{
          mode: 'trapDetector',
          scene: 'gamePopup',
          prompt: 'اضغط على العناصر المخادعة في النافذة:',
          cardTitle: 'عرض أسطوري!',
          items: [
            { id: 't1', label: 'باقي 30 ثانية وينتهي العرض!', isTrap: true, clueAr: 'ده استعجال كاذب (FOMO).', trapTag: 'FOMO' },
            { id: 't2', label: 'الوضع التدريبي المجاني', isTrap: false, clueAr: 'ده وضع آمن للتجربة.' },
            { id: 't3', label: 'صندوق مفاجآت غامض', isTrap: true, clueAr: 'مكافأة عشوائية للإدمان.', trapTag: 'Loot Box' },
          ],
        }}
      />,
    );

    expect(screen.getByText('كشفت 0 من 2 فخ')).toBeInTheDocument();
    fireEvent.click(screen.getByRole('button', { name: /الوضع التدريبي المجاني/ }));
    expect(screen.getByText('ده وضع آمن للتجربة.')).toBeInTheDocument();
    expect(onTrapAttempt).toHaveBeenCalledWith({
      isCorrect: false,
      attemptNumber: 1,
      errorKind: 'false_positive_safe_item',
    });
    expect(onTrapComplete).not.toHaveBeenCalled();

    fireEvent.click(screen.getByRole('button', { name: /باقي 30 ثانية/ }));
    expect(screen.getByText('كشفت 1 من 2 فخ')).toBeInTheDocument();
    expect(onTrapComplete).not.toHaveBeenCalled();

    fireEvent.click(screen.getByRole('button', { name: /صندوق مفاجآت غامض/ }));
    expect(screen.getByText('كشفت 2 من 2 فخ')).toBeInTheDocument();
    expect(onTrapComplete).toHaveBeenCalledWith(true);
    unmountTrap();

    // 3. gansArena
    const onGanComplete = vi.fn();
    render(
      <InteractiveSimBlock
        onComplete={onGanComplete}
        data={{
          mode: 'gansArena',
          prompt: 'تقمص دور المحقق وكافح التزييف:',
          rounds: [
            {
              id: 'r1',
              roundNumber: 1,
              generatorOutput: 'صورة فيها 6 أصابع في اليد',
              realismScore: 30,
              fooledDiscriminator: false,
              feedbackCorrect: 'دقيق! العيب التشريحي كشفها.',
              feedbackWrong: 'ركز في الأصابع!',
            },
            {
              id: 'r2',
              roundNumber: 2,
              generatorOutput: 'بورتريه واقعي بإضاءة متناسقة',
              realismScore: 92,
              fooledDiscriminator: true,
              feedbackCorrect: 'صح! كده المولّد اتعلم يخدع المحقق.',
              feedbackWrong: 'المولّد تطور جدًا في الجولة دي.',
            },
          ],
        }}
      />,
    );

    expect(screen.getByText('الجولة 1 من 2')).toBeInTheDocument();
    fireEvent.click(screen.getByRole('button', { name: /مكشوف — فيه عيب واضح/ }));
    expect(screen.getByText('دقيق! العيب التشريحي كشفها.')).toBeInTheDocument();
    expect(onGanComplete).not.toHaveBeenCalled();

    fireEvent.click(screen.getByRole('button', { name: 'الجولة التالية' }));
    expect(screen.getByText('الجولة 2 من 2')).toBeInTheDocument();
    fireEvent.click(screen.getByRole('button', { name: /مقنع — خدع المحقّق!/ }));
    expect(screen.getByText('صح! كده المولّد اتعلم يخدع المحقق.')).toBeInTheDocument();
    expect(onGanComplete).toHaveBeenCalledWith(true);
  });

  it('upgrades CodeLabBlock with Arabic fill markers, cascading hints, and quickChips insertion', () => {
    render(
      <CodeLabBlock
        data={{
          mode: 'fillLine',
          prompt: 'أكمل الشرط التالي:',
          starterCode: 'score = 75\nif ___:\n    # اطبع النتيجة\n    print("ناجح")',
          solutionCode: 'score = 75\nif score >= 50:\n    print("ناجح")',
          checks: [],
          hint: 'قارن score بالرقم 50',
          hints: [
            'حدد أولًا متى يعتبر المتعلم ناجحًا.',
            'استخدم معامل المقارنة >= مع المتغير score.',
            'اكتب score >= 50 مكان ___',
          ],
          quickChips: ['score >= 50', 'score < 50'],
        }}
      />,
    );

    // Fill marker helper & line location shown cleanly
    expect(screen.getByText(/موضع الإكمال في الكود: سطر 2 ، سطر 3/)).toBeInTheDocument();

    // Cascading 3-level hint flow
    fireEvent.click(screen.getByRole('button', { name: 'تلميح ١ من ٣' }));
    expect(screen.getByText(/حدد أولًا متى يعتبر المتعلم ناجحًا\./)).toBeInTheDocument();
    expect(screen.queryByText(/استخدم معامل المقارنة >=/)).not.toBeInTheDocument();

    fireEvent.click(screen.getByRole('button', { name: 'تلميح ٢ من ٣' }));
    expect(screen.getByText(/استخدم معامل المقارنة >=/)).toBeInTheDocument();

    fireEvent.click(screen.getByRole('button', { name: 'تلميح ٣ من ٣' }));
    expect(screen.getByText(/اكتب score >= 50 مكان ___/)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'إخفاء التلميحات' })).toBeInTheDocument();

    // Quick chip replaces ___ directly without requiring textarea focus
    fireEvent.click(screen.getByRole('button', { name: 'score >= 50' }));
    const editor = screen.getByLabelText('محرر كود Python') as HTMLTextAreaElement;
    expect(editor.value).toContain('if score >= 50:');
    expect(editor.value).not.toContain('___');
  });

  it('matches Arabic fill markers like # اكتب and TODO even when ___ is absent', () => {
    render(
      <CodeLabBlock
        data={{
          mode: 'fillLine',
          prompt: 'أكمل الكود',
          starterCode: '# اكتب كود الترحيب هنا\nprint("hi")',
          solutionCode: 'print("hi")',
          checks: [],
          hint: 'اطبع رسالة',
        }}
      />,
    );

    expect(screen.getByText(/موضع الإكمال في الكود: سطر 1/)).toBeInTheDocument();
  });

  it('replaces multiple sequential ___ placeholders via quickChips even when textarea stays focused (iOS Safari)', async () => {
    render(
      <CodeLabBlock
        data={{
          mode: 'fillLine',
          prompt: 'أكمل الطباعة وإنهاء الحلقة:',
          starterCode: 'while True:\n    try:\n        age = int(input())\n        ___\n        ___\n    except ValueError:\n        pass',
          solutionCode: 'while True:\n    try:\n        age = int(input())\n        print("Your age is:", age)\n        break\n    except ValueError:\n        pass',
          checks: [],
          hint: 'اطبع العمر ثم break',
          quickChips: ['print("Your age is:", age)', 'break', 'continue'],
        }}
      />,
    );

    const editor = screen.getByLabelText('محرر كود Python') as HTMLTextAreaElement;
    // Simulate focused textarea on iOS Safari where tapping a button does not blur the editor
    editor.focus();
    editor.setSelectionRange(0, 0);

    fireEvent.click(screen.getByRole('button', { name: 'print("Your age is:", age)' }));
    await waitFor(() => {
      expect(editor.value).toContain('        print("Your age is:", age)\n        ___');
    });

    // Wait a frame (like rAF) and ensure editor remains focused before second chip tap
    await new Promise((resolve) => setTimeout(resolve, 20));
    editor.focus();

    fireEvent.click(screen.getByRole('button', { name: 'break' }));
    await waitFor(() => {
      expect(editor.value).toContain('        print("Your age is:", age)\n        break');
    });
    expect(editor.value).not.toContain('___');
  });

  it('never contains forbidden word "طالب" in any new block component', () => {
    const files = [
      'HeroHookBlock.tsx',
      'PredictOutputBlock.tsx',
      'SpotBugBlock.tsx',
      'InteractiveSimBlock.tsx',
      'CodeLabBlock.tsx',
      'FlipCardsBlock.tsx',
    ];
    for (const file of files) {
      const content = fs.readFileSync(
        path.resolve(process.cwd(), 'src/components/blocks', file),
        'utf8',
      );
      expect(content, `Forbidden word found in ${file}`).not.toMatch(/(?:ال)?طالب/);
    }
  });
});
