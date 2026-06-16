// app/practice/[type]/page.tsx
import Link from "next/link";

// 1. Clean Structured Questions Static Dataset Directory
const staticDatabase: Record<
  string,
  {
    title: string;
    description: string;
    questions: {
      id: number;
      question: string;
      options: string[];
      answer: string;
    }[];
  }
> = {
  quiz: {
    title: "Quiz Practice Lab",
    description: "General knowledge and school-level verification questions matrix.",
    questions: [
      {
        id: 1,
        question: "Which planet is known as the Red Planet?",
        options: ["Earth", "Mars", "Jupiter", "Venus"],
        answer: "Mars",
      },
      {
        id: 2,
        question: "Who developed the theory of Relativity?",
        options: ["Isaac Newton", "Albert Einstein", "Nikola Tesla", "Marie Curie"],
        answer: "Albert Einstein",
      },
      {
        id: 3,
        question: "What is the capital city of India?",
        options: ["Mumbai", "New Delhi", "Kolkata", "Chennai"],
        answer: "New Delhi",
      },
    ],
  },
  logic: {
    title: "Logic & Reasoning Arena",
    description: "Improve sequences, pattern matching, and analytical problem-solving.",
    questions: [
      {
        id: 1,
        question: "What comes next in the sequence: 2, 4, 6, 8, ...?",
        options: ["9", "10", "11", "12"],
        answer: "10",
      },
      {
        id: 2,
        question: "If CAT is coded as 3120, how will you code DOG?",
        options: ["4157", "4156", "3157", "4147"],
        answer: "4157",
      },
    ],
  },
  coding: {
    title: "Coding Basics Center",
    description: "Predict output loops, logic evaluation, and programming fundamentals.",
    questions: [
      {
        id: 1,
        question: "What is the output of the mathematical expression: 2 + 3 * 5?",
        options: ["25", "17", "15", "20"],
        answer: "17",
      },
      {
        id: 2,
        question: "Which data type is utilized to hold a true or false status flag?",
        options: ["String", "Number", "Boolean", "Undefined"],
        answer: "Boolean",
      },
    ],
  },
};

// 2. Main Page Framework — 100% Static HTML Standard Compliant (Zero Linter Warnings)
export default async function InteractivePracticeLab({ params }: { params: Promise<{ type: string }> }) {
  const resolvedParams = await params;
  const currentType = resolvedParams.type?.toLowerCase();
  const currentModule = staticDatabase[currentType] || null;

  if (!currentModule) {
    return (
      <main className="min-h-screen bg-slate-950 text-white flex items-center justify-center p-6">
        <div className="bg-slate-900 border border-slate-800 p-8 rounded-3xl max-w-md text-center shadow-xl">
          <h1 className="text-2xl font-bold">Module Not Found</h1>
          <p className="text-slate-400 text-sm mt-2">The selected route parameter does not match active records.</p>
          <Link href="/practice" className="mt-6 inline-block rounded-xl bg-green-500 px-5 py-2.5 font-bold text-slate-950 text-sm hover:bg-green-400 transition-colors">
            Back to Practice Hub
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-slate-950 text-white py-16 px-4 md:px-6">
      <section className="mx-auto max-w-4xl">
        
        {/* Header Navigation Module */}
        <div className="mb-10 flex flex-wrap items-center justify-between gap-4 border-b border-slate-900 pb-6">
          <div>
            <p className="text-xs font-bold text-green-400 uppercase tracking-widest">Practice Mode</p>
            <h1 className="text-3xl font-black tracking-tight text-white mt-1">{currentModule.title}</h1>
            <p className="text-sm text-slate-400 mt-1">{currentModule.description}</p>
          </div>
          <Link href="/practice" className="text-xs font-bold rounded-xl border border-slate-800 bg-slate-900 px-4 py-2 text-slate-400 hover:text-white transition-all">
            &larr; Exit Arena
          </Link>
        </div>

        {/* Clean Static Challenge Render Matrix */}
        <div className="space-y-6">
          {currentModule.questions.map((q, idx) => (
            <div key={q.id} className="rounded-3xl bg-slate-900 p-6 md:p-8 border border-slate-800 shadow-xl">
              <div className="flex items-start gap-3">
                <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-slate-800 text-xs font-bold text-slate-400 font-mono">
                  {idx + 1}
                </span>
                <h3 className="text-lg font-bold text-slate-100 leading-snug">{q.question}</h3>
              </div>

              {/* Static Options Row Sheet */}
              <div className="mt-6 grid gap-3 sm:grid-cols-2">
                {q.options.map((option) => (
                  <div
                    key={option}
                    className="w-full text-left p-4 rounded-xl border border-slate-800/60 bg-slate-950 text-slate-300 text-sm font-medium select-none"
                  >
                    {option}
                  </div>
                ))}
              </div>

              {/* Instant Verified Direct Answer Sheet Reference Block */}
              <div className="mt-5 pt-4 border-t border-slate-800/40 flex items-center justify-between text-sm">
                <p className="text-slate-500 font-medium">Correct Verification Answer:</p>
                <p className="text-green-400 font-bold bg-green-500/10 px-3 py-1 rounded-lg border border-green-500/20 tracking-wide">
                  {q.answer}
                </p>
              </div>
            </div>
          ))}
        </div>

      </section>
    </main>
  );
}