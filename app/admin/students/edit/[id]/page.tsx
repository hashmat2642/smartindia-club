
import { supabase } from "@/lib/supabase";
import EditStudentForm from "@/components/EditStudentForm";
export default async function EditStudentPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const { data: student } = await supabase
    .from("students")
    .select("*")
    .eq("id", id)
    .single();

  if (!student) {
    return (
      <main className="p-10">
        Student Not Found
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-slate-950 p-10 text-white">
      <h1 className="text-4xl font-bold">
        Edit Student
      </h1>

<EditStudentForm student={student} />
    </main>
  );
}