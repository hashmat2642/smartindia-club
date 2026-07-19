import Link from "next/link";
import { redirect } from "next/navigation";
import { supabase } from "@/lib/supabase";
import { 
  Search, GraduationCap, Users, CreditCard, Award, 
  Activity, Bell, BookOpen, Sparkles, DollarSign, 
  CheckCircle2, Settings, Clock, FileText, ChevronRight, TrendingUp, Lock 
} from "lucide-react";

export default async function AdminPage() {
  const { data: students, error } = await supabase
    .from("students")
    .select("*")
    .order("created_at", { ascending: false });

  const totalStudents = students?.length || 0;

  const paidStudents =
    students?.filter(
      (student) => student.payment_status === "Paid"
    ).length || 0;

  const collection = paidStudents * 50;
  const pendingStudents = totalStudents - paidStudents;

  const topStudent =
    students?.length
      ? [...students]
          .filter((s) => s.score)
          .sort((a, b) => (b.score || 0) - (a.score || 0))[0]
      : null;

  if (error) {
    return (
      <main className="min-h-screen bg-slate-950 px-6 py-16 text-white relative flex items-center justify-center">
        <div className="absolute inset-0 bg-red-500/5 rounded-full blur-[100px] pointer-events-none" />
        <div className="text-center z-10 max-w-md bg-slate-900 border border-red-500/20 rounded-3xl p-8 shadow-2xl">
          <h1 className="text-3xl font-black text-red-500">Admin Connection Error</h1>
          <p className="mt-4 text-slate-400 leading-relaxed text-sm">{error.message}</p>
          <Link href="/" className="mt-6 inline-block rounded-xl bg-slate-950 border border-slate-800 text-xs text-slate-350 hover:text-white px-5 py-2.5 font-bold transition-all">
            Return Home
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-slate-950 text-white py-16 px-4 md:px-8 relative overflow-hidden">
      {/* Background Grids */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#0f172a_1px,transparent_1px),linear-gradient(to_bottom,#0f172a_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] opacity-25 pointer-events-none" />
      <div className="absolute top-0 right-1/4 w-[500px] h-[500px] bg-green-500/5 rounded-full blur-[130px] pointer-events-none" />

      <section className="mx-auto max-w-7xl relative z-10">
        
        {/* Top Header Segment */}
        <div className="flex flex-wrap justify-between items-end gap-6 border-b border-slate-900 pb-8 mb-10">
          <div>
            <div className="flex items-center gap-2 text-xs font-bold text-green-400 uppercase tracking-widest">
              <span className="w-2 h-2 rounded-full bg-green-400 animate-ping" />
              <span>SmartIndia Club Admin Console</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-black tracking-tight mt-2">
              Tournament Dashboard
            </h1>
            <p className="text-sm text-slate-450 mt-2 max-w-xl">
              Inspect registrations, ledger clearance logs, score standings, and issue digital certifications.
            </p>
          </div>

          {/* Search Candidate bar using Server Action */}
          <form
            action={async (formData) => {
              "use server";
              const search = formData.get("search")?.toString().trim();
              if (search) {
                redirect(`/student/${search}`);
              }
            }}
            className="flex gap-2 w-full max-w-sm"
          >
            <div className="relative flex-1">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500 w-4 h-4" />
              <input
                type="text"
                name="search"
                required
                placeholder="Search Candidate Roll ID..."
                className="w-full pl-10 pr-4 py-3 bg-slate-900/60 border border-slate-850 rounded-xl text-xs focus:outline-none focus:border-green-500 text-white placeholder-slate-650"
              />
            </div>
            <button
              type="submit"
              className="rounded-xl bg-green-500 hover:bg-green-400 text-slate-950 font-black px-5 py-3 text-xs transition-colors cursor-pointer"
            >
              Search
            </button>
          </form>
        </div>

        {/* Global Statistics Cards */}
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-5 mb-10">
          <StatCard title="Target Candidates" value="140" icon={<Users className="w-4 h-4 text-indigo-400" />} />
          <StatCard title="Total Registered" value={String(totalStudents)} icon={<GraduationCap className="w-4 h-4 text-green-400" />} />
          <StatCard title="Paid Clearances" value={String(paidStudents)} icon={<CheckCircle2 className="w-4 h-4 text-green-400" />} />
          <StatCard title="Ledger Collection" value={`₹${collection}`} icon={<DollarSign className="w-4 h-4 text-yellow-500" />} />
          <StatCard title="Pending Payments" value={String(pendingStudents)} icon={<Clock className="w-4 h-4 text-red-400" />} />
        </div>

        {/* Current Top Performer & Overview Split */}
        <div className="grid gap-6 md:grid-cols-3 mb-12">
          
          {/* Top Performer Badge Card */}
          <div className="md:col-span-1 rounded-3xl bg-slate-900/60 border border-slate-850 p-6 shadow-xl relative overflow-hidden flex flex-col justify-between h-[180px]">
            <div className="absolute top-0 right-0 w-24 h-24 bg-yellow-500/5 rounded-full blur-[30px] pointer-events-none" />
            <div>
              <span className="text-[10px] font-bold text-slate-550 uppercase tracking-widest flex items-center gap-1">
                <Sparkles className="w-3.5 h-3.5 text-yellow-500 fill-yellow-500/20" /> Leaderboard Apex Performer
              </span>
              <h2 className="mt-3 text-2xl font-black text-yellow-400 tracking-tight">
                {topStudent?.name || "No Results Yet"}
              </h2>
              <p className="text-xs text-slate-450 mt-1 font-mono">{topStudent?.student_id || "Awaiting scores"}</p>
            </div>
            <div className="flex justify-between items-center text-xs border-t border-slate-850/80 pt-3">
              <span className="text-slate-500 font-mono">GRADE ACCURACY</span>
              <span className="font-extrabold text-white text-sm">{topStudent?.score ? `${topStudent.score}/100` : "0%" }</span>
            </div>
          </div>

          {/* Quick Stats overview progress block */}
          <div className="md:col-span-2 rounded-3xl bg-slate-900/60 border border-slate-850 p-6 shadow-xl flex flex-col justify-between h-[180px]">
            <div>
              <span className="text-[10px] font-bold text-slate-550 uppercase tracking-widest flex items-center gap-1">
                <TrendingUp className="w-3.5 h-3.5 text-green-400" /> Platform Clearance Progress
              </span>
              <h3 className="text-lg font-bold text-white mt-2">Registration Ledger Clearance</h3>
              <p className="text-xs text-slate-400 mt-1">Percentage of enrolled candidates who cleared verification fees.</p>
            </div>
            
            <div className="space-y-2 mt-4">
              <div className="flex justify-between text-xs font-mono">
                <span className="text-slate-500">PAYMENT RATE</span>
                <span className="text-green-400 font-bold">
                  {totalStudents > 0 ? Math.round((paidStudents / totalStudents) * 100) : 0}% Complete
                </span>
              </div>
              <div className="h-2 rounded-full bg-slate-950 overflow-hidden border border-slate-850">
                <div 
                  className="h-full bg-green-500 transition-all duration-500" 
                  style={{ width: `${totalStudents > 0 ? (paidStudents / totalStudents) * 100 : 0}%` }} 
                />
              </div>
            </div>
          </div>

        </div>

        {/* Administrative Quick Actions Grid */}
        <h3 className="text-sm font-bold text-slate-450 uppercase tracking-widest mb-6 flex items-center gap-1.5">
          <Settings className="w-4 h-4 text-green-400" /> Administrative Console Panels
        </h3>
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 mb-12">
          <AdminAction
            title="Announcements"
            desc="Configure live notifications and update bulletin entries."
            href="/admin/announcements"
            icon={<Bell className="w-5 h-5" />}
          />
          <AdminAction
            title="Tournament Settings"
            desc="Manage monthly phases, limits, and rules configurations."
            href="/admin/tournaments"
            icon={<Settings className="w-5 h-5" />}
          />
          <AdminAction
            title="Payments Clearances"
            desc="Settle pending registrations fee invoices."
            href="/admin/payments"
            icon={<CreditCard className="w-5 h-5" />}
          />
          <AdminAction
            title="Question Bank Editor"
            desc="Setup conceptual aptitude and code parameter questions."
            href="/admin/questions"
            icon={<BookOpen className="w-5 h-5" />}
          />
          <AdminAction
            title="Students Database"
            desc="View registered student dossiers, phone records, and logs."
            href="/admin/students"
            icon={<Users className="w-5 h-5" />}
          />
          <AdminAction
            title="Results Management"
            desc="Review candidate performance logs and score evaluations."
            href="/admin/results"
            icon={<Activity className="w-5 h-5" />}
          />
          <AdminAction
            title="Generate Certificates"
            desc="Authorize and batch-compile verifiable certificates."
            href="/admin/certificates"
            icon={<Award className="w-5 h-5" />}
          />
          <AdminAction
            title="Analytics Hub"
            desc="Inspect candidate stats and classwise standings."
            href="/admin/analytics"
            icon={<TrendingUp className="w-5 h-5" />}
          />
          <AdminAction
            title="Export Records"
            desc="Download student entries and scores ledger data (CSV)."
            href="/admin/export"
            icon={<FileText className="w-5 h-5" />}
          />
        </div>

        {/* Recent Registrations Data Table */}
        <div className="rounded-3xl bg-slate-900 border border-slate-850 p-6 shadow-xl">
          <h2 className="text-xl font-bold text-white mb-6">Recent Registrations</h2>
          
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead className="bg-slate-950 border-b border-slate-850">
                <tr>
                  <th className="p-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Student ID</th>
                  <th className="p-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Candidate</th>
                  <th className="p-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Class</th>
                  <th className="p-4 text-xs font-bold text-slate-500 uppercase tracking-wider">School</th>
                  <th className="p-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Score</th>
                  <th className="p-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Rank Status</th>
                  <th className="p-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Certificate</th>
                </tr>
              </thead>
              <tbody>
                {students?.map((student) => (
                  <tr key={student.id} className="border-t border-slate-850 hover:bg-slate-850/40 transition-colors">
                    <td className="p-4 font-mono font-bold text-xs text-green-400">
                      {student.student_id}
                    </td>
                    <td className="p-4 font-semibold text-white">{student.name}</td>
                    <td className="p-4 text-slate-350 text-xs">{student.class_name}</td>
                    <td className="p-4 text-slate-400 text-xs">{student.school_name}</td>
                    <td className="p-4 font-mono font-bold text-sm text-slate-200">
                      {student.score ?? 0}
                    </td>
                    <td className="p-4">
                      <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold ${
                        student.score >= 90
                          ? "bg-yellow-500/10 border border-yellow-500/20 text-yellow-400"
                          : student.score >= 75
                          ? "bg-slate-100/10 border border-slate-300/25 text-slate-300"
                          : student.score >= 60
                          ? "bg-orange-500/10 border border-orange-500/20 text-orange-400"
                          : "bg-slate-900 border border-slate-800 text-slate-500"
                      }`}>
                        {student.rank || "Pending"}
                      </span>
                    </td>
                    <td className="p-4">
                      <Link
                        href={`/certificate/${student.certificate_id}`}
                        className="font-bold text-xs text-green-400 hover:text-green-300 transition-colors flex items-center gap-0.5"
                      >
                        View <ChevronRight className="w-3.5 h-3.5" />
                      </Link>
                    </td>
                  </tr>
                ))}

                {students?.length === 0 && (
                  <tr>
                    <td colSpan={7} className="p-16 text-center text-slate-405">
                      <div className="max-w-xs mx-auto">
                        <Lock className="w-8 h-8 text-slate-650 mx-auto mb-3" />
                        <p className="font-semibold text-sm">No registrations recorded</p>
                        <p className="text-xs text-slate-550 mt-1">Pending student enrollment submissions.</p>
                      </div>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

      </section>
    </main>
  );
}

function StatCard({ 
  title, 
  value, 
  icon 
}: { 
  title: string; 
  value: string; 
  icon: React.ReactNode; 
}) {
  return (
    <div className="rounded-2xl bg-slate-900 border border-slate-850 p-5 flex items-center justify-between shadow-md">
      <div>
        <p className="text-xs text-slate-450 font-semibold uppercase tracking-wider">{title}</p>
        <h4 className="text-xl font-bold text-white mt-1.5">{value}</h4>
      </div>
      <div className="p-2.5 rounded-xl bg-slate-950 border border-slate-850 shrink-0">
        {icon}
      </div>
    </div>
  );
}

function AdminAction({ 
  title, 
  desc, 
  href, 
  icon 
}: { 
  title: string; 
  desc: string; 
  href: string; 
  icon: React.ReactNode; 
}) {
  return (
    <Link
      href={href}
      className="rounded-2xl border border-slate-850 bg-slate-900/60 p-5 hover:bg-slate-850 hover:border-slate-800 transition-all duration-200 group flex items-start gap-4"
    >
      <div className="p-3 rounded-xl bg-slate-950 border border-slate-850 group-hover:border-slate-800 text-green-400 shrink-0">
        {icon}
      </div>
      <div>
        <h4 className="font-bold text-sm text-slate-200 group-hover:text-green-400 transition-colors">{title}</h4>
        <p className="text-[11px] text-slate-450 mt-1 leading-relaxed">{desc}</p>
      </div>
    </Link>
  );
}