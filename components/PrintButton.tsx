"use client";

export default function PrintButton() {
  return (
    <button
      onClick={() => window.print()}
      className="rounded-xl bg-green-500 px-6 py-3 font-bold text-slate-950 hover:bg-green-400"
    >
      Print / Save as PDF
    </button>
  );
}