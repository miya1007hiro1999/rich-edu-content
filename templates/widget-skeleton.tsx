"use client";

// Widget skeleton — copy into src/components/LearningWidgets.tsx of a new course.
// すべてのウィジェットを WidgetFrame で包むことで、コース全体の見た目が
// 統一される（中身がどれだけ違っても「学習ウィジェットだ」と一目で分かる）。
// 外部ライブラリは使わない：React state + Tailwind + inline SVG で足りる。

import { useEffect, useState } from "react";

/* ---------- 共通フレーム ---------- */
// title は「【図解】〜」「【触って体験】〜」のように種別プレフィックスをつける。
// caption には「何に注目すべきか」「何は覚えなくていいか」を書く（不安の除去も教材の一部）。
export function WidgetFrame({
  title,
  children,
  caption,
}: {
  title: string;
  children: React.ReactNode;
  caption?: string;
}) {
  return (
    <div className="my-4 overflow-hidden rounded-2xl border border-orange-200 bg-orange-50/40">
      <p className="border-b border-orange-100 bg-orange-50 px-4 py-2 text-sm font-bold text-orange-700">
        {title}
      </p>
      <div className="p-4">{children}</div>
      {caption && (
        <p className="border-t border-orange-100 bg-white px-4 py-2 text-xs text-slate-500">
          {caption}
        </p>
      )}
    </div>
  );
}

/* ---------- 共通小物：ON/OFFチップ（Builder型で多用） ---------- */
export function Chip({
  label,
  active,
  onClick,
}: {
  label: string;
  active: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`rounded-full border px-3 py-1.5 text-sm transition ${
        active
          ? "border-orange-500 bg-orange-500 text-white"
          : "border-slate-300 bg-white text-slate-700 hover:border-orange-300"
      }`}
    >
      {label}
    </button>
  );
}

/* ============================================================
   例1: Parameter playground（スライダー → ライブプレビュー）
   「値をいじると結果が変わる」を即時フィードバックで体感させる。
   コード表示には現在値をそのまま埋め込む（見ている値＝書くべき値）。
   ============================================================ */
export function ExamplePlayground() {
  const [size, setSize] = useState(24);
  return (
    <WidgetFrame
      title="【触って体験】文字サイズを変えてみよう"
      caption="スライダーを動かすと、下のプレビューとコードが同時に変わります。"
    >
      <label className="text-sm text-slate-600">
        font-size: {size}px
        <input
          type="range"
          min={12}
          max={64}
          value={size}
          onChange={(e) => setSize(Number(e.target.value))}
          className="block w-full accent-orange-500"
        />
      </label>
      {/* プレビューとコードは同じ state から描画する（ズレない） */}
      <div className="mt-3 rounded-lg border border-slate-200 bg-white p-4">
        <p style={{ fontSize: size }}>こんにちは！</p>
      </div>
      <pre className="mt-2 rounded-lg bg-slate-900 p-3 text-xs text-emerald-300">
        {`p { font-size: ${size}px; }`}
      </pre>
    </WidgetFrame>
  );
}

/* ============================================================
   例2: Tool simulation の骨格（最重要アーキタイプ）
   ①〜④のステップチップが、模倣ツール内での実操作に応じて ✓ になる。
   完了したステップが次のパネルを開放する（誘導はUIで行い、文章で行わない）。
   ============================================================ */
export function ExampleSimulation() {
  const [step, setStep] = useState(0); // 何ステップ目まで完了したか
  const steps = ["①ツールを開く", "②タブを切り替える", "③結果をコピー", "④AIに相談"];
  return (
    <WidgetFrame
      title="【触って体験】本物そっくりの練習画面"
      caption="ここは練習用の画面なので、何を押しても壊れません。"
    >
      {/* 進行チップ：現在地の可視化が安心感を生む */}
      <div className="mb-3 flex flex-wrap gap-2">
        {steps.map((s, i) => (
          <span
            key={s}
            className={`rounded-full px-3 py-1 text-xs font-bold ${
              i < step
                ? "bg-emerald-100 text-emerald-700"
                : i === step
                  ? "bg-orange-500 text-white animate-pulse"
                  : "bg-slate-100 text-slate-400"
            }`}
          >
            {i < step ? `✓ ${s}` : s}
          </span>
        ))}
      </div>
      {/* ここに本物そっくりのモックUIを構築し、操作のたびに setStep(step+1) する */}
      <button
        type="button"
        onClick={() => setStep((v) => Math.min(v + 1, steps.length))}
        className="rounded-lg bg-orange-500 px-4 py-2 text-sm font-bold text-white"
      >
        （モックUIの操作ボタン）
      </button>
      {step >= steps.length && (
        <p className="mt-3 rounded-lg bg-emerald-50 p-3 text-sm text-emerald-700">
          🎉 全ステップ完了！今度は本物のツールで同じ手順をやってみましょう。
        </p>
      )}
    </WidgetFrame>
  );
}

/* ============================================================
   例3: Persistent checklist（localStorage 永続）
   リロードしても残ることが本質（飾りではなく「使う道具」にする）。
   ============================================================ */
export function ExampleChecklist({ storageKey = "course_final_checklist" }) {
  const items = ["スマホで表示確認した", "誤字をチェックした", "リンクを全部踏んだ"];
  const [done, setDone] = useState<string[]>([]);
  useEffect(() => {
    const raw = localStorage.getItem(storageKey);
    if (raw) setDone(JSON.parse(raw));
  }, [storageKey]);
  const toggle = (item: string) => {
    const next = done.includes(item) ? done.filter((d) => d !== item) : [...done, item];
    setDone(next);
    localStorage.setItem(storageKey, JSON.stringify(next));
  };
  const pct = Math.round((done.length / items.length) * 100);
  return (
    <WidgetFrame title="【チェックリスト】公開前の最終確認" caption="チェックは保存されます。">
      <div className="mb-2 h-2 rounded-full bg-slate-100">
        <div className="h-2 rounded-full bg-orange-500 transition-all" style={{ width: `${pct}%` }} />
      </div>
      {items.map((item) => (
        <label key={item} className="flex cursor-pointer items-center gap-2 py-1 text-sm">
          <input type="checkbox" checked={done.includes(item)} onChange={() => toggle(item)} className="accent-orange-500" />
          <span className={done.includes(item) ? "text-slate-400 line-through" : "text-slate-700"}>{item}</span>
        </label>
      ))}
      {pct === 100 && <p className="mt-2 text-sm font-bold text-emerald-600">🎉 完璧です！公開しましょう！</p>}
    </WidgetFrame>
  );
}

/* ---------- レジストリ ----------
   curriculum.ts からは { type:"widget", name:"examplePlayground" } のように
   データとして参照する。WidgetName union（block-types.ts）と必ず同期させること。 */
export const REGISTRY = {
  examplePlayground: ExamplePlayground,
  exampleSimulation: ExampleSimulation,
  exampleChecklist: ExampleChecklist,
} as const;

export function LearningWidget({ name }: { name: keyof typeof REGISTRY }) {
  const W = REGISTRY[name];
  return W ? <W /> : null;
}
