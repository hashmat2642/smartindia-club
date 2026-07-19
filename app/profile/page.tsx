"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { supabase } from "@/lib/supabase";
import { students as mockStudents } from "@/app/data/students";
import { 
  ArrowLeft, ShieldCheck, Trophy, Bookmark, UserCheck
} from "lucide-react";

type Student = {
  id: number;
  student_id: string;
  name: string;
  class_name: string;
  school_name: string;
  phone_number: string;
  score: number;
  rank: string;
  performance: string;
  payment_status: string;
  certificate_id: string;
};

export default function ProfilePage() {
  const router = useRouter();
  const [student, setStudent] = useState<Student | null>(null);
  const [loading, setLoading] = useState(true);
  
  // Practice stats state
  const [practiceStats, setPracticeStats] = useState<Record<string, { score: number; total: number; timestamp: number }> | null>(null);

  useEffect(() => {
    const loggedId = localStorage.getItem("hdc_logged_student_id");
    if (!loggedId) {
      router.push("/dashboard");
      return;
    }

    // Load practice stats
    const stats = localStorage.getItem("hdc_practice_stats");
    if (stats) {
      try {
        const parsed = JSON.parse(stats);
        setTimeout(() => {
          setPracticeStats(parsed);
        }, 0);
      } catch (e) {
        console.error(e);
      }
    }

    const fetchProfile = async () => {
      try {
        const { data, error } = await supabase
          .from("students")
          .select("*")
          .eq("student_id", loggedId)
          .single();

        if (error || !data) {
          // Fallback to local mock data
          const mockMatch = mockStudents.find(
            (s) => s.student_id.toLowerCase() === loggedId.toLowerCase()
          );

          if (mockMatch) {
            // Apply simulation values if available in localStorage
            const simulatedScore = localStorage.getItem(`score_${mockMatch.student_id}`);
            const simulatedPerformance = localStorage.getItem(`performance_${mockMatch.student_id}`);
            const simulatedRank = localStorage.getItem(`rank_${mockMatch.student_id}`);
            const simulatedPayment = localStorage.getItem(`payment_${mockMatch.student_id}`) || "Pending";

            const finalScore = simulatedScore !== null ? Number(simulatedScore) : mockMatch.score;

            const mappedMock: Student = {
              id: Number(mockMatch.id),
              student_id: mockMatch.student_id,
              name: mockMatch.name,
              class_name: mockMatch.class_name,
              school_name: mockMatch.school_name,
              phone_number: "9876543210",
              score: finalScore,
              rank: simulatedRank !== null ? simulatedRank : mockMatch.rank,
              performance: simulatedPerformance !== null ? simulatedPerformance : (
                finalScore >= 90 ? "Gold Performer" : finalScore >= 75 ? "Silver Performer" : finalScore >= 60 ? "Bronze Performer" : "Participation"
              ),
              payment_status: simulatedPayment,
              certificate_id: mockMatch.certificate_id,
            };
            setStudent(mappedMock);
          } else {
            router.push("/dashboard");
          }
        } else {
          // Match in Supabase
          // Check for simulated payment status
          const dataObj = data as Student;
          const simulatedPayment = localStorage.getItem(`payment_${dataObj.student_id}`);
          if (simulatedPayment) {
            dataObj.payment_status = simulatedPayment;
          }
          setStudent(dataObj);
        }
      } catch (err) {
        console.error("Profile retrieval error", err);
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [router]);

  if (loading) {
    return (
      <main className="min-h-screen bg-slate-950 text-white flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="w-12 h-12 text-green-400 animate-spin mx-auto" />
          <p className="mt-4 text-slate-400 font-medium">Securing Student Dossier...</p>
        </div>
      </main>
    );
  }

  if (!student) return null;

  const score = student.score ?? 0;
  const isPaid = student.payment_status === "Paid";
  const hasFinishedExam = score > 0;

  // Practice percentage progress
  const quizPracticeDone = practiceStats?.["quiz"] ? 100 : 0;
  const logicPracticeDone = practiceStats?.["logic"] ? 100 : 0;
  const codingPracticeDone = practiceStats?.["coding"] ? 100 : 0;

  // Badge calculations
  let performanceBadge = "Participation Badge";
  let badgeIcon = "✨";
  let badgeBg = "from-slate-900 to-slate-950 border-slate-800";
  let badgeTextColor = "text-slate-400";

  if (score >= 90) {
    performanceBadge = "Gold Performer Badge";
    badgeIcon = "🥇";
    badgeBg = "from-yellow-500/10 to-orange-500/10 border-yellow-500/25";
    badgeTextColor = "text-yellow-400";
  } else if (score >= 75) {
    performanceBadge = "Silver Performer Badge";
    badgeIcon = "🥈";
    badgeBg = "from-slate-100/10 to-slate-300/10 border-slate-300/25";
    badgeTextColor = "text-slate-200";
  } else if (score >= 60) {
    performanceBadge = "Bronze Performer Badge";
    badgeIcon = "🥉";
    badgeBg = "from-orange-500/10 to-amber-700/10 border-orange-500/25";
    badgeTextColor = "text-orange-400";
  }

  return (
    <main className="min-h-screen bg-slate-950 text-white py-12 px-4 md:px-8">
      <section className="mx-auto max-w-5xl">
        
        {/* Navigation Breadcrumb */}
        <div className="mb-8">
          <Link
            href="/dashboard"
            className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-450 hover:text-green-400 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" /> Back to Dashboard
          </Link>
        </div>

        {/* Dynamic Profile Cover Banner */}
        <div className="grid gap-8 md:grid-cols-3">
          
          {/* Holographic Digital Student ID Card */}
          <div className="md:col-span-1">
            <div className="rounded-3xl bg-gradient-to-br from-indigo-950/80 via-slate-900 to-purple-950/80 border border-purple-500/20 p-6 shadow-2xl relative overflow-hidden flex flex-col justify-between h-[360px]">
              {/* Card Hologram effect ornaments */}
              <div className="absolute top-0 right-0 w-24 h-24 bg-purple-500/10 rounded-full filter blur-xl" />
              <div className="absolute bottom-0 left-0 w-20 h-20 bg-blue-500/10 rounded-full filter blur-xl" />

              <div>
                <div className="flex items-center justify-between">
                  <span className="text-xs font-black tracking-widest text-green-400 uppercase">SmartIndia.club</span>
                  <ShieldCheck className="w-5 h-5 text-green-400" />
                </div>

                <div className="mt-8 flex items-center gap-4">
                  <div className="w-14 h-14 rounded-full bg-slate-800 border border-slate-700 flex items-center justify-center shrink-0">
                    <UserCheck className="w-6 h-6 text-purple-400" />
                  </div>
                  <div>
                    <h3 className="font-black text-lg text-white leading-tight">{student.name}</h3>
                    <p className="text-xs text-slate-400 font-mono mt-0.5">{student.student_id}</p>
                  </div>
                </div>
              </div>

              <div className="space-y-2 border-t border-slate-800/80 pt-4">
                <div className="flex justify-between text-xs">
                  <span className="text-slate-500">School</span>
                  <span className="font-bold text-slate-200 truncate max-w-[150px]">{student.school_name}</span>
                </div>
                <div className="flex justify-between text-xs">
                  <span className="text-slate-500">Classroom</span>
                  <span className="font-bold text-slate-200">{student.class_name}</span>
                </div>
                <div className="flex justify-between text-xs">
                  <span className="text-slate-500">Verified Rank</span>
                  <span className="font-bold text-yellow-400">{hasFinishedExam ? `#${student.rank}` : "Pending Exam"}</span>
                </div>
              </div>

              <div className="flex items-center justify-between text-[9px] font-bold text-slate-550 border-t border-slate-800/40 pt-2 font-mono">
                <span>VERIFIED SYSTEM PORTFOLIO</span>
                <span>2026 EDITION</span>
              </div>
            </div>
          </div>

          {/* Detailed Statistics Drawer */}
          <div className="md:col-span-2 space-y-6">
            
            {/* Badges and Achievement drawer */}
            <div className="rounded-3xl bg-slate-900 border border-slate-850 p-6 md:p-8 shadow-xl">
              <h3 className="text-lg font-bold text-white mb-6 flex items-center gap-2">
                <Trophy className="w-5 h-5 text-green-400" /> Tournament Badges
              </h3>

              <div className="grid gap-4 sm:grid-cols-2">
                
                {/* Standard Participation Badge */}
                <div className="rounded-2xl border border-slate-850 bg-slate-950 p-4 flex gap-4 items-center">
                  <div className="w-12 h-12 rounded-xl bg-slate-900 flex items-center justify-center text-2xl shrink-0">
                    ✨
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-200 text-sm">SmartIndia Participant</h4>
                    <p className="text-xs text-slate-550 mt-0.5">Granted upon registration</p>
                  </div>
                </div>

                {/* Score Performance Badge */}
                <div className={`rounded-2xl border bg-slate-950 p-4 flex gap-4 items-center ${hasFinishedExam ? badgeBg : "opacity-30 border-slate-900"}`}>
                  <div className="w-12 h-12 rounded-xl bg-slate-900 flex items-center justify-center text-2xl shrink-0">
                    {hasFinishedExam ? badgeIcon : "🔒"}
                  </div>
                  <div>
                    <h4 className={`font-bold text-sm ${hasFinishedExam ? badgeTextColor : "text-slate-500"}`}>
                      {hasFinishedExam ? performanceBadge : "Tournament Badge"}
                    </h4>
                    <p className="text-xs text-slate-550 mt-0.5">
                      {hasFinishedExam ? `Unlocked (Score: ${score})` : "Earned after tournament exam"}
                    </p>
                  </div>
                </div>

              </div>
            </div>

            {/* Practice and stats panel */}
            <div className="rounded-3xl bg-slate-900 border border-slate-850 p-6 md:p-8 shadow-xl">
              <h3 className="text-lg font-bold text-white mb-6 flex items-center gap-2">
                <Bookmark className="w-5 h-5 text-green-400" /> Practice Progress
              </h3>

              <div className="space-y-4">
                <SkillBar title="General Knowledge Practice" percent={quizPracticeDone} score={practiceStats?.["quiz"]?.score} total={practiceStats?.["quiz"]?.total} />
                <SkillBar title="Reasoning & Logic Practice" percent={logicPracticeDone} score={practiceStats?.["logic"]?.score} total={practiceStats?.["logic"]?.total} />
                <SkillBar title="Coding Fundamentals Practice" percent={codingPracticeDone} score={practiceStats?.["coding"]?.score} total={practiceStats?.["coding"]?.total} />
              </div>
            </div>

            {/* Certificate verification details */}
            <div className="rounded-3xl bg-slate-900 border border-slate-850 p-6 md:p-8 shadow-xl">
              <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                <ShieldCheck className="w-5 h-5 text-green-400" /> Verified Credentials
              </h3>

              <div className="space-y-4 text-sm text-slate-350 leading-relaxed">
                <div className="flex flex-col sm:flex-row sm:justify-between border-b border-slate-850 pb-3 gap-2">
                  <span>Certificate ID Verification Code</span>
                  <span className="font-mono font-bold text-slate-200">{student.certificate_id}</span>
                </div>
                <div className="flex flex-col sm:flex-row sm:justify-between border-b border-slate-850 pb-3 gap-2">
                  <span>Enrollment Payment Verification</span>
                  <span className={`font-bold ${isPaid ? "text-green-400" : "text-yellow-400"}`}>
                    {isPaid ? "Cleared & Verified (Paid)" : "Verification Pending (₹50)"}
                  </span>
                </div>
                <div className="flex flex-col sm:flex-row sm:justify-between pb-1 gap-2">
                  <span>Authorized Issuing Body</span>
                  <span className="font-bold text-slate-200">SmartIndia.club Verification Board</span>
                </div>
              </div>

              {hasFinishedExam && (
                <div className="mt-6 pt-5 border-t border-slate-850 flex flex-wrap gap-4">
                  {isPaid ? (
                    <Link
                      href={`/certificate/${student.certificate_id}`}
                      className="rounded-xl bg-green-500 hover:bg-green-400 text-slate-950 font-bold px-6 py-3 text-sm transition-colors"
                    >
                      Print Digital Certificate 📜
                    </Link>
                  ) : (
                    <Link
                      href="/dashboard"
                      className="rounded-xl bg-yellow-500 hover:bg-yellow-400 text-slate-950 font-bold px-6 py-3 text-sm transition-colors"
                    >
                      Complete Payment to Unlock &rarr;
                    </Link>
                  )}
                </div>
              )}
            </div>

          </div>

        </div>

      </section>
    </main>
  );
}

function Loader2({ className, ...props }: React.ComponentProps<"svg">) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={`animate-spin ${className}`}
      {...props}
    >
      <path d="M21 12a9 9 0 1 1-6.219-8.56" />
    </svg>
  );
}

function SkillBar({ 
  title, 
  percent,
  score,
  total
}: { 
  title: string; 
  percent: number;
  score?: number;
  total?: number;
}) {
  return (
    <div>
      <div className="mb-2 flex justify-between text-xs md:text-sm">
        <span className="font-semibold text-slate-350">{title}</span>
        <span className="font-bold text-slate-400">
          {score !== undefined && total !== undefined ? `Score: ${score}/${total}` : `${percent}%`}
        </span>
      </div>

      <div className="h-2 rounded-full bg-slate-950 border border-slate-850 overflow-hidden">
        <div
          className={`h-full transition-all duration-500 ${percent === 100 ? "bg-green-500" : "bg-slate-700"}`}
          style={{ width: `${percent}%` }}
        />
      </div>
    </div>
  );
}