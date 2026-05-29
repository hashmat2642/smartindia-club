export default function CertificatePage() {
  const studentName = "Demo Student";
  const score = 85;

  let performance = "Participation";

  if (score >= 80) {
    performance = "Outstanding Performance";
  } else if (score >= 50) {
    performance = "Good Performance";
  }

  return (
    <main className="min-h-screen bg-slate-950 px-6 py-16 text-white">
      <div className="mx-auto max-w-5xl rounded-3xl border-4 border-green-500 bg-white p-10 text-slate-900 shadow-2xl">
        
        <p className="text-center text-green-600 font-bold">
          SmartIndia.club
        </p>

        <h1 className="mt-3 text-center text-5xl font-bold">
          Certificate of Achievement
        </h1>

        <p className="mt-8 text-center text-lg">
          This certificate is proudly presented to
        </p>

        <h2 className="mt-4 text-center text-4xl font-bold text-green-700">
          {studentName}
        </h2>

        <p className="mt-8 text-center text-lg">
          for successfully participating in the
          SmartIndia.club Educational Tournament
          and demonstrating dedication, learning,
          and skill development.
        </p>

        <div className="mt-10 grid gap-5 md:grid-cols-3">
          <div className="rounded-xl bg-slate-100 p-4 text-center">
            <p className="text-sm text-slate-500">Score</p>
            <h3 className="text-2xl font-bold">{score}/100</h3>
          </div>

          <div className="rounded-xl bg-slate-100 p-4 text-center">
            <p className="text-sm text-slate-500">Performance</p>
            <h3 className="text-xl font-bold">
              {performance}
            </h3>
          </div>

          <div className="rounded-xl bg-slate-100 p-4 text-center">
            <p className="text-sm text-slate-500">Certificate ID</p>
            <h3 className="text-xl font-bold">
              SIC-2026-001
            </h3>
          </div>
        </div>

        <div className="mt-16 flex justify-between">
          <div>
            <p className="font-bold">
              Founder Signature
            </p>
            <div className="mt-2 h-[2px] w-40 bg-slate-400" />
          </div>

          <div>
            <p className="font-bold">
              Date Issued
            </p>
            <div className="mt-2 h-[2px] w-40 bg-slate-400" />
          </div>
        </div>
      </div>
    </main>
  );
}