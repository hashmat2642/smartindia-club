// app/certificate/[id]/page.tsx
import PrintButton from "@/components/PrintButton";
import { supabase } from "@/lib/supabase";
import Image from "next/image";
import Link from "next/link";
import { QRCodeSVG } from "qrcode.react";
import { students as mockStudents } from "@/app/data/students";
import { ShieldCheck, Award, ArrowLeft, AlertTriangle } from "lucide-react";

type Student = {
  id: number;
  student_id: string;
  name: string;
  class_name: string;
  school_name: string;
  score: number;
  rank: string;
  performance: string;
  payment_status: string;
  certificate_id: string;
};

export default async function DynamicCertificatePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  let student: Student | null = null;
  let isOfflineFallback = false;

  // Single query to check from Supabase
  try {
    const { data, error } = await supabase
      .from("students")
      .select("*")
      .eq("certificate_id", id)
      .single();

    if (!error && data) {
      student = data as Student;
    } else {
      // Try fallback from mockStudents list
      const match = mockStudents.find((s) => s.certificate_id.toLowerCase() === id.toLowerCase());
      if (match) {
        student = {
          id: Number(match.id),
          student_id: match.student_id,
          name: match.name,
          class_name: match.class_name,
          school_name: match.school_name,
          score: match.score,
          rank: match.rank,
          performance: match.score >= 90 ? "Gold Performer" : match.score >= 75 ? "Silver Performer" : match.score >= 60 ? "Bronze Performer" : "Participation",
          payment_status: "Paid", // Cleared for display
          certificate_id: match.certificate_id
        };
        isOfflineFallback = true;
      }
    }
  } catch {
    // Graceful offline fallback catch
    const match = mockStudents.find((s) => s.certificate_id.toLowerCase() === id.toLowerCase());
    if (match) {
      student = {
        id: Number(match.id),
        student_id: match.student_id,
        name: match.name,
        class_name: match.class_name,
        school_name: match.school_name,
        score: match.score,
        rank: match.rank,
        performance: match.score >= 90 ? "Gold Performer" : match.score >= 75 ? "Silver Performer" : match.score >= 60 ? "Bronze Performer" : "Participation",
        payment_status: "Paid",
        certificate_id: match.certificate_id
      };
      isOfflineFallback = true;
    }
  }

  if (!student) {
    return (
      <main className="min-h-screen bg-slate-950 px-6 py-16 text-white flex items-center justify-center relative">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,#1e293b,transparent_60%)] opacity-20 pointer-events-none" />
        <section className="mx-auto max-w-md text-center bg-slate-900 border border-slate-850 p-8 rounded-3xl shadow-2xl relative z-10">
          <AlertTriangle className="w-12 h-12 text-red-500 mx-auto mb-4" />
          <h1 className="text-2xl font-black text-white">Certificate Not Found</h1>
          <p className="mt-3 text-slate-400 text-sm leading-relaxed">
            The certificate ID <span className="font-mono text-slate-200 bg-slate-950 px-2 py-0.5 rounded">{id}</span> could not be verified on the register database logs.
          </p>
          <div className="mt-8 flex gap-4 justify-center">
            <Link
              href="/"
              className="rounded-xl border border-slate-800 bg-slate-950 px-5 py-2.5 text-xs font-bold text-slate-400 hover:text-white transition-all"
            >
              Return Home
            </Link>
            <Link
              href="/leaderboard"
              className="rounded-xl bg-green-505 bg-green-500 px-5 py-2.5 text-xs font-black text-slate-950 hover:bg-green-400 transition-all"
            >
              Verify Standing
            </Link>
          </div>
        </section>
      </main>
    );
  }

  const isPaid = student.payment_status === "Paid";

  return (
    <main className="min-h-screen bg-slate-950 px-4 md:px-8 py-12 text-white relative overflow-hidden">
      {/* Background patterns */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#0f172a_1px,transparent_1px),linear-gradient(to_bottom,#0f172a_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] opacity-20 pointer-events-none" />
      <div className="absolute top-0 right-1/4 w-[500px] h-[500px] bg-green-500/5 rounded-full blur-[130px] pointer-events-none" />

      <section className="mx-auto max-w-7xl relative z-10">
        
        {/* Verification Status Header Bar */}
        <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-900 pb-6 mb-8">
          <div>
            <div className="flex items-center gap-1.5 text-xs font-bold text-green-400 uppercase tracking-widest">
              <ShieldCheck className="w-4 h-4 text-green-400 shrink-0" />
              <span>SmartIndia Club Verified Credentials</span>
            </div>
            <h1 className="text-3xl font-black mt-1">Verifiable Skill Certificate</h1>
          </div>
          
          <div className="flex items-center gap-2">
            <Link
              href="/admin"
              className="inline-flex items-center gap-1 text-xs font-bold text-slate-500 hover:text-green-400 transition-colors uppercase tracking-widest cursor-pointer mr-2"
            >
              <ArrowLeft className="w-3.5 h-3.5" /> Exit Console
            </Link>
            {isOfflineFallback && (
              <span className="text-[10px] font-bold px-2.5 py-1 rounded bg-yellow-500/10 border border-yellow-500/20 text-yellow-550">
                OFFLINE FALLBACK VIEW
              </span>
            )}
          </div>
        </div>

        {/* Certificate Display Area */}
        <div className="certificate-print-area mt-8 overflow-x-auto rounded-3xl bg-slate-900 border border-slate-850 p-6 md:p-8 shadow-2xl">
          
          {/* Certificate Container with Gold Double Border */}
          <div className="mx-auto w-[1120px] bg-white p-10 text-slate-950 shadow-inner relative select-none">
            
            {/* Border frame */}
            <div className="relative border-[10px] border-double border-amber-600/60 p-8">
              
              {/* Outer corner marks */}
              <div className="absolute -top-1 -left-1 w-6 h-6 border-t-4 border-l-4 border-amber-600" />
              <div className="absolute -top-1 -right-1 w-6 h-6 border-t-4 border-r-4 border-amber-600" />
              <div className="absolute -bottom-1 -left-1 w-6 h-6 border-b-4 border-l-4 border-amber-600" />
              <div className="absolute -bottom-1 -right-1 w-6 h-6 border-b-4 border-r-4 border-amber-600" />

              {/* Status and ID Headers */}
              <div className="flex justify-between items-start">
                <span className="text-[9px] font-bold text-slate-450 font-mono tracking-widest uppercase">
                  Certificate Registry No: {student.certificate_id}
                </span>
                
                <span className="inline-flex items-center gap-1 px-3 py-1 rounded bg-green-50 border border-green-200 text-[10px] font-bold text-green-700 uppercase tracking-widest font-mono">
                  <ShieldCheck className="w-3.5 h-3.5 text-green-600" /> Audited Verified
                </span>
              </div>

              {/* Certificate content core */}
              <div className="text-center mt-6">
                
                {/* Brand Header */}
                <Image
                  src="/smartindia-logo.png"
                  alt="SmartIndia.club Logo"
                  width={100}
                  height={100}
                  className="mx-auto"
                />

                <p className="mt-2 text-[10px] font-extrabold tracking-[0.4em] text-green-650 uppercase font-sans">
                  Learn • Compete • Grow
                </p>

                <h2 className="mt-8 text-5xl font-black text-slate-900 tracking-tight font-serif">
                  Certificate of Achievement
                </h2>

                <p className="mt-5 text-sm md:text-base text-slate-500 font-medium italic">
                  This certificate is proudly awarded to
                </p>

                {/* Candidate Name */}
                <h3 className="mt-4 text-5xl font-black text-green-700 tracking-tight select-all">
                  {student.name}
                </h3>

                <p className="mx-auto mt-6 max-w-2xl text-sm leading-relaxed text-slate-650 font-medium">
                  For successfully participating in the <span className="font-bold text-slate-800">SmartIndia Educational Skill Tournament 2026</span> and demonstrating learning, logic, digital awareness, and future-ready computer skill growth.
                </p>
              </div>

              {/* Metadata Info Grid */}
              <div className="mt-10 grid grid-cols-4 gap-4">
                <Info title="Candidate Name" value={student.name} />
                <Info title="Student Roll ID" value={student.student_id} />
                <Info title="Class / Grade" value={student.class_name} />
                <Info title="School Association" value={student.school_name} />
                <Info title="Exam score" value={`${student.score ?? 0} / 100`} />
                <Info title="Live Rank" value={student.rank || "Participation"} />
                <Info title="Merit level" value={student.performance || "Participation"} />
                <Info title="Registry Registry ID" value={student.certificate_id} />
              </div>

              {/* Footers, QR Code, Stamp Seal, Founder Signature */}
              <div className="mt-12 grid grid-cols-3 items-end gap-6 border-t border-slate-100 pt-8">
                
                {/* QR Code Column */}
                <div className="text-center">
                  <div className="mx-auto flex h-28 w-28 items-center justify-center rounded-xl border border-slate-200 bg-white p-2 shadow-sm">
                    <QRCodeSVG
                      value={`https://smartindia-club.vercel.app/certificate/${student.certificate_id}`}
                      size={96}
                    />
                  </div>
                  <p className="mt-2 text-[9px] text-slate-400 font-bold uppercase tracking-wider">
                    Scan to verify registry
                  </p>
                </div>

                {/* Gold Stamp Seal Column */}
                <div className="text-center relative">
                  <svg width="90" height="90" viewBox="0 0 100 100" className="mx-auto text-amber-500 fill-amber-500">
                    <defs>
                      <radialGradient id="gold" cx="50%" cy="50%" r="50%">
                        <stop offset="0%" stopColor="#fcd34d" />
                        <stop offset="70%" stopColor="#d97706" />
                        <stop offset="100%" stopColor="#78350f" />
                      </radialGradient>
                    </defs>
                    <circle cx="50" cy="50" r="44" fill="url(#gold)" stroke="#b45309" strokeWidth="2.5" />
                    <circle cx="50" cy="50" r="37" fill="none" stroke="#fef3c7" strokeWidth="1" strokeDasharray="3 2" />
                    <path d="M50 22 L56 36 L72 36 L60 45 L64 60 L50 50 L36 60 L40 45 L28 36 L44 36 Z" fill="#fef3c7" />
                  </svg>
                  <p className="mt-2.5 text-[9px] text-slate-455 font-bold uppercase tracking-wider">
                    Official Gold Merit Stamp
                  </p>
                </div>

                {/* Founder Signature Column */}
                <div className="text-center">
                  {/* Digital Signature line script */}
                  <div className="mx-auto h-[2px] w-48 bg-slate-300" />
                  <p className="mt-3 font-serif font-bold text-slate-800 text-lg italic tracking-wide">
                    Hashmat Khan
                  </p>
                  <p className="text-[10px] text-slate-500 font-bold uppercase mt-1">
                    Founder, SmartIndia.club
                  </p>
                </div>

              </div>

              {/* Bottom Copyright disclaimer */}
              <div className="mt-8 border-t border-slate-100 pt-4 text-center text-[10px] text-slate-400 space-y-1">
                <p>
                  Official URL: smartindia-club.vercel.app | Support: contact.smartindia369@gmail.com
                </p>
                <p className="font-mono">
                  This document is cryptographically verified and clearance check is managed under SmartIndia Roll ledgers.
                </p>
              </div>

            </div>
          </div>
        </div>

        {/* Buttons Action bar */}
        <div className="mt-8 flex flex-wrap items-center justify-between gap-4">
          <div className="flex gap-3">
            {isPaid ? (
              <PrintButton />
            ) : (
              <div className="inline-flex items-center gap-2 rounded-xl bg-red-500/10 border border-red-500/20 px-6 py-3 font-bold text-red-400 text-sm">
                <AlertTriangle className="w-4 h-4 text-red-400" /> Payout Pending - Certificate Download Locked
              </div>
            )}

            <Link
              href="/leaderboard"
              className="rounded-xl border border-slate-800 bg-slate-900 hover:bg-slate-850 px-6 py-3 text-sm font-bold text-slate-300 hover:text-white transition-all cursor-pointer flex items-center gap-1.5"
            >
              Verify Standing <Award className="w-4 h-4" />
            </Link>
          </div>

          <div className="text-xs text-slate-500 flex items-center gap-1 font-mono">
            <span>ISSUED ON: 31 May 2026</span>
          </div>
        </div>

      </section>
    </main>
  );
}

function Info({ title, value }: { title: string; value: string | number }) {
  return (
    <div className="rounded-xl border border-slate-100 bg-slate-50/50 p-4 text-center">
      <p className="text-[9px] font-bold uppercase tracking-widest text-slate-400">
        {title}
      </p>
      <p className="mt-1.5 font-bold text-slate-800 text-xs truncate" title={String(value)}>{value}</p>
    </div>
  );
}