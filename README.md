# rich-edu-content — リッチでインタラクティブな教材を量産するClaudeスキル

文字だらけの教材を、**「1概念=1ページ」＋インタラクティブな図解・ウィジェット＋
（学習 → 確認テスト → 実践テスト）のゲート構造**で作れるようにする
[Claude Code](https://claude.com/claude-code) / Claude 用のスキルです。

分野は問いません（Web制作・AI・営業・簿記・ビジネスマナー…）。
「教材を作って」「このレッスンを追加して」「この資料をもっとリッチにして」
と頼むだけで、一定の品質で生成されます。出力は日本語です。

---

## インストール（クローンするだけ）

`~/.claude/skills/` の中にクローンします。フォルダ名は `rich-edu-content` のままにしてください。

```bash
git clone https://github.com/miya1007hiro1999/rich-edu-content.git ~/.claude/skills/rich-edu-content
```

> すでに同名フォルダがある場合は、先にリネーム/削除してからクローンしてください。

これだけで、次に Claude Code を起動したときから自動で使えるようになります。

### claude.ai（ブラウザ版）で使う場合

このリポジトリを「Download ZIP」して解凍 → 設定の Skills から `.skill`/フォルダを
アップロードしてください（CLIを使わない人向け）。

---

## 最新版に更新する

```bash
cd ~/.claude/skills/rich-edu-content
git pull
```

更新があると、テンプレートやノウハウが最新の状態に入れ替わります。

---

## 使い方

インストール後は、ふだんどおり Claude に頼むだけです。

- 「**簿記3級の教材アプリを作って**」
- 「**この研修ドラフト、文字ばっかりだからリッチにして**」
- 「**Day2にレッスンを1つ追加して**」

スキルが自動で発動し、カリキュラム設計 → レッスン執筆 → インタラクティブ
ウィジェット → テスト（確認＋実践）まで、決まった作法で組み立てます。

---

## 中身

| ファイル | 役割 |
|---|---|
| `SKILL.md` | 本体。設計思想とワークフロー（これが最初に読まれる） |
| `references/lesson-writing.md` | 日本語ライティング規則・初心者への配慮ルール |
| `references/widget-patterns.md` | インタラクティブ・ウィジェット6種の実装ガイド |
| `references/app-scaffold.md` | 教材アプリ全体のアーキテクチャ（テスト機能含む） |
| `templates/block-types.ts` | 教材の中身を表すブロック型（コピーして使う） |
| `templates/widget-skeleton.tsx` | ウィジェットの共通フレーム＋実装例 |
| `templates/lesson-example.ts` | 実レッスン1ページ分のサンプル |
| `examples/` | 「依頼 → 出力」の流れの実例 |

---

## ライセンス / 改変

自由に使ってOKです。改善したら Pull Request を歓迎します
（自分用に手元で書き換えるだけでも構いません）。
