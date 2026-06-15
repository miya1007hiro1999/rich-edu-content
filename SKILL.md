---
name: rich-edu-content
description: >
  Build rich, interactive educational content — courses, bootcamps, tutorials,
  training apps, lesson pages — using a proven "one concept per page + interactive
  widget" methodology (extracted from the 7days-bootcamp project). Use this skill
  whenever the user wants to create or extend 教材 / カリキュラム / 講座 / learning
  content / a bootcamp / a tutorial / onboarding material, in ANY subject (web dev,
  AI, sales, design, cooking, finance...), even if they only say "教材を作って",
  "レッスンを追加して", "この内容を学べるページにして", or "make this teachable".
  Also use it when the user complains that existing learning content is
  "わかりにくい" / "文字ばかり" / "もっとリッチにして" — that is a request to apply
  this skill's enrichment pass.
---

# Rich Educational Content Builder

<!--
  NOTE ON LANGUAGE:
  - This SKILL.md is written in English (instructions for the model).
  - ALL learner-facing output is Japanese by default: lesson text, UI labels,
    widget captions, button labels, error-message explanations, summaries.
  - Code identifiers (variables, types, file names) stay in English.
  - Comments inside generated code may be Japanese — match the project's
    existing convention (the reference project uses Japanese comments).
  - If the user asks for another output language, that overrides the default.
-->

## Core philosophy (read this before anything else)

This skill encodes one big idea: **a learner should never face a wall of text.**

"Poor text" tells. "Rich text" shows, lets the learner touch, and only then asks
them to act. Every learning unit must answer three questions:

1. **See it** — Is there a visual (diagram, rendered result, comparison) that
   makes the concept obvious before any explanation is read?
2. **Touch it** — Can the learner manipulate something (slider, toggle, chips,
   simulated tool) and watch the output change in real time?
3. **Do it** — Is there a concrete, small task they perform themselves at the end?

If a lesson only has paragraphs and bullet lists, it is not done yet.

Second big idea: **one concept per page** (Progate style). A page that teaches
"headings, paragraphs, links AND images" is four pages pretending to be one.
Split aggressively. Small pages give learners frequent completion checkmarks,
which is the engine of motivation for beginners.

Third big idea: **a running theme project.** Every example in a course should
build toward one concrete artifact the learner cares about (the reference
project used "a local café's landing page" for all 7 days). Pick the theme
during curriculum design and never break it.

## Workflow

### Step 0 — Determine the mode

- **New course/app** → do Steps 1–5 in order.
- **Adding lessons to an existing course** → read the existing block model and
  widget registry first, then do Steps 3–5 matching existing conventions.
- **Enrichment pass ("もっとリッチに")** → audit existing lessons against the
  See/Touch/Do test, then do Steps 4–5 on the failing lessons.

### Step 1 — Design the curriculum tree (before writing any content)

Build a 3-tier hierarchy and get user confirmation on it:

```
Course
└── Day / Module (大項目)  — a theme + a goal sentence ("〜できるようになる")
    ├── Step (中項目)      — a skill cluster, 3–9 lessons
    │   └── Lesson (小項目) — ONE concept, one page, 2–5 min of reading
    └── Test part (テスト)  — 📝 確認テスト + 🚀 実践テスト (see Step 3.5)
```

Rules of thumb:
- A lesson teaching a list of N things should usually be N lessons.
- Every Step ends with a まとめ (summary) lesson: bullets + 復習チェック Q&A.
- Concepts must be introduced before they are used. Never write an exercise
  that assumes a tag/term/tool the learner hasn't met yet (this was the most
  common reviewer complaint in the reference project).

### Step 2 — Scaffold the app (new course only)

Default stack: Next.js (App Router) + TypeScript + Tailwind, data-driven.
Read `references/app-scaffold.md` for the full architecture (sidebar tree,
progress hook, login, admin). Copy `templates/block-types.ts` as the starting
content model.

### Step 3 — Write each lesson as blocks

Lessons are data, not JSX. Compose them from the block vocabulary in
`templates/block-types.ts`. The standard lesson skeleton:

```
phase 📖学ぶ
  → text (1–3 short paragraphs, conversational Japanese)
  → ONE visual: widget / codePreview / annotatedExample / table / flow
  → tip (the "aha" framing, e.g. "エラー文は怖い英語ではなくヒントの宝庫")
phase ✍️やってみよう
  → task (2–4 concrete actions) or twoTier (基本 + AI活用)
  → warning only if there's a real trap
```

Detailed writing rules (tone, sentence length, beginner empathy, AI-era
framing like the sandwich prompt structure) are in
`references/lesson-writing.md` — read it before writing lesson copy.

### Step 3.5 — Add the assessment layer (learn → quiz → practice)

Each Day/Module ends with a gated test part. The gating is the pedagogy:
finishing lessons *earns* the right to be tested, and passing the quiz *earns*
the real-world assignment. Locks turn the course from "reading" into a game.

```
all lessons of the Day completed
  → unlocks 📝 確認テスト  (multiple-choice quiz, 4–6 questions,
                            instant feedback + explanation per question,
                            pass at 80%, retry freely)
  → passing unlocks 🚀 実践テスト (hands-on assignment in the learner's own
                            environment: 3–5 concrete tasks as a self-check
                            list, all checked → self-declared pass,
                            plus an aiHint prompt for when they get stuck)
```

