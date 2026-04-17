"use client";

import { useSearchParams } from "next/navigation";
import { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";

export default function ResetPasswordPage() {
  const searchParams = useSearchParams();
  const token = searchParams.get("token");

  const [password, setPassword] = useState("");

  const handleSubmit = async () => {
  if (!token) {
    toast.error("Invalid or missing token");
    return;
  }

  try {
    const res = await axios.post("/api/users/resetpassword", {
      token,
      newPassword: password,
    });

    toast.success(res.data.message);
  } catch (error: any) {
    toast.error(error.response?.data?.error || "Error");
  }
};

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="bg-black p-8 rounded-xl w-full max-w-md">
        <h2 className="text-white text-xl mb-4 text-center">
          Reset Password
        </h2>

        <input
          type="password"
          placeholder="Enter new password"
          className="w-full px-4 py-2 rounded mb-4"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button
          onClick={handleSubmit}
          className="bg-blue-500 text-white w-full py-2 rounded"
        >
          Reset Password
        </button>
      </div>
    </div>
  );
}