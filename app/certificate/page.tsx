import Image from "next/image";
import Link from "next/link";

export default function CertificatePage() {
  const student = {
    name: "Demo Student",
    className: "Class 8",
    school: "Demo School",
    tournament: "SmartIndia.club Educational Skill Tournament",
    category: "Coding",
    score: "85/100",
    rank: "Top Performer",
    position: "Class-wise Top 5",
    certificateId: "SIC-CERT-2026-0001",
    date: "31 May 2026",
    type: "Certificate of Achievement",
  };

  return (
    <main className="min-h-screen bg-slate-950 px-6 py-12 text-white">
      <section className="mx-auto max-w-6xl">
        <p className="text-sm font-semibold text-green-400">
          SmartIndia.club Certificate Center
        </p>

        <h1 className="mt-2 text-4xl font-bold">Verified Certificate</h1>

        <div className="mt-10 rounded-[2rem] bg-white p-6 text-slate-950 shadow-2xl md:p-10">
          <div className="border-4 border-green-500 p-6 md:p-10">
            <div className="text-center">
              <Image
                src="/smartindia-logo.png"
                alt="SmartIndia.club Logo"
                width={160}
                height={160}
                className="mx-auto"
              />

              <p className="mt-3 text-sm font-bold tracking-[0.3em] text-green-600">
                LEARN • COMPETE • GROW
              </p>

              <h2 className="mt-6 text-4xl font-bold text-slate-900">
                {student.type}
              </h2>

              <p className="mt-6 text-lg text-slate-600">
                This certificate is proudly awarded to
              </p>

              <h3 className="mt-4 text-5xl font-bold text-green-700">
                {student.name}
              </h3>

              <p className="mx-auto mt-6 max-w-3xl text-lg text-slate-700">
                For successfully achieving in the SmartIndia.club Educational
                Skill Tournament and demonstrating learning, confidence,
                participation and future-ready skill development.
              </p>
            </div>

            <div className="mt-10 grid gap-4 md:grid-cols-3">
              <Info title="Tournament" value={student.tournament} />
              <Info title="Category" value={student.category} />
              <Info title="Class" value={student.className} />
              <Info title="School" value={student.school} />
              <Info title="Score" value={student.score} />
              <Info title="Rank" value={student.rank} />
              <Info title="Position" value={student.position} />
              <Info title="Certificate ID" value={student.certificateId} />
              <Info title="Date" value={student.date} />
            </div>

            <div className="mt-12 grid gap-8 md:grid-cols-3 md:items-end">
              <div className="rounded-2xl border-2 border-dashed border-slate-400 p-6 text-center">
                <div className="mx-auto flex h-28 w-28 items-center justify-center rounded-xl bg-slate-100 text-sm font-bold text-slate-500">
                  QR CODE
                </div>
                <p className="mt-3 text-sm text-slate-500">
                  Scan to verify certificate
                </p>
              </div>

              <div className="text-center">
                <p className="text-sm text-slate-500">
                  This certificate is digitally issued by
                </p>
                <h4 className="mt-2 text-2xl font-bold text-slate-900">
                  SmartIndia.club
                </h4>
              </div>

              <div className="text-center">
                <div className="mx-auto h-[2px] w-56 bg-slate-400" />
                <p className="mt-3 font-bold text-slate-900">
                  Founder, SmartIndia.club
                </p>
              </div>
            </div>

            <div className="mt-10 border-t pt-5 text-center text-sm text-slate-500">
              <p>Website: smartindia-club.vercel.app</p>
              <p>Email: contact.smartindia369@gmail.com</p>
            </div>
          </div>
        </div>

        <div className="mt-8 flex flex-wrap gap-4">
          <button className="rounded-xl bg-green-500 px-6 py-3 font-bold text-slate-950 hover:bg-green-400">
            Download Certificate
          </button>

          <Link
            href="/dashboard"
            className="rounded-xl border border-slate-600 px-6 py-3 font-bold text-white hover:bg-slate-800"
          >
            Back to Dashboard
          </Link>
        </div>
      </section>
    </main>
  );
}

function Info({ title, value }: { title: string; value: string }) {
  return (
    <div className="rounded-xl bg-slate-100 p-4 text-center">
      <p className="text-xs font-bold uppercase tracking-widest text-slate-500">
        {title}
      </p>
      <p className="mt-2 font-bold text-slate-900">{value}</p>
    </div>
  );
}