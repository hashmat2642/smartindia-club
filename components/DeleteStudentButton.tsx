"use client";

import { supabase } from "@/lib/supabase";

export default function DeleteStudentButton({
  studentId,
}: {
  studentId: number;
}) {
  async function deleteStudent() {
    const confirmDelete = confirm(
      "Are you sure you want to delete this student?"
    );

    if (!confirmDelete) return;

    const { error } = await supabase
      .from("students")
      .delete()
      .eq("id", studentId);

    if (error) {
      alert(error.message);
      return;
    }

    alert("Student deleted successfully!");
    window.location.reload();
  }

  return (
    <button
      onClick={deleteStudent}
      className="rounded-lg bg-red-500 px-3 py-2 font-bold text-white"
    >
      Delete
    </button>
  );
}