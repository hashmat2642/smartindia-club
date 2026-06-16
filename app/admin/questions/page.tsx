import { supabase } from "@/lib/supabase";

export default async function QuestionsPage() {
  const { data: questions, error } = await supabase
  .from("questions")
  .select("*")
  .order("id");

if (error) {
  return (
    <div className="p-10 text-red-500">
      Error: {error.message}
    </div>
  );
}
  return (
    <main className="min-h-screen bg-slate-950 text-white">
      <section className="mx-auto max-w-6xl px-6 py-16">
        <h1 className="text-5xl font-bold">
          Question Bank
        </h1>

       <p className="mt-4 text-yellow-400">
  Total Questions: {questions?.length || 0}
</p>

        <div className="mt-10 rounded-3xl bg-slate-900 p-6">
          <table className="w-full text-left">
            <thead>
              <tr>
                <th className="p-4">ID</th>
                <th className="p-4">Question</th>
                <th className="p-4">Answer</th>
              </tr>
            </thead>

            <tbody>
              {questions?.map((question) => (
                <tr
                  key={question.id}
                  className="border-t border-slate-800"
                >
                  <td className="p-4">
                    {question.id}
                  </td>

                  <td className="p-4">
                    {question.question}
                  </td>

                  <td className="p-4 text-green-400">
                    {question.correct_answer}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </main>
  );
}