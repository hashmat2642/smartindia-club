"use client";

import { use, useState } from "react";
import Link from "next/link";
import { Check, X, ArrowRight, RotateCcw, Award, Lightbulb, CheckCircle2, ChevronRight, HelpCircle } from "lucide-react";

// Clean Structured Questions Static Dataset
const staticDatabase: Record<
  string,
  {
    title: string;
    description: string;
    icon: string;
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
    description: "General knowledge and school-level verification questions.",
    icon: "🧠",
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
      {
        id: 4,
        question: "Which is the largest ocean on Earth?",
        options: ["Atlantic Ocean", "Indian Ocean", "Pacific Ocean", "Arctic Ocean"],
        answer: "Pacific Ocean",
      },
      {
        id: 5,
        question: "How many bones are there in an adult human body?",
        options: ["106", "206", "306", "216"],
        answer: "206",
      },
    ],
  },
  logic: {
    title: "Logic & Reasoning Arena",
    description: "Improve sequences, pattern matching, and analytical problem-solving.",
    icon: "💡",
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
      {
        id: 3,
        question: "Find the odd one out from the following options:",
        options: ["Square", "Circle", "Triangle", "Line"],
        answer: "Line",
      },
      {
        id: 4,
        question: "If 1 + 4 = 5, 2 + 5 = 12, 3 + 6 = 21, then what is 8 + 11 = ?",
        options: ["40", "96", "52", "97"],
        answer: "96",
      },
    ],
  },
  coding: {
    title: "Coding Basics Center",
    description: "Predict output loops, logic evaluation, and programming fundamentals.",
    icon: "💻",
    questions: [
      {
        id: 1,
        question: "What is the output of the mathematical expression in Javascript: 2 + 3 * 5?",
        options: ["25", "17", "15", "20"],
        answer: "17",
      },
      {
        id: 2,
        question: "Which data type is utilized to hold a true or false status flag?",
        options: ["String", "Number", "Boolean", "Undefined"],
        answer: "Boolean",
      },
      {
        id: 3,
        question: "What does 'DOM' stand for in web programming?",
        options: [
          "Document Object Model",
          "Data Object Manager",
          "Digital Output Matrix",
          "Dynamic Object Mapping"
        ],
        answer: "Document Object Model",
      },
      {
        id: 4,
        question: "Which HTML tag is used to reference an external CSS stylesheet?",
        options: ["<script>", "<style>", "<link>", "<css>"],
        answer: "<link>",
      },
      {
        id: 5,
        question: "What is the result of console.log(typeof []) in Javascript?",
        options: ["array", "object", "null", "undefined"],
        answer: "object",
      },
    ],
  },
};

