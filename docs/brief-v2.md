# Self-learning platform — ICT, 3rd Prep, Term 1 (Egypt)
## Experience brief v2 (original, as supplied by the owner on 2026-11-16)

> Decisions made after this brief (e.g. "متعلم" instead of "طالب", accounts + sync) live in [brainstorm-log.md](brainstorm-log.md) and override this file where they conflict.
>
> ⚠️ **OUTDATED CURRICULUM (D15):** the official current textbook uses **Python**, not Visual Basic .NET. Section 5 (and VB-specific activities in section 8) is obsolete and will be rebuilt from the actual textbook.

This version replaces v1. The big change: lessons are built natively from reusable templates inspired by a Mindsmith reference export, plus NotebookLM additional sources per lesson. No iframes, no API, no account access needed.

## 1. The product in one sentence
A self-learning platform that helps Egyptian 3rd-prep students truly understand ICT Term 1 and feel like real programmers — through short lessons, hands-on activities, quick quizzes, and visible progress — instead of reading long boring PDFs.

## 2. Who it is for
- Students in الصف الثالث الإعدادي (around 14–15 years old), Egypt, Arabic curriculum.
- They mainly use a phone. The experience must feel great on a phone first, and also work well on a computer.
- They usually postpone ICT because it does not count toward the total grade, so the platform must make starting easy and finishing fast and satisfying.
- Language: all interface text and explanations in clear, simple Arabic (Egyptian-friendly, easy to read). Keep English technical terms in English next to the Arabic explanation, e.g. Problem Solving, Flowchart, Visual Basic .NET, IDE, Form, Control, Code Window, Event Handler. The whole interface reads right-to-left (RTL).

## 3. The promise to the student
- "Finish ICT Term 1 with understanding — one short lesson at a time."
- Every lesson takes about 7–10 minutes and teaches exactly one clear idea.
- After every idea, the student DOES something: answers, orders steps, builds, fixes, or tries — never just reads.
- The student always knows: where they are, what is next, and how much they have finished.

## 4. How content will be supplied
The owner will supply the content in labeled packs, one pack per lesson. No account access, password, API key, or sign-in to any service is needed. Never ask for credentials. If a pack is missing when building, use clear draft content following the template in section 6 and mark it as awaiting the owner's pack.

Each lesson pack has three parts, all labeled with the lesson number and title (e.g. "Lesson 1.1 — يعني إيه مشكلة؟"):

### Part A — Mindsmith web export: VISUAL REFERENCE ONLY
- A web export of a reference lesson built in Mindsmith. Use it ONLY to study the look and feel: how content is presented, how cards are shaped and spaced, how questions and interactive blocks feel, how a lesson flows from one block to the next.
- Do NOT copy Mindsmith's code, player, scripts, or assets. Rebuild the same spirit from scratch: same clarity, same card-like chunks, same friendly interactive feel, but original code, adapted to Arabic RTL, phone-first use, and this platform's progress system.
- Start with ONE reference lesson. Learn its patterns, then turn them into a small set of reusable lesson building blocks (explanation card, example card, try-it activity, quiz card, warning card, summary card). Every later lesson reuses those blocks.

### Part B — Lesson content (the main explanation)
- The main lesson text, rephrased in the owner's own simple words from the textbook and source material. Freshly written in simple words from the learning outcomes in section 5 — NOT copied word for word.
- Each lesson follows the template in section 6. Content must be easy to review and replace later, one clear place per lesson, without redesigning screens.

### Part C — NotebookLM additional sources
- Extra material generated from NotebookLM per lesson (textbook chapter, past exam questions, trusted articles). ADDITIONAL, not a replacement.
- Typically: short summary, FAQs, mind-map outline, key terms, audio overview notes. Each is a labeled extra source.
- Shown under a clearly labeled "Additional sources / مصادر إضافية" area, openable without leaving the lesson, type recognizable at a glance. The main lesson must make complete sense without the extras.
- The sources panel lists BOTH the main sources and the additional NotebookLM sources, each with a short label. References only.

## 5. Curriculum (Term 1 only)
### Chapter 1 — حل المشكلات (Problem Solving)
- 1.1 يعني إيه مشكلة؟ — explain what a problem is in daily life and in programming, with an example.
- 1.2 مراحل حل المشكلة — list and order the stages of solving a problem.
- 1.3 خرائط التدفق Flowchart — know the main flowchart symbols and what each means.
- 1.4 خرائط تدفق بسيطة + تكرار وتفرع — read a simple flowchart and follow branching and repetition.

