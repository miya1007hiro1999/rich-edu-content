# Worked Example: Request → Output

<!-- A condensed trace of how a real request flows through this skill,
     so the model can pattern-match the expected behavior. -->

## User request (typical)

> 「営業の新人研修教材を作りたい。テレアポ、商談、クロージングを5日間で学べるやつ」

## Step 1 output — curriculum tree (confirm with user BEFORE writing content)

```
5Days 営業BootCamp  — 運営テーマ：「架空のSaaS『ミセシル』を売る」←全例題をこれで通す
Day1 整える   Step① 営業の全体地図（4レッスン＋まとめ）
Day2 つかむ   Step② テレアポ：最初の10秒（6レッスン＋まとめ）
...
```

Per-lesson granularity check: 「トークスクリプトの作り方」が挨拶・つかみ・本題・
切り返しの4要素を含むなら、それは4レッスンに割る。

## Step 4 output — widget choices for this course (archetype mapping)

| レッスン | アーキタイプ | ウィジェット案 |
|---|---|---|
| 声のトーンと速さ | Playground | 速さ/トーンのスライダー→サンプル文の読み上げ表示が変化 |
| トークの組み立て | Builder | 挨拶/実績/質問チップON/OFF→アポ獲得率メーター |
| 商談画面の見方 | Anatomy | Zoom画面のSVG図解（①画面共有 ②チャット…） |
| 切り返し練習 | Simulation | 模擬チャット：お客様の断り文句→3択で返答→反応が分岐 |
| 良いメール/悪いメール | Gallery | 2通並べて違いを1文で |
| 商談前チェック | Checklist | localStorage永続チェックリスト |

## Output language reminder

All of the above learner-facing text is Japanese. The skill files and the
model's internal reasoning are English; the deliverable is not.
