// app/practice/[type]/page.tsx
"use client";

import Link from "next/link";
import { use, useState } from "react";

// Mock Database structured safely split by practice module tags
const databaseRepo: Record<
  string,
  {
    title: string;
    description: string;
    questions: {
      id: number;
      question: string;
      options: string[];
      correct: string;
    }[];
  }
> = {
  quiz: {
    title: "Quiz Practice Lab",
    description: "General knowledge and cognitive school-level questions registry.",
    questions: [
      {
        id: 1,
        question: "Which planet is known as the Red Planet?",
        options: ["Earth", "Mars", "Jupiter", "Venus"],
        correct: "Mars",
      },
      {
        id: 2,
        question: "Who developed the core theory of Relativity?",
        options: ["Isaac Newton", "Albert Einstein", "Nikola Tesla", "Marie Curie"],
        correct: "Albert Einstein",
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
        correct: "10",
      },
      {
        id: 2,
        question: "If CAT is coded as 3120, how will you code DOG?",
        options: ["4157", "4156", "3157", "4147"],
        correct: "4157",
      },
    ],
  },
  coding: {
    title: "Coding Basics Prediction Center",
    description: "Predict output loops, evaluation paradigms, and analytical basics.",
    questions: [
      {
        id: 1,
        question: "What is the output of the logical operation expression: 2 + 3 * 5?",
        options: ["25", "17", "15", "20"],
        correct: "17",
      },
      {
        id: 2,
        question: "Which data type is cleanly utilized to hold a true or false flag status?",
        options: ["String", "Number", "Boolean", "Undefined"],
        correct: "Boolean",
      },
    ],
  },
};

export default function InteractivePracticeLab({ params }: { params: Promise<{ type: string }> }) {
  // Safe Next.js dynamic async parameter extraction handling
  const resolvedParams = use(params);
  const currentType = resolvedParams.type?.toLowerCase();

  // Selected module verification
  const currentModule = databaseRepo[currentType] || null;

  // Track user interactive states cleanly
  const [userAnswers, setUserAnswers] = useState<Record<number, string>>({});
  const [checkedAnswers, setCheckedAnswers] = useState<Record<number, boolean>>({});

  if (!currentModule) {
    return (
      <main className="min-h-screen bg-slate-950 text-white flex flex-col items-center justify-center p-6">
        <div className="bg-slate-900 border border-slate-800 p-8 rounded-3xl max-w-md text-center shadow-xl">
          <p className="text-sm font-bold text-red-400 uppercase tracking-wider">Invalid Section</p>
          <h1 className="text-2xl font-bold mt-2">Practice Module Not Found</h1>
          <p className="text-slate-400 mt-3 text-sm">The selected route segment does not match existing records.</p>
          <Link href="/practice" className="mt-6 inline-block rounded-xl bg-green-500 px-5 py-2.5 font-bold text-slate-950 text-sm hover:bg-green-400">
            Back to Practice Hub
          </Link>
        </div>
      </main>
    );
  }

  // Answer selection callback
  const handleSelectOption = (questionId: number, selectedValue: string) => {
    if (checkedAnswers[questionId]) return; // Block changes after verifying answer status
    setUserAnswers((prev) => ({ ...prev, [questionId]: selectedValue }));
  };

  // Submission verify algorithm
  const handleCheckAnswer = (questionId: number) => {
    if (!userAnswers[questionId]) {
      alert("Please select an option first before checking the outcome status!");
      return;
    }
    setCheckedAnswers((prev) => ({ ...prev, [questionId]: true }));
  };

  return (
    <main className="min-h-screen bg-slate-950 text-white py-16 px-4 md:px-6">
      <section className="mx-auto max-w-4xl">
        
        {/* Navigation Breadcrumbs Module */}
        <div className="mb-10 flex flex-wrap items-center justify-between gap-4">
          <div>
            <p className="text-xs font-bold text-green-400 uppercase tracking-widest">Interactive Lab Mode</p>
            <h1 className="mt-1 text-3xl font-black tracking-tight md:text-4xl text-white">{currentModule.title}</h1>
            <p className="text-sm text-slate-400 mt-1">{currentModule.description}</p>
          </div>
          <Link href="/practice" className="text-xs font-bold rounded-xl border border-slate-800 bg-slate-900 px-4 py-2 text-slate-400 hover:text-white transition-all">
            &larr; Exit Arena
          </Link>
        </div>

        {/* Iterative Interactive Challenge List */}
        <div className="space-y-6">
          {currentModule.questions.map((q, idx) => {
            const isAnswerChecked = checkedAnswers[q.id];
            const selectedOption = userAnswers[q.id];
            const isCorrect = selectedOption === q.correct;

            return (
              <div 
                key={q.id}
                className="rounded-3xl bg-slate-900 p-6 md:p-8 border border-slate-800/80 shadow-xl"
              >
                <div className="flex items-start gap-3">
                  <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-slate-800 text-xs font-bold text-slate-400 font-mono">
                    {idx + 1}
                  </span>
                  <h3 className="text-lg font-bold text-slate-100 leading-snug">{q.question}</h3>
                </div>

                {/* Multiple Options Radio Matrix */}
                <div className="mt-6 grid gap-3 sm:grid-cols-2">
                  {q.options.map((option) => {
                    const isSelected = selectedOption === option;
                    
                    let computedOptionStyles = "border-slate-800 bg-slate-950 text-slate-300 hover:bg-slate-800/50";
                    if (isSelected) computedOptionStyles = "border-green-500 bg-green-500/10 text-green-400 font-bold";
                    
                    // Production fallback override logic for verified state colors
                    if (isAnswerChecked) {
                      if (option === q.correct) {
                        computedOptionStyles = "border-green-500 bg-green-500/20 text-green-400 font-black";
                      } else if (isSelected && !isCorrect) {
                        computedOptionStyles = "border-red-500 bg-red-500/20 text-red-400 line-through decoration-2";
                      } else {
                        computedOptionStyles = "border-slate-900 bg-slate-950/40 text-slate-600 cursor-not-allowed";
                      }
                    }

                    return (
                      <button
                        key={option}
                        disabled={isAnswerChecked}
                        onClick={() => handleSelectOption(q.id, option)}
                        className={`w-full text-left p-4 rounded-xl border text-sm transition-all duration-150 ${computedOptionStyles}`}
                      >
                        {option}
                      </button>
                    );
                  })}
                </div>

                {/* Action Controls Callback Row */}
                <div className="mt-6 flex items-center justify-between gap-4 pt-4 border-t border-slate-800/40">
                  <div>
                    {isAnswerChecked && (
                      <p className={`text-sm font-bold flex items-center gap-1.5 ${isCorrect ? "text-green-400" : "text-red-400"}`}>
                        {isCorrect ? "✅ Correct Answer!" : `❌ Incorrect (Correct: ${q.correct})`}
                      </p>
                    )}
                  </div>

                  {!isAnswerChecked ? (
                    <button
                      onClick={() => handleCheckAnswer(q.id)}
                      className="rounded-xl bg-slate-800 px-4 py-2 text-xs font-bold text-white hover:bg-green-500 hover:text-slate-950 transition-colors border border-slate-700/60"
                    >
                      Check Outcome
                    </button>
                  ) : (
                    <span className="text-xs font-bold uppercase tracking-wider text-slate-500 select-none">Locked</span>
                  )}
                </div>

              </div>
            );
          })}
        </div>

      </section>
    </main>
  );
}