export default function InteractivePracticeLab({ params }: { params: Promise<{ type: string }> }) {
  const resolvedParams = use(params);
  const currentType = resolvedParams.type?.toLowerCase();
  const currentModule = staticDatabase[currentType] || null;

  // React state for interactivity
  const [currentIdx, setCurrentIdx] = useState(0);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [score, setScore] = useState(0);
  const [isCompleted, setIsCompleted] = useState(false);
  const [answeredWrong, setAnsweredWrong] = useState<number>(0);

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

  const questions = currentModule.questions;
  const currentQuestion = questions[currentIdx];
  const progressPercent = Math.round(((currentIdx + (isAnswered ? 1 : 0)) / questions.length) * 100);

  const handleOptionClick = (option: string) => {
    if (isAnswered) return;
    setSelectedOption(option);
  };

  const handleCheckAnswer = () => {
    if (!selectedOption || isAnswered) return;

    const isCorrect = selectedOption === currentQuestion.answer;
    if (isCorrect) {
      setScore((prev) => prev + 1);
    } else {
      setAnsweredWrong((prev) => prev + 1);
    }
    setIsAnswered(true);
  };

  const handleNext = () => {
    if (currentIdx + 1 < questions.length) {
      setCurrentIdx((prev) => prev + 1);
      setSelectedOption(null);
      setIsAnswered(false);
    } else {
      setIsCompleted(true);
      // Store practice completion statistics locally
      const savedStats = localStorage.getItem("hdc_practice_stats") || "{}";
      const stats = JSON.parse(savedStats);
      stats[currentType] = {
        score: score + (selectedOption === currentQuestion.answer ? 1 : 0),
        total: questions.length,
        timestamp: Date.now(),
      };
      localStorage.setItem("hdc_practice_stats", JSON.stringify(stats));
    }
  };

  const handleReset = () => {
    setCurrentIdx(0);
    setSelectedOption(null);
    setIsAnswered(false);
    setScore(0);
    setIsCompleted(false);
    setAnsweredWrong(0);
  };

  if (isCompleted) {
    const successRate = Math.round((score / questions.length) * 100);
    let feedback = "Nice try! Keep practicing to improve your skills.";
    let ratingBadge = "Keep Going! 🌱";
    let badgeColor = "text-slate-400 bg-slate-800/40 border-slate-700/60";

    if (successRate >= 90) {
      feedback = "Spectacular work! You have fully mastered this practice section.";
      ratingBadge = "Master Performer 🏆";
      badgeColor = "text-yellow-400 bg-yellow-500/10 border-yellow-500/30";
    } else if (successRate >= 70) {
      feedback = "Great job! You have a solid grasp on these concepts.";
      ratingBadge = "Rising Star 🥇";
      badgeColor = "text-green-400 bg-green-500/10 border-green-500/30";
    } else if (successRate >= 50) {
      feedback = "Good effort! Try reading some of the guidelines and practice again.";
      ratingBadge = "Skill Builder 🥈";
      badgeColor = "text-blue-400 bg-blue-500/10 border-blue-500/30";
    }

    return (
      <main className="min-h-screen bg-slate-950 text-white py-16 px-4 md:px-6 flex flex-col justify-center items-center">
        <div className="w-full max-w-2xl bg-gradient-to-b from-slate-900 to-slate-950 border border-slate-850 p-8 rounded-3xl shadow-2xl relative overflow-hidden text-center">
          {/* Decorative top gradient */}
          <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-green-500 via-emerald-500 to-teal-500" />
          
          <div className="mx-auto w-20 h-20 rounded-full bg-slate-900 border border-slate-800 flex items-center justify-center mb-6">
            <Award className="w-10 h-10 text-green-400" />
          </div>

          <p className="text-sm font-semibold tracking-wider text-green-400 uppercase">Practice Arena Complete</p>
          <h1 className="text-3xl font-black text-white mt-1">{currentModule.title} Results</h1>

          <div className="mt-8 flex flex-col items-center">
            {/* Circular Progress Indicator */}
            <div className="relative w-40 h-40 flex items-center justify-center mb-6">
              <svg className="w-full h-full transform -rotate-90">
                <circle cx="80" cy="80" r="70" strokeWidth="8" stroke="#1e293b" fill="transparent" />
                <circle
                  cx="80"
                  cy="80"
                  r="70"
                  strokeWidth="8"
                  stroke="#10b981"
                  fill="transparent"
                  strokeDasharray={440}
                  strokeDashoffset={440 - (440 * successRate) / 100}
                  className="transition-all duration-1000 ease-out"
                />
              </svg>
              <div className="absolute flex flex-col items-center">
                <span className="text-4xl font-black tracking-tight">{successRate}%</span>
                <span className="text-xs text-slate-400 uppercase font-bold tracking-widest mt-0.5">Success Rate</span>
              </div>
            </div>

            <div className={`inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full border text-xs font-bold ${badgeColor} mb-4`}>
              {ratingBadge}
            </div>

            <p className="text-slate-300 max-w-md mx-auto leading-relaxed">{feedback}</p>

            <div className="mt-8 grid grid-cols-2 gap-4 w-full border-t border-slate-900 pt-6">
              <div className="text-center p-3 rounded-2xl bg-slate-900/60 border border-slate-900">
                <p className="text-xs text-slate-400 font-semibold uppercase">Correct Answers</p>
                <p className="text-2xl font-bold text-green-400 mt-1">{score} / {questions.length}</p>
              </div>
              <div className="text-center p-3 rounded-2xl bg-slate-900/60 border border-slate-900">
                <p className="text-xs text-slate-400 font-semibold uppercase">Time Taken</p>
                <p className="text-2xl font-bold text-slate-200 mt-1">Practice Mode</p>
              </div>
            </div>
          </div>

          <div className="mt-8 flex flex-wrap gap-4 justify-center">
            <button
              onClick={handleReset}
              className="flex items-center gap-2 rounded-xl border border-slate-800 bg-slate-900 px-6 py-3 font-bold text-slate-300 hover:text-white hover:border-slate-700 hover:bg-slate-850 transition-all text-sm"
            >
              <RotateCcw className="w-4 h-4" /> Restart Practice
            </button>
            <Link
              href="/practice"
              className="flex items-center gap-1.5 rounded-xl bg-green-500 px-6 py-3 font-bold text-slate-950 hover:bg-green-400 transition-colors text-sm shadow-lg shadow-green-500/10"
            >
              Practice Hub <ChevronRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-slate-950 text-white py-16 px-4 md:px-6 flex flex-col justify-center">
      <section className="mx-auto w-full max-w-4xl">
        
        {/* Header Navigation Module */}
        <div className="mb-8 flex flex-wrap items-center justify-between gap-4 border-b border-slate-900 pb-5">
          <div className="flex items-center gap-4">
            <span className="text-4xl p-2 rounded-2xl bg-slate-900 border border-slate-850 select-none">
              {currentModule.icon}
            </span>
            <div>
              <p className="text-xs font-bold text-green-400 uppercase tracking-widest">Interactive Practice Lab</p>
              <h1 className="text-2xl md:text-3xl font-black tracking-tight text-white mt-0.5">{currentModule.title}</h1>
              <p className="text-xs md:text-sm text-slate-400 mt-0.5">{currentModule.description}</p>
            </div>
          </div>
          <Link href="/practice" className="text-xs font-bold rounded-xl border border-slate-800 bg-slate-900/60 px-4 py-2.5 text-slate-400 hover:text-white transition-all">
            &larr; Exit Arena
          </Link>
        </div>

        {/* Global Progress Indicators */}
        <div className="mb-6 flex items-center justify-between text-xs text-slate-400 font-semibold uppercase tracking-wider">
          <span>Question {currentIdx + 1} of {questions.length}</span>
          <div className="flex items-center gap-3">
            <span>Score: <span className="text-green-400 font-bold">{score}</span></span>
            <span className="text-slate-700">|</span>
            <span>Progress: <span className="text-slate-200">{progressPercent}%</span></span>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="w-full h-1.5 rounded-full bg-slate-900 mb-8 overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-green-500 to-emerald-400 transition-all duration-350 ease-out"
            style={{ width: `${progressPercent}%` }}
          />
        </div>

        {/* Interactive Question Card */}
        <div className="rounded-3xl bg-gradient-to-b from-slate-900/80 to-slate-950/80 backdrop-blur-md p-6 md:p-8 border border-slate-850 shadow-2xl relative">
          
          <div className="flex items-start gap-4">
            <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-slate-900 border border-slate-800 text-xs font-black text-slate-400 font-mono mt-0.5">
              Q{currentIdx + 1}
            </span>
            <h3 className="text-lg md:text-xl font-bold text-slate-100 leading-snug">{currentQuestion.question}</h3>
          </div>

          {/* Options Matrix Sheet */}
          <div className="mt-8 grid gap-3 sm:grid-cols-2">
            {currentQuestion.options.map((option) => {
              // Calculate specific option classes
              let optionStyles = "border-slate-850 bg-slate-900/40 text-slate-300 hover:bg-slate-900 hover:border-slate-700";
              let icon = null;

              if (selectedOption === option) {
                if (isAnswered) {
                  const isCorrect = option === currentQuestion.answer;
                  optionStyles = isCorrect
                    ? "bg-green-500/20 border-green-500 text-green-300 font-bold"
                    : "bg-red-500/20 border-red-500 text-red-300 font-bold";
                  icon = isCorrect
                    ? <Check className="w-4 h-4 text-green-400 shrink-0" />
                    : <X className="w-4 h-4 text-red-400 shrink-0" />;
                } else {
                  // Selected but not confirmed yet
                  optionStyles = "bg-green-500/10 border-green-500 text-green-400 font-semibold";
                }
              } else if (isAnswered && option === currentQuestion.answer) {
                // Highlight the correct answer if a wrong option was selected
                optionStyles = "bg-green-500/10 border-green-500/50 text-green-300 font-medium";
                icon = <Check className="w-4 h-4 text-green-400/80 shrink-0" />;
              }

              return (
                <button
                  key={option}
                  disabled={isAnswered}
                  onClick={() => handleOptionClick(option)}
                  className={`w-full text-left p-4 rounded-xl border font-medium transition-all duration-200 select-none flex items-center justify-between disabled:cursor-not-allowed ${optionStyles}`}
                >
                  <span className="text-sm md:text-base">{option}</span>
                  {icon}
                </button>
              );
            })}
          </div>

          {/* Action Row Sheet */}
          <div className="mt-8 pt-6 border-t border-slate-900/60 flex flex-wrap gap-4 items-center justify-between">
            <div>
              {isAnswered && (
                <div className="flex items-center gap-2">
                  {selectedOption === currentQuestion.answer ? (
                    <span className="flex items-center gap-1.5 text-xs font-bold text-green-400 bg-green-500/10 px-3 py-1.5 rounded-lg border border-green-500/20">
                      <CheckCircle2 className="w-3.5 h-3.5" /> Correct Answer! (+1)
                    </span>
                  ) : (
                    <span className="flex items-center gap-1.5 text-xs font-bold text-red-400 bg-red-500/10 px-3 py-1.5 rounded-lg border border-red-500/20">
                      <HelpCircle className="w-3.5 h-3.5" /> Incorrect Answer
                    </span>
                  )}
                </div>
              )}
            </div>

            <div className="flex gap-3">
              {!isAnswered ? (
                <button
                  onClick={handleCheckAnswer}
                  disabled={!selectedOption}
                  className="rounded-xl bg-green-500 px-6 py-3 font-bold text-slate-950 hover:bg-green-400 transition-colors text-sm shadow-lg shadow-green-500/5 disabled:opacity-40 disabled:cursor-not-allowed"
                >
                  Verify Answer
                </button>
              ) : (
                <button
                  onClick={handleNext}
                  className="flex items-center gap-1.5 rounded-xl bg-green-500 px-6 py-3 font-bold text-slate-950 hover:bg-green-400 transition-colors text-sm shadow-lg shadow-green-500/10 animate-pulse"
                >
                  {currentIdx + 1 === questions.length ? "Finish Lab" : "Next Question"} <ArrowRight className="w-4 h-4" />
                </button>
              )}
            </div>
          </div>

        </div>

        {/* Tip Sheet Reference Block */}
        <div className="mt-6 rounded-2xl bg-slate-900/30 p-4 border border-slate-900 flex gap-3 text-xs md:text-sm text-slate-400">
          <Lightbulb className="w-5 h-5 text-yellow-500 shrink-0 mt-0.5" />
          <p>
            This is practice mode. You will receive immediate feedback after verification. Take your time to understand the logical steps before selecting the final option.
          </p>
        </div>

      </section>
    </main>
  );
}