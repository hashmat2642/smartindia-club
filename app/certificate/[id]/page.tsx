// app/certificate/[id]/page.tsx
import Image from "next/image";
import Link from "next/link";
import { QRCodeSVG } from "qrcode.react";
import PrintButton from "@/components/PrintButton";
import { supabase } from "@/lib/supabase";

export default async function DynamicCertificatePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  // Single query
  const { data: student, error } = await supabase
    .from("students")
    .select("*")
    .eq("certificate_id", id)
    .single();

  if (error || !student) {
    return (
      <main className="min-h-screen bg-slate-950 px-6 py-16 text-white">
        <section className="mx-auto max-w-4xl text-center">
          <h1 className="text-4xl font-bold">Certificate Not Found</h1>
          <p className="mt-4 text-slate-300">
            Please check the certificate ID and try again.
          </p>
          <Link
            href="/certificate"
            className="mt-8 inline-block rounded-xl bg-green-500 px-6 py-3 font-bold text-slate-950"
          >
            Back to Certificate Center
          </Link>
        </section>
      </main>
    );
  }

  const isPaid = student.payment_status === "Paid";

  return (
    <main className="min-h-screen bg-slate-950 px-6 py-10 text-white">
      <section className="mx-auto max-w-7xl">
        <p className="text-sm font-semibold text-green-400">
          SmartIndia.club Certificate Verification
        </p>

        <h1 className="mt-2 text-4xl font-bold">Verified Certificate</h1>

        <div className="certificate-print-area mt-8 overflow-x-auto rounded-3xl bg-slate-900 p-6 shadow-2xl">
          <div className="mx-auto w-[1100px] bg-white p-8 text-slate-950">
            <div className="relative border-[6px] border-slate-900 p-8">
              <div className="absolute right-8 top-8 rounded-full bg-green-100 px-5 py-2 text-sm font-bold text-green-700">
                VERIFIED
              </div>

              <p className="absolute left-8 top-8 text-xs font-bold text-slate-500">
                Certificate No: {student.certificate_id}
              </p>

              <div className="text-center">
                <Image
                  src="/smartindia-logo.png"
                  alt="SmartIndia.club Logo"
                  width={150}
                  height={150}
                  className="mx-auto"
                />

                <p className="mt-2 text-xs font-bold tracking-[0.35em] text-green-600">
                  LEARN • COMPETE • GROW
                </p>

                <h2 className="mt-6 text-5xl font-extrabold text-slate-900">
                  Certificate of Achievement
                </h2>

                {student.performance === "Gold Performer" && (
                  <div className="mt-4 inline-block rounded-full bg-yellow-100 px-6 py-2 font-bold text-yellow-700">
                    🥇 Gold Performer
                  </div>
                )}

                {student.performance === "Silver Performer" && (
                  <div className="mt-4 inline-block rounded-full bg-gray-100 px-6 py-2 font-bold text-gray-700">
                    🥈 Silver Performer
                  </div>
                )}

                {student.performance === "Bronze Performer" && (
                  <div className="mt-4 inline-block rounded-full bg-orange-100 px-6 py-2 font-bold text-orange-700">
                    🥉 Bronze Performer
                  </div>
                )}

                <p className="mt-4 text-lg text-slate-600">
                  This certificate is proudly awarded to
                </p>

                <h3 className="mt-3 text-6xl font-extrabold text-green-700">
                  {student.name}
                </h3>

                <p className="mx-auto mt-5 max-w-3xl text-lg leading-relaxed text-slate-700">
                  For successfully achieving in the SmartIndia.club Educational
                  Skill Tournament and demonstrating learning, confidence,
                  participation, digital awareness and future-ready skill growth.
                </p>
              </div>

              <div className="mt-8 grid grid-cols-3 gap-4">
                <Info title="Student ID" value={student.student_id} />
                <Info title="Class" value={student.class_name} />
                <Info title="School" value={student.school_name} />
                <Info title="Score" value={student.score ?? 0} />
                <Info title="Rank" value={student.rank || "Pending"} />
                <Info
                  title="Performance"
                  value={student.performance || "Pending"}
                />
                <Info title="Certificate ID" value={student.certificate_id} />
              </div>

              <div className="mt-10 grid grid-cols-3 items-end gap-8">
                <div className="text-center">
                  <div className="mx-auto flex h-32 w-32 items-center justify-center rounded-xl border bg-white p-2">
                    <QRCodeSVG
                      value={`https://smartindia-club.vercel.app/certificate/${student.certificate_id}`}
                      size={110}
                    />
                  </div>
                  <p className="mt-2 text-xs text-slate-500">
                    Scan to verify certificate
                  </p>
                </div>

                <div className="text-center">
                  <p className="text-sm text-slate-500">Digitally issued by</p>
                  <h4 className="mt-2 text-2xl font-bold text-slate-900">
                    SmartIndia.club
                  </h4>
                  <p className="mt-1 text-sm text-slate-500">
                    Verified Educational Skill Certificate
                  </p>
                </div>

                <div className="text-center">
                  <div className="mx-auto h-[2px] w-64 bg-slate-400" />
                  <p className="mt-3 font-bold text-slate-900">
                    Hashmat Khan
                  </p>
                  <p className="text-sm text-slate-500">
                    Founder, SmartIndia.club
                  </p>
                </div>
              </div>

              <div className="mt-6 text-center">
                <p className="text-sm text-slate-500">
                  Issued On: {new Date().toLocaleDateString()}
                </p>
              </div>

              <div className="mt-8 border-t pt-4 text-center text-xs text-slate-500">
                <p>
                  Website: smartindia-club.vercel.app | Email:
                  contact.smartindia369@gmail.com
                </p>
                <p>
                  This certificate is digitally issued and can be verified using
                  the QR code or certificate ID.
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-8 flex flex-wrap gap-4">
          {isPaid ? (
            <PrintButton />
          ) : (
            <div className="rounded-xl bg-red-100 px-6 py-3 font-bold text-red-700">
              Payment Pending - Certificate Download Locked
            </div>
          )}

          <Link
            href="/admin"
            className="rounded-xl border border-slate-600 px-6 py-3 font-bold text-white hover:bg-slate-800"
          >
            Back to Admin
          </Link>
        </div>
      </section>
    </main>
  );
}

function Info({ title, value }: { title: string; value: string | number }) {
  return (
    <div className="rounded-xl border border-slate-200 bg-slate-50 p-4 text-center">
      <p className="text-xs font-bold uppercase tracking-widest text-slate-500">
        {title}
      </p>
      <p className="mt-2 font-bold text-slate-900">{value}</p>
    </div>
  );
}