Quiz-writing rules:
- Derive questions from the Day's 復習チェック Q&A — test what was taught,
  nothing else.
- Wrong choices should be *plausible misconceptions* (e.g. margin vs padding),
  not jokes; one obviously-silly distractor per question is fine for relief.
- The explanation shown after answering is a mini-lesson — write it so a
  learner who guessed wrong still walks away corrected, not just scored.
- 実践テスト tasks reuse the running theme project and bridge to the real
  world ("now do it on YOUR page"), mirroring the simulation→real pattern.

Show locked states explicitly in the UI (🔒 + "あと N レッスン") — visible
locked doors motivate more than hidden ones. The last lesson's CTA should
flow straight into the quiz（「完了して確認テストへ ✓」）.

**Estimated-time badges (⏱ 目安).** Learners need to plan, so give every Day
(and each test) a time estimate and show it as a badge — on the Day card, the
Day hero (with a lessons/check/practice breakdown), and each test header. Also
surface a course total and a "1日 ◯◯ ペース if you finish in N days" line on
the overview. Calibration that has worked: estimate per band (beginner vs.
slightly-experienced), then publish the *average with a little headroom so
~85% of people finish within it* — not the optimistic median. Hands-on
practice tests run longer and vary more than lesson reading, so weight them
heavier. Keep a single `formatMinutes()` helper (約X時間Y分 / 約X分) and a
`dayTotalMinutes()` so every surface reads the same numbers. Pair the badges
with a reassuring note that a slower multi-week pace is fine — the number is a
guide, not a deadline.

### Step 4 — Add interactivity (the part that makes it "rich")

Every non-summary lesson gets at least one visual block; every Step gets at
least one *interactive* widget. Choose from the six archetypes — read
`references/widget-patterns.md` to pick and implement:

| Archetype | Use when teaching... | Reference example |
|---|---|---|
| Parameter playground | a setting/property with continuous values | font-size sliders → live text |
| Builder / composer | "good X = these ingredients" | prompt parts ON/OFF → quality meter |
| Anatomy diagram | a tool's UI or a syntax's parts | labeled VSCode screenshot in SVG |
| Tool simulation | a scary real tool (DevTools, terminal, deploy) | fake Chrome + guided 4-step debug |
| Gallery / comparison | taste, styles, good-vs-bad | 6 CSS design trends, contrast demo |
| Persistent checklist | final QA / self-assessment | localStorage checklist with 🎉 |

The tool-simulation archetype is the highest-value one: beginners freeze when
told to open a real tool. Give them a pixel-faithful mock with numbered step
chips (①→②→③→④) that tick off as they interact, THEN send them to the real
thing. Start from `templates/widget-skeleton.tsx`.

### Step 5 — Verify like a learner, then ship

1. `npm run build` must pass (run from the project directory).
2. Open the preview and actually click through the new lessons: do the widgets
   respond, does completion tracking work, does prev/next navigation flow?
3. Re-run the See/Touch/Do test on each new lesson.
4. Deploy if the project has a deploy step (reference project: `npx vercel --prod`).

## Output format

- **Content**: TypeScript data files (curriculum array of typed blocks).
- **Widgets**: React client components in one registry file, each wrapped in a
  shared `WidgetFrame` (title bar + body + caption) so the visual language is
  uniform across the whole course.
- **Naming**: lesson ids like `s7-l3` (step 7, lesson 3); widget names in
  camelCase registered in a single union type so typos fail the build.
- **Language**: learner-facing strings in Japanese (です/ます調, friendly but
  not childish). See `references/lesson-writing.md`.

## Quality checklist (run before declaring done)

- [ ] Every lesson passes See / Touch / Do (Touch may live at Step level).
- [ ] No lesson uses a concept introduced later.
- [ ] No lesson is longer than ~5 minutes of reading.
- [ ] All examples use the course's single running theme.
- [ ] Interactive widgets give instant feedback (<100ms perceived) and have a
      caption explaining what to notice.
- [ ] Summary lesson per Step with 復習チェック.
- [ ] Every Day has 確認テスト (gated by lessons) + 実践テスト (gated by quiz),
      every quiz question covers taught material only, and progress counters
      include tests (e.g. "14/16" = 14 lessons + 2 tests).
- [ ] Gating actually works: tests locked → complete lessons → quiz unlocks →
      pass → practice unlocks (click through this in preview).
- [ ] Every Day + each test shows a ⏱ time estimate, the overview shows a
      course total + per-day pace, and all surfaces use one formatMinutes /
      dayTotalMinutes helper so the numbers never disagree.
- [ ] Build passes; clicked through in preview; no console errors.

## Bundled resources

- `templates/block-types.ts` — the block content model (copy into new projects)
- `templates/widget-skeleton.tsx` — WidgetFrame + one example of each common pattern
- `templates/lesson-example.ts` — a complete, real lesson in block form
- `references/lesson-writing.md` — Japanese copywriting rules + beginner empathy rules
- `references/widget-patterns.md` — the six widget archetypes in implementation detail
- `references/app-scaffold.md` — full app architecture for new courses
- `examples/sample-request-to-output.md` — worked example: user request → finished lesson
