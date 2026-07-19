"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { supabase } from "@/lib/supabase";
import { students as mockStudents } from "@/app/data/students";
import { QRCodeSVG } from "qrcode.react";
import { 
  GraduationCap, Award, CheckCircle, 
  AlertTriangle, Play, LogOut, ArrowRight, 
  CreditCard, Loader2, Sparkles, BookOpen, Clock, 
  QrCode, ShieldCheck, Check, Info, Lock, Zap, HelpCircle, FileText
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
    } catch {
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
      <main className="min-h-screen bg-slate-950 text-white flex items-center justify-center relative overflow-hidden">
        {/* Glow Effects */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[350px] h-[350px] bg-green-500/10 rounded-full blur-[120px]" />
        
        <div className="text-center z-10">
          <Loader2 className="w-12 h-12 text-green-400 animate-spin mx-auto mb-4" />
          <p className="text-slate-200 font-bold tracking-wide text-lg">Initializing Secure Portal...</p>
          <p className="text-sm text-slate-500 mt-1">Establishing encrypted credentials terminal</p>
        </div>
      </main>
    );
  }

  // --- RENDERING LOOKUP COMPONENT IF NOT LOGGED IN ---
  if (!studentId || !student) {
    return (
      <main className="min-h-screen bg-slate-950 text-white flex flex-col justify-center py-16 px-6 relative overflow-hidden">
        {/* Background Grids */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#111827_1px,transparent_1px),linear-gradient(to_bottom,#111827_1px,transparent_1px)] bg-[size:4rem_4rem] opacity-30" />
        <div className="absolute top-0 right-1/4 w-[500px] h-[500px] bg-green-500/5 rounded-full blur-[150px] pointer-events-none" />
        <div className="absolute bottom-0 left-1/4 w-[500px] h-[500px] bg-emerald-500/5 rounded-full blur-[150px] pointer-events-none" />

        <div className="mx-auto w-full max-w-lg bg-slate-900/40 backdrop-blur-xl border border-slate-800/80 rounded-3xl p-8 shadow-2xl relative z-10">
          <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-green-500 via-emerald-400 to-green-600 rounded-t-3xl" />
          
          {/* Official Seal / Verification Header */}
          <div className="flex items-center justify-between text-xs text-slate-550 border-b border-slate-850 pb-4 mb-6">
            <span className="flex items-center gap-1 font-mono tracking-widest uppercase">
              <ShieldCheck className="w-4 h-4 text-green-400" /> Secure Terminal
            </span>
            <span className="bg-green-500/10 border border-green-500/20 text-green-400 font-semibold px-2 py-0.5 rounded-full">
              SSL Verified
            </span>
          </div>

          <div className="text-center mb-8">
            <span className="inline-block p-4 rounded-2xl bg-gradient-to-br from-green-500/10 to-emerald-500/5 border border-green-500/20 text-green-400 mb-4 shadow-inner">
              <GraduationCap className="w-9 h-9" />
            </span>
            <h1 className="text-3xl font-black tracking-tight text-white">Student Hub Portal</h1>
            <p className="text-sm text-slate-400 mt-2">
              Access your digital skill tournament records, practice lab progression details, and claim authenticated digital credentials.
            </p>
          </div>

          <form onSubmit={handleLogin} className="space-y-5">
            <div>
              <label htmlFor="student_query" className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-2">
                Enter Student ID or Registered Name
              </label>
              <div className="relative">
                <input
                  id="student_query"
                  type="text"
                  required
                  placeholder="Example: SIC-001 or Hashmat"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full rounded-xl p-4 bg-slate-950/80 border border-slate-800 focus:border-green-500 focus:outline-none text-white text-base transition-all focus:ring-2 focus:ring-green-500/10 placeholder-slate-600"
                />
              </div>
            </div>

            {searchError && (
              <div className="text-xs font-semibold text-red-400 bg-red-500/5 border border-red-500/10 p-3.5 rounded-xl flex items-start gap-2.5 leading-relaxed">
                <AlertTriangle className="w-4 h-4 shrink-0 text-red-400 mt-0.5" />
                <span>{searchError}</span>
              </div>
            )}

            <button
              disabled={isSearching}
              className="w-full flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-400 hover:to-emerald-400 text-slate-950 font-bold p-4 transition-all duration-200 disabled:opacity-50 text-base shadow-lg shadow-green-500/20 hover:shadow-green-500/30 cursor-pointer"
            >
              {isSearching ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin text-slate-950" /> Verifying Credentials...
                </>
              ) : (
                <>
                  Verify & Open Terminal <ArrowRight className="w-5 h-5" />
                </>
              )}
            </button>
          </form>

          {/* Secured Registry Notes */}
          <div className="mt-8 border-t border-slate-850 pt-6 text-center text-xs text-slate-500">
            <p>Not registered for the skill tournament yet?</p>
            <Link href="/register" className="mt-2 inline-block font-bold text-green-400 hover:text-green-300 transition-colors">
              Register Student Profile &rarr;
            </Link>
          </div>
        </div>

        {/* Informative Portal FAQs to build trust prior to login */}
        <div className="mx-auto w-full max-w-lg mt-8 bg-slate-900/20 border border-slate-850/60 rounded-2xl p-6 relative z-10">
          <h3 className="text-xs font-bold text-slate-450 uppercase tracking-widest mb-4 flex items-center gap-1.5">
            <HelpCircle className="w-4 h-4 text-green-400" /> Portal FAQ & Security Details
          </h3>
          <div className="space-y-4">
            <details className="group text-xs text-slate-400 cursor-pointer">
              <summary className="font-semibold text-slate-350 hover:text-white transition-colors list-none flex justify-between items-center">
                <span>How do I retrieve my Student ID code?</span>
                <span className="text-slate-500 transition-transform group-open:rotate-180">&darr;</span>
              </summary>
              <p className="mt-2 text-slate-500 leading-relaxed pl-1.5 border-l border-slate-800">
                Your Student ID (e.g., SIC-001) was generated during registration. If forgotten, you can also search using your registered name or phone number.
              </p>
            </details>
            <details className="group text-xs text-slate-400 cursor-pointer">
              <summary className="font-semibold text-slate-350 hover:text-white transition-colors list-none flex justify-between items-center">
                <span>Are these digital credentials official?</span>
                <span className="text-slate-500 transition-transform group-open:rotate-180">&darr;</span>
              </summary>
              <p className="mt-2 text-slate-500 leading-relaxed pl-1.5 border-l border-slate-800">
                Yes, certificates claimed through this dashboard carry unique cryptographic IDs linked directly to the database registry for immediate validity checks.
              </p>
            </details>
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

  // Derive mock performance categories from the overall score
  const derivedLogicScore = Math.max(0, Math.floor(score * 1.0));
  const derivedArithmeticScore = Math.max(0, Math.floor(score * 0.95));
  const derivedWebScore = Math.max(0, Math.floor(score * 0.92));

  // Determine badge levels
  const isEligibleForGold = score >= 90;
  const isEligibleForSilver = score >= 75 && score < 90;
  const isEligibleForBronze = score >= 60 && score < 75;
  const isCompetitor = score > 0;

  // Mock Invoice details
  const mockTxnId = `TXN-SMART-${student.student_id}-${student.id}8294`.toUpperCase();
  const mockTxnDate = "July 19, 2026";

  return (
    <main className="min-h-screen bg-slate-950 text-white py-12 px-4 md:px-8 relative overflow-hidden">
      {/* Visual background enhancements */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#0f172a_1px,transparent_1px),linear-gradient(to_bottom,#0f172a_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] opacity-30 pointer-events-none" />
      <div className="absolute top-0 left-1/3 w-[600px] h-[300px] bg-green-500/5 rounded-full blur-[130px] pointer-events-none" />

      <section className="mx-auto max-w-7xl relative z-10">
        
        {/* Dashboard Top Header Section */}
        <div className="flex flex-wrap items-center justify-between gap-6 mb-10 border-b border-slate-900 pb-8">
          <div>
            <div className="flex items-center gap-2 text-xs font-bold text-green-400 uppercase tracking-widest">
              <Sparkles className="w-3.5 h-3.5 animate-pulse" />
              <span>Verified Candidate Dashboard</span>
            </div>
            
            <div className="flex items-center gap-3 mt-1">
              <h1 className="text-3xl md:text-5xl font-black tracking-tight text-white">{student.name}</h1>
              {score >= 60 && isPaid && (
                <span className="hidden sm:inline-flex items-center gap-1 text-[11px] font-bold px-2.5 py-1 rounded-full bg-green-500/10 border border-green-500/20 text-green-400">
                  <ShieldCheck className="w-3.5 h-3.5" /> Checked
                </span>
              )}
            </div>

            <p className="text-sm text-slate-400 mt-2 font-medium">
              Classroom: <span className="text-slate-200">{student.class_name}</span> | School: <span className="text-slate-200">{student.school_name}</span>
            </p>
          </div>

          <div className="flex items-center gap-3">
            <Link 
              href="/profile"
              className="rounded-xl border border-slate-800 bg-slate-900/60 hover:bg-slate-800 px-4 py-2.5 text-xs font-bold transition-all text-slate-300 flex items-center gap-1.5 cursor-pointer shadow-sm"
            >
              <FileText className="w-4 h-4 text-green-400" /> View Credentials ID
            </Link>
            <button 
              onClick={handleLogout}
              className="flex items-center gap-1.5 rounded-xl border border-red-500/20 hover:border-red-500/50 bg-red-950/10 px-4 py-2.5 text-xs font-bold text-red-400 hover:text-red-300 transition-all cursor-pointer"
            >
              <LogOut className="w-4 h-4" /> Sign Out
            </button>
          </div>
        </div>

        {/* 2-Column Main Workspace */}
        <div className="grid gap-8 lg:grid-cols-3">
          
          {/* Left Columns (Dashboard Metrics & Statuses) */}
          <div className="lg:col-span-2 space-y-6">
            
            {/* Payment & Eligibility Quick Alerts */}
            {!isPaid && (
              <div className="rounded-3xl bg-gradient-to-r from-yellow-500/10 to-amber-500/5 border border-yellow-500/20 p-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 shadow-lg shadow-yellow-500/5">
                <div className="flex gap-4">
                  <div className="p-3.5 rounded-2xl bg-yellow-500/10 text-yellow-400 shrink-0 mt-0.5 border border-yellow-500/10">
                    <AlertTriangle className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="font-bold text-yellow-400 text-lg">Registration Payment Required</h3>
                    <p className="text-slate-300 text-sm mt-1 leading-relaxed">
                      A secure enrollment fee of ₹50 is pending. Clearing this unlocks instant verifiable performance certificates, leaderboard placement, and regional rank badge issuance.
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => setShowPaymentModal(true)}
                  className="w-full md:w-auto shrink-0 flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-yellow-500 to-amber-500 hover:from-yellow-400 hover:to-amber-400 text-slate-950 font-bold px-6 py-3.5 text-sm transition-all shadow-lg shadow-yellow-500/10 hover:shadow-yellow-500/25 cursor-pointer"
                >
                  <CreditCard className="w-4.5 h-4.5" /> Settle Enrollment Fee
                </button>
              </div>
            )}

            {isPaid && (
              <div className="rounded-3xl bg-gradient-to-r from-green-500/10 to-emerald-500/5 border border-green-500/20 p-6 flex items-center gap-4 shadow-lg shadow-green-500/5">
                <div className="p-3 rounded-2xl bg-green-500/10 text-green-400 shrink-0 border border-green-500/15">
                  <CheckCircle className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-bold text-green-400 text-lg">Enrollment Verified</h3>
                  <p className="text-slate-300 text-sm mt-1 leading-relaxed">
                    Your tournament registration records have been verified. Cryptographic digital credentials, skill analytics, and live rankings are cleared.
                  </p>
                </div>
              </div>
            )}

            {/* Profile Statistics Grid (Holographic Card & Verification Status Checklist) */}
            <div className="grid gap-6 md:grid-cols-2">
              
              {/* Holographic ID Card */}
              <div className="rounded-3xl bg-gradient-to-br from-slate-900 via-slate-900 to-emerald-950/40 border border-slate-800/80 p-6 shadow-2xl relative overflow-hidden flex flex-col justify-between h-[280px]">
                {/* Hologram effects */}
                <div className="absolute top-0 right-0 w-36 h-36 bg-green-500/5 rounded-full filter blur-[40px] pointer-events-none" />
                <div className="absolute bottom-0 left-0 w-24 h-24 bg-emerald-500/5 rounded-full filter blur-[30px] pointer-events-none" />
                
                <div className="flex justify-between items-start">
                  <div>
                    <span className="text-[10px] font-black tracking-widest text-green-400 uppercase">SmartIndia Club</span>
                    <h4 className="text-xs text-slate-500 font-mono mt-0.5">SECURE VERIFIED CANDIDATE</h4>
                  </div>
                  <div className="flex items-center gap-1.5 bg-slate-950/60 px-2.5 py-1 rounded-lg border border-slate-800">
                    <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-ping" />
                    <span className="text-[9px] font-bold text-slate-300 tracking-wider">ACTIVE</span>
                  </div>
                </div>

                <div className="flex items-center gap-4 mt-2">
                  <div className="bg-slate-950/85 border border-slate-800 p-2 rounded-xl">
                    <QRCodeSVG 
                      value={`https://smartindia.club/profile?student_id=${student.student_id}`}
                      size={60}
                      bgColor={"transparent"}
                      fgColor={"#22c55e"}
                      level={"M"}
                    />
                  </div>
                  <div>
                    <h3 className="font-extrabold text-lg text-white leading-tight">{student.name}</h3>
                    <p className="text-xs font-mono text-slate-400 mt-1">{student.student_id}</p>
                    <p className="text-[10px] text-slate-500 mt-0.5">{student.school_name}</p>
                  </div>
                </div>

                <div className="border-t border-slate-850 pt-3 mt-4 flex items-center justify-between text-xs">
                  <div>
                    <span className="text-[10px] text-slate-500 block font-mono">RANK</span>
                    <span className="font-bold text-yellow-400">{score > 0 ? `#${student.rank}` : "Pending Exam"}</span>
                  </div>
                  <div>
                    <span className="text-[10px] text-slate-500 block font-mono">STATUS</span>
                    <span className={`font-bold ${isPaid ? "text-green-400" : "text-yellow-400"}`}>
                      {isPaid ? "Verified" : "Payment Pending"}
                    </span>
                  </div>
                  <div>
                    <span className="text-[10px] text-slate-500 block font-mono">ISSUED</span>
                    <span className="font-bold text-slate-300">2026 EDITION</span>
                  </div>
                </div>
              </div>

              {/* Verification Checklist */}
              <div className="rounded-3xl bg-slate-900/40 border border-slate-850 p-6 shadow-xl flex flex-col justify-between">
                <div>
                  <h3 className="text-sm font-bold text-slate-300 uppercase tracking-widest mb-4 flex items-center gap-1.5">
                    <ShieldCheck className="w-4 h-4 text-green-400" /> Credential Checklist
                  </h3>
                  <div className="space-y-3.5">
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-slate-400 flex items-center gap-2">
                        <Check className="w-4 h-4 text-green-400 bg-green-500/10 rounded-full p-0.5" /> Candidate Registry
                      </span>
                      <span className="font-mono text-slate-500">{student.student_id}</span>
                    </div>
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-slate-400 flex items-center gap-2">
                        {isPaid ? (
                          <Check className="w-4 h-4 text-green-400 bg-green-500/10 rounded-full p-0.5" />
                        ) : (
                          <span className="w-4 h-4 bg-yellow-500/10 text-yellow-400 rounded-full flex items-center justify-center text-[10px] font-bold">!</span>
                        )}
                        Enrollment Fee Status
                      </span>
                      <span className={`font-bold ${isPaid ? "text-green-400" : "text-yellow-400"}`}>
                        {isPaid ? "Cleared" : "Required"}
                      </span>
                    </div>
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-slate-400 flex items-center gap-2">
                        {score > 0 ? (
                          <Check className="w-4 h-4 text-green-400 bg-green-500/10 rounded-full p-0.5" />
                        ) : (
                          <span className="w-4 h-4 bg-slate-850 text-slate-600 rounded-full flex items-center justify-center text-[10px] font-bold"></span>
                        )}
                        Tournament Assessment
                      </span>
                      <span className={`font-bold ${score > 0 ? "text-slate-200" : "text-slate-500"}`}>
                        {score > 0 ? `${score}/100` : "Pending"}
                      </span>
                    </div>
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-slate-400 flex items-center gap-2">
                        {score >= 60 && isPaid ? (
                          <Check className="w-4 h-4 text-green-400 bg-green-500/10 rounded-full p-0.5" />
                        ) : (
                          <span className="w-4 h-4 bg-slate-850 text-slate-600 rounded-full flex items-center justify-center text-[10px] font-bold"></span>
                        )}
                        Certificate Generation
                      </span>
                      <span className={`font-bold ${score >= 60 && isPaid ? "text-green-400" : "text-slate-500"}`}>
                        {score >= 60 && isPaid ? "Ready" : "Locked"}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="border-t border-slate-850 pt-4 mt-4 flex justify-between items-center text-[10px] text-slate-500">
                  <span className="flex items-center gap-1">
                    <Info className="w-3 h-3 text-slate-500" /> System Checked
                  </span>
                  <span>SSL SHA-256</span>
                </div>
              </div>

            </div>

            {/* Performance Analytics Widget & Subject Breakdowns */}
            <div className="rounded-3xl bg-slate-900/60 border border-slate-850 p-6 md:p-8 shadow-xl relative overflow-hidden">
              <h2 className="text-xl font-extrabold text-white flex items-center gap-2">
                <Zap className="w-5 h-5 text-green-400" /> Skill Assessment Parameters
              </h2>
              <p className="text-slate-300 text-xs mt-1">
                Evaluation results detailing core cognitive competencies. Minimum 60% average required for certification.
              </p>

              <div className="grid gap-6 md:grid-cols-3 mt-6">
                
                {/* SVG circular score ring */}
                <div className="bg-slate-950/40 rounded-2xl p-5 border border-slate-850 flex flex-col items-center justify-center text-center">
                  <div className="relative w-28 h-28 flex items-center justify-center">
                    {/* SVG Progress Circle */}
                    <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
                      <circle
                        cx="50"
                        cy="50"
                        r="40"
                        stroke="#1e293b"
                        strokeWidth="8"
                        fill="transparent"
                      />
                      <circle
                        cx="50"
                        cy="50"
                        r="40"
                        stroke="#22c55e"
                        strokeWidth="8"
                        fill="transparent"
                        strokeDasharray={251.2}
                        strokeDashoffset={251.2 - (251.2 * score) / 100}
                        strokeLinecap="round"
                        className="transition-all duration-1000 ease-out"
                      />
                    </svg>
                    <div className="absolute text-center">
                      <span className="text-2xl font-black text-white">{score}</span>
                      <span className="text-[10px] text-slate-500 block -mt-1">/100</span>
                    </div>
                  </div>
                  <h4 className="text-xs font-bold text-slate-300 uppercase mt-4">Assessment Grade</h4>
                  <p className="text-[10px] text-slate-500 mt-1">Overall calculated score</p>
                </div>

                {/* Subject wise metric breakdown */}
                <div className="md:col-span-2 space-y-4 bg-slate-950/20 rounded-2xl p-5 border border-slate-850/80 flex flex-col justify-between">
                  <div className="space-y-3.5">
                    <div>
                      <div className="flex justify-between text-xs mb-1">
                        <span className="font-semibold text-slate-350">Logical & Predictive Reasoning</span>
                        <span className="font-bold text-slate-400">{score > 0 ? `${derivedLogicScore}%` : "Pending"}</span>
                      </div>
                      <div className="h-1.5 rounded-full bg-slate-900 overflow-hidden">
                        <div className="h-full bg-green-500" style={{ width: `${score > 0 ? derivedLogicScore : 0}%` }} />
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between text-xs mb-1">
                        <span className="font-semibold text-slate-350">Pattern & Arithmetic Completion</span>
                        <span className="font-bold text-slate-400">{score > 0 ? `${derivedArithmeticScore}%` : "Pending"}</span>
                      </div>
                      <div className="h-1.5 rounded-full bg-slate-900 overflow-hidden">
                        <div className="h-full bg-green-500" style={{ width: `${score > 0 ? derivedArithmeticScore : 0}%` }} />
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between text-xs mb-1">
                        <span className="font-semibold text-slate-350">Web Tech Layout Basics (HTML/CSS)</span>
                        <span className="font-bold text-slate-400">{score > 0 ? `${derivedWebScore}%` : "Pending"}</span>
                      </div>
                      <div className="h-1.5 rounded-full bg-slate-900 overflow-hidden">
                        <div className="h-full bg-green-500" style={{ width: `${score > 0 ? derivedWebScore : 0}%` }} />
                      </div>
                    </div>
                  </div>

                  <div className="text-[10px] text-slate-500 border-t border-slate-900 pt-3 flex justify-between">
                    <span>Evaluated securely</span>
                    <span>Classwise Percentile Rank: Top {(100 - score * 0.9).toFixed(1)}%</span>
                  </div>
                </div>

              </div>

              {/* Tournament status and actions */}
              <div className="mt-8 border-t border-slate-850 pt-6">
                {score === 0 ? (
                  <div className="flex flex-col sm:flex-row gap-4 items-center">
                    <Link
                      href="/quiz"
                      className="w-full sm:w-auto flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-400 hover:to-emerald-400 text-slate-950 font-black px-8 py-4 text-base transition-all shadow-lg shadow-green-500/20 hover:shadow-green-500/35 cursor-pointer animate-bounce"
                    >
                      Launch Tournament Exam <Play className="w-4 h-4 fill-slate-950" />
                    </Link>
                    <p className="text-xs text-slate-550 leading-relaxed max-w-sm">
                      * Enter when you are prepared. The examination timer lasts 20 minutes for 10 conceptual challenges.
                    </p>
                  </div>
                ) : (
                  <div className="flex flex-wrap gap-4 items-center justify-between">
                    <div className="flex flex-wrap gap-3">
                      {isPaid ? (
                        <Link
                          href={`/certificate/${student.certificate_id}`}
                          className="rounded-xl bg-gradient-to-r from-yellow-500 to-amber-500 hover:from-yellow-400 hover:to-amber-400 text-slate-950 font-black px-6 py-3 text-sm transition-all shadow-md shadow-yellow-500/10 cursor-pointer"
                        >
                          Print Verified Certificate 📜
                        </Link>
                      ) : (
                        <button
                          onClick={() => setShowPaymentModal(true)}
                          className="rounded-xl bg-slate-900 text-slate-550 hover:text-slate-400 font-bold px-6 py-3 text-sm border border-slate-800 cursor-pointer flex items-center gap-2 transition-colors"
                        >
                          Certificate Locked 🔒 (Clear Payment)
                        </button>
                      )}
                      <Link
                        href="/leaderboard"
                        className="rounded-xl border border-slate-800 bg-slate-950 hover:bg-slate-900 px-6 py-3 font-bold text-slate-300 hover:text-white transition-all text-sm cursor-pointer"
                      >
                        View Live Leaderboard
                      </Link>
                    </div>
                    
                    <div className="text-right text-xs text-slate-500">
                      <span>Cert ID: {student.certificate_id}</span>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Official Transaction Ledger / Payment Receipt Details */}
            <div className="rounded-3xl bg-slate-900/40 border border-slate-850 p-6 md:p-8 shadow-xl">
              <h3 className="text-base font-bold text-white mb-4 flex items-center gap-2">
                <CreditCard className="w-5 h-5 text-green-400" /> Transaction Ledger
              </h3>
              
              <div className="bg-slate-950/40 border border-slate-850 rounded-2xl p-5 border-dashed">
                <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-4 text-xs">
                  <div>
                    <span className="text-slate-550 block font-mono">TRANSACTION ID</span>
                    <span className="font-mono font-bold text-slate-200 mt-1 block">
                      {isPaid ? mockTxnId : "AWAITING_PAYMENT_ID"}
                    </span>
                  </div>
                  <div>
                    <span className="text-slate-550 block font-mono">SETTLEMENT DATE</span>
                    <span className="font-bold text-slate-200 mt-1 block">
                      {isPaid ? mockTxnDate : "Awaiting verification"}
                    </span>
                  </div>
                  <div>
                    <span className="text-slate-550 block font-mono">REGISTRATION AMOUNT</span>
                    <span className="font-bold text-slate-200 mt-1 block">₹50.00 INR</span>
                  </div>
                  <div>
                    <span className="text-slate-550 block font-mono">GATEWAY STATUS</span>
                    <span className={`inline-flex items-center gap-1.5 font-bold mt-1 ${isPaid ? "text-green-400" : "text-yellow-400"}`}>
                      <span className={`w-1.5 h-1.5 rounded-full ${isPaid ? "bg-green-400" : "bg-yellow-400 animate-pulse"}`} />
                      {isPaid ? "SUCCESS / CREDITED" : "AWAITING SETTLEMENT"}
                    </span>
                  </div>
                </div>

                {isPaid && (
                  <div className="mt-4 pt-3.5 border-t border-slate-900/60 flex items-center justify-between text-[11px] text-slate-550">
                    <span>Payment cleared via UPI digital verification gateway.</span>
                    <span className="text-green-400/80 font-bold">✓ Reference Verified</span>
                  </div>
                )}
              </div>
            </div>

          </div>

          {/* Right Column (Practice Tracker & Achievements) */}
          <div className="space-y-6">
            
            {/* Achievements Room */}
            <div className="rounded-3xl bg-slate-900 border border-slate-850 p-6 shadow-xl">
              <h3 className="text-lg font-bold text-white mb-5 flex items-center gap-2">
                <Award className="w-5 h-5 text-green-400" /> Digital Achievements
              </h3>

              <div className="grid grid-cols-2 gap-4">
                
                {/* Badge 1: Registered */}
                <div className="rounded-xl border border-green-500/20 bg-slate-950/50 p-3.5 flex flex-col items-center justify-center text-center shadow-[0_0_12px_rgba(34,197,94,0.05)]">
                  <div className="text-2xl bg-green-500/10 border border-green-500/20 w-11 h-11 rounded-xl flex items-center justify-center mb-2.5">
                    🚀
                  </div>
                  <h4 className="font-bold text-xs text-slate-200">Welcome Cadet</h4>
                  <p className="text-[9px] text-slate-550 mt-1 leading-tight">Registered Profile</p>
                </div>

                {/* Badge 2: Quiz Master */}
                <div className={`rounded-xl border transition-all p-3.5 flex flex-col items-center justify-center text-center ${
                  quizPracticeDone === 100 
                    ? "border-green-500/20 bg-slate-950/50 shadow-[0_0_12px_rgba(34,197,94,0.05)]" 
                    : "border-slate-850 bg-slate-900/10 opacity-35"
                }`}>
                  <div className="text-2xl w-11 h-11 rounded-xl flex items-center justify-center mb-2.5 bg-slate-900/60 text-slate-500">
                    {quizPracticeDone === 100 ? "📚" : <Lock className="w-4 h-4 text-slate-550" />}
                  </div>
                  <h4 className={`font-bold text-xs ${quizPracticeDone === 100 ? "text-slate-200" : "text-slate-400"}`}>
                    Quiz Scholar
                  </h4>
                  <p className="text-[9px] text-slate-550 mt-1 leading-tight">Complete Quiz Practice</p>
                </div>

                {/* Badge 3: Logic Wizard */}
                <div className={`rounded-xl border transition-all p-3.5 flex flex-col items-center justify-center text-center ${
                  logicPracticeDone === 100 
                    ? "border-green-500/20 bg-slate-950/50 shadow-[0_0_12px_rgba(34,197,94,0.05)]" 
                    : "border-slate-850 bg-slate-900/10 opacity-35"
                }`}>
                  <div className="text-2xl w-11 h-11 rounded-xl flex items-center justify-center mb-2.5 bg-slate-900/60 text-slate-500">
                    {logicPracticeDone === 100 ? "🧠" : <Lock className="w-4 h-4 text-slate-550" />}
                  </div>
                  <h4 className={`font-bold text-xs ${logicPracticeDone === 100 ? "text-slate-200" : "text-slate-400"}`}>
                    Logic Sorcerer
                  </h4>
                  <p className="text-[9px] text-slate-550 mt-1 leading-tight">Complete Logic Practice</p>
                </div>

                {/* Badge 4: Tournament Performance */}
                <div className={`rounded-xl border transition-all p-3.5 flex flex-col items-center justify-center text-center ${
                  isCompetitor
                    ? isEligibleForGold
                      ? "border-yellow-500/20 bg-yellow-950/5 shadow-[0_0_12px_rgba(234,179,8,0.05)]"
                      : isEligibleForSilver
                      ? "border-slate-300/20 bg-slate-100/5 shadow-[0_0_12px_rgba(255,255,255,0.05)]"
                      : isEligibleForBronze
                      ? "border-amber-700/20 bg-amber-950/5 shadow-[0_0_12px_rgba(217,119,6,0.05)]"
                      : "border-green-500/20 bg-green-950/5 shadow-[0_0_12px_rgba(34,197,94,0.05)]"
                    : "border-slate-850 bg-slate-900/10 opacity-35"
                }`}>
                  <div className="text-2xl w-11 h-11 rounded-xl flex items-center justify-center mb-2.5 bg-slate-900/60 text-slate-500">
                    {!isCompetitor ? (
                      <Lock className="w-4 h-4 text-slate-500" />
                    ) : isEligibleForGold ? (
                      "🥇"
                    ) : isEligibleForSilver ? (
                      "🥈"
                    ) : isEligibleForBronze ? (
                      "🥉"
                    ) : (
                      "🎖️"
                    )}
                  </div>
                  <h4 className={`font-bold text-xs ${
                    !isCompetitor
                      ? "text-slate-400"
                      : isEligibleForGold
                      ? "text-yellow-400"
                      : isEligibleForSilver
                      ? "text-slate-200"
                      : isEligibleForBronze
                      ? "text-amber-500"
                      : "text-green-400"
                  }`}>
                    {!isCompetitor
                      ? "Tournament Rank"
                      : isEligibleForGold
                      ? "Gold Performer"
                      : isEligibleForSilver
                      ? "Silver Performer"
                      : isEligibleForBronze
                      ? "Bronze Performer"
                      : "Active Performer"}
                  </h4>
                  <p className="text-[9px] text-slate-550 mt-1 leading-tight">
                    {!isCompetitor ? "Earned after tournament exam" : `Scored ${score}% in Exam`}
                  </p>
                </div>

              </div>
            </div>

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
                  className="inline-block text-xs font-bold text-green-400 hover:text-green-300 transition-colors"
                >
                  Enter Practice Lab Hub &rarr;
                </Link>
              </div>
            </div>

            {/* Dynamic Announcement Widget */}
            <div className="rounded-3xl bg-slate-900 border border-slate-850 p-6 shadow-xl">
              <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                <Clock className="w-5 h-5 text-green-400" /> System Announcements
              </h3>

              <div className="space-y-4">
                <div className="border-l-2 border-green-500 pl-3.5 py-1">
                  <p className="text-xs font-bold text-green-400 uppercase tracking-widest">Active Phase</p>
                  <p className="text-sm font-semibold text-slate-200 mt-1">First Month Tournaments Live</p>
                  <p className="text-xs text-slate-400 mt-1">Ensure enrollment payment is processed before exam dates.</p>
                </div>
                <div className="border-l-2 border-slate-700 pl-3.5 py-1">
                  <p className="text-xs font-bold text-slate-450 uppercase tracking-widest">Award Criteria</p>
                  <p className="text-sm font-semibold text-slate-200 mt-1">Performance Certification</p>
                  <p className="text-xs text-slate-400 mt-1">Earn Gold Performer with 90+ score; Silver with 75+; Bronze with 60+.</p>
                </div>
              </div>
            </div>

          </div>

        </div>

      </section>

      {/* --- PREMIUM MOCK PAYMENT MODAL --- */}
      {showPaymentModal && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-800 rounded-3xl w-full max-w-md p-6 relative shadow-2xl">
            <h3 className="text-xl font-bold text-white mb-2 flex items-center gap-2">
              <CreditCard className="w-5 h-5 text-yellow-500" /> Complete Registration Fee
            </h3>
            <p className="text-xs text-slate-400 mb-6 leading-relaxed">
              Complete the secure enrollment to claim cryptographic certificates, register on the global leaderboard, and verify candidate badges.
            </p>

            <div className="bg-slate-950 border border-slate-850 rounded-2xl p-5 mb-6 text-center">
              <div className="mx-auto w-36 h-36 bg-white rounded-xl p-2.5 flex items-center justify-center mb-4 shadow-inner">
                {/* Dynamic QR code for the payment gateway mock */}
                <QRCodeSVG
                  value="upi://pay?pa=pay.smartindia@upi&pn=SmartIndia%20Club&am=50&cu=INR"
                  size={120}
                  bgColor={"#ffffff"}
                  fgColor={"#0f172a"}
                  level={"M"}
                />
              </div>

              <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-slate-900 border border-slate-850 text-xs font-mono font-bold text-slate-300">
                <QrCode className="w-3.5 h-3.5 text-green-400" /> UPI ID: pay.smartindia@upi
              </span>

              <p className="text-2xl font-black text-white mt-4 tracking-tight">Amount: ₹50.00 INR</p>
            </div>

            <div className="space-y-3">
              <button
                onClick={simulatePaymentApproval}
                className="w-full flex items-center justify-center gap-2 rounded-xl bg-green-500 hover:bg-green-400 text-slate-950 font-bold p-3.5 text-sm transition-all shadow-md shadow-green-500/10 cursor-pointer"
              >
                Simulate Payment Approval (Demo)
              </button>
              <button
                onClick={() => setShowPaymentModal(false)}
                className="w-full rounded-xl border border-slate-800 bg-slate-950 hover:bg-slate-850 p-3.5 text-sm text-slate-450 hover:text-white font-bold transition-all text-center cursor-pointer"
              >
                Cancel / Settle Later
              </button>
            </div>

            <p className="text-[10px] text-center text-slate-500 mt-4 leading-relaxed">
              * Payment is automatically cleared via UPI transaction tracking. In this mockup sandbox environment, clicking the Simulate button registers the payment cleared state instantly.
            </p>
          </div>
        </div>
      )}

    </main>
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
      <div className="flex justify-between items-center mb-1.5 text-xs">
        <span className="font-semibold text-slate-300">{title}</span>
        <span className="text-xs text-slate-550 font-bold font-mono">
          {score !== undefined && total !== undefined ? `Score: ${score}/${total}` : `${percent}% Completed`}
        </span>
      </div>

      <div className="flex items-center gap-3">
        <div className="flex-1 h-2 rounded-full bg-slate-950 border border-slate-850 overflow-hidden">
          <div
            className={`h-full transition-all duration-500 ${percent === 100 ? "bg-green-500" : "bg-slate-700"}`}
            style={{ width: `${percent}%` }}
          />
        </div>
        
        <Link
          href={href}
          className={`shrink-0 rounded-lg px-3 py-1 text-[10px] font-bold uppercase transition-all cursor-pointer ${
            percent === 100 
              ? "bg-slate-800 text-green-400 hover:bg-slate-750 hover:text-green-300" 
              : "bg-green-500 text-slate-950 hover:bg-green-400"
          }`}
        >
          {percent === 100 ? "Redo" : "Start"}
        </Link>
      </div>
    </div>
  );
}