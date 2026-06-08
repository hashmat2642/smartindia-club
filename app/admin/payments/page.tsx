import PaymentUpdateForm from "@/components/PaymentUpdateForm";
import { supabase } from "@/lib/supabase";

export default async function PaymentsPage() {
  const { data: students } = await supabase
    .from("students")
    .select("*")
    .order("created_at", { ascending: false });

  return (
    <main className="min-h-screen bg-slate-950 text-white">
      <section className="mx-auto max-w-7xl px-6 py-16">
        <h1 className="text-5xl font-bold">
          Payment Management
        </h1>

        <p className="mt-3 text-slate-300">
          Track student payments and collection.
        </p>

        <div className="mt-10 overflow-x-auto rounded-3xl bg-slate-900 p-6">
          <table className="w-full text-left">
            <thead className="bg-slate-800">
              <tr>
                <th className="p-4">Student</th>
                <th className="p-4">School</th>
                <th className="p-4">Class</th>
                <th className="p-4">Payment Status</th>
                <th className="p-4">Action</th>
              </tr>
            </thead>

            <tbody>
              {students?.map((student) => (
                <tr
                  key={student.id}
                  className="border-t border-slate-800"
                >
                  <td className="p-4">{student.name}</td>

                  <td className="p-4">
                    {student.school_name}
                  </td>

                  <td className="p-4">
                    {student.class_name}
                  </td>

                  <td
                    className={`p-4 font-bold ${
                      student.payment_status === "Paid"
                        ? "text-green-400"
                        : "text-yellow-400"
                    }`}
                  >
                    {student.payment_status || "Pending"}
                  </td>

                  <td className="p-4">
                    <PaymentUpdateForm
                      studentId={student.id}
                      currentStatus={
                        student.payment_status || "Pending"
                      }
                    />
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