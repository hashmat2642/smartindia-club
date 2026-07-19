"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { supabase } from "@/lib/supabase";
import { students as mockStudents } from "@/app/data/students";
import { 
  User, GraduationCap, Award, CheckCircle, 
  AlertTriangle, Play, LogOut, ArrowRight, 
  CreditCard, Loader2, Sparkles, BookOpen, Clock, QrCode
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

export default function DashboardPage() {
  const [studentId, setStudentId] = useState<string | null>(null);
  const [student, setStudent] = useState<Student | null>(null);
  const [loading, setLoading] = useState(true);
  
  // Login / lookup form states
  const [searchQuery, setSearchQuery] = useState("");
  const [isSearching, setIsSearching] = useState(false);
  const [searchError, setSearchError] = useState<string | null>(null);
  
  // Payment modal state
  const [showPaymentModal, setShowPaymentModal] = useState(false);

  // Practice stats state
  const [practiceStats, setPracticeStats] = useState<Record<string, { score: number; total: number; timestamp: number }> | null>(null);

  // 1. Fetch student details from Supabase or fallback
  async function fetchStudentDetails(id: string) {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from("students")
        .select("*")
        .eq("student_id", id)
        .single();

      if (error || !data) {
        const mockMatch = mockStudents.find(
          (s) => s.student_id.toLowerCase() === id.toLowerCase()
        );

        if (mockMatch) {
          const mappedMock: Student = {
            id: Number(mockMatch.id),
            student_id: mockMatch.student_id,
            name: mockMatch.name,
            class_name: mockMatch.class_name,
            school_name: mockMatch.school_name,
            phone_number: "9876543210",
            score: mockMatch.score,
            rank: mockMatch.rank,
            performance: mockMatch.score >= 90 
              ? "Gold Performer" 
              : mockMatch.score >= 75 
              ? "Silver Performer" 
              : mockMatch.score >= 60 
              ? "Bronze Performer" 
              : "Participation",
            payment_status: "Pending",
            certificate_id: mockMatch.certificate_id,
          };
          setStudent(mappedMock);
        } else {
          localStorage.removeItem("hdc_logged_student_id");
          setStudentId(null);
        }
      } else {
        setStudent(data as Student);
      }
    } catch {
      console.error("Database fetch exception, using mock fallback");
    } finally {
      setLoading(false);
    }
  }

  // 2. Active Session & Practice Stats sync
  useEffect(() => {
    const activeId = localStorage.getItem("hdc_logged_student_id");
    if (activeId) {
      setTimeout(() => {
        setStudentId(activeId);
        fetchStudentDetails(activeId);
      }, 0);
    } else {
      setTimeout(() => {
        setLoading(false);
      }, 0);
    }

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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;

    setIsSearching(true);
    setSearchError(null);

    const query = searchQuery.trim();
    try {
      const { data, error } = await supabase
        .from("students")
        .select("*")
        .or(`student_id.eq.${query},phone_number.like.%${query}%,name.ilike.%${query}%`);

      if (error || !data || data.length === 0) {
        // Fallback search against mock data
        const mockMatch = mockStudents.find(
          (s) => s.student_id.toLowerCase() === query.toLowerCase() ||
                 s.name.toLowerCase().includes(query.toLowerCase())
        );

        if (mockMatch) {
          const mappedMock: Student = {
            id: Number(mockMatch.id),
            student_id: mockMatch.student_id,
            name: mockMatch.name,
            class_name: mockMatch.class_name,
            school_name: mockMatch.school_name,
            phone_number: "9876543210",
            score: mockMatch.score,
            rank: mockMatch.rank,
            performance: mockMatch.score >= 90 
              ? "Gold Performer" 
              : mockMatch.score >= 75 
              ? "Silver Performer" 
              : mockMatch.score >= 60 
              ? "Bronze Performer" 
              : "Participation",
            payment_status: "Pending",
            certificate_id: mockMatch.certificate_id,
          };

          localStorage.setItem("hdc_logged_student_id", mappedMock.student_id);
          setStudentId(mappedMock.student_id);
          setStudent(mappedMock);
          window.dispatchEvent(new Event("hdc_auth_change"));
        } else {
          setSearchError("No student records matched. Please verify your Student ID (e.g. SIC-001) or Name.");
        }
      } else {
        // Match found in Supabase
        const selected = data[0] as Student;
        localStorage.setItem("hdc_logged_student_id", selected.student_id);
        setStudentId(selected.student_id);
        setStudent(selected);
        window.dispatchEvent(new Event("hdc_auth_change"));
      }
    } catch (err) {
      setSearchError("Connection issue. Please verify your credentials or try again.");
    } finally {
      setIsSearching(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("hdc_logged_student_id");
    setStudentId(null);
    setStudent(null);
    setSearchQuery("");
    window.dispatchEvent(new Event("hdc_auth_change"));
  };

  // Mock payment approval for frontend testing
  const simulatePaymentApproval = () => {
    if (!student) return;
    const updated = { ...student, payment_status: "Paid" };
    setStudent(updated);
    // Persist in localStorage to survive refresh for offline demo
    localStorage.setItem(`payment_${student.student_id}`, "Paid");
    setShowPaymentModal(false);
  };

  // Check if payment was simulated
  useEffect(() => {
    if (student && localStorage.getItem(`payment_${student.student_id}`) === "Paid") {
      setTimeout(() => {
        setStudent(prev => prev ? { ...prev, payment_status: "Paid" } : null);
      }, 0);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [student?.student_id]);

  if (loading) {
    return (
      <main className="min-h-screen bg-slate-950 text-white flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="w-12 h-12 text-green-400 animate-spin mx-auto" />
          <p className="mt-4 text-slate-400 font-medium">Securing Student Terminal...</p>
        </div>
      </main>
    );
  }

  // --- RENDERING LOOKUP COMPONENT IF NOT LOGGED IN ---
  if (!studentId || !student) {
    return (
      <main className="min-h-screen bg-slate-950 text-white flex flex-col justify-center py-16 px-6">
        <div className="mx-auto w-full max-w-lg bg-slate-900/60 backdrop-blur-md border border-slate-850 rounded-3xl p-8 shadow-2xl relative">
          <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-green-500 to-emerald-400" />
          
          <div className="text-center mb-8">
            <span className="inline-block p-3 rounded-2xl bg-green-500/10 border border-green-500/20 text-green-400 mb-4">
              <GraduationCap className="w-8 h-8" />
            </span>
            <h1 className="text-3xl font-black tracking-tight text-white">Student Portal</h1>
            <p className="text-sm text-slate-400 mt-2">
              Access your digital tournament dashboard, view marks, practice reports, and download verified certificates.
            </p>
          </div>

          <form onSubmit={handleLogin} className="space-y-5">
            <div>
              <label htmlFor="student_query" className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-2">
                Enter Student ID or Registered Name
              </label>
              <input
                id="student_query"
                type="text"
                required
                placeholder="Example: SIC-001 or Hashmat"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full rounded-xl p-4 bg-slate-950 border border-slate-800 focus:border-green-500 focus:outline-none text-white text-base transition-colors"
              />
            </div>

            {searchError && (
              <p className="text-xs font-semibold text-red-400 bg-red-500/10 border border-red-500/20 p-3 rounded-xl flex items-center gap-2">
                <AlertTriangle className="w-4 h-4 shrink-0" />
                {searchError}
              </p>
            )}

            <button
              disabled={isSearching}
              className="w-full flex items-center justify-center gap-2 rounded-xl bg-green-500 hover:bg-green-400 text-slate-950 font-bold p-4 transition-colors disabled:opacity-50 text-base shadow-lg shadow-green-500/10"
            >
              {isSearching ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" /> Verifying Credentials...
                </>
              ) : (
                <>
                  Authenticate Dashboard <ArrowRight className="w-5 h-5" />
                </>
              )}
            </button>
          </form>

          <div className="mt-8 border-t border-slate-850 pt-6 text-center text-xs text-slate-500">
            <p>Not registered for the skill tournament yet?</p>
            <Link href="/register" className="mt-2 inline-block font-bold text-green-400 hover:underline">
              Register Student Profile &rarr;
            </Link>
          </div>
        </div>
      </main>
    );
  }

  // --- RENDERING DYNAMIC LOGGED IN DASHBOARD ---
  const score = student.score ?? 0;
  const isPaid = student.payment_status === "Paid";
  
  // Calculate practice completion metrics
  const quizPracticeDone = practiceStats?.["quiz"] ? 100 : 0;
  const logicPracticeDone = practiceStats?.["logic"] ? 100 : 0;
  const codingPracticeDone = practiceStats?.["coding"] ? 100 : 0;

  return (
    <main className="min-h-screen bg-slate-950 text-white py-12 px-4 md:px-8">
      <section className="mx-auto max-w-7xl">
        
        {/* Dashboard Top Header Section */}
        <div className="flex flex-wrap items-center justify-between gap-6 mb-10 border-b border-slate-900 pb-6">
          <div>
            <div className="flex items-center gap-2 text-xs font-bold text-green-400 uppercase tracking-widest">
              <Sparkles className="w-3.5 h-3.5" /> Welcome back, Participant
            </div>
            <h1 className="text-3xl md:text-5xl font-black text-white mt-1">{student.name}</h1>
            <p className="text-sm text-slate-400 mt-1">Classroom: {student.class_name} | {student.school_name}</p>
          </div>

          <div className="flex items-center gap-4">
            <Link 
              href="/profile"
              className="rounded-xl border border-slate-850 bg-slate-900/60 hover:bg-slate-850 px-4 py-2.5 text-xs font-bold transition-all text-slate-300"
            >
              Print ID Portfolio
            </Link>
            <button 
              onClick={handleLogout}
              className="flex items-center gap-1.5 rounded-xl border border-red-500/30 hover:border-red-500/80 bg-red-950/20 px-4 py-2.5 text-xs font-bold text-red-400 hover:text-red-300 transition-all"
            >
              <LogOut className="w-4 h-4" /> Log Out
            </button>
          </div>
        </div>

        {/* 2-Column Main Workspace */}
        <div className="grid gap-8 lg:grid-cols-3">
          
          {/* Left Columns (Dashboard Metrics & Statuses) */}
          <div className="lg:col-span-2 space-y-6">
            
            {/* Payment & Eligibility Quick Alerts */}
            {!isPaid && (
              <div className="rounded-3xl bg-yellow-500/10 border border-yellow-500/20 p-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
                <div className="flex gap-4">
                  <div className="p-3 rounded-2xl bg-yellow-500/10 text-yellow-500 shrink-0 mt-0.5">
                    <AlertTriangle className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="font-bold text-yellow-500 text-lg">Registration Payment Pending</h3>
                    <p className="text-slate-300 text-sm mt-1">
                      A registration fee of ₹50 is required. Your tournament certificate is locked until payment is verified.
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => setShowPaymentModal(true)}
                  className="w-full md:w-auto shrink-0 flex items-center justify-center gap-2 rounded-xl bg-yellow-500 hover:bg-yellow-400 text-slate-950 font-bold px-5 py-3 text-sm transition-colors shadow-lg shadow-yellow-500/5"
                >
                  <CreditCard className="w-4 h-4" /> Pay & Verify Now
                </button>
              </div>
            )}

            {isPaid && (
              <div className="rounded-3xl bg-green-500/10 border border-green-500/20 p-6 flex items-center gap-4">
                <div className="p-3 rounded-2xl bg-green-500/10 text-green-400 shrink-0">
                  <CheckCircle className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-bold text-green-400 text-lg">Payment Verified</h3>
                  <p className="text-slate-300 text-sm mt-1">
                    Your enrollment fee is cleared. All performance certificates and tournament badges are fully unlocked!
                  </p>
                </div>
              </div>
            )}

            {/* Profile Statistics Grid */}
            <div className="grid gap-5 sm:grid-cols-3">
              <StatCard title="Tournament Roll No" value={student.student_id} icon={<User className="w-4 h-4 text-slate-400" />} />
              <StatCard title="Current Rank" value={score > 0 ? `#${student.rank}` : "Pending Exam"} icon={<Award className="w-4 h-4 text-slate-400" />} />
              <StatCard title="Performance Level" value={score > 0 ? student.performance : "Not Started"} icon={<GraduationCap className="w-4 h-4 text-slate-400" />} />
            </div>

            {/* Main Tournament Action Widget */}
            <div className="rounded-3xl bg-slate-900 border border-slate-850 p-8 shadow-xl relative overflow-hidden">
              <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-green-500 to-emerald-400" />
              
              <h2 className="text-2xl font-black text-white">First Month Tournament Phase</h2>
              <p className="text-slate-300 text-sm mt-2 leading-relaxed">
                Topic: Logical thinking, arithmetic patterns, simple predictions, and HTML/CSS web design basics. 
                You have 20 minutes to complete 10 questions.
              </p>

              {score === 0 ? (
                <div className="mt-8 flex flex-col sm:flex-row gap-4 items-center">
                  <Link
                    href="/quiz"
                    className="w-full sm:w-auto flex items-center justify-center gap-2 rounded-xl bg-green-500 hover:bg-green-400 text-slate-950 font-bold px-8 py-4 text-base transition-colors shadow-lg shadow-green-500/10 animate-bounce"
                  >
                    Launch Tournament Exam <Play className="w-4 h-4 fill-slate-950" />
                  </Link>
                  <p className="text-xs text-slate-400">
                    * Make sure you have completed the practice labs before entering the tournament.
                  </p>
                </div>
              ) : (
                <div className="mt-8 border-t border-slate-850 pt-6">
                  <div className="grid gap-4 sm:grid-cols-2 bg-slate-950/60 rounded-2xl p-5 border border-slate-850">
                    <div>
                      <p className="text-xs font-bold text-slate-400 uppercase">Exam Score</p>
                      <h4 className="text-3xl font-extrabold text-green-400 mt-1">{score} / 100</h4>
                    </div>
                    <div>
                      <p className="text-xs font-bold text-slate-400 uppercase">Certificate Status</p>
                      <h4 className="text-lg font-bold text-slate-200 mt-1">
                        {isPaid ? "Eligible & Unlocked" : "Payment Required to Unlock"}
                      </h4>
                    </div>
                  </div>

                  <div className="mt-6 flex flex-wrap gap-4">
                    {isPaid ? (
                      <Link
                        href={`/certificate/${student.certificate_id}`}
                        className="rounded-xl bg-yellow-500 hover:bg-yellow-400 text-slate-950 font-bold px-6 py-3 text-sm transition-colors"
                      >
                        Claim Digital Certificate 📜
                      </Link>
                    ) : (
                      <button
                        onClick={() => setShowPaymentModal(true)}
                        className="rounded-xl bg-slate-800 text-slate-400 font-bold px-6 py-3 text-sm border border-slate-700 cursor-not-allowed flex items-center gap-2"
                      >
                        Certificate Locked 🔒 (Pay ₹50)
                      </button>
                    )}
                    <Link
                      href="/leaderboard"
                      className="rounded-xl border border-slate-800 bg-slate-950 px-6 py-3 font-bold text-slate-300 hover:text-white transition-all text-sm"
                    >
                      View Live Leaderboard
                    </Link>
                  </div>
                </div>
              )}
            </div>

          </div>

          {/* Right Column (Practice Tracker & Announcements) */}
          <div className="space-y-6">
            
            {/* Interactive Practice Tracker */}
            <div className="rounded-3xl bg-slate-900 border border-slate-850 p-6 shadow-xl">
              <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                <BookOpen className="w-5 h-5 text-green-400" /> Practice Progress
              </h3>

              <div className="space-y-5">
                <PracticeBar 
                  title="Quiz Lab" 
                  percent={quizPracticeDone} 
                  score={practiceStats?.["quiz"]?.score} 
                  total={practiceStats?.["quiz"]?.total}
                  href="/practice/quiz" 
                />
                <PracticeBar 
                  title="Logic Arena" 
                  percent={logicPracticeDone} 
                  score={practiceStats?.["logic"]?.score} 
                  total={practiceStats?.["logic"]?.total}
                  href="/practice/logic" 
                />
                <PracticeBar 
                  title="Coding Basics" 
                  percent={codingPracticeDone} 
                  score={practiceStats?.["coding"]?.score} 
                  total={practiceStats?.["coding"]?.total}
                  href="/practice/coding" 
                />
              </div>

              <div className="mt-6 pt-5 border-t border-slate-850 text-center">
                <Link
                  href="/practice"
                  className="inline-block text-xs font-bold text-green-400 hover:underline"
                >
                  Enter Practice Lab Hub &rarr;
                </Link>
              </div>
            </div>

            {/* Dynamic Announcement Widget */}
            <div className="rounded-3xl bg-slate-900 border border-slate-850 p-6 shadow-xl">
              <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                <Clock className="w-5 h-5 text-green-400" /> Announcements
              </h3>

              <div className="space-y-4">
                <div className="border-l-2 border-green-500 pl-3 py-1">
                  <p className="text-xs font-bold text-green-400 uppercase tracking-widest">Live Updates</p>
                  <p className="text-sm font-semibold text-slate-200 mt-1">Tournament registration open</p>
                  <p className="text-xs text-slate-400 mt-0.5">Ensure payment is registered before closing date.</p>
                </div>
                <div className="border-l-2 border-slate-700 pl-3 py-1">
                  <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">Rule Notice</p>
                  <p className="text-sm font-semibold text-slate-200 mt-1">Certificates criteria</p>
                  <p className="text-xs text-slate-400 mt-0.5">Score &gt;= 90 unlocks Gold Performer badges.</p>
                </div>
              </div>
            </div>

          </div>

        </div>

      </section>

      {/* --- PREMIUM MOCK PAYMENT MODAL --- */}
      {showPaymentModal && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-800 rounded-3xl w-full max-w-md p-6 relative shadow-2xl">
            <h3 className="text-xl font-bold text-white mb-2 flex items-center gap-2">
              <CreditCard className="w-5 h-5 text-yellow-500" /> Complete Registration Fee
            </h3>
            <p className="text-xs text-slate-400 mb-6">
              Complete the tournament enrollment to unlock certificate generations, verified ranks, and leaderboard badges.
            </p>

            <div className="bg-slate-950 border border-slate-850 rounded-2xl p-5 mb-6 text-center">
              <div className="mx-auto w-36 h-36 bg-white rounded-xl p-2 flex items-center justify-center mb-4">
                {/* SVG Mock QR Code */}
                <svg viewBox="0 0 100 100" className="w-32 h-32 text-slate-950">
                  <rect width="100" height="100" fill="white" />
                  <path d="M5,5 h20 v20 h-20 z M10,10 h10 v10 h-10 z" fill="currentColor" />
                  <path d="M75,5 h20 v20 h-20 z M80,10 h10 v10 h-10 z" fill="currentColor" />
                  <path d="M5,75 h20 v20 h-20 z M10,80 h10 v10 h-10 z" fill="currentColor" />
                  <path d="M35,10 h10 v5 h-10 z M55,5 h10 v10 h-10 z" fill="currentColor" />
                  <path d="M30,30 h10 v10 h-10 z M45,45 h20 v10 h-20 z M70,35 h15 v15 h-15 z" fill="currentColor" />
                  <path d="M35,65 h15 v15 h-15 z M60,70 h20 v10 h-20 z" fill="currentColor" />
                </svg>
              </div>

              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-900 border border-slate-850 text-xs font-mono font-bold text-slate-300">
                <QrCode className="w-3.5 h-3.5" /> UPI ID: pay.smartindia@upi
              </span>

              <p className="text-2xl font-black text-white mt-4">Amount: ₹50</p>
            </div>

            <div className="space-y-3">
              <button
                onClick={simulatePaymentApproval}
                className="w-full flex items-center justify-center gap-2 rounded-xl bg-green-500 hover:bg-green-400 text-slate-950 font-bold p-3 text-sm transition-colors shadow-lg shadow-green-500/10"
              >
                Simulate Payment Approval (Demo)
              </button>
              <button
                onClick={() => setShowPaymentModal(false)}
                className="w-full rounded-xl border border-slate-800 bg-slate-950 hover:bg-slate-850 p-3 text-sm text-slate-400 hover:text-white font-bold transition-all text-center"
              >
                Cancel / Pay Later
              </button>
            </div>

            <p className="text-[10px] text-center text-slate-500 mt-4 leading-relaxed">
              * UPI payment is automatically verified via transaction tracking ID matching. In this mockup sandbox, the Simulate button immediately clears your payment status.
            </p>
          </div>
        </div>
      )}

    </main>
  );
}

function StatCard({ title, value, icon }: { title: string; value: string; icon: React.ReactNode }) {
  return (
    <div className="rounded-2xl bg-slate-900 border border-slate-850 p-5 flex items-center justify-between shadow-md">
      <div>
        <p className="text-xs text-slate-400 font-semibold uppercase tracking-wider">{title}</p>
        <h4 className="text-lg font-bold text-slate-200 mt-1">{value}</h4>
      </div>
      <div className="p-2.5 rounded-xl bg-slate-950 border border-slate-850 shrink-0">
        {icon}
      </div>
    </div>
  );
}

function PracticeBar({ 
  title, 
  percent, 
  score, 
  total,
  href 
}: { 
  title: string; 
  percent: number; 
  score?: number; 
  total?: number;
  href: string;
}) {
  return (
    <div>
      <div className="flex justify-between items-center mb-1 text-sm">
        <span className="font-semibold text-slate-300">{title}</span>
        <span className="text-xs text-slate-400 font-bold">
          {score !== undefined && total !== undefined ? `Result: ${score}/${total}` : `${percent}%`}
        </span>
      </div>

      <div className="flex items-center gap-3">
        <div className="flex-1 h-2 rounded-full bg-slate-950 border border-slate-850 overflow-hidden">
          <div
            className={`h-full transition-all duration-300 ${percent === 100 ? "bg-green-500" : "bg-slate-700"}`}
            style={{ width: `${percent}%` }}
          />
        </div>
        
        <Link
          href={href}
          className={`shrink-0 rounded-lg px-2.5 py-1 text-[10px] font-bold uppercase transition-all ${
            percent === 100 
              ? "bg-slate-800 text-green-400 hover:bg-slate-750" 
              : "bg-green-500 text-slate-950 hover:bg-green-400"
          }`}
        >
          {percent === 100 ? "Redo" : "Start"}
        </Link>
      </div>
    </div>
  );
}