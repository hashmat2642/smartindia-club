import Link from "next/link";

export default function CertificatePage() {
  return (
    <main className="min-h-screen bg-slate-950 text-white">
      <section className="mx-auto max-w-5xl px-6 py-16">
        <p className="text-sm font-semibold text-green-400">
          Certificate Center
        </p>

        <h1 className="mt-2 text-4xl font-bold">Your Certificate</h1>

        <p className="mt-3 text-slate-300">
          After completing the tournament, students will receive a verified
          participation or winner certificate.
        </p>

        <div className="mt-10 rounded-3xl bg-white p-8 text-center text-slate-950 shadow-xl">
          <p className="text-sm font-semibold uppercase tracking-widest">
            Certificate of Participation
          </p>

          <h2 className="mt-6 text-4xl font-bold">Healthy Digital Club</h2>

          <p className="mt-6 text-lg">This certificate is proudly presented to</p>

          <h3 className="mt-3 text-3xl font-bold">Student Name</h3>

          <p className="mx-auto mt-6 max-w-2xl text-slate-700">
            For successfully participating in the First Educational Skill
            Tournament focused on Quiz, Logic, and Coding Basics.
          </p>

          <div className="mt-8 flex flex-wrap justify-center gap-8 text-sm">
            <div>
              <p className="font-bold">Certificate ID</p>
              <p>HDC-CERT-001</p>
            </div>

            <div>
              <p className="font-bold">Status</p>
              <p>Verified</p>
            </div>

            <div>
              <p className="font-bold">Category</p>
              <p>Participation</p>
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