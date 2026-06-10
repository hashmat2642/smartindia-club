"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabase";

export default function ResultUpdateForm({
  studentId,
  currentScore,
  currentRank,
  currentPerformance,
}: {
  studentId: number;
  currentScore: number;
  currentRank: string;
  currentPerformance: string;
}) {
  const [score, setScore] = useState(currentScore || 0);
  const [rank, setRank] = useState(currentRank || "Pending");
  const [performance, setPerformance] = useState(
    currentPerformance || "Pending"
  );
  const [saving, setSaving] = useState(false);

  async function updateResult() {
    setSaving(true);

    let performanceLevel = "Participation";

if (score >= 90) {
  performanceLevel = "Gold Performer";
} else if (score >= 75) {
  performanceLevel = "Silver Performer";
} else if (score >= 60) {
  performanceLevel = "Bronze Performer";
}

    const { error } = await supabase
      .from("students")
      .update({
  score,
  rank,
  performance: performanceLevel,
})
      .eq("id", studentId);

    setSaving(false);

    if (error) {
      alert("Update failed: " + error.message);
      return;
    }

    alert("Result updated successfully!");
    window.location.reload();
  }

  return (
    <div className="grid gap-3 md:grid-cols-4">
      <input
        type="number"
        value={score}
        onChange={(e) => setScore(Number(e.target.value))}
        className="rounded-xl p-3 text-black"
        placeholder="Score"
      />

      <input
        value={rank}
        onChange={(e) => setRank(e.target.value)}
        className="rounded-xl p-3 text-black"
        placeholder="Rank"
      />

      <select
  aria-label="Performance"
  value={performance}
  onChange={(e) => setPerformance(e.target.value)}
  className="rounded-xl p-3 text-black"
>
        <option>Pending</option>
        <option>Gold Performer</option>
        <option>Silver Performer</option>
        <option>Bronze Performer</option>
        <option>Participation</option>
      </select>

      <button
        onClick={updateResult}
        disabled={saving}
        className="rounded-xl bg-green-500 p-3 font-bold text-slate-950 hover:bg-green-400"
      >
        {saving ? "Saving..." : "Save Result"}
      </button>
    </div>
  );
}