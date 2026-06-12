# The Six Widget Archetypes

<!-- Implementation guidance for interactive learning widgets. Every widget is a
     React client component, registered by name in one registry file, and wrapped
     in the shared WidgetFrame (see templates/widget-skeleton.tsx). The frame
     gives every widget the same orange title bar + optional caption, which keeps
     the whole course visually coherent no matter how different the widgets are. -->

## Shared conventions

- `"use client"` components, no external chart/anim libraries — plain React
  state + Tailwind + inline SVG is enough and keeps the bundle tiny.
- Instant feedback: state change → visible change in the same frame. If a
  widget needs explanation to be understood, add it to `caption`, not a modal.
- Every widget answers one question. If a widget teaches two things, make two.
- Curriculum references widgets as data: `{ type: "widget", name: "fontPlayground" }`.
  The `name` union type in the block model makes typos a compile error.

## 1. Parameter playground

**Teaches:** any property with a continuous or enumerable value
(font-size, line-height, spacing, breakpoints, interest rates, oven temperature).

**Build:** range sliders / toggles on the left or top → a live preview box that
re-renders from the same state → the "code" (or recipe, or formula) shown with
the current values substituted in, ideally highlighting the line that changed.

**Key trick from the reference project:** the responsive playground had a width
slider (320–1000px) and visibly *switched layout at 768px* while highlighting
the media-query line — the threshold moment IS the lesson.

## 2. Builder / composer

**Teaches:** "a good X is made of these ingredients" (prompts, business emails,
landing-page sections, pitch structures).

**Build:** ON/OFF chips for each ingredient (背景 / 役割 / 形式 / トーン...) →
a live composed output that grows as chips turn on → a quality meter
(リッチ度) that fills up → optionally a sample "AI response" that improves as
the prompt improves. The learner *feels* the correlation between ingredients
and output quality instead of being told about it.

## 3. Anatomy diagram

**Teaches:** the parts of a tool's UI or a syntax (VSCode screen, a chat UI,
an HTML tag, a balance sheet).

**Build:** inline SVG drawing a faithful-but-simplified picture of the thing,
with numbered pill labels (①②③...) pointing at each region. Static is fine;
hover/click highlighting is a bonus. Always caption with what NOT to memorize.

**Why SVG and not a screenshot:** it stays crisp, themable, editable as code,
and you can exaggerate/simplify (hide irrelevant UI) for clarity.

## 4. Tool simulation (highest value — build at least one per course)

**Teaches:** a real tool the learner is afraid of (browser DevTools, terminal,
deploy dashboard, CRM screen).

**Build:**
1. A pixel-plausible mock of the real tool (the reference project mocked a full
   Chrome window: tab bar, address bar, a visibly broken page).
2. A numbered step guide rendered as progress chips at the top
   (①F12を開く → ②Consoleタブ → ③エラーをコピー → ④AIに相談) where each chip
   gets a ✓ as the learner performs that action *inside the mock*.
3. Real consequences inside the sim: the copy button really writes to the
   clipboard; completing step 3 reveals step 4's panel.
4. End with a bridge task: 「今度は自分のページで本物のF12を押してみよう」.

The pedagogy: rehearse in a safe replica, then transfer. Never send a beginner
into a real tool cold.

## 5. Gallery / comparison

**Teaches:** taste, style vocabulary, good-vs-bad judgment
(design trends, color contrast, rich vs poor prompts, formal vs casual tone).

**Build:** a grid of small live-rendered cards, each an honest mini-example of
the style (real CSS for design trends — glassmorphism actually blurs), labeled
with name + one-line "when to use". For good-vs-bad: exactly two panels side
by side with the difference stated in one sentence between them.

## 6. Persistent checklist

**Teaches:** final QA, self-assessment, pre-launch ritual.

**Build:** checkbox list persisted to localStorage (survives reload — that's
the point: it's a working document, not décor), progress bar, strike-through
on check, small celebration (🎉) at 100%.

## Choosing: a decision shortcut

- Is it a value you tweak? → **Playground**
- Is it made of parts you add? → **Builder**
- Is it a screen you look at? → **Anatomy**
- Is it a tool you operate? → **Simulation**
- Is it a judgment you develop? → **Gallery**
- Is it a ritual you repeat? → **Checklist**

If none fit, default to `codePreview` / `annotatedExample` blocks (code next to
its live-rendered result) — Progate's bread and butter, cheap and always worth it.
