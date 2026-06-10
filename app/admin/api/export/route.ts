import { supabase } from "@/lib/supabase";

export async function GET() {
  const { data: students } = await supabase
    .from("students")
    .select("*");

  const csv = [
    [
      "Student ID",
      "Name",
      "Class",
      "School",
      "Phone",
      "Payment",
    ].join(","),
    ...(students || []).map((s) =>
      [
        s.student_id,
        s.name,
        s.class_name,
        s.school_name,
        s.phone_number,
        s.payment_status,
      ].join(",")
    ),
  ].join("\n");

  return new Response(csv, {
    headers: {
      "Content-Type": "text/csv",
      "Content-Disposition":
        'attachment; filename="students.csv"',
    },
  });
}