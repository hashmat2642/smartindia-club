"use client";

import { supabase } from "@/lib/supabase";
import { useState } from "react";

export default function PaymentUpdateForm({
  studentId,
  currentStatus,
}: {
  studentId: number;
  currentStatus: string;
}) {
  const [status, setStatus] = useState(
    currentStatus || "Pending"
  );

  async function updatePayment() {
    const { error } = await supabase
      .from("students")
      .update({
        payment_status: status,
      })
      .eq("id", studentId);

    if (error) {
      alert(error.message);
      return;
    }

    alert("Payment updated!");
    window.location.reload();
  }

  return (
    <div className="flex gap-2">
      <select
  aria-label="Payment Status"
  value={status}
  onChange={(e) => setStatus(e.target.value)}
  className="rounded-lg p-2 text-black"
>
        <option>Pending</option>
        <option>Paid</option>
      </select>

      <button
        onClick={updatePayment}
        className="rounded-lg bg-green-500 px-3 py-2 font-bold text-black"
      >
        Save
      </button>
    </div>
  );
}