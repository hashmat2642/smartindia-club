"use client";

import { supabase } from "@/lib/supabase";
import { useState } from "react";

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

    let performanceLevel = performance;

    if (performance === "Pending" || !performance || performance === "Participation" || performance.includes("Performer")) {
      if (performance === "Pending") {
        if (score >= 90) performanceLevel = "Gold Performer";
        else if (score >= 75) performanceLevel = "Silver Performer";
        else if (score >= 60) performanceLevel = "Bronze Performer";
        else performanceLevel = "Participation";
      }
    }

    const { error } = await supabase
      .from("students")
      .update({
        score: Number(score),
        rank: rank,
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
    <div className="grid gap-3 md:grid-cols-4 items-center">
      {/* Score Input Container */}
      <div>
        <input
          type="number"
          aria-label="Student Score"
          value={score}
          onChange={(e) => setScore(Number(e.target.value))}
          className="w-full rounded-xl p-3 bg-white text-black font-semibold border border-slate-700/40 focus:outline-none focus:ring-2 focus:ring-green-500 transition-all"
          placeholder="Score"
        />
      </div>

      {/* Rank Input Container */}
      <div>
        <input
          aria-label="Student Rank"
          value={rank}
          onChange={(e) => setRank(e.target.value)}
          className="w-full rounded-xl p-3 bg-white text-black font-semibold border border-slate-700/40 focus:outline-none focus:ring-2 focus:ring-green-500 transition-all"
          placeholder="Rank"
        />
      </div>

      {/* Select Category Dropdown Container — HTML Entities Fixed here */}
      <div>
        <select
          aria-label="Performance Category"
          value={performance}
          onChange={(e) => setPerformance(e.target.value)}
          className="w-full rounded-xl p-3 bg-white text-black font-semibold border border-slate-700/40 focus:outline-none focus:ring-2 focus:ring-green-500 transition-all"
        >
          <option value="Pending">Pending / Auto Calculate</option>
          <option value="Gold Performer">Gold Performer (&gt;=90)</option>
          <option value="Silver Performer">Silver Performer (&gt;=75)</option>
          <option value="Bronze Performer">Bronze Performer (&gt;=60)</option>
          <option value="Participation">Participation (&lt;60)</option>
        </select>
      </div>

      {/* Action Save Result Button */}
      <button
        onClick={updateResult}
        disabled={saving}
        className="w-full rounded-xl bg-green-500 p-3 font-bold text-slate-950 hover:bg-green-400 disabled:opacity-50 transition-colors shadow-md shadow-green-500/5"
      >
        {saving ? "Saving..." : "Save Result"}
      </button>
    </div>
  );
}