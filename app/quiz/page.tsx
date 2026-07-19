"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { supabase } from "@/lib/supabase";
import { students as mockStudents } from "@/app/data/students";
import { Loader2, AlertTriangle, Clock, AlertCircle, HelpCircle } from "lucide-react";

type Student = {
  id: number;
  student_id: string;
  name: string;
  class_name: string;
  school_name: string;
  phone_number: string;
  score: number;
  rank: string;
  performance: string;
  payment_status: string;
  certificate_id: string;
};

type Question = {
  question: string;
  options: string[];
  correctAnswer: string;
};

export default function QuizPage() {
  const router = useRouter();
  
  const [student, setStudent] = useState<Student | null>(null);
  const [loading, setLoading] = useState(true);
  const [questions, setQuestions] = useState<Question[]>([]);
  const [answers, setAnswers] = useState<{ [key: number]: string }>({});
  const [timeLeft, setTimeLeft] = useState(20 * 60);
  const [submitting, setSubmitting] = useState(false);
  const [quizError, setQuizError] = useState<string | null>(null);

  const fallbackQuestions: Question[] = [
    {
      question: "What is the output of: console.log(2 + 3) in Javascript?",
      options: ["23", "5", "2 + 3", "Error"],
      correctAnswer: "5",
    },
    {
      question: "Which skill helps in solving problems step-by-step?",
      options: ["Guessing", "Logic", "Copying", "Skipping"],
      correctAnswer: "Logic",
    },
    {
      question: "HTML is mainly used for?",
      options: ["Styling", "Database", "Webpage Structure", "Hacking"],
      correctAnswer: "Webpage Structure",
    },
    {
      question: "Which HTML tag is used to create a heading?",
      options: ["<p>", "<h1>", "<img>", "<br>"],
      correctAnswer: "<h1>",
    },
    {
      question: "What comes next in the sequence: 2, 4, 6, 8, ...?",
      options: ["9", "10", "12", "14"],
      correctAnswer: "10",
    },
    {
      question: "Which one is a programming language?",
      options: ["HTML", "Python", "Google", "Windows"],
      correctAnswer: "Python",
    },
    {
      question: "If 5 + 5 = 10, then 10 + 10 = ?",
      options: ["15", "20", "25", "30"],
      correctAnswer: "20",
    },
    {
      question: "What does CSS mainly control?",
      options: ["Website design", "Database", "Internet speed", "Keyboard"],
      correctAnswer: "Website design",
    },
    {
      question: "Which skill is important for coding?",
      options: ["Logical thinking", "Guessing", "Copy-paste", "Ignoring errors"],
      correctAnswer: "Logical thinking",
    },
    {
      question: "What should a student do after making a mistake?",
      options: ["Quit", "Learn and improve", "Hide it", "Blame others"],
      correctAnswer: "Learn and improve",
    },
  ];

  // 1. Fetch questions from database
  async function fetchQuestions() {
    try {
      const { data, error } = await supabase
        .from("questions")
        .select("*")
        .order("id");

      if (error || !data || data.length === 0) {
        setQuestions(fallbackQuestions);
      } else {
        const mapped: Question[] = data.map((q) => ({
          question: q.question,
          options: q.options || ["Option A", "Option B", "Option C", "Option D"],
          correctAnswer: q.correct_answer,
        }));
        setQuestions(mapped);
      }
    } catch {
      setQuestions(fallbackQuestions);
    } finally {
      setLoading(false);
    }
  }

  // 2. Handle Submit exam
  async function handleSubmit() {
    if (!student || submitting) return;
    setSubmitting(true);

    let calculatedScore = 0;
    questions.forEach((question, index) => {
      if (answers[index] === question.correctAnswer) {
        calculatedScore += 10;
      }
    });

    const performance = calculatedScore >= 90 
      ? "Gold Performer" 
      : calculatedScore >= 75 
      ? "Silver Performer" 
      : calculatedScore >= 60 
      ? "Bronze Performer" 
      : "Participation";

    const assignedRank = calculatedScore >= 90 ? "Top 5" : calculatedScore >= 75 ? "Rank 12" : calculatedScore >= 60 ? "Rank 28" : "Rank 55";

    try {
      localStorage.setItem(`score_${student.student_id}`, String(calculatedScore));
      localStorage.setItem(`performance_${student.student_id}`, performance);
      localStorage.setItem(`rank_${student.student_id}`, assignedRank);

      const { error } = await supabase
        .from("students")
        .update({
          score: calculatedScore,
          performance: performance,
          rank: assignedRank,
        })
        .eq("id", student.id);

      if (error) {
        console.warn("Supabase update failed (likely offline). Result cached locally:", error);
      }
    } catch {
      console.warn("Connection error, result saved locally");
    } finally {
      setSubmitting(false);
      router.push(`/result?score=${calculatedScore}`);
    }
  }

  // 3. Authenticate student session and check eligibility
  useEffect(() => {
    const loggedId = localStorage.getItem("hdc_logged_student_id");
    if (!loggedId) {
      router.push("/dashboard");
      return;
    }

    const checkEligibility = async () => {
      try {
        const { data, error } = await supabase
          .from("students")
          .select("*")
          .eq("student_id", loggedId)
          .single();

        let currentStudent: Student | null = null;

        if (error || !data) {
          const mockMatch = mockStudents.find(
            (s) => s.student_id.toLowerCase() === loggedId.toLowerCase()
          );
          if (mockMatch) {
            currentStudent = {
              id: Number(mockMatch.id),
              student_id: mockMatch.student_id,
              name: mockMatch.name,
              class_name: mockMatch.class_name,
              school_name: mockMatch.school_name,
              phone_number: "9876543210",
              score: mockMatch.score,
              rank: mockMatch.rank,
              performance: "Participation",
              payment_status: "Pending",
              certificate_id: mockMatch.certificate_id,
            };
          }
        } else {
          currentStudent = data as Student;
        }

        if (!currentStudent) {
          localStorage.removeItem("hdc_logged_student_id");
          router.push("/dashboard");
          return;
        }

        const simulatedScore = localStorage.getItem(`score_${currentStudent.student_id}`);
        const actualScore = currentStudent.score ?? 0;
        
        if (simulatedScore !== null || actualScore > 0) {
          const finalScore = simulatedScore !== null ? Number(simulatedScore) : actualScore;
          router.push(`/result?score=${finalScore}`);
          return;
        }

        setStudent(currentStudent);
        fetchQuestions();
      } catch (err) {
        console.error(err);
        setQuizError("Authentication failed. Please return to the dashboard and try again.");
        setLoading(false);
      }
    };

    checkEligibility();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [router]);

  // 4. Countdown timer execution hook
  useEffect(() => {
    if (loading || timeLeft <= 0) return;

    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          handleSubmit();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [timeLeft, loading]);

  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 65; // dummy fix to keep seconds dynamic
  const isTimeCritical = timeLeft < 120; // 2 minutes remaining

  const answeredCount = Object.keys(answers).length;

  if (loading) {
    return (
      <main className="min-h-screen bg-slate-950 text-white flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="w-12 h-12 text-green-400 animate-spin mx-auto" />
          <p className="mt-4 text-slate-400 font-medium">Downloading Tournament Sheet...</p>
        </div>
      </main>
    );
  }

  if (quizError) {
    return (
      <main className="min-h-screen bg-slate-950 text-white flex items-center justify-center p-6">
        <div className="bg-slate-900 border border-slate-800 p-8 rounded-3xl max-w-md text-center shadow-xl">
          <AlertCircle className="w-12 h-12 text-red-500 mx-auto mb-4" />
          <h1 className="text-xl font-bold">Authentication Issue</h1>
          <p className="text-slate-400 text-sm mt-2">{quizError}</p>
          <Link href="/dashboard" className="mt-6 inline-block rounded-xl bg-green-500 px-5 py-2.5 font-bold text-slate-950 text-sm hover:bg-green-400 transition-colors">
            Back to Dashboard
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-slate-950 text-white pb-24 relative">
      
      {/* Sticky Header with Timer & Stats */}
      <header className="sticky top-0 z-30 w-full bg-slate-950/80 backdrop-blur-md border-b border-slate-900 py-4 px-6">
        <div className="mx-auto max-w-5xl flex items-center justify-between">
          <div>
            <span className="text-[10px] font-bold tracking-wider text-green-400 uppercase">SmartIndia.club Tournament</span>
            <h2 className="text-base font-bold text-slate-200 mt-0.5 truncate max-w-[200px] sm:max-w-none">
              Student: {student?.name}
            </h2>
          </div>

          <div className="flex items-center gap-4">
            <div className="text-right hidden sm:block">
              <p className="text-[10px] text-slate-500 font-bold uppercase">Questions Completed</p>
              <p className="text-sm font-bold text-slate-350">{answeredCount} of {questions.length}</p>
            </div>
            
            <div className={`flex items-center gap-2 rounded-xl border px-4 py-2 text-sm font-black transition-all ${
              isTimeCritical 
                ? "bg-red-500/10 border-red-500 text-red-400 animate-pulse" 
                : "bg-slate-900 border-slate-850 text-green-400"
            }`}>
              <Clock className="w-4 h-4 shrink-0" />
              <span>{minutes}:{seconds.toString().padStart(2, "0")}</span>
            </div>
          </div>
        </div>
      </header>

      {/* Main Form container */}
      <section className="mx-auto max-w-3xl px-6 mt-10">
        
        {timeLeft <= 0 && (
          <div className="mb-8 rounded-2xl bg-red-500/10 border border-red-500/20 p-4 font-bold text-red-400 flex items-center gap-2 text-sm">
            <AlertTriangle className="w-5 h-5 shrink-0" />
            Time has expired! Submitting your responses immediately...
          </div>
        )}

        <div className="space-y-8">
          {questions.map((item, index) => {
            const isQuestionAnswered = answers[index] !== undefined;

            return (
              <div 
                key={index} 
                className={`rounded-3xl p-6 border transition-all duration-300 ${
                  isQuestionAnswered 
                    ? "bg-slate-900/40 border-slate-900" 
                    : "bg-slate-900 border-slate-850 shadow-lg"
                }`}
              >
                <div className="flex items-start gap-4">
                  <span className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-lg text-xs font-black font-mono mt-0.5 transition-colors ${
                    isQuestionAnswered 
                      ? "bg-slate-950 border border-slate-850 text-slate-500" 
                      : "bg-green-500/10 border border-green-500/20 text-green-400"
                  }`}>
                    {index + 1}
                  </span>
                  <h3 className="text-base md:text-lg font-bold text-slate-100 leading-snug">{item.question}</h3>
                </div>

                <div className="mt-6 grid gap-3 sm:grid-cols-2">
                  {item.options.map((option) => {
                    const isSelected = answers[index] === option;
                    return (
                      <button
                        key={option}
                        onClick={() =>
                          setAnswers({
                            ...answers,
                            [index]: option,
                          })
                        }
                        className={`w-full text-left p-4 rounded-xl border text-sm font-medium transition-all duration-150 select-none flex items-center justify-between ${
                          isSelected
                            ? "bg-green-500/10 border-green-500 text-green-400 font-semibold"
                            : "bg-slate-950 border-slate-900 text-slate-350 hover:bg-slate-900 hover:border-slate-850"
                        }`}
                      >
                        <span>{option}</span>
                        {isSelected && <div className="w-2 h-2 rounded-full bg-green-400 shrink-0" />}
                      </button>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>

        {/* Action Submit Area */}
        <div className="mt-12 border-t border-slate-900 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-slate-400 font-medium">
            You have responded to <span className="text-green-400 font-bold">{answeredCount}</span> of {questions.length} questions.
          </p>
          <button
            onClick={() => handleSubmit()}
            disabled={submitting || answeredCount === 0}
            className="w-full sm:w-auto flex items-center justify-center gap-2 rounded-xl bg-green-500 hover:bg-green-400 text-slate-950 font-black px-8 py-3.5 text-sm transition-colors shadow-lg shadow-green-500/10 disabled:opacity-40 disabled:cursor-not-allowed"
          >
            {submitting ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" /> Saving Responses...
              </>
            ) : (
              "Submit Tournament Sheet"
            )}
          </button>
        </div>

      </section>

      {/* Floating Info Note */}
      <div className="fixed bottom-6 right-6 z-40 bg-slate-900 border border-slate-800 rounded-2xl p-4 max-w-xs shadow-2xl hidden lg:flex gap-3 text-xs text-slate-400 items-start select-none">
        <HelpCircle className="w-5 h-5 text-green-400 shrink-0 mt-0.5" />
        <p>
          Do not close or refresh this tab during active exam submission. If connection fails, your answers are safely archived in local storage cache.
        </p>
      </div>

    </main>
  );
}