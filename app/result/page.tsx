"use client";

import Link from "next/link";
import { Suspense } from "react";
import { useSearchParams } from "next/navigation";

export default function ResultPage() {
  return (
    <Suspense fallback={<ResultLoading />}>
      <ResultContent />
    </Suspense>
  );
}

function ResultLoading() {
  return (
    <main className="min-h-screen bg-slate-950 text-white">
      <section className="mx-auto max-w-4xl px-6 py-16">
        <div className="rounded-3xl bg-slate-900 p-8 text-center">
          Loading result...
        </div>
      </section>
    </main>
  );
}

function ResultContent() {
  const searchParams = useSearchParams();
  const score = Number(searchParams.get("score")) || 0;

  let performance = "Keep Practicing";
  let message = "Good start! Keep practicing and you will improve.";

  if (score >= 80) {
    performance = "Excellent Performance";
    message = "Great work! You have strong understanding and confidence.";
  } else if (score >= 50) {
    performance = "Good Performance";
    message = "Nice effort! You are improving. Keep learning and practicing.";
  }

  return (
    <main className="min-h-screen bg-slate-950 text-white">
      <section className="mx-auto max-w-4xl px-6 py-16">
        <div className="rounded-3xl bg-slate-900 p-8 text-center shadow-xl">
          <p className="text-sm font-semibold text-green-400">
            Quiz Submitted Successfully
          </p>

          <h1 className="mt-2 text-4xl font-bold">Your Result</h1>

          <div className="mt-8 grid gap-5 md:grid-cols-3">
            <div className="rounded-2xl bg-slate-800 p-5">
              <p className="text-slate-400">Score</p>
              <h2 className="mt-2 text-3xl font-bold text-green-400">
                {score}/100
              </h2>
            </div>

            <div className="rounded-2xl bg-slate-800 p-5">
              <p className="text-slate-400">Performance</p>
              <h2 className="mt-2 text-2xl font-bold">{performance}</h2>
            </div>

            <div className="rounded-2xl bg-slate-800 p-5">
              <p className="text-slate-400">Certificate</p>
              <h2 className="mt-2 text-2xl font-bold text-yellow-400">
                Eligible
              </h2>
            </div>
          </div>

          <div className="mt-8 rounded-2xl bg-slate-800 p-5">
            <h2 className="text-2xl font-bold text-green-400">Feedback</h2>
            <p className="mt-3 text-slate-300">{message}</p>
          </div>

          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <Link
              href="/leaderboard"
              className="rounded-xl bg-green-500 px-6 py-3 font-bold text-slate-950 hover:bg-green-400"
            >
              View Leaderboard
            </Link>

            <Link
              href="/certificate"
              className="rounded-xl border border-yellow-500 px-6 py-3 font-bold text-yellow-400 hover:bg-slate-800"
            >
              View Certificate
            </Link>

            <Link
              href="/dashboard"
              className="rounded-xl border border-slate-600 px-6 py-3 font-bold text-white hover:bg-slate-800"
            >
              Back to Dashboard
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}