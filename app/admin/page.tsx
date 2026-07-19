"use client";

import { useEffect, useState, useCallback } from "react";
import Link from "next/link";
import { supabase } from "@/lib/supabase";
import { students as mockStudents } from "@/app/data/students";
import { 
  Search, GraduationCap, Users, CreditCard, Award, 
  Activity, Bell, BookOpen, Sparkles, DollarSign, 
  CheckCircle2, Settings, Clock, FileText, 
  TrendingUp, Plus, Edit2, X, Briefcase
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

type Application = {
  jobId: string;
  studentId: string;
  studentName: string;
  jobTitle: string;
  status: string;
};

const JOB_TITLES: Record<string, string> = {
  "excel-organizer": "Excel Data Organizer",
  "transcription-entry": "Copy-Paste Data Entry Assistant",
  "book-sketching": "Book Illustration Sketcher",
  "poster-designer": "Digital Banner Creator",
  "calling-representative": "Interactive Call Assistant",
  "verification-call-helper": "Form Verification Caller",
  "essay-proofreader": "Essay & Grammar Proofreader"
};

export default function AdminPage() {
  const [students, setStudents] = useState<Student[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedClass, setSelectedClass] = useState("All");
  const [selectedPayment, setSelectedPayment] = useState("All");

  // Modals state
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedStudentForEdit, setSelectedStudentForEdit] = useState<Student | null>(null);

  // Form states - Add Candidate
  const [newName, setNewName] = useState("");
  const [newClass, setNewClass] = useState("Class 8");
  const [newSchool, setNewSchool] = useState("");
  const [newStudentId, setNewStudentId] = useState("");
  const [isCreating, setIsCreating] = useState(false);

  // Form states - Edit Score/Rank
  const [editScore, setEditScore] = useState(0);
  const [editRank, setEditRank] = useState("Participation");
  const [isUpdating, setIsUpdating] = useState(false);

  // Career applications state
  const [applications, setApplications] = useState<Application[]>([]);

  // Load applications logs
  const fetchApplicationsData = useCallback((currentStudentsList: Student[]) => {
    const appliedJobsStr = localStorage.getItem("hdc_applied_jobs");
    const activeStudentId = localStorage.getItem("hdc_logged_student_id");
    
    if (appliedJobsStr && activeStudentId) {
      try {
        const jobIds: string[] = JSON.parse(appliedJobsStr);
        const matchStudent = currentStudentsList.find(s => s.student_id.toLowerCase() === activeStudentId.toLowerCase());
        const studentName = matchStudent ? matchStudent.name : "Hashmat";

        const mappedApps: Application[] = jobIds.map(jobId => {
          const statusKey = `hdc_app_status_${activeStudentId}_${jobId}`;
          const currentStatus = localStorage.getItem(statusKey) || "Reviewing";
          return {
            jobId,
            studentId: activeStudentId,
            studentName,
            jobTitle: JOB_TITLES[jobId] || jobId,
            status: currentStatus
          };
        });
        setApplications(mappedApps);
      } catch (e) {
        console.error(e);
      }
    }
  }, []);

  // 1. Fetch Students (Supabase -> LocalStorage -> Mock Fallback)
  const fetchStudentsData = useCallback(async () => {
    setLoading(true);
    let currentStudentsList: Student[] = [];
    try {
      // Check localStorage first for customized students
      const localCustom = localStorage.getItem("hdc_custom_students");
      if (localCustom) {
        try {
          currentStudentsList = JSON.parse(localCustom);
          setStudents(currentStudentsList);
          setLoading(false);
          fetchApplicationsData(currentStudentsList);
          return;
        } catch (e) {
          console.error("Local storage parse error", e);
        }
      }

      // Query Supabase
      const { data, error } = await supabase
        .from("students")
        .select("*")
        .order("created_at", { ascending: false });

      if (error || !data || data.length === 0) {
        // Fallback to standard mock data
        const mappedMock: Student[] = mockStudents.map((s) => ({
          id: Number(s.id),
          student_id: s.student_id,
          name: s.name,
          class_name: s.class_name,
          school_name: s.school_name,
          phone_number: "9876543210",
          score: s.score,
          rank: s.rank,
          performance: s.score >= 90 ? "Gold Performer" : s.score >= 75 ? "Silver Performer" : s.score >= 60 ? "Bronze Performer" : "Participation",
          payment_status: "Pending",
          certificate_id: s.certificate_id,
        }));
        
        // Persist fallback mock in localStorage so updates survive offline refreshes
        localStorage.setItem("hdc_custom_students", JSON.stringify(mappedMock));
        currentStudentsList = mappedMock;
        setStudents(mappedMock);
      } else {
        currentStudentsList = data as Student[];
        setStudents(currentStudentsList);
        localStorage.setItem("hdc_custom_students", JSON.stringify(data));
      }
    } catch {
      // Handle offline database fetch exception gracefully
      console.warn("Supabase fetch failed, loading offline mock students");
      const localCustom = localStorage.getItem("hdc_custom_students");
      if (localCustom) {
        currentStudentsList = JSON.parse(localCustom);
        setStudents(currentStudentsList);
      } else {
        const mappedMock: Student[] = mockStudents.map((s) => ({
          id: Number(s.id),
          student_id: s.student_id,
          name: s.name,
          class_name: s.class_name,
          school_name: s.school_name,
          phone_number: "9876543210",
          score: s.score,
          rank: s.rank,
          performance: s.score >= 90 ? "Gold Performer" : s.score >= 75 ? "Silver Performer" : s.score >= 60 ? "Bronze Performer" : "Participation",
          payment_status: "Pending",
          certificate_id: s.certificate_id,
        }));
        localStorage.setItem("hdc_custom_students", JSON.stringify(mappedMock));
        currentStudentsList = mappedMock;
        setStudents(mappedMock);
      }
    } finally {
      setLoading(false);
      fetchApplicationsData(currentStudentsList);
    }
  }, [fetchApplicationsData]);

  useEffect(() => {
    const timer = setTimeout(() => {
      const loadAll = async () => {
        await fetchStudentsData();
      };
      loadAll();
    }, 0);
    return () => clearTimeout(timer);
  }, [fetchStudentsData]);

  // 2. Real-Time calculations
  const totalStudents = students.length;
  const paidStudents = students.filter(s => s.payment_status === "Paid").length;
  const collection = paidStudents * 50;
  const pendingStudents = totalStudents - paidStudents;
  const topStudent = students.length 
    ? [...students].filter(s => s.score > 0).sort((a, b) => b.score - a.score)[0] 
    : null;

  // 3. Search and filtering matching
  const filteredStudents = students.filter(student => {
    const matchesSearch = student.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          student.student_id.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          student.school_name.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesClass = selectedClass === "All" || student.class_name === selectedClass;
    const matchesPay = selectedPayment === "All" || student.payment_status === selectedPayment;

    return matchesSearch && matchesClass && matchesPay;
  });

  // 4. Update Student in state & DB
  async function updateStudentInState(updatedStudent: Student) {
    const updatedList = students.map(s => s.id === updatedStudent.id ? updatedStudent : s);
    setStudents(updatedList);
    localStorage.setItem("hdc_custom_students", JSON.stringify(updatedList));
    fetchApplicationsData(updatedList);

    // Try Supabase update
    try {
      await supabase
        .from("students")
        .update({
          payment_status: updatedStudent.payment_status,
          score: updatedStudent.score,
          rank: updatedStudent.rank,
          performance: updatedStudent.performance
        })
        .eq("id", updatedStudent.id);
    } catch {
      console.warn("Supabase update error (offline mode, saved locally)");
    }
  }

  // 5. Toggle Payment Status clearances
  const handleTogglePayment = (student: Student) => {
    const newStatus = student.payment_status === "Paid" ? "Pending" : "Paid";
    // Sync active mock payment in dashboard simulation triggers
    localStorage.setItem(`payment_${student.student_id}`, newStatus);
    
    const updated: Student = {
      ...student,
      payment_status: newStatus
    };
    updateStudentInState(updated);
  };

  // 6. Add Candidate Profile Registry
  const handleAddCandidate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newName.trim() || !newSchool.trim()) return;

    setIsCreating(true);
    const customId = newStudentId.trim() || `SIC-00${students.length + 1}`;
    const certId = `SIC-CERT-2026-000${students.length + 1}`;

    const newStudentObj: Student = {
      id: Date.now(),
      student_id: customId,
      name: newName,
      class_name: newClass,
      school_name: newSchool,
      phone_number: "9876543210",
      score: 0,
      rank: "Pending",
      performance: "Participation",
      payment_status: "Pending",
      certificate_id: certId
    };

    const updatedList = [newStudentObj, ...students];
    setStudents(updatedList);
    localStorage.setItem("hdc_custom_students", JSON.stringify(updatedList));
    fetchApplicationsData(updatedList);

    // Try Supabase insert
    try {
      await supabase
        .from("students")
        .insert([
          {
            student_id: newStudentObj.student_id,
            name: newStudentObj.name,
            class_name: newStudentObj.class_name,
            school_name: newStudentObj.school_name,
            phone_number: newStudentObj.phone_number,
            score: newStudentObj.score,
            rank: newStudentObj.rank,
            performance: newStudentObj.performance,
            payment_status: newStudentObj.payment_status,
            certificate_id: newStudentObj.certificate_id
          }
        ]);
    } catch {
      console.warn("Supabase insert error (offline mode, saved locally)");
    }

    // Reset fields
    setNewName("");
    setNewSchool("");
    setNewStudentId("");
    setIsCreating(false);
    setIsAddModalOpen(false);
  };

  // 7. Edit Candidate Marks
  const handleEditMarksClick = (student: Student) => {
    setSelectedStudentForEdit(student);
    setEditScore(student.score);
    setEditRank(student.rank);
    setIsEditModalOpen(true);
  };

  const handleUpdateMarksSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedStudentForEdit) return;

    setIsUpdating(true);

    const scoreNum = Number(editScore);
    const performance = scoreNum >= 90 
      ? "Gold Performer" 
      : scoreNum >= 75 
      ? "Silver Performer" 
      : scoreNum >= 60 
      ? "Bronze Performer" 
      : "Participation";

    // Persist scores inside localStorage dashboard lookup simulations
    localStorage.setItem(`score_${selectedStudentForEdit.student_id}`, String(scoreNum));
    localStorage.setItem(`performance_${selectedStudentForEdit.student_id}`, performance);
    localStorage.setItem(`rank_${selectedStudentForEdit.student_id}`, editRank);

    const updated: Student = {
      ...selectedStudentForEdit,
      score: scoreNum,
      rank: editRank,
      performance: performance
    };

    updateStudentInState(updated);
    setIsUpdating(false);
    setIsEditModalOpen(false);
    setSelectedStudentForEdit(null);
  };

  // 8. Approve/Reject Job Gigs
  const handleApproveJob = (app: Application) => {
    const statusKey = `hdc_app_status_${app.studentId}_${app.jobId}`;
    localStorage.setItem(statusKey, "Approved");
    fetchApplicationsData(students);
  };

  const handleRejectJob = (app: Application) => {
    const statusKey = `hdc_app_status_${app.studentId}_${app.jobId}`;
    localStorage.setItem(statusKey, "Rejected");
    fetchApplicationsData(students);
  };

  const classes = ["All", "Class 6", "Class 7", "Class 8", "Class 9", "Class 10"];
  const paymentStatuses = ["All", "Paid", "Pending"];

  if (loading) {
    return (
      <main className="min-h-screen bg-slate-950 text-white flex items-center justify-center relative overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[350px] h-[350px] bg-green-500/10 rounded-full blur-[120px]" />
        <div className="text-center z-10">
          <Loader2 className="w-12 h-12 text-green-400 animate-spin mx-auto mb-4" />
          <p className="text-slate-200 font-bold tracking-wide text-lg">Accessing Secure Admin Database...</p>
          <p className="text-sm text-slate-500 mt-1">Sourcing candidates and ledger files</p>
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
              <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
              <span>SmartIndia Club Admin Console</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-black tracking-tight mt-2">
              Tournament Dashboard
            </h1>
            <p className="text-sm text-slate-400 mt-2 max-w-xl">
              Inspect registrations, ledger clearance logs, score standings, and issue digital certifications.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => setIsAddModalOpen(true)}
              className="rounded-xl bg-green-500 hover:bg-green-400 text-slate-950 font-black px-5 py-3 text-xs transition-colors cursor-pointer flex items-center gap-1.5 active:scale-95 shadow-md shadow-green-500/10"
            >
              <Plus className="w-4 h-4" /> Add Candidate
            </button>
            <button 
              onClick={fetchStudentsData}
              className="flex items-center gap-2 rounded-xl border border-slate-800 bg-slate-900 hover:bg-slate-850 px-4 py-3 text-xs font-bold transition-all text-slate-300 cursor-pointer"
            >
              <RefreshCw className="w-3.5 h-3.5" /> Sync Data
            </button>
          </div>
        </div>

        {/* Global Statistics Cards */}
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-5 mb-10">
          <StatCard title="Target Candidates" value="140" icon={<Users className="w-4 h-4 text-indigo-400" />} />
          <StatCard title="Total Registered" value={String(totalStudents)} icon={<GraduationCap className="w-4 h-4 text-green-400" />} />
          <StatCard title="Paid Accounts" value={String(paidStudents)} icon={<CheckCircle2 className="w-4 h-4 text-green-400" />} />
          <StatCard title="Ledger Collection" value={`₹${collection}`} icon={<DollarSign className="w-4 h-4 text-yellow-500" />} />
          <StatCard title="Pending Payments" value={String(pendingStudents)} icon={<Clock className="w-4 h-4 text-red-400" />} />
        </div>

        {/* Top Performer & Progress Split */}
        <div className="grid gap-6 md:grid-cols-3 mb-12">
          
          {/* Top Performer Card */}
          <div className="rounded-3xl bg-slate-900/60 border border-slate-850 p-6 shadow-xl flex flex-col justify-between h-[180px] relative overflow-hidden">
            <div className="absolute top-0 right-0 w-24 h-24 bg-yellow-500/5 rounded-full blur-[30px] pointer-events-none" />
            <div>
              <span className="text-[10px] font-bold text-slate-550 uppercase tracking-widest flex items-center gap-1">
                <Sparkles className="w-3.5 h-3.5 text-yellow-500 fill-yellow-500/20" /> Leaderboard Performer
              </span>
              <h2 className="mt-3 text-2xl font-black text-yellow-400 tracking-tight">
                {topStudent?.name || "No Results Yet"}
              </h2>
              <p className="text-xs text-slate-450 mt-1 font-mono">{topStudent?.student_id || "Awaiting scores"}</p>
            </div>
            <div className="flex justify-between items-center text-xs border-t border-slate-850/80 pt-3">
              <span className="text-slate-500 font-mono">HIGHEST SCORE</span>
              <span className="font-extrabold text-white text-sm">{topStudent?.score ? `${topStudent.score}/100` : "0%" }</span>
            </div>
          </div>

          {/* Progress Gauge */}
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

        {/* Student Job Applications Ledger (Aesthetic Control Addition) */}
        <div className="rounded-3xl bg-slate-900 border border-slate-850 p-6 shadow-xl mb-12">
          <div className="flex justify-between items-center mb-6">
            <div>
              <h3 className="text-lg font-extrabold text-white flex items-center gap-2">
                <Briefcase className="w-5 h-5 text-green-400" /> Student Careers Applications Ledger
              </h3>
              <p className="text-xs text-slate-450 mt-1">Audit, approve, and approve student requests for micro-tasks and gigs.</p>
            </div>
            <span className="bg-slate-950 border border-slate-850 text-slate-400 text-xs px-3 py-1 rounded-xl">
              {applications.length} Active Gigs
            </span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-950 border-b border-slate-850">
                <tr>
                  <th className="p-4 text-slate-500 uppercase tracking-wider font-bold">Candidate</th>
                  <th className="p-4 text-slate-500 uppercase tracking-wider font-bold">Roll ID</th>
                  <th className="p-4 text-slate-500 uppercase tracking-wider font-bold">Gigs Requested</th>
                  <th className="p-4 text-slate-500 uppercase tracking-wider font-bold">Status</th>
                  <th className="p-4 text-slate-500 uppercase tracking-wider font-bold text-center">Clearance Action</th>
                </tr>
              </thead>
              <tbody>
                {applications.map((app, index) => (
                  <tr key={index} className="border-t border-slate-850 hover:bg-slate-850/20 transition-colors">
                    <td className="p-4 font-semibold text-white">{app.studentName}</td>
                    <td className="p-4 font-mono text-slate-400">{app.studentId}</td>
                    <td className="p-4 font-semibold text-green-400">{app.jobTitle}</td>
                    <td className="p-4">
                      <span className={`inline-flex items-center gap-1.5 px-2 py-0.5 rounded text-[10px] font-bold ${
                        app.status === "Approved"
                          ? "bg-green-500/10 border border-green-500/20 text-green-400"
                          : app.status === "Rejected"
                          ? "bg-red-500/10 border border-red-500/20 text-red-400"
                          : "bg-yellow-500/10 border border-yellow-500/20 text-yellow-400"
                      }`}>
                        {app.status}
                      </span>
                    </td>
                    <td className="p-4 flex gap-2 justify-center">
                      <button
                        onClick={() => handleApproveJob(app)}
                        disabled={app.status === "Approved"}
                        className="rounded-lg bg-green-500 hover:bg-green-400 text-slate-950 font-bold px-3 py-1.5 transition-colors disabled:opacity-30 cursor-pointer"
                      >
                        Approve
                      </button>
                      <button
                        onClick={() => handleRejectJob(app)}
                        disabled={app.status === "Rejected"}
                        className="rounded-lg border border-red-500/20 hover:bg-red-550/10 text-red-400 font-bold px-3 py-1.5 transition-all disabled:opacity-30 cursor-pointer"
                      >
                        Reject
                      </button>
                    </td>
                  </tr>
                ))}

                {applications.length === 0 && (
                  <tr>
                    <td colSpan={5} className="p-10 text-center text-slate-500 font-medium">
                      No active micro-task applications submitted.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Administrative Quick Actions Grid */}
        <div className="mb-12">
          <h3 className="text-sm font-bold text-slate-455 uppercase tracking-widest mb-6 flex items-center gap-1.5">
            <Settings className="w-4 h-4 text-green-400" /> Administrative Console Panels
          </h3>
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
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
        </div>

        {/* Searching, Filtering and Table Section */}
        <div className="rounded-3xl bg-slate-900 border border-slate-850 p-6 shadow-xl">
          
          <div className="flex flex-col md:flex-row gap-4 justify-between items-center mb-6">
            <h3 className="text-lg font-bold text-white">Registered Candidate Roster</h3>
            
            <div className="w-full md:max-w-xs relative">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500 w-4 h-4" />
              <input
                type="text"
                placeholder="Search candidate name, ID..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 bg-slate-950 border border-slate-850 rounded-xl text-xs focus:outline-none focus:border-green-500 transition-colors text-white"
              />
            </div>
          </div>

          {/* Filtering buttons bar */}
          <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-850 pb-5 mb-5 text-xs text-slate-400">
            <div className="flex flex-wrap items-center gap-2">
              <span className="font-bold text-slate-550 uppercase tracking-wider mr-1">Classroom:</span>
              {classes.map((cls) => (
                <button
                  key={cls}
                  onClick={() => setSelectedClass(cls)}
                  className={`px-3 py-1.5 rounded-lg font-bold cursor-pointer transition-all ${
                    selectedClass === cls
                      ? "bg-green-500 text-slate-950"
                      : "bg-slate-950 border border-slate-850 text-slate-400 hover:text-white"
                  }`}
                >
                  {cls}
                </button>
              ))}
            </div>

            <div className="flex flex-wrap items-center gap-2">
              <span className="font-bold text-slate-550 uppercase tracking-wider mr-1">Payment:</span>
              {paymentStatuses.map((p) => (
                <button
                  key={p}
                  onClick={() => setSelectedPayment(p)}
                  className={`px-3 py-1.5 rounded-lg font-bold cursor-pointer transition-all ${
                    selectedPayment === p
                      ? "bg-green-500 text-slate-950"
                      : "bg-slate-950 border border-slate-850 text-slate-400 hover:text-white"
                  }`}
                >
                  {p}
                </button>
              ))}
            </div>
          </div>

          {/* Student list table */}
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-950 border-b border-slate-850">
                <tr>
                  <th className="p-4 text-slate-500 uppercase tracking-wider font-bold">Student ID</th>
                  <th className="p-4 text-slate-500 uppercase tracking-wider font-bold">Name</th>
                  <th className="p-4 text-slate-500 uppercase tracking-wider font-bold">Class</th>
                  <th className="p-4 text-slate-500 uppercase tracking-wider font-bold">School</th>
                  <th className="p-4 text-slate-500 uppercase tracking-wider font-bold">Score</th>
                  <th className="p-4 text-slate-500 uppercase tracking-wider font-bold">Rank Status</th>
                  <th className="p-4 text-slate-500 uppercase tracking-wider font-bold text-center">Fee Status Action</th>
                  <th className="p-4 text-slate-500 uppercase tracking-wider font-bold text-center">Marks Action</th>
                </tr>
              </thead>
              <tbody>
                {filteredStudents.map((student) => (
                  <tr key={student.id} className="border-t border-slate-850 hover:bg-slate-850/30 transition-colors">
                    <td className="p-4 font-mono font-bold text-green-400">{student.student_id}</td>
                    <td className="p-4 font-semibold text-white">{student.name}</td>
                    <td className="p-4 text-slate-300">{student.class_name}</td>
                    <td className="p-4 text-slate-400">{student.school_name}</td>
                    <td className="p-4 font-bold text-slate-200 font-mono text-sm">{student.score}</td>
                    <td className="p-4">
                      <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-bold ${
                        student.score >= 90
                          ? "bg-yellow-500/10 border border-yellow-500/20 text-yellow-400"
                          : student.score >= 75
                          ? "bg-slate-100/10 border border-slate-300/25 text-slate-300"
                          : student.score >= 60
                          ? "bg-orange-500/10 border border-orange-500/20 text-orange-400"
                          : "bg-slate-950 border border-slate-850 text-slate-500"
                      }`}>
                        {student.rank || "Pending"}
                      </span>
                    </td>
                    
                    {/* Settle Fee toggle button */}
                    <td className="p-4 text-center">
                      <button
                        onClick={() => handleTogglePayment(student)}
                        className={`px-3 py-1.5 rounded-lg text-[10px] font-bold transition-all active:scale-95 cursor-pointer ${
                          student.payment_status === "Paid"
                            ? "bg-green-500/10 border border-green-500/20 text-green-400 hover:bg-green-500/20"
                            : "bg-yellow-500/10 border border-yellow-500/20 text-yellow-400 hover:bg-yellow-500/20"
                        }`}
                      >
                        {student.payment_status === "Paid" ? "✓ Cleared (Paid)" : "🔒 Unpaid (Click Clear)"}
                      </button>
                    </td>

                    {/* Edit marks button */}
                    <td className="p-4 text-center">
                      <button
                        onClick={() => handleEditMarksClick(student)}
                        className="rounded-lg border border-slate-800 bg-slate-950 hover:bg-slate-850 px-3 py-1.5 text-slate-300 hover:text-white transition-all font-bold cursor-pointer"
                      >
                        Set Marks
                      </button>
                    </td>
                  </tr>
                ))}

                {filteredStudents.length === 0 && (
                  <tr>
                    <td colSpan={8} className="p-12 text-center text-slate-500">
                      No matching student registrations found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

        </div>

      </section>

      {/* --- ADD CANDIDATE MODAL --- */}
      {isAddModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-800 rounded-3xl w-full max-w-md p-6 relative shadow-2xl animate-in fade-in zoom-in-95 duration-200">
            
            <button 
              onClick={() => setIsAddModalOpen(false)}
              className="absolute top-4 right-4 text-slate-500 hover:text-white transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            <h3 className="text-xl font-bold text-white flex items-center gap-2 mb-2">
              <Plus className="w-5 h-5 text-green-400" /> Register Candidate Profile
            </h3>
            <p className="text-xs text-slate-400 mb-6">
              Create a new entry in the registry system. Custom student ID will be auto-generated if left blank.
            </p>

            <form onSubmit={handleAddCandidate} className="space-y-4">
              <div>
                <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1.5">Candidate Name</label>
                <input
                  type="text"
                  required
                  value={newName}
                  onChange={(e) => setNewName(e.target.value)}
                  placeholder="Enter full name"
                  className="w-full p-3 bg-slate-950 border border-slate-850 rounded-xl text-xs text-white focus:outline-none focus:border-green-500"
                />
              </div>

              <div className="grid gap-4 grid-cols-2">
                <div>
                  <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1.5">Class / Grade</label>
                  <select
                    value={newClass}
                    onChange={(e) => setNewClass(e.target.value)}
                    className="w-full p-3 bg-slate-950 border border-slate-850 rounded-xl text-xs text-white focus:outline-none focus:border-green-500"
                  >
                    <option>Class 6</option>
                    <option>Class 7</option>
                    <option>Class 8</option>
                    <option>Class 9</option>
                    <option>Class 10</option>
                  </select>
                </div>
                <div>
                  <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1.5">Custom ID (Optional)</label>
                  <input
                    type="text"
                    value={newStudentId}
                    onChange={(e) => setNewStudentId(e.target.value)}
                    placeholder="e.g. SIC-005"
                    className="w-full p-3 bg-slate-950 border border-slate-850 rounded-xl text-xs text-white focus:outline-none focus:border-green-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1.5">School Association</label>
                <input
                  type="text"
                  required
                  value={newSchool}
                  onChange={(e) => setNewSchool(e.target.value)}
                  placeholder="Enter school association"
                  className="w-full p-3 bg-slate-950 border border-slate-850 rounded-xl text-xs text-white focus:outline-none focus:border-green-500"
                />
              </div>

              <div className="pt-2 flex flex-col gap-2">
                <button
                  type="submit"
                  disabled={isCreating}
                  className="w-full rounded-xl bg-green-500 hover:bg-green-400 text-slate-950 font-black p-3.5 text-xs transition-all shadow-md shadow-green-500/10 cursor-pointer"
                >
                  {isCreating ? "Creating Student..." : "Create Student Profile"}
                </button>
                <button
                  type="button"
                  onClick={() => setIsAddModalOpen(false)}
                  className="w-full rounded-xl border border-slate-850 bg-slate-950 hover:bg-slate-900 p-3 text-xs text-slate-450 font-bold cursor-pointer text-center"
                >
                  Cancel
                </button>
              </div>

            </form>
          </div>
        </div>
      )}

      {/* --- EDIT MARKS & RANK MODAL --- */}
      {isEditModalOpen && selectedStudentForEdit && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-800 rounded-3xl w-full max-w-md p-6 relative shadow-2xl animate-in fade-in zoom-in-95 duration-200">
            
            <button 
              onClick={() => {
                setIsEditModalOpen(false);
                setSelectedStudentForEdit(null);
              }}
              className="absolute top-4 right-4 text-slate-500 hover:text-white transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            <h3 className="text-xl font-bold text-white flex items-center gap-2 mb-2">
              <Edit2 className="w-4.5 h-4.5 text-green-400" /> Set Candidate Assessment Marks
            </h3>
            <p className="text-xs text-slate-400 mb-6 font-mono">
              Editing: {selectedStudentForEdit.name} ({selectedStudentForEdit.student_id})
            </p>

            <form onSubmit={handleUpdateMarksSubmit} className="space-y-4">
              <div className="grid gap-4 grid-cols-2">
                <div>
                  <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1.5">Assessment Score</label>
                  <input
                    type="number"
                    min="0"
                    max="100"
                    required
                    value={editScore}
                    onChange={(e) => setEditScore(Number(e.target.value))}
                    className="w-full p-3 bg-slate-950 border border-slate-850 rounded-xl text-xs text-white focus:outline-none focus:border-green-500 font-mono text-center font-bold text-base"
                  />
                </div>
                
                <div>
                  <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1.5">Rank Placement Badge</label>
                  <select
                    value={editRank}
                    onChange={(e) => setEditRank(e.target.value)}
                    className="w-full p-3 bg-slate-950 border border-slate-850 rounded-xl text-xs text-white focus:outline-none focus:border-green-500"
                  >
                    <option>Top Performer</option>
                    <option>Gold Performer</option>
                    <option>Silver Performer</option>
                    <option>Bronze Performer</option>
                    <option>Participation</option>
                  </select>
                </div>
              </div>

              <div className="pt-2 flex flex-col gap-2">
                <button
                  type="submit"
                  disabled={isUpdating}
                  className="w-full rounded-xl bg-green-500 hover:bg-green-400 text-slate-950 font-black p-3.5 text-xs transition-all shadow-md shadow-green-500/10 cursor-pointer"
                >
                  {isUpdating ? "Saving Marks..." : "Save Assessment Marks"}
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setIsEditModalOpen(false);
                    setSelectedStudentForEdit(null);
                  }}
                  className="w-full rounded-xl border border-slate-850 bg-slate-950 hover:bg-slate-900 p-3 text-xs text-slate-455 font-bold cursor-pointer text-center"
                >
                  Cancel
                </button>
              </div>

            </form>
          </div>
        </div>
      )}

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

function RefreshCw({ className, ...props }: React.ComponentProps<"svg">) {
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
      className={className}
      {...props}
    >
      <path d="M21 12a9 9 0 0 0-9-9 9.75 9.75 0 0 0-6.74 2.74L3 8" />
      <path d="M3 3v5h5" />
      <path d="M3 12a9 9 0 0 0 9 9 9.75 9.75 0 0 0 6.74-2.74L21 16" />
      <path d="M16 16h5v5" />
    </svg>
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