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
  const [className, setClassName] = useState(student.class_name || "");
  const [school, setSchool] = useState(student.school_name || "");
  const [phone, setPhone] = useState(student.phone_number || "");
  const [updating, setUpdating] = useState(false);

  async function saveStudent() {
    setUpdating(true);
    const { error } = await supabase
      .from("students")
      .update({
        name,
        class_name: className,
        school_name: school,
        phone_number: phone,
      })
      .eq("id", student.id);

    setUpdating(false);

    if (error) {
      alert("Update failed: " + error.message);
      return;
    }

    alert("Student Updated Successfully");
    window.location.reload();
  }

  return (
    <div className="mt-8 grid gap-4 bg-slate-900 p-6 rounded-2xl border border-slate-800">
      {/* Full Name Field */}
      <div>
        <label htmlFor="edit_student_name" className="block text-sm font-semibold mb-2 text-slate-300">
          Student Full Name
        </label>
        <input
          id="edit_student_name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Enter student name"
          className="w-full rounded-xl p-3 text-black focus:outline-none focus:ring-2 focus:ring-green-500"
        />
      </div>

      {/* Class Field */}
      <div>
        <label htmlFor="edit_student_class" className="block text-sm font-semibold mb-2 text-slate-300">
          Class
        </label>
        <input
          id="edit_student_class"
          value={className}
          onChange={(e) => setClassName(e.target.value)}
          placeholder="Enter class name (e.g. Class 6)"
          className="w-full rounded-xl p-3 text-black focus:outline-none focus:ring-2 focus:ring-green-500"
        />
      </div>

      {/* School Name Field */}
      <div>
        <label htmlFor="edit_student_school" className="block text-sm font-semibold mb-2 text-slate-300">
          School / Coaching Name
        </label>
        <input
          id="edit_student_school"
          value={school}
          onChange={(e) => setSchool(e.target.value)}
          placeholder="Enter school or coaching"
          className="w-full rounded-xl p-3 text-black focus:outline-none focus:ring-2 focus:ring-green-500"
        />
      </div>

      {/* Parent Phone Number Field */}
      <div>
        <label htmlFor="edit_student_phone" className="block text-sm font-semibold mb-2 text-slate-300">
          Parent Phone Number
        </label>
        <input
          id="edit_student_phone"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          placeholder="Enter 10-digit phone number"
          className="w-full rounded-xl p-3 text-black focus:outline-none focus:ring-2 focus:ring-green-500"
        />
      </div>

      {/* Action Submit Button */}
      <button
        onClick={saveStudent}
        disabled={updating}
        className="mt-2 rounded-xl bg-green-500 p-3 font-bold text-slate-950 hover:bg-green-400 disabled:opacity-50 transition-all text-center"
      >
        {updating ? "Saving Changes..." : "Save Changes"}
      </button>
    </div>
  );
}