### Chapter 2 — مقدمة لغة Visual Basic .NET
- 2.1 يعني إيه برمجة؟ وليه VB.NET؟ — explain what programming is and what VB.NET is used for.
- 2.2 البرمجة وذاكرة الكمبيوتر — understand simply how a program relates to computer memory.
- 2.3 إطار عمل .NET Framework — explain what the .NET Framework is and how it relates to Visual Basic.
- 2.4 جولة في بيئة التطوير IDE + أول مشروع — know the main IDE parts and the steps to create and save a new project.

### Chapter 3 — ضبط خصائص أدوات التحكم (Controls)
- 3.1 النموذج Form — know what a Form is and add a new Form to a project.
- 3.2 أدوات التحكم الأساسية — know Button, Label, TextBox, ListBox, RadioButton and their uses.
- 3.3 الخصائص Properties وكيف تضبطها — change common control properties and predict the on-screen change.

### Chapter 4 — نافذة الكود (Code Window)
- 4.1 نافذة الكود Code Window — know what the Code Window is and where code is written.
- 4.2 معالج الحدث Event Handler — explain event and event handler with an example (clicking a button).
- 4.3 اكتب أول كود وشغّله — follow a tiny first program step by step and explain each line.

Final skill check: identify problem-solving stages, recognize IDE parts, add a Form, use controls, the Code Window and an Event Handler, and create and save a VB.NET project.

## 6. Lesson template (every lesson)
1. One-line goal: "After this lesson you will be able to…"
2. Hook: a short daily-life example or tiny story before any definition.
3. Short explanation in small card-style chunks, one idea per chunk, visuals where helpful.
4. Try it yourself: one small interactive activity inside the lesson.
5. Quick check: 2–4 short questions (MCQ / true-false / order) with immediate feedback + one-sentence why.
6. Common mistake: one "watch out" box.
7. One-paragraph summary.
8. Additional sources: NotebookLM items, labeled, openable in-lesson.
9. Sources: main + additional, references only.
10. Clear next step: big button to next lesson or chapter quiz.

## 7. Screens and journey
1. Home: greeting, big "Continue where you stopped", today's small goal, 4 chapters as a visual path with progress.
2. Chapter screen: lessons in order with title, minutes, status; locked lessons visible with unlock hint.
3. Lesson screen: template above, in-lesson progress bar, chunk by chunk, phone-readable, big touch targets.
4. Chapter quiz: score, wrong answers with explanations, "review the weak lesson".
5. Flashcards & review: term/explanation, "I know it" / "review again" (review-again first next round).
6. Exam mode: timed mixed quiz over finished chapters; report with score, strongest/weakest chapter, lessons to review.
7. Progress: finished items, streak, XP, badges, per-chapter bars.
8. Sources panel: from every lesson, read-only.

Never feel lost: one obvious main action per screen; always clear how to go back, continue, or go home.

## 8. Interactive activities
- Order the steps (problem-solving stages).
- Flowchart builder (arrange symbols for a tiny everyday problem).
- IDE explorer (tap parts of an illustrated IDE).
- Properties playground (change text/color/size, see it live).
- Fix the code (one clear mistake, fix, see result).
- Spot the mistake (choose the wrong statement, one-sentence why).

Instant friendly feedback; retry without punishment; a wrong answer is a hint, never a dead end.

## 9. Motivation (calm gamification)
XP; daily streak (1 lesson/day); badges (first lesson, first chapter, first perfect quiz, 3-day streak, all Term 1); visual path like game levels but calm; progress saved and resumable.

## 10. Design feel
Modern, fresh, energetic but not childish; card-like rhythm from the reference rebuilt originally; clean and calm; strong contrast, large Arabic text, big buttons; visuals that explain; consistent everywhere.

## 11. Scope for first build
- Study the reference export, build reusable blocks + full journey with Chapter 1 complete (4 lessons + chapter quiz + flashcards + activities + additional sources).
- Chapters 2–4 exist in the path with real titles and template structure; draft content if practical.
- Exam mode and Progress work for whatever is finished.
- Content replaceable in one clear place per lesson; new NotebookLM sources addable without layout changes.

## 12. Success
Understand what to do in 10 seconds on a phone; finish a lesson in 7–10 minutes with an activity, quick check, an opened extra source, and visible progress; find weak points and jump to the fixing lesson; no dead ends; feels like a good app, not a document.

## 13. Freedom
Technical approach is the builder's choice. When unclear, choose what is simplest and clearest for a 14-year-old. No account, password, or external service access will be requested.
