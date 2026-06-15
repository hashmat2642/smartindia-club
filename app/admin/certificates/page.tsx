"use client";

import { supabase } from "@/lib/supabase";
import { useEffect, useState } from "react";

type Student = {
  id: number;
  student_id: string;
  name: string;
  score: number;
  class_name: string;
  school_name: string;
  certificate_id: string;
  rank: string;
};

export default function AdminCertificatePreviewPage() {
  const [students, setStudents] = useState<Student[]>([]);
  const [selectedStudent, setSelectedStudent] = useState<Student | null>(null);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);

  // Database se students list fetch karne ke liye pipeline hook
  useEffect(() => {
    async function fetchStudents() {
      const { data, error } = await supabase
        .from("students")
        .select("*")
        .order("name", { ascending: true });

      if (!error && data) {
        setStudents(data);
        if (data.length > 0) setSelectedStudent(data[0]); // Default first student select hoga
      }
      setLoading(false);
    }
    fetchStudents();
  }, []);

  // Filter functionality for admin lookup
  const filteredStudents = students.filter((s) =>
    s.name?.toLowerCase().includes(search.toLowerCase()) ||
    s.student_id?.toLowerCase().includes(search.toLowerCase())
  );

  if (loading) {
    return (
      <main className="min-h-screen bg-slate-950 text-white flex items-center justify-center">
        <p className="text-lg font-medium">Loading Certificate Preview System...</p>
      </main>
    );
  }

  // Threshold algorithm logic mapping
  const score = selectedStudent?.score ?? 0;
  let performance = "Participation";
  let badgeStyles = "bg-blue-100 text-blue-700";
  let emoji = "✨";

  if (score >= 90) {
    performance = "Gold Performer";
    badgeStyles = "bg-yellow-100 text-yellow-700 font-bold";
    emoji = "🥇";
  } else if (score >= 75) {
    performance = "Silver Performer";
    badgeStyles = "bg-slate-100 text-slate-700 font-bold";
    emoji = "🥈";
  } else if (score >= 60) {
    performance = "Bronze Performer";
    badgeStyles = "bg-orange-100 text-orange-700 font-bold";
    emoji = "🥉";
  }

  return (
    <main className="min-h-screen bg-slate-950 px-4 py-12 text-white print:p-0 print:bg-white">
      <section className="mx-auto max-w-7xl grid gap-8 md:grid-cols-4 print:block">
        
        {/* Left Control Sidebar Panel - Hidden completely during printing */}
        <div className="md:col-span-1 bg-slate-900 p-5 rounded-2xl border border-slate-800 flex flex-col h-[750px] print:hidden">
          <h2 className="text-xl font-bold mb-4 text-green-400">Students Registry</h2>
          
          <input
            type="text"
            placeholder="Search student name..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full rounded-xl p-3 bg-slate-950 text-white border border-slate-800 mb-4 text-sm focus:outline-none focus:border-green-500"
          />

          <div className="flex-1 overflow-y-auto space-y-2 pr-1 custom-scrollbar">
            {filteredStudents.map((student) => (
              <button
                key={student.id}
                onClick={() => setSelectedStudent(student)}
                className={`w-full text-left p-3 rounded-xl text-sm font-medium transition-all duration-150 ${
                  selectedStudent?.id === student.id
                    ? "bg-green-500 text-slate-950 font-bold"
                    : "bg-slate-950 text-slate-300 hover:bg-slate-800"
                }`}
              >
                <p className="truncate">{student.name}</p>
                <p className={`text-xs mt-0.5 ${selectedStudent?.id === student.id ? "text-slate-800" : "text-slate-500"}`}>
                  Score: {student.score ?? 0}/100
                </p>
              </button>
            ))}
            {filteredStudents.length === 0 && (
              <p className="text-xs text-slate-500 text-center mt-4">No records matched.</p>
            )}
          </div>

          <button
            onClick={() => window.print()}
            className="mt-4 w-full rounded-xl bg-green-500 p-3 font-bold text-slate-950 hover:bg-green-400 transition-all text-sm text-center shadow-lg shadow-green-500/10"
          >
            Print Current Certificate
          </button>
        </div>

        {/* Right Printable Blueprint Canvas Area */}
        <div className="md:col-span-3 overflow-x-auto flex justify-center items-start print:w-full print:p-0">
          {selectedStudent ? (
            <div className="certificate-print-area w-[1050px] min-w-[1050px] bg-white p-8 text-slate-950 shadow-2xl rounded-3xl print:shadow-none print:rounded-none print:p-4">
              <div className="relative border-[6px] border-slate-900 p-8 text-center bg-white">
                
                {/* Floating Stamp Label Container */}
                <div className="absolute right-8 top-8 rounded-full bg-green-100 px-5 py-2 text-sm font-bold text-green-700 tracking-wider select-none">
                  VERIFIED
                </div>

                <p className="absolute left-8 top-8 text-xs font-bold text-slate-500 font-mono">
                  Certificate No: {selectedStudent.certificate_id || "PENDING"}
                </p>

                <div className="mt-6 text-center">
                  <h2 className="text-2xl font-black tracking-[0.25em] text-green-600 uppercase">
                    SmartIndia.club
                  </h2>
                  <p className="text-[10px] font-bold tracking-[0.35em] text-slate-400 uppercase mt-0.5">
                    LEARN • COMPETE • GROW
                  </p>
                </div>

                <h1 className="mt-8 text-5xl font-black tracking-tight text-slate-900">
                  Certificate of Achievement
                </h1>

                {/* Dynamic Badge Display Engine */}
                <div className="mt-4">
                  <div className={`inline-flex items-center gap-2 rounded-full px-5 py-1.5 text-sm font-bold ${badgeStyles}`}>
                    <span>{emoji}</span>
                    <span>{performance}</span>
                  </div>
                </div>

                <p className="mt-8 text-lg text-slate-500 italic">
                  This certificate is proudly presented to
                </p>

                <h3 className="mt-4 text-5xl font-black text-green-700 tracking-wide">
                  {selectedStudent.name}
                </h3>

                {/* FIX: Raw whitespace and dangling compilation text segment string wrapped cleanly */}
                <p className="mx-auto mt-6 max-w-3xl text-base leading-relaxed text-slate-700">
                  {"for successfully participating in the "}
                  <span className="font-semibold text-slate-900">SmartIndia.club Educational Tournament</span>{" "}
                  {"and demonstrating exceptional dedication, algorithmic logic, logical thinking capabilities, and core future-ready digital skill growth."}
                </p>

                {/* Technical Metric Values Matrix */}
                <div className="mt-10 grid gap-4 grid-cols-3 text-left">
                  <div className="rounded-xl border border-slate-200 bg-slate-50 p-4">
                    <p className="text-xs font-bold uppercase tracking-wider text-slate-400">Score Achieved</p>
                    <h4 className="mt-1 text-2xl font-bold text-slate-900">{score}/100</h4>
                  </div>

                  <div className="rounded-xl border border-slate-200 bg-slate-50 p-4">
                    <p className="text-xs font-bold uppercase tracking-wider text-slate-400">Performance Level</p>
                    <h4 className="mt-1 text-lg font-bold text-slate-800">{performance}</h4>
                  </div>

                  <div className="rounded-xl border border-slate-200 bg-slate-50 p-4">
                    <p className="text-xs font-bold uppercase tracking-wider text-slate-400">Student ID Link</p>
                    <h4 className="mt-1 text-base font-mono font-bold text-slate-900">{selectedStudent.student_id}</h4>
                  </div>
                </div>

                {/* Signatures Mapping Row */}
                <div className="mt-16 grid grid-cols-2 items-end px-12">
                  <div className="text-left">
                    <p className="font-mono text-lg font-bold text-slate-800 tracking-tight">Hashmat Khan</p>
                    <div className="mt-1 h-[2px] w-48 bg-slate-300" />
                    <p className="mt-2 text-xs font-bold text-slate-400 uppercase tracking-wider">
                      Founder, SmartIndia.club
                    </p>
                  </div>

                  <div className="text-right">
                    <p className="text-base font-bold text-slate-800 font-mono">31 May 2026</p>
                    <div className="mt-1 h-[2px] w-48 bg-slate-300 ml-auto" />
                    <p className="mt-2 text-xs font-bold text-slate-400 uppercase tracking-wider">
                      Date of Issuance
                    </p>
                  </div>
                </div>

              </div>
            </div>
          ) : (
            <div className="bg-slate-900 p-8 rounded-2xl border border-slate-800 text-center w-full text-slate-400">
              No student records loaded.
            </div>
          )}
        </div>

      </section>
    </main>
  );
}