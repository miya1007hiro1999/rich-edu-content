# Lesson Writing Rules (Japanese copy)

<!-- Read this before writing any lesson text. These rules were distilled from
     real reviewer feedback on the 7days-bootcamp project — each rule exists
     because its absence produced a complaint. -->

## Voice and tone

- です/ます調. Friendly senpai, not a textbook and not a kids' show.
- Sentences short. One idea per sentence. If a sentence has 「〜ですが、〜なので、〜」
  split it.
- Talk TO the learner: 「〜してみましょう」「〜できましたか？」 not 「〜するものとする」.
- Emoji as signposts, sparingly and consistently: 📖 学ぶ / ✍️ やってみよう /
  💡 tip / ⚠️ warning / 🎯 goal / 📌 まとめ / ✅ 復習チェック. Don't sprinkle
  emoji inside body sentences.

## Beginner empathy rules (the most important section)

1. **Never assume an unintroduced concept.** Before any exercise that uses
   h-tags, the learner must have had a lesson that *shows* what an h-tag is.
   Audit every exercise: "has every word in this task been taught?"
2. **Hand-holding granularity for tool lessons.** "Stitchを開く" is not a step.
   "ブラウザで stitch.withgoogle.com を開く → 右上の『Sign in』を押す → Google
   アカウントを選ぶ" is three steps. For anything involving a real tool, write
   steps at the click level, ideally with an anatomy diagram or simulation widget.
3. **Demystify scary things explicitly.** Error messages, DevTools, terminals.
   Always include the reframe: エラー文は「怖い英語」ではなく「ヒントの宝庫」.
   Pair with a small reference table of the 2–3 most common cases they'll hit.
4. **Answer-checking comes after teaching, never as teaching.** A
   「答え合わせしてみよう」 exercise is only valid if the answer was learnable
   from a previous lesson on the same page-or-earlier.
5. **Tell them what NOT to memorize.** Beginners try to memorize everything.
   Captions like 「名前は覚えなくてOK。『左端に道具が並んでいる』とだけ掴めば
   大丈夫」 reduce anxiety and are part of the pedagogy.

## AI-era course framing (for courses that involve using AI)

- Teach "read and verify" rather than "write from scratch": the learner's job
  is to direct the AI and check its output, so lessons emphasize *recognizing*
  correct structure over typing it.
- Use the **sandwich prompt structure** for generation lessons:
  前提・背景 (bread) → 具体的な指示 (filling) → 出力形式・制約 (bread).
  Visualize it; don't just describe it.
- Be consistent about artifacts. If the course builds 3 files
  (index.html / style.css / script.js), EVERY prompt template and every lesson
  must say 3 files. Inconsistency here was a real bug found by the user.
- Include a hallucination/verification lesson early: show the same question
  answered correctly and incorrectly, and teach the checking habit.

## Structure per lesson (the skeleton)

```
phase: 📖 学ぶ
  text        … hook + plain-language explanation (1–3 short paragraphs)
  [visual]    … widget | codePreview | annotatedExample | table | flow
  tip         … the reframe / the "aha"
phase: ✍️ やってみよう
  task | twoTier … concrete actions in the running theme
  warning     … only if there is a genuine trap
```

- `twoTier` = 基本 (do it by hand to understand) + AI活用 (how to ask AI to do
  it for you). Use it whenever both paths exist.
- A lesson is 2–5 minutes. If your draft scrolls past ~2 screens, split it.

## Summary lessons

Each Step's last lesson is a まとめ:
- 3–5 bullet recap (what they can now DO, not what was "covered")
- 復習チェック: 3–4 Q&A pairs, questions phrased as the learner's self-talk
  (「タグってなんだっけ？」), answers in one sentence.

## Reflection prompts (final day / final step)

End-of-course reflection should be an AI prompt template the learner fills in
and runs themselves, e.g.:

```
私は7日間で◯◯を学びました。
特に難しかったのは「◯◯」です。
この経験をふまえて、次の30日でやるべき学習プランを
1週間ごとの目標つきで提案してください。
```

This turns the AI itself into the post-course mentor — on-theme for AI courses
and genuinely useful for any course.
