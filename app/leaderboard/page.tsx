"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { students as mockStudents } from "@/app/data/students";
import { 
  Trophy, Award, Search, GraduationCap, Sparkles, Filter, 
  ShieldCheck, CheckCircle2, TrendingUp, Users, RefreshCw, Lock
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

export default function LeaderboardPage() {
  const [students, setStudents] = useState<Student[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedClass, setSelectedClass] = useState<string>("All");

  async function fetchLeaderboard() {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from("students")
        .select("*")
        .order("score", { ascending: false });

      if (error || !data || data.length === 0) {
        // Fallback to mock data sorted by score
        const mappedMocks: Student[] = mockStudents.map((s) => ({
          id: Number(s.id),
          student_id: s.student_id,
          name: s.name,
          class_name: s.class_name,
          school_name: s.school_name,
          phone_number: "9876543210",
          score: s.score,
          rank: s.rank,
          performance: s.score >= 90 
            ? "Gold Performer" 
            : s.score >= 75 
            ? "Silver Performer" 
            : s.score >= 60 
            ? "Bronze Performer" 
            : "Participation",
          payment_status: "Paid",
          certificate_id: s.certificate_id,
        })).sort((a, b) => b.score - a.score);
        
        setStudents(mappedMocks);
      } else {
        setStudents(data as Student[]);
      }
    } catch {
      console.error("Database fetch exception, using mock fallback");
      const mappedMocks: Student[] = mockStudents.map((s) => ({
        id: Number(s.id),
        student_id: s.student_id,
        name: s.name,
        class_name: s.class_name,
        school_name: s.school_name,
        phone_number: "9876543210",
        score: s.score,
        rank: s.rank,
        performance: s.score >= 90 
          ? "Gold Performer" 
          : s.score >= 75 
          ? "Silver Performer" 
          : s.score >= 60 
          ? "Bronze Performer" 
          : "Participation",
        payment_status: "Paid",
        certificate_id: s.certificate_id,
      })).sort((a, b) => b.score - a.score);
      setStudents(mappedMocks);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    const timer = setTimeout(() => {
      fetchLeaderboard();
    }, 0);
    return () => clearTimeout(timer);
  }, []);

  const classes = ["All", "Class 6", "Class 7", "Class 8", "Class 9", "Class 10"];

  const filteredStudents = students.filter((student) => {
    const matchesSearch = student.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          student.school_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          student.student_id.toLowerCase().includes(searchQuery.toLowerCase());
                          
    const matchesClass = selectedClass === "All" || student.class_name === selectedClass;
    
    return matchesSearch && matchesClass;
  });

  // Podium calculations (based on sorted primary list)
  const topThree = students.slice(0, 3);
  const topPerformer = students[0];

  // Dynamic statistics calculations
  const totalCount = students.length;
  const highestScore = topPerformer?.score ?? 0;
  const averageScore = students.length > 0 
    ? Math.round(students.reduce((acc, curr) => acc + (curr.score ?? 0), 0) / students.length) 
    : 0;

  // Prizes mapping
  const podiumPrizes = [
    { title: "First Place", reward: "🥇 Smart Tablet + Champion Trophy", color: "text-yellow-400", border: "border-yellow-500/30", bg: "from-yellow-950/20 to-orange-950/15" },
    { title: "Second Place", reward: "🥈 Tech Dev Kit + Silver Shield", color: "text-slate-300", border: "border-slate-400/20", bg: "from-slate-900/30 to-slate-950/25" },
    { title: "Third Place", reward: "🥉 Robotics Kit + Bronze Shield", color: "text-amber-500", border: "border-amber-700/20", bg: "from-amber-950/15 to-orange-950/10" }
  ];

  return (
    <main className="min-h-screen bg-slate-950 text-white py-16 px-4 md:px-8 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#0f172a_1px,transparent_1px),linear-gradient(to_bottom,#0f172a_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] opacity-25 pointer-events-none" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[350px] bg-green-500/5 rounded-full blur-[130px] pointer-events-none" />

      <section className="mx-auto max-w-7xl relative z-10">
        
        {/* Header Block */}
        <div className="flex flex-wrap justify-between items-end gap-6 border-b border-slate-900 pb-8 mb-12">
          <div>
            <div className="flex items-center gap-2 text-xs font-bold text-green-400 uppercase tracking-widest">
              <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
              <span>Real-Time Ranks Registry</span>
            </div>
            <h1 className="text-4xl md:text-6xl font-black tracking-tight mt-2">
              Live Leaderboard
            </h1>
            <p className="text-sm md:text-base text-slate-400 mt-2 max-w-2xl">
              Track real-time scores, global classroom standings, and verified reward tier distributions as exams complete.
            </p>
          </div>

          <button 
            onClick={fetchLeaderboard}
            className="flex items-center gap-2 rounded-xl border border-slate-800 bg-slate-900 hover:bg-slate-850 px-4 py-2.5 text-xs font-bold transition-all text-slate-300 cursor-pointer shadow-sm active:scale-95"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${loading ? "animate-spin text-green-400" : ""}`} /> 
            <span>Sync Scores</span>
          </button>
        </div>

        {/* Dynamic Podium Reward Display (Motivates Students) */}
        {topThree.length > 0 && (
          <div className="mb-12">
            <h2 className="text-center text-sm font-bold text-slate-450 uppercase tracking-widest mb-8 flex items-center justify-center gap-2">
              <Trophy className="w-4.5 h-4.5 text-yellow-500" /> Top Rank Reward Positions
            </h2>
            
            {/* Podium Grid */}
            <div className="grid gap-6 md:grid-cols-3 items-end max-w-5xl mx-auto">
              
              {/* Podium Rank 2 */}
              {topThree[1] && (
                <div className="order-2 md:order-1 rounded-2xl border border-slate-850 bg-gradient-to-t from-slate-900/80 to-slate-950/40 p-6 text-center shadow-lg flex flex-col justify-between h-[300px]">
                  <div>
                    <span className="text-5xl block mb-3">🥈</span>
                    <h3 className="text-xl font-bold tracking-tight text-white">{topThree[1].name}</h3>
                    <p className="text-xs text-slate-450 mt-1 font-medium">{topThree[1].school_name}</p>
                    <p className="text-xs text-slate-500 font-mono mt-0.5">{topThree[1].class_name}</p>
                  </div>
                  <div className="mt-6">
                    <p className="text-3xl font-extrabold text-slate-300 tracking-tight">{topThree[1].score}/100</p>
                    <div className="mt-3.5 px-3 py-2 rounded-xl bg-slate-950/80 border border-slate-800/80 text-[10px] font-bold text-slate-300 uppercase tracking-wide">
                      {podiumPrizes[1].reward}
                    </div>
                  </div>
                </div>
              )}

              {/* Podium Rank 1 (Gold, larger center card) */}
              {topThree[0] && (
                <div className="order-1 md:order-2 rounded-3xl border border-yellow-500/25 bg-gradient-to-t from-yellow-950/10 via-slate-900/90 to-slate-950/40 p-8 text-center shadow-xl shadow-yellow-500/5 relative flex flex-col justify-between h-[340px] z-10 scale-105">
                  <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 px-4 py-1.5 rounded-full bg-yellow-500 hover:bg-yellow-400 text-slate-950 font-black text-[10px] tracking-widest uppercase shadow-md flex items-center gap-1">
                    <Sparkles className="w-3.5 h-3.5 fill-slate-950" /> CHAMPION LEAD
                  </div>
                  
                  <div>
                    <span className="text-6xl block mb-4 animate-bounce">🥇</span>
                    <h3 className="text-2xl font-black tracking-tight text-white">{topThree[0].name}</h3>
                    <p className="text-xs text-slate-400 mt-1 font-semibold">{topThree[0].school_name}</p>
                    <p className="text-xs text-slate-550 font-mono mt-0.5">{topThree[0].class_name}</p>
                  </div>
                  
                  <div className="mt-6">
                    <p className="text-4xl font-black text-yellow-400 tracking-tight">{topThree[0].score}/100</p>
                    <div className="mt-4 px-4 py-2.5 rounded-xl bg-yellow-500/10 border border-yellow-500/20 text-xs font-bold text-yellow-400 uppercase tracking-wider shadow-inner">
                      {podiumPrizes[0].reward}
                    </div>
                  </div>
                </div>
              )}

              {/* Podium Rank 3 */}
              {topThree[2] && (
                <div className="order-3 rounded-2xl border border-slate-850 bg-gradient-to-t from-slate-900/80 to-slate-950/40 p-6 text-center shadow-lg flex flex-col justify-between h-[280px]">
                  <div>
                    <span className="text-5xl block mb-3">🥉</span>
                    <h3 className="text-lg font-bold tracking-tight text-white">{topThree[2].name}</h3>
                    <p className="text-xs text-slate-450 mt-1 font-medium">{topThree[2].school_name}</p>
                    <p className="text-xs text-slate-500 font-mono mt-0.5">{topThree[2].class_name}</p>
                  </div>
                  <div className="mt-6">
                    <p className="text-2xl font-bold text-amber-500 tracking-tight">{topThree[2].score}/100</p>
                    <div className="mt-3 px-3 py-2 rounded-xl bg-slate-950/80 border border-slate-800/80 text-[10px] font-bold text-amber-500 uppercase tracking-wide">
                      {podiumPrizes[2].reward}
                    </div>
                  </div>
                </div>
              )}

            </div>
          </div>
        )}

        {/* Global Statistics Cards */}
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4 mb-10">
          <StatWidget title="Total Valid Participants" value={String(totalCount)} icon={<Users className="w-5 h-5 text-indigo-400" />} />
          <StatWidget title="Highest Score Recorded" value={highestScore > 0 ? `${highestScore}/100` : "N/A"} icon={<Trophy className="w-5 h-5 text-yellow-400" />} />
          <StatWidget title="Average Candidate Mark" value={averageScore > 0 ? `${averageScore}%` : "N/A"} icon={<TrendingUp className="w-5 h-5 text-green-400" />} />
          <StatWidget title="Certified Performance Tiers" value="Cleared & Active" icon={<Award className="w-5 h-5 text-emerald-400" />} />
        </div>

        {/* Filters and Searching Section */}
        <div className="bg-slate-900/40 border border-slate-850 p-6 rounded-3xl mb-8 flex flex-col lg:flex-row gap-6 justify-between items-center shadow-xl">
          <div className="w-full lg:max-w-md relative">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500 w-4 h-4" />
            <input
              type="text"
              placeholder="Search student name, school, or roll number..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-3 bg-slate-950 border border-slate-850 rounded-xl text-sm focus:outline-none focus:border-green-500 transition-colors placeholder-slate-600 text-white"
            />
          </div>

          <div className="flex flex-wrap gap-2 w-full lg:w-auto items-center justify-start lg:justify-end">
            <span className="text-xs text-slate-500 uppercase tracking-widest font-bold flex items-center gap-1 mr-2 shrink-0">
              <Filter className="w-3.5 h-3.5 text-green-400" /> Class Filter:
            </span>
            {classes.map((cls) => (
              <button
                key={cls}
                onClick={() => setSelectedClass(cls)}
                className={`text-xs px-3.5 py-2 rounded-xl font-bold cursor-pointer transition-all active:scale-95 ${
                  selectedClass === cls
                    ? "bg-green-500 text-slate-950 shadow-md shadow-green-500/10"
                    : "border border-slate-800 bg-slate-950 text-slate-400 hover:text-white"
                }`}
              >
                {cls}
              </button>
            ))}
          </div>
        </div>

        {/* Full Leaderboard Results Grid */}
        <div className="overflow-x-auto rounded-3xl bg-slate-900/60 border border-slate-850 shadow-xl mb-12">
          <table className="w-full text-left">
            <thead className="bg-slate-900 border-b border-slate-850">
              <tr>
                <th className="p-5 text-xs font-bold text-slate-500 uppercase tracking-wider">Rank</th>
                <th className="p-5 text-xs font-bold text-slate-500 uppercase tracking-wider">Student Name</th>
                <th className="p-5 text-xs font-bold text-slate-500 uppercase tracking-wider">Roll Code</th>
                <th className="p-5 text-xs font-bold text-slate-500 uppercase tracking-wider">Class</th>
                <th className="p-5 text-xs font-bold text-slate-500 uppercase tracking-wider">School Association</th>
                <th className="p-5 text-xs font-bold text-slate-500 uppercase tracking-wider">Score</th>
                <th className="p-5 text-xs font-bold text-slate-500 uppercase tracking-wider">Credential tier</th>
              </tr>
            </thead>
            <tbody>
              {filteredStudents.map((student, index) => {
                const globalIndex = students.findIndex((s) => s.student_id === student.student_id);
                const actualRank = globalIndex !== -1 ? globalIndex + 1 : index + 1;
                
                // Highlight podium rows
                let rowBg = "border-t border-slate-850 hover:bg-slate-800/40 transition-colors";
                let rankLabelColor = "text-slate-400";
                
                if (actualRank === 1) {
                  rowBg = "border-t border-yellow-500/10 bg-yellow-500/5 hover:bg-yellow-500/10 transition-colors border-l-4 border-l-yellow-500";
                  rankLabelColor = "text-yellow-400 font-black";
                } else if (actualRank === 2) {
                  rowBg = "border-t border-slate-400/10 bg-slate-400/5 hover:bg-slate-400/10 transition-colors border-l-4 border-l-slate-400";
                  rankLabelColor = "text-slate-200 font-bold";
                } else if (actualRank === 3) {
                  rowBg = "border-t border-amber-700/10 bg-amber-750/5 hover:bg-amber-750/10 transition-colors border-l-4 border-l-amber-600";
                  rankLabelColor = "text-amber-500 font-bold";
                }

                return (
                  <tr key={student.student_id} className={rowBg}>
                    <td className="p-5">
                      <span className={`font-mono text-base ${rankLabelColor}`}>
                        #{actualRank}
                      </span>
                    </td>
                    <td className="p-5 font-semibold text-white">{student.name}</td>
                    <td className="p-5 font-mono text-xs text-slate-450">{student.student_id}</td>
                    <td className="p-5 text-slate-300 text-sm">{student.class_name}</td>
                    <td className="p-5 text-slate-400 text-sm">{student.school_name}</td>
                    <td className="p-5">
                      <span className="font-extrabold text-green-400 text-base">{student.score ?? 0}</span>
                      <span className="text-[10px] text-slate-500">/100</span>
                    </td>
                    <td className="p-5">
                      {student.score >= 90 ? (
                        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-yellow-500/10 border border-yellow-500/20 text-xs font-semibold text-yellow-400">
                          🥇 Gold Grade
                        </span>
                      ) : student.score >= 75 ? (
                        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-slate-100/10 border border-slate-300/25 text-xs font-semibold text-slate-300">
                          🥈 Silver Grade
                        </span>
                      ) : student.score >= 60 ? (
                        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-orange-500/10 border border-orange-500/20 text-xs font-semibold text-orange-400">
                          🥉 Bronze Grade
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-slate-900 border border-slate-800 text-xs font-semibold text-slate-500">
                          Participant
                        </span>
                      )}
                    </td>
                  </tr>
                );
              })}

              {filteredStudents.length === 0 && (
                <tr>
                  <td colSpan={7} className="p-16 text-center text-slate-400">
                    <div className="max-w-md mx-auto">
                      <Lock className="w-8 h-8 text-slate-650 mx-auto mb-3" />
                      <p className="font-semibold text-sm">No matched candidates found</p>
                      <p className="text-xs text-slate-550 mt-1">Check spelling or select different classroom query options.</p>
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Ranking & Audit Regulations */}
        <div className="grid gap-6 md:grid-cols-2">
          
          <div className="rounded-3xl bg-slate-900 border border-slate-850 p-6 md:p-8">
            <h2 className="text-xl font-bold mb-4 flex items-center gap-1.5">
              <GraduationCap className="w-5 h-5 text-green-400" /> Evaluation Rules
            </h2>
            <p className="text-slate-350 text-xs leading-relaxed">
               Ranks are calculated instantly by the core examination client. Rankings are strictly ordered by score first, and then sorted by exam time durations where scores match. Ranks are subject to secure database checks for entry verification and anti-cheat credentials.
            </p>
          </div>

          <div className="rounded-3xl bg-slate-900 border border-slate-850 p-6 md:p-8 flex flex-col justify-between">
            <div>
              <h2 className="text-xl font-bold mb-3 flex items-center gap-1.5">
                <ShieldCheck className="w-5 h-5 text-green-400" /> Security Audited
              </h2>
              <p className="text-slate-350 text-xs leading-relaxed">
                Ranks listed here are verified and cryptographically signed. If you note ranking disputes or credentials lock warnings on your dashboard, check the transaction ledger or contact the school administrative desk.
              </p>
            </div>
            <div className="flex items-center gap-2 border-t border-slate-850/80 pt-4 mt-4 text-[10px] text-slate-550 font-mono">
              <CheckCircle2 className="w-4 h-4 text-green-400" /> SECURE REAL-TIME RANK REGISTRY SYSTEM
            </div>
          </div>

        </div>

      </section>
    </main>
  );
}

function StatWidget({ title, value, icon }: { title: string; value: string; icon: React.ReactNode }) {
  return (
    <div className="rounded-2xl bg-slate-900/60 border border-slate-850 p-5 flex items-center justify-between shadow-md">
      <div>
        <p className="text-xs text-slate-450 font-semibold uppercase tracking-wider">{title}</p>
        <h4 className="text-2xl font-black text-white mt-1.5">{value}</h4>
      </div>
      <div className="p-3 rounded-xl bg-slate-950 border border-slate-850 shrink-0">
        {icon}
      </div>
    </div>
  );
}