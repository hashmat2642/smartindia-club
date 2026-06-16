// app/practice/[type]/page.tsx
"use client";

import Link from "next/link";
import { use, useEffect, useState } from "react";

// Raw Questions Database Repository
const rawDatabaseRepo: Record<
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
      {
        id: 3,
        question: "What is the capital city of India?",
        options: ["Mumbai", "New Delhi", "Kolkata", "Chennai"],
        correct: "New Delhi",
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
      {
        id: 3,
        question: "Find the odd one out from the given options below:",
        options: ["Apple", "Mango", "Potato", "Orange"],
        correct: "Potato",
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
      {
        id: 3,
        question: "What does HTML stand for?",
        options: ["HyperText Markup Language", "HighText Machine Language", "HyperText Marking Links", "None of these"],
        correct: "HyperText Markup Language",
      },
    ],
  },
};

type QuestionType = {
  id: number;
  question: string;
  options: string[];
  correct: string;
};

export default function InteractivePracticeLab({ params }: { params: Promise<{ type: string }> }) {
  const resolvedParams = use(params);
  const currentType = resolvedParams.type?.toLowerCase();
  const currentModule = rawDatabaseRepo[currentType] || null;

  const [shuffledQuestions, setShuffledQuestions] = useState<QuestionType[]>([]);
  const [timeLeft, setTimeLeft] = useState<number>(60); 
  const [isTimeUp, setIsTimeUp] = useState<boolean>(false);
  const [userAnswers, setUserAnswers] = useState<Record<number, string>>({});
  const [checkedAnswers, setCheckedAnswers] = useState<Record<number, boolean>>({});

  // FIX 1: Shuffling randomized engine arrays using a safe structural functional wrapper
  useEffect(() => {
    if (!currentModule || !currentModule.questions) return;

    const questionsCopy = [...currentModule.questions];
    for (let i = questionsCopy.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [questionsCopy[i], questionsCopy[j]] = [questionsCopy[j], questionsCopy[i]];
    }

    const fullyShuffled = questionsCopy.map((q) => {
      const optionsCopy = [...q.options];
      for (let i = optionsCopy.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [optionsCopy[i], optionsCopy[j]] = [optionsCopy[j], optionsCopy[i]];
      }
      return { ...q, options: optionsCopy };
    });

    setShuffledQuestions(fullyShuffled);
  }, [currentType]); // Triggered strictly when entering the dynamic module page node

  // FIX 2: Timer countdown interval loop decoupled completely from inline setter blocks to avoid cascading renders
  useEffect(() => {
    if (timeLeft <= 0) {
      return;
    }

    const intervalId = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          setIsTimeUp(true); // Fired safely inside micro-task evaluation queues
          setCheckedAnswers((currentChecked) => {
            const autoLock = { ...currentChecked };
            if (currentModule) {
              currentModule.questions.forEach((q) => {
                autoLock[q.id] = true;
              });
            }
            return autoLock;
          });
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(intervalId); 
  }, [timeLeft, currentModule]);

  if (!currentModule) {
    return (
      <main className="min-h-screen bg-slate-950 text-white flex flex-col items-center justify-center p-6">
        <div className="bg-slate-900 border border-slate-800 p-8 rounded-3xl max-w-md text-center shadow-xl">
          <p className="text-sm font-bold text-red-400 uppercase tracking-wider">Invalid Section</p>
          <h1 className="text-2xl font-bold mt-2">Practice Module Not Found</h1>
          <Link href="/practice" className="mt-6 inline-block rounded-xl bg-green-500 px-5 py-2.5 font-bold text-slate-950 text-sm">
            Back to Practice Hub
          </Link>
        </div>
      </main>
    );
  }

  const handleSelectOption = (questionId: number, selectedValue: string) => {
    if (checkedAnswers[questionId] || isTimeUp) return; 
    setUserAnswers((prev) => ({ ...prev, [questionId]: selectedValue }));
  };

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
        
        <div className="mb-10 flex flex-wrap items-center justify-between gap-4 sticky top-16 bg-slate-950/80 backdrop-blur-md py-4 z-40 border-b border-slate-900">
          <div>
            <p className="text-xs font-bold text-green-400 uppercase tracking-widest">Interactive Shuffle Lab</p>
            <h1 className="mt-1 text-3xl font-black tracking-tight text-white">{currentModule.title}</h1>
          </div>
          
          <div className={`rounded-2xl border px-5 py-3 font-mono text-center shadow-lg ${
            timeLeft <= 10 
              ? "border-red-500 bg-red-500/10 text-red-400 animate-pulse font-black" 
              : "border-slate-800 bg-slate-900 text-green-400 font-bold"
          }`}>
            <p className="text-[10px] uppercase text-slate-400 tracking-wider">Time Remaining</p>
            <p className="text-xl mt-0.5">{timeLeft > 0 ? `${timeLeft}s` : "💥 TIME UP!"}</p>
          </div>
        </div>

        {isTimeUp && (
          <div className="mb-6 rounded-2xl border border-red-500/30 bg-red-500/10 p-4 text-center text-red-400 font-bold text-sm">
            🚨 Time limit reached! Practice answers have been locked automatically.
          </div>
        )}

        <div className="space-y-6">
          {shuffledQuestions.map((q, idx) => {
            const isAnswerChecked = checkedAnswers[q.id];
            const selectedOption = userAnswers[q.id];
            const isCorrect = selectedOption === q.correct;

            return (
              <div key={q.id} className="rounded-3xl bg-slate-900 p-6 border border-slate-800/80 shadow-xl">
                <div className="flex items-start gap-3">
                  <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-slate-800 text-xs font-bold text-slate-400 font-mono">
                    {idx + 1}
                  </span>
                  <h3 className="text-lg font-bold text-slate-100 leading-snug">{q.question}</h3>
                </div>

                <div className="mt-6 grid gap-3 sm:grid-cols-2">
                  {q.options.map((option) => {
                    const isSelected = selectedOption === option;
                    let computedStyles = "border-slate-800 bg-slate-950 text-slate-300 hover:bg-slate-800/50";
                    
                    if (isSelected) computedStyles = "border-green-500 bg-green-500/10 text-green-400 font-bold";
                    
                    if (isAnswerChecked || isTimeUp) {
                      if (option === q.correct) {
                        computedStyles = "border-green-500 bg-green-500/20 text-green-400 font-black";
                      } else if (isSelected && !isCorrect) {
                        computedStyles = "border-red-500 bg-red-500/20 text-red-400 line-through decoration-2";
                      } else {
                        computedStyles = "border-slate-900 bg-slate-950/40 text-slate-600 cursor-not-allowed";
                      }
                    }

                    return (
                      <button
                        key={option}
                        disabled={isAnswerChecked || isTimeUp}
                        onClick={() => handleSelectOption(q.id, option)}
                        className={`w-full text-left p-4 rounded-xl border text-sm transition-all duration-150 ${computedStyles}`}
                      >
                        {option}
                      </button>
                    );
                  })}
                </div>

                <div className="mt-6 flex items-center justify-between gap-4 pt-4 border-t border-slate-800/40">
                  <div>
                    {(isAnswerChecked || isTimeUp) && (
                      <p className={`text-sm font-bold ${isCorrect ? "text-green-400" : "text-red-400"}`}>
                        {isCorrect ? "✅ Correct!" : `❌ Incorrect (Answer: ${q.correct})`}
                      </p>
                    )}
                  </div>

                  {!isAnswerChecked && !isTimeUp ? (
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

        <div className="mt-10">
          <Link href="/practice" className="inline-block rounded-xl border border-slate-800 bg-slate-900/40 px-6 py-3 font-bold text-slate-400 hover:text-white transition-all text-sm">
            &larr; Exit Lab Arena
          </Link>
        </div>
      </section>
    </main>
  );
}