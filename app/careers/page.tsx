"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { students as mockStudents } from "@/app/data/students";
import { 
  Search, Filter, Briefcase, Clock, 
  ShieldCheck, CheckCircle2, X, Check, 
  FileText, Sparkles, User, AlertCircle, Info, Lock
} from "lucide-react";

type Job = {
  id: string;
  title: string;
  category: string;
  pay: string;
  hours: string;
  skills: string;
  level: string;
  description: string;
  payoutType: string;
};

type StudentProfile = {
  name: string;
  student_id: string;
  class_name: string;
  school_name: string;
};

export default function CareersPage() {
  const [jobs] = useState<Job[]>([
    {
      id: "excel-organizer",
      title: "Excel Data Organizer",
      category: "Excel & Data",
      pay: "₹350",
      payoutType: "per sheet completed",
      hours: "2-3 hours/week",
      skills: "Basic Excel formulas, sorting, data typing",
      level: "Beginner Friendly",
      description: "Organize raw student attendance list logs and mark sheets into clean, formatted Excel templates. Perfect for practicing sorting and data hygiene."
    },
    {
      id: "transcription-entry",
      title: "Copy-Paste Data Entry Assistant",
      category: "Excel & Data",
      pay: "₹250",
      payoutType: "per task completed",
      hours: "1-2 hours/week",
      skills: "Typing speed, focus, copy-paste sorting",
      level: "Beginner Friendly",
      description: "Transcribe handwritten registry note sheets into a clean digital text editor format. Attention to detail is essential."
    },
    {
      id: "book-sketching",
      title: "Book Illustration Sketcher",
      category: "Sketching & Art",
      pay: "₹500",
      payoutType: "per approved sketch",
      hours: "Flexible",
      skills: "Hand sketching, pencil drawing, creative design",
      level: "Intermediate",
      description: "Sketch basic black-and-white chapter illustrations for science and moral stories. Submissions are scanned and uploaded digitally."
    },
    {
      id: "poster-designer",
      title: "Digital Banner Creator",
      category: "Sketching & Art",
      pay: "₹400",
      payoutType: "per banner approved",
      hours: "2 hours/task",
      skills: "Paint, Canva, or Photoshop layout design",
      level: "Beginner Friendly",
      description: "Design promotional digital poster slides for educational events and quizzes. Access to simple canvas template builders provided."
    },
    {
      id: "calling-representative",
      title: "Interactive Call Assistant",
      category: "Support & Calling",
      pay: "₹200",
      payoutType: "per hour on shift",
      hours: "3-4 hours/week",
      skills: "Polite speaking, good communication, active listening",
      level: "Intermediate",
      description: "Simulate candidate check-in phone calls or make verification phone calls to students regarding their active event schedule."
    },
    {
      id: "verification-call-helper",
      title: "Form Verification Caller",
      category: "Support & Calling",
      pay: "₹150",
      payoutType: "per hour on shift",
      hours: "2-3 hours/week",
      skills: "Clear communication, checklist checking",
      level: "Beginner Friendly",
      description: "Assist in calling participants who submitted incomplete registrations to verify details from a preset checklist."
    },
    {
      id: "essay-proofreader",
      title: "Essay & Grammar Proofreader",
      category: "Writing & Coding",
      pay: "₹300",
      payoutType: "per essay audited",
      hours: "1-2 hours/week",
      skills: "English grammar, spelling accuracy, proofreading",
      level: "Intermediate",
      description: "Review primary classroom essays to highlight grammar, spelling errors, and layout mistakes using clean review markup."
    }
  ]);

  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [appliedJobIds, setAppliedJobIds] = useState<string[]>([]);
  const [studentProfile, setStudentProfile] = useState<StudentProfile | null>(null);

  // Modal application state
  const [selectedJobForModal, setSelectedJobForModal] = useState<Job | null>(null);
  const [applicantName, setApplicantName] = useState("");
  const [studentId, setStudentId] = useState("");
  const [studentClass, setStudentClass] = useState("");
  const [studentSchool, setStudentSchool] = useState("");
  const [coverNote, setCoverNote] = useState("");
  const [portfolioLink, setPortfolioLink] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  // Sync session details & applied jobs
  useEffect(() => {
    // 1. Get applied list from localStorage
    const savedApplied = localStorage.getItem("hdc_applied_jobs");
    if (savedApplied) {
      try {
        setAppliedJobIds(JSON.parse(savedApplied));
      } catch (e) {
        console.error(e);
      }
    }

    // 2. Pre-fill profile from current active session
    const loggedId = localStorage.getItem("hdc_logged_student_id");
    if (loggedId) {
      const getProfile = async () => {
        try {
          const { data, error } = await supabase
            .from("students")
            .select("*")
            .eq("student_id", loggedId)
            .single();

          if (!error && data) {
            const prof = {
              name: data.name,
              student_id: data.student_id,
              class_name: data.class_name,
              school_name: data.school_name
            };
            setStudentProfile(prof);
            // Sync form variables
            setApplicantName(prof.name);
            setStudentId(prof.student_id);
            setStudentClass(prof.class_name);
            setStudentSchool(prof.school_name);
          } else {
            // Fallback mock check
            const match = mockStudents.find((s) => s.student_id.toLowerCase() === loggedId.toLowerCase());
            if (match) {
              const prof = {
                name: match.name,
                student_id: match.student_id,
                class_name: match.class_name,
                school_name: match.school_name
              };
              setStudentProfile(prof);
              setApplicantName(prof.name);
              setStudentId(prof.student_id);
              setStudentClass(prof.class_name);
              setStudentSchool(prof.school_name);
            }
          }
        } catch {
          console.error("Could not fetch credentials, offline mode fallback");
        }
      };
      getProfile();
    }
  }, []);

  const categories = ["All", "Excel & Data", "Sketching & Art", "Support & Calling", "Writing & Coding"];

  const filteredJobs = jobs.filter((job) => {
    const matchesSearch = job.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          job.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          job.skills.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCat = selectedCategory === "All" || job.category === selectedCategory;
    return matchesSearch && matchesCat;
  });

  const handleApplyClick = (job: Job) => {
    setSelectedJobForModal(job);
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedJobForModal) return;

    setIsSubmitting(true);
    setTimeout(() => {
      // Complete mock submit
      const updated = [...appliedJobIds, selectedJobForModal.id];
      setAppliedJobIds(updated);
      localStorage.setItem("hdc_applied_jobs", JSON.stringify(updated));
      
      setIsSubmitting(false);
      setSelectedJobForModal(null);
      setShowSuccessModal(true);
      
      // Reset cover values
      setCoverNote("");
      setPortfolioLink("");
    }, 1200);
  };

  return (
    <main className="min-h-screen bg-slate-950 text-white py-16 px-4 md:px-8 relative overflow-hidden">
      {/* Background Grids */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#0f172a_1px,transparent_1px),linear-gradient(to_bottom,#0f172a_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] opacity-25 pointer-events-none" />
      <div className="absolute top-0 right-1/4 w-[500px] h-[500px] bg-green-500/5 rounded-full blur-[130px] pointer-events-none" />

      <section className="mx-auto max-w-7xl relative z-10">
        
        {/* Title Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-green-500/10 border border-green-500/20 text-green-400 font-mono tracking-widest uppercase text-xs">
            <Sparkles className="w-4 h-4 text-green-400 animate-pulse" />
            <span>Student Career & Micro-Task Hub</span>
          </div>

          <h1 className="text-4xl md:text-6xl font-black tracking-tight text-white leading-tight">
            Learn, Work & <br/>
            <span className="text-green-450">Build Real Skills</span>
          </h1>

          <p className="text-sm md:text-base text-slate-350 leading-relaxed font-light">
            Secure, verified micro-tasks and creative assignments tailored specifically for younger students. Gain hand-on experience in spreadsheets, illustrations, customer support, and writing.
          </p>
        </div>

        {/* Guidance / Trust Banner */}
        <div className="grid gap-6 md:grid-cols-3 mb-12">
          <div className="rounded-2xl bg-slate-900 border border-slate-850 p-5 flex items-start gap-4">
            <div className="p-3 bg-green-500/10 rounded-xl text-green-400 shrink-0">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <h4 className="font-bold text-sm text-slate-200">Parental Safety Certified</h4>
              <p className="text-[11px] text-slate-450 mt-1 leading-relaxed">All listings are vetted by the SmartIndia Board and pay directly into parent-managed clearance accounts.</p>
            </div>
          </div>

          <div className="rounded-2xl bg-slate-900 border border-slate-850 p-5 flex items-start gap-4">
            <div className="p-3 bg-green-500/10 rounded-xl text-green-400 shrink-0">
              <Clock className="w-5 h-5" />
            </div>
            <div>
              <h4 className="font-bold text-sm text-slate-200">Micro-Commitments</h4>
              <p className="text-[11px] text-slate-450 mt-1 leading-relaxed">Gigs are limited to 1-3 hours per week on weekends, ensuring zero interference with classroom schedules.</p>
            </div>
          </div>

          <div className="rounded-2xl bg-slate-900 border border-slate-850 p-5 flex items-start gap-4">
            <div className="p-3 bg-green-500/10 rounded-xl text-green-400 shrink-0">
              <FileText className="w-5 h-5" />
            </div>
            <div>
              <h4 className="font-bold text-sm text-slate-200">Practical Portfolios</h4>
              <p className="text-[11px] text-slate-450 mt-1 leading-relaxed">Completing jobs builds digital credentials and records of honor that highlight your profile registry.</p>
            </div>
          </div>
        </div>

        {/* Search & Categories Selection Row */}
        <div className="bg-slate-900/40 border border-slate-850 p-6 rounded-3xl mb-10 flex flex-col lg:flex-row gap-6 justify-between items-center shadow-xl">
          <div className="w-full lg:max-w-md relative">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500 w-4 h-4" />
            <input
              type="text"
              placeholder="Search data entry, sketching, calling, proofreading..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-3 bg-slate-950 border border-slate-850 rounded-xl text-sm focus:outline-none focus:border-green-500 transition-colors placeholder-slate-650 text-white"
            />
          </div>

          <div className="flex flex-wrap gap-2 w-full lg:w-auto items-center justify-start lg:justify-end">
            <span className="text-xs text-slate-500 uppercase tracking-widest font-bold flex items-center gap-1.5 mr-2 shrink-0">
              <Filter className="w-3.5 h-3.5 text-green-400" /> Categories:
            </span>
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`text-xs px-3.5 py-2 rounded-xl font-bold cursor-pointer transition-all active:scale-95 ${
                  selectedCategory === cat
                    ? "bg-green-500 text-slate-950 shadow-md shadow-green-500/10"
                    : "border border-slate-800 bg-slate-950 text-slate-400 hover:text-white"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Job Listings Grid */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 mb-16">
          {filteredJobs.map((job) => {
            const hasApplied = appliedJobIds.includes(job.id);
            return (
              <div 
                key={job.id} 
                className="rounded-3xl bg-slate-905 border border-slate-850 p-6 shadow-xl flex flex-col justify-between hover:border-slate-800 hover:shadow-2xl transition-all duration-300 relative group"
              >
                {/* Applied Ribbon Indicator */}
                {hasApplied && (
                  <div className="absolute top-4 right-4 flex items-center gap-1 text-[10px] font-bold px-2 py-0.5 rounded bg-green-500/10 border border-green-500/20 text-green-400">
                    <Check className="w-3 h-3" /> APPLIED
                  </div>
                )}

                <div>
                  <div className="flex justify-between items-start">
                    <span className="text-[10px] font-bold text-slate-450 uppercase tracking-wider">{job.category}</span>
                  </div>

                  <h3 className="text-lg font-bold text-white mt-2 leading-tight group-hover:text-green-400 transition-colors">
                    {job.title}
                  </h3>

                  <p className="text-xs text-slate-400 mt-3.5 leading-relaxed">
                    {job.description}
                  </p>

                  <div className="mt-5 space-y-2.5 border-t border-slate-900 pt-4 text-[11px] text-slate-350">
                    <div className="flex justify-between">
                      <span className="text-slate-500">PAYOUT:</span>
                      <span className="font-bold text-green-400">{job.pay} <span className="text-slate-500 font-normal">{job.payoutType}</span></span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-500">HOURS:</span>
                      <span className="font-bold text-slate-200">{job.hours}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-500">LEVEL:</span>
                      <span className="font-bold text-slate-300">{job.level}</span>
                    </div>
                    <div className="flex flex-col mt-2.5">
                      <span className="text-slate-550 block font-mono text-[9px] uppercase tracking-wider">REQUIRED SKILLS</span>
                      <span className="text-xs text-slate-300 font-medium mt-1 leading-normal">{job.skills}</span>
                    </div>
                  </div>
                </div>

                <div className="mt-6 pt-4 border-t border-slate-900">
                  {hasApplied ? (
                    <button
                      disabled
                      className="w-full rounded-xl bg-slate-900 border border-slate-850 p-3 text-xs font-bold text-slate-500 text-center flex items-center justify-center gap-1 cursor-not-allowed"
                    >
                      Application Under Review
                    </button>
                  ) : (
                    <button
                      onClick={() => handleApplyClick(job)}
                      className="w-full rounded-xl bg-green-500 hover:bg-green-400 text-slate-950 font-black p-3 text-xs text-center transition-all cursor-pointer flex items-center justify-center gap-1 active:scale-95"
                    >
                      Apply Now <Briefcase className="w-3.5 h-3.5" />
                    </button>
                  )}
                </div>
              </div>
            );
          })}

          {filteredJobs.length === 0 && (
            <div className="col-span-full py-16 text-center text-slate-400 bg-slate-900/25 border border-slate-850 rounded-3xl">
              <Lock className="w-10 h-10 text-slate-650 mx-auto mb-3" />
              <h4 className="font-bold text-sm">No matched micro-tasks found</h4>
              <p className="text-xs text-slate-550 mt-1">Try selecting another search keyword or category tab.</p>
            </div>
          )}
        </div>

      </section>

      {/* --- APPLICATION SUBMIT MODAL --- */}
      {selectedJobForModal && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-800 rounded-3xl w-full max-w-lg p-6 relative shadow-2xl">
            
            <button 
              onClick={() => setSelectedJobForModal(null)}
              className="absolute top-4 right-4 text-slate-500 hover:text-white transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            <h3 className="text-xl font-bold text-white flex items-center gap-2 mb-1">
              <Briefcase className="w-5 h-5 text-green-400" /> Apply for Micro-Task
            </h3>
            <p className="text-xs text-slate-400 mb-6 font-mono uppercase tracking-wider">
              Job: {selectedJobForModal.title} ({selectedJobForModal.pay} {selectedJobForModal.payoutType})
            </p>

            <form onSubmit={handleFormSubmit} className="space-y-4">
              
              {/* Profile Sync Notice */}
              {studentProfile ? (
                <div className="bg-green-500/5 border border-green-500/10 rounded-xl p-3.5 flex gap-3 text-xs leading-relaxed mb-4 text-slate-300">
                  <User className="w-4 h-4 text-green-400 shrink-0 mt-0.5" />
                  <div>
                    <span className="font-bold text-green-400">Profile Sync Active: </span>
                    Pre-filled with credentials linked to active Student ID <span className="font-mono font-bold text-slate-200">{studentProfile.student_id}</span>.
                  </div>
                </div>
              ) : (
                <div className="bg-yellow-500/5 border border-yellow-500/10 rounded-xl p-3.5 flex gap-3 text-xs leading-relaxed mb-4 text-slate-350">
                  <AlertCircle className="w-4 h-4 text-yellow-500 shrink-0 mt-0.5" />
                  <div>
                    <span className="font-bold text-yellow-550">Not Authenticated: </span>
                    You can enter details manually. Consider logging into your Student Portal to sync profile rankings.
                  </div>
                </div>
              )}

              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1.5">Candidate Name</label>
                  <input
                    type="text"
                    required
                    value={applicantName}
                    onChange={(e) => setApplicantName(e.target.value)}
                    placeholder="Example: Hashmat"
                    className="w-full p-3 bg-slate-950 border border-slate-850 rounded-xl text-xs text-white focus:outline-none focus:border-green-500"
                  />
                </div>
                <div>
                  <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1.5">Student Roll ID (If any)</label>
                  <input
                    type="text"
                    value={studentId}
                    onChange={(e) => setStudentId(e.target.value)}
                    placeholder="Example: SIC-001"
                    className="w-full p-3 bg-slate-950 border border-slate-850 rounded-xl text-xs text-white focus:outline-none focus:border-green-500"
                  />
                </div>
                <div>
                  <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1.5">Class / Grade</label>
                  <input
                    type="text"
                    required
                    value={studentClass}
                    onChange={(e) => setStudentClass(e.target.value)}
                    placeholder="Example: Class 8"
                    className="w-full p-3 bg-slate-950 border border-slate-850 rounded-xl text-xs text-white focus:outline-none focus:border-green-500"
                  />
                </div>
                <div>
                  <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1.5">School Name</label>
                  <input
                    type="text"
                    required
                    value={studentSchool}
                    onChange={(e) => setStudentSchool(e.target.value)}
                    placeholder="Example: Demo School"
                    className="w-full p-3 bg-slate-950 border border-slate-850 rounded-xl text-xs text-white focus:outline-none focus:border-green-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1.5">Portfolio or Sample Project Link (If any)</label>
                <input
                  type="url"
                  value={portfolioLink}
                  onChange={(e) => setPortfolioLink(e.target.value)}
                  placeholder="https://example.com/my-excel-sheet-or-sketch"
                  className="w-full p-3 bg-slate-950 border border-slate-850 rounded-xl text-xs text-white focus:outline-none focus:border-green-500 placeholder-slate-700"
                />
              </div>

              <div>
                <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1.5">Why are you suitable for this micro-task?</label>
                <textarea
                  required
                  rows={3}
                  value={coverNote}
                  onChange={(e) => setCoverNote(e.target.value)}
                  placeholder="Briefly mention your practice scores or why you are interested in this..."
                  className="w-full p-3 bg-slate-950 border border-slate-850 rounded-xl text-xs text-white focus:outline-none focus:border-green-500"
                />
              </div>

              <div className="pt-2 flex flex-col gap-2">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full flex items-center justify-center gap-2 rounded-xl bg-green-500 hover:bg-green-400 text-slate-950 font-black p-3.5 text-xs transition-all shadow-md shadow-green-500/10 cursor-pointer"
                >
                  {isSubmitting ? "Submitting Application..." : "Submit Profile Application"}
                </button>
                <button
                  type="button"
                  onClick={() => setSelectedJobForModal(null)}
                  className="w-full rounded-xl border border-slate-850 bg-slate-950 hover:bg-slate-900 p-3 text-xs text-slate-450 font-bold transition-all cursor-pointer text-center"
                >
                  Cancel Application
                </button>
              </div>

            </form>
          </div>
        </div>
      )}

      {/* --- SUCCESS MODAL --- */}
      {showSuccessModal && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-800 rounded-3xl w-full max-w-sm p-6 text-center shadow-2xl relative">
            <span className="mx-auto w-12 h-12 rounded-full bg-green-500/10 border border-green-500/20 text-green-400 flex items-center justify-center text-xl mb-4">
              ✓
            </span>
            <h3 className="text-xl font-bold text-white">Application Received!</h3>
            <p className="text-xs text-slate-400 mt-2 leading-relaxed">
              Your profile verification request was successfully sent. The SmartIndia checking board is verifying details.
            </p>
            <div className="bg-slate-950/80 border border-slate-850 rounded-xl p-3 mt-4 text-[10px] text-slate-500 font-mono text-left space-y-1">
              <div>STATUS: <span className="text-green-400 font-bold">Under Review</span></div>
              <div>VERIFICATION CODE: <span className="text-slate-300">REG-SUB-JOB82</span></div>
              <div>ESTIMATED TIME: <span>24 Working Hours</span></div>
            </div>

            <button
              onClick={() => setShowSuccessModal(false)}
              className="mt-6 w-full rounded-xl bg-slate-950 border border-slate-850 hover:bg-slate-900 p-3 text-xs font-bold text-slate-300 hover:text-white transition-all cursor-pointer"
            >
              Close Success Panel
            </button>
          </div>
        </div>
      )}

    </main>
  );
}
