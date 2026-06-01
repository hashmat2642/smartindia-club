"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Suspense } from "react";

export default function SuccessPage() {
  return (
    <Suspense fallback={<Loading />}>
      <SuccessContent />
    </Suspense>
  );
}

function Loading() {
  return (
    <main className="min-h-screen bg-slate-950 text-white">
      <section className="mx-auto max-w-4xl px-6 py-16">
        Loading...
      </section>
    </main>
  );
}

function SuccessContent() {
  const searchParams = useSearchParams();
  const studentId = searchParams.get("studentId") || "SIC-PENDING";

  return (
    <main className="min-h-screen bg-slate-950 text-white">
      <section className="mx-auto max-w-4xl px-6 py-16">
        <div className="rounded-3xl bg-slate-900 p-8 text-center shadow-xl">
          <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-green-500 text-4xl font-bold text-slate-950">
            ✓
          </div>

          <h1 className="mt-6 text-4xl font-bold">
            Registration Submitted Successfully
          </h1>

          <p className="mt-4 text-slate-300">
            Your registration has been received for the SmartIndia.club
            Educational Skill Tournament.
          </p>

          <div className="mt-8 grid gap-5 md:grid-cols-3">
            <div className="rounded-2xl bg-slate-800 p-5">
              <p className="text-slate-400">Student ID</p>
              <h2 className="mt-2 text-2xl font-bold text-green-400">
                {studentId}
              </h2>
            </div>

            <div className="rounded-2xl bg-slate-800 p-5">
              <p className="text-slate-400">Fee</p>
              <h2 className="mt-2 text-2xl font-bold">₹50</h2>
            </div>

            <div className="rounded-2xl bg-slate-800 p-5">
              <p className="text-slate-400">Status</p>
              <h2 className="mt-2 text-2xl font-bold text-yellow-400">
                Pending Verification
              </h2>
            </div>
          </div>

          <div className="mt-8 rounded-2xl bg-slate-800 p-6 text-left">
            <h2 className="text-2xl font-bold">Next Steps</h2>

            <ul className="mt-4 space-y-3 text-slate-300">
              <li>• Keep your Student ID safe.</li>
              <li>• Complete ₹50 registration payment.</li>
              <li>• Practice quiz, logic and coding basics before tournament.</li>
              <li>• Certificate will be generated after tournament result.</li>
            </ul>
          </div>

          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <Link
              href="/dashboard"
              className="rounded-xl bg-green-500 px-6 py-3 font-bold text-slate-950 hover:bg-green-400"
            >
              Go to Dashboard
            </Link>

            <Link
              href="/practice"
              className="rounded-xl border border-green-500 px-6 py-3 font-bold text-green-400 hover:bg-slate-800"
            >
              Start Practice
            </Link>

            <Link
              href="/"
              className="rounded-xl border border-slate-600 px-6 py-3 font-bold text-white hover:bg-slate-800"
            >
              Back to Home
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}