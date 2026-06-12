# App Scaffold (for a brand-new course app)

<!-- Architecture extracted from the 7days-bootcamp project. Reuse the shape,
     not necessarily the code. Stack: Next.js App Router + TypeScript +
     Tailwind. Everything is client-side (localStorage) until the user asks
     for real auth/DB — don't add a backend speculatively. -->

## File layout

```
src/
├── app/
│   ├── page.tsx            # renders <AppShell/>
│   ├── layout.tsx          # metadata.title = course name
│   └── admin/page.tsx      # password-gated progress viewer (optional)
├── data/
│   ├── types.ts            # Block / Lesson / Step / Day types (copy from templates/block-types.ts)
│   ├── curriculum.ts       # ALL content lives here as data
│   └── siteConfig.ts       # title, subtitle, lineUrl, surveyUrl, adminPassword
├── components/
│   ├── AppShell.tsx        # view state machine: overview | day | lesson | survey
│   ├── Sidebar.tsx         # 3-tier tree nav + progress counters + logout
│   ├── DayPage.tsx         # day hero (goal, progress bar, 続きから始める) + step/lesson list
│   ├── LessonPage.tsx      # breadcrumb + blocks + 完了して次へ進む
│   ├── BlockRenderer.tsx   # switch over Block["type"]
│   ├── LearningWidgets.tsx # WidgetFrame + all widgets + REGISTRY
│   ├── TestPages.tsx       # CheckTestPage (MCQ quiz) + PracticeTestPage + LockedScreen
│   └── LoginScreen.tsx     # name-only "login" (identity, not security)
└── hooks/
    └── useProgress.ts      # localStorage progress state
```

## Key design decisions and why

- **Content as data, rendering as one switch.** Writers (or this skill) touch
  only `curriculum.ts`; adding a block type means one type-union member + one
  renderer case. This is what makes mass production reliable.
- **Lesson-level completion, flat lesson array.** `allLessons` (flattened in
  curriculum order) drives prev/next navigation and percentage math. Completion
  is a `string[]` of lesson ids in localStorage (versioned key, e.g.
  `<course>_progress_v2` — bump the suffix on breaking shape changes; when only
  *adding* fields, keep the key and rely on `{ ...initialState, ...parsed }`
  defaults so existing learners keep their progress).
- **Test gating (learn → quiz → practice).** Progress state also holds
  `passedCheckTests: number[]` and `passedPracticeTests: number[]` (day
  numbers). The view state machine gets `checkTest` / `practiceTest` views.
  Three places enforce/show the gate, all driven by the same booleans:
  1. DayPage: two test cards after the step list — 🔒ロック中 (with "あと N
     レッスン") / 挑戦できます！ / ✓合格済み.
  2. Sidebar: 📝/🚀 rows under each expanded day, disabled+🔒 until unlocked;
     day counter counts lessons+2 (e.g. "16/16").
  3. The test pages themselves render a LockedScreen if reached while locked
     (don't rely on disabled buttons alone).
  The last lesson of a day flows into the quiz: its CTA becomes
  「完了して確認テストへ ✓」 instead of jumping to the next day.
  Quiz UX: one question at a time, answer → instant ⭕/❌ + explanation →
  next; pass at ≥80%, retry resets freely; passing reveals "実践テストへ進む".
  Practice UX: self-check task list, all checked enables 「合格にする」, pass
  screen links to the next day (or the survey on the final day).
- **Completion rate includes tests.** Denominator = total lessons +
  2 × number of days, in the hook, the day page, and the admin page alike.
- **Name-only login.** `registerStudent(name)` → stored in the same progress
  object. `logout()` clears only the name, keeping progress, so re-login
  restores everything. It exists for personalization and the admin view, and
  it costs zero backend.
- **Sidebar = the curriculum tree.** Day rows show `done/total`; expanding a
  day shows Step labels and lesson rows with ✓ circles; the active lesson is
  highlighted. The sidebar is the learner's mental map — invest in it.
- **DayPage "続きから始める →"** jumps to the first incomplete lesson. Small
  feature, large retention effect.
- **LessonPage CTA is "完了して次へ進む ✓"** (one button = mark done + advance).
  Also provide the quiet alternatives: 完了マークだけつける / 取り消す.
- **Support links**: a floating LINE (or chat) FAB on every page, and a survey
  view embedding a Google Form via iframe URL in siteConfig.
- **Admin page**: sessionStorage password from siteConfig, renders the same
  progress data as a per-day grid. Client-side only — it's a convenience, and
  say so if the user asks about security.

## Verify & deploy

- Build from the project dir: `cd <project> && npm run build` (running npm from
  the wrong cwd was a recurring mistake — always prefix the cd).
- Click through in the dev preview: login → lesson → widget interaction →
  完了 → sidebar counter increments → reload → state persists.
- Click through the gate too: tests locked at start → complete all lessons →
  quiz unlocks → answer to pass → practice unlocks → all-check → pass →
  counters show lessons+2 and the pass survives reload.
- Deploy: `npx vercel --prod` from the project dir if the project uses Vercel.
