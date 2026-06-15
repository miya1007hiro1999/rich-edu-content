// Block content model — copy this into src/data/types.ts of a new course app.
// 教材の中身はすべて「ブロックの配列」として表現する。レンダリングは
// BlockRenderer の switch 1か所に集約され、ブロック型を1つ足せば
// 全レッスンでそれが使えるようになる（量産の生命線）。

export type Block =
  // ---- 基本テキスト系 ----
  | { type: "heading"; content: string } // レッスン内の見出し
  | { type: "subheading"; content: string }
  | { type: "text"; content: string } // 1〜3文の短い段落
  | { type: "tip"; content: string } // 💡 リフレーミング・コツ
  | { type: "warning"; content: string } // ⚠️ 本当の罠だけに使う
  | { type: "list"; items: string[] }
  | { type: "checklist"; items: string[] }
  | { type: "table"; headers: string[]; rows: string[][] } // 早見表に最適
  | { type: "steps"; items: { title: string; desc: string }[] } // 手取り足取り手順
  | { type: "flow"; items: string[] } // 矢印でつなぐフロー図

  // ---- コード/結果の可視化系（Progateの主食）----
  | { type: "code"; lang?: string; content: string }
  | {
      // 変更前→変更後で「どこが変わるか」を見せる
      type: "codeCompare";
      lang?: string;
      before: string;
      after: string;
      changed: string; // 何が・どう変わるかの一文
    }
  | {
      // コードと「ブラウザでの表示結果」を並べて見せる（iframe srcDoc で実レンダリング）
      type: "codePreview";
      code: string;
      label?: string;
    }
  | {
      // HTML と CSS を並べ、対応関係の注釈＋実レンダリング結果を表示
      type: "annotatedExample";
      html: string;
      css: string;
      notes: string[];
    }

  // ---- 構造・演習系 ----
  | {
      // 📖学ぶ / ✍️やってみよう の段階見出し。各レッスンの背骨。
      type: "phase";
      label: string;
      variant?: "learn" | "practice";
    }
  | {
      // 演習の2段表示：基本（手を動かして理解）＋ AI活用（AIへの頼み方）
      type: "twoTier";
      title?: string; // レッスンページではタイトル省略可
      basic: string;
      ai: string;
    }
  | { type: "exercise"; title: string; desc: string } // 単段の演習
  | { type: "task"; title?: string; items: string[] } // ミニ課題（2〜4アクション）

  // ---- インタラクティブウィジェット ----
  | {
      // LearningWidgets.tsx の REGISTRY 名を指定。
      // union 型にしておくことで typo がビルドエラーになる。
      // コースごとにここへウィジェット名を足していく。
      type: "widget";
      name: WidgetName;
    };

// コース固有のウィジェット名をここに列挙する（例は参考プロジェクトのもの）
export type WidgetName =
  | "exampleAnatomy" // 図解：ツール画面の見方
  | "examplePlayground" // 触れる：パラメータ→ライブプレビュー
  | "exampleBuilder" // 組み立て：材料ON/OFF→品質メーター
  | "exampleSimulation" // 疑似体験：本物そっくりのツール模倣
  | "exampleGallery" // 見比べ：スタイル/良し悪しの実例集
  | "exampleChecklist"; // 儀式：localStorage永続チェックリスト

export type ReviewItem = { q: string; a: string };

// 📝 確認テストの1問（4択クイズ）。復習チェックのQ&Aから派生させる。
// 不正解の選択肢は「ありがちな勘違い」にする（margin vs padding など）。
export type QuizQuestion = {
  q: string;
  choices: string[];
  answer: number; // 正解のインデックス
  explanation: string; // 回答直後に出すミニレッスン（間違えた人を救う文章）
};

// 🚀 実践テスト：受講者自身の環境で手を動かす課題。
// 全タスク自己チェックで合格（自己申告制が初心者にはちょうどいい）。
export type PracticeTest = {
  title: string;
  intro: string;
  tasks: { title: string; desc?: string }[]; // 3〜5個、運営テーマの題材で
  aiHint?: string; // 詰まったときにAIへ貼るプロンプト例
};

// 小項目：1つの小さなページになる「レッスン」（1概念=1ページ、2〜5分）
export type Lesson = {
  id: string; // 例: "s7-l3"（全体で一意）
  title: string;
  blocks: Block[];
  isSummary?: boolean; // Step末尾の「まとめ」レッスンか
};

// 中項目：Step（3〜9レッスンを束ねるスキルクラスタ）
export type Step = {
  id: string; // 例: "s7"
  label: string; // 例: "Step⑦"
  title: string;
  intro?: string; // Stepの導入一文
  lessons: Lesson[];
};

// 大項目：Day / Module（テーマ＋ゴール文「〜できるようになる」）
export type Day = {
  day: number;
  theme: string; // 一語のキーワード（例: 整える / 設計する）
  keyword: string;
  title: string;
  goal: string; // 🎯 で表示されるゴール文
  steps: Step[];
  summary: string[]; // 📌 今日のまとめ
  review: ReviewItem[]; // ✅ 復習チェック（Q&A）
  // テストパート：全レッスン完了→確認テスト解放→合格→実践テスト解放
  checkTest: QuizQuestion[]; // 📝 4〜6問、80%正解で合格・何度でも再挑戦可
  practiceTest: PracticeTest; // 🚀 合格でDAY完全クリア
  // ⏱ 目安時間（分）。計画を立てやすくするためUIにバッジ表示する。
  // 校正基準：「初心者〜少し経験者」の平均＋余裕（8割が収まる）。
  // 実践テスト（手を動かす）はレッスンより重く・分散も大きいので厚めに。
  estMinutes: { lessons: number; check: number; practice: number };
};
