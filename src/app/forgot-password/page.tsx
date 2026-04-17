"use client"
import axios from "axios";
import { useState } from "react";
import toast from "react-hot-toast";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");

  const handleSubmit = async () => {
    try {
      const res = await axios.post("/api/users/forgotpassword", { email });
      toast.success(res.data.message);
    } catch (error: any) {
      toast.error(error.response?.data?.error || "Error");
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="bg-black p-8 rounded-xl">
        <h2 className="text-white text-xl mb-4">Forgot Password</h2>

        <input
          type="email"
          placeholder="Enter email"
          className="w-full px-4 py-2 rounded mb-4"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <button
          onClick={handleSubmit}
          className="bg-blue-500 text-white w-full py-2 rounded"
        >
          Send Reset Link
        </button>
      </div>
    </div>
  );
}