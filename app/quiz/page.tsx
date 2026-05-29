"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function QuizPage() {
  const router = useRouter();
  const [timeLeft, setTimeLeft] = useState(20 * 60);
  const [answers, setAnswers] = useState<{ [key: number]: string }>({});

  const questions = [
    {
      question: "What is the output of: console.log(2 + 3)?",
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
      question: "Which tag is used to create a heading in HTML?",
      options: ["<p>", "<h1>", "<img>", "<br>"],
      correctAnswer: "<h1>",
    },
    {
      question: "What comes after 2, 4, 6, 8?",
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

  useEffect(() => {
    if (timeLeft <= 0) return;

    const timer = setInterval(() => {
      setTimeLeft((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLeft]);

  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;

  function handleSubmit() {
    let score = 0;

    questions.forEach((question, index) => {
      if (answers[index] === question.correctAnswer) {
        score += 10;
      }
    });

    router.push(`/result?score=${score}`);
  }

  return (
    <main className="min-h-screen bg-slate-950 text-white">
      <section className="mx-auto max-w-5xl px-6 py-16">
        <p className="text-sm font-semibold text-green-400">
          Tournament Quiz
        </p>

        <h1 className="mt-2 text-4xl font-bold">
          Quiz + Logic + Coding Basics
        </h1>

        <div className="mt-6 rounded-2xl bg-slate-900 p-5">
          <p className="text-slate-300">Time Remaining</p>
          <h2 className="mt-2 text-3xl font-bold text-green-400">
            {minutes}:{seconds.toString().padStart(2, "0")}
          </h2>
        </div>

        {timeLeft === 0 && (
          <div className="mt-6 rounded-2xl bg-red-500 p-4 font-bold text-white">
            Time is over. Please submit your quiz.
          </div>
        )}

        <div className="mt-8 space-y-6">
          {questions.map((item, index) => (
            <div key={item.question} className="rounded-3xl bg-slate-900 p-6">
              <h2 className="text-xl font-bold">
                Q{index + 1}. {item.question}
              </h2>

              <div className="mt-5 grid gap-3 md:grid-cols-2">
                {item.options.map((option) => (
                  <label
                    key={option}
                    className={`cursor-pointer rounded-xl p-4 ${
                      answers[index] === option
                        ? "bg-green-500 text-slate-950"
                        : "bg-slate-800 hover:bg-slate-700"
                    }`}
                  >
                    <input
                      type="radio"
                      name={`question-${index}`}
                      className="mr-3"
                      onChange={() =>
                        setAnswers({
                          ...answers,
                          [index]: option,
                        })
                      }
                    />
                    {option}
                  </label>
                ))}
              </div>
            </div>
          ))}
        </div>

        <button
          onClick={handleSubmit}
          className="mt-8 rounded-xl bg-green-500 px-6 py-3 font-bold text-slate-950 hover:bg-green-400"
        >
          Submit Quiz
        </button>
      </section>
    </main>
  );
}