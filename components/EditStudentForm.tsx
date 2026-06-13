"use client";

import { supabase } from "@/lib/supabase";
import { useState } from "react";

type Student = {
  id: number;
  name: string;
  class_name: string;
  school_name: string;
  phone_number: string;
};

export default function EditStudentForm({
  student,
}: {
  student: Student;
}) {
  const [name, setName] = useState(student.name || "");
  const [className, setClassName] = useState(
    student.class_name || ""
  );
  const [school, setSchool] = useState(
    student.school_name || ""
  );
  const [phone, setPhone] = useState(
    student.phone_number || ""
  );

  async function saveStudent() {
    const { error } = await supabase
      .from("students")
      .update({
        name,
        class_name: className,
        school_name: school,
        phone_number: phone,
      })
      .eq("id", student.id);

    if (error) {
      alert(error.message);
      return;
    }

    alert("Student Updated Successfully");
    window.location.reload();
  }

  return (
    <div className="mt-8 grid gap-4">
      <input
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Name"
        className="rounded-xl p-3 text-black"
      />

      <input
        value={className}
        onChange={(e) => setClassName(e.target.value)}
        placeholder="Class"
        className="rounded-xl p-3 text-black"
      />

      <input
        value={school}
        onChange={(e) => setSchool(e.target.value)}
        placeholder="School"
        className="rounded-xl p-3 text-black"
      />

      <input
        value={phone}
        onChange={(e) => setPhone(e.target.value)}
        placeholder="Phone"
        className="rounded-xl p-3 text-black"
      />

      <button
        onClick={saveStudent}
        className="rounded-xl bg-green-500 p-3 font-bold text-black"
      >
        Save Changes
      </button>
    </div>
  );
}