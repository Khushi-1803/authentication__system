"use client"
import React, { useState } from "react";
import axios from "axios";
import Link from "next/link";
import toast from "react-hot-toast";
import {useRouter} from "next/navigation";

export default function ProfilePage() {
  const router = useRouter();
  const [data,setData] = useState("nothing")
  const logout = async() => {
        try {
          await axios.post("/api/users/logout")
          toast.success("Logout sucessfull")
          router.push("/signup")
        } catch (error:any) {
          console.log(error.message);
          toast.error(error.message)
          
        }
  }

  const getDetails = async()=>{
    const res = await axios.get("/api/users/me")
    setData(res.data.data._id)
  }
  
  return (
    <div className="bg-black flex flex-col items-center justify-center min-h-screen">
      <h1 className="text-white text-3xl font-bold">Profile Page</h1>
      <p className="text-white text-xl">Profile</p>
      <h2>{data==="nothing" ? "Nothing" : <Link href={`/profile/${data}`}>{data}</Link>}</h2>
      <hr/>
      <button onClick={logout} className="w-40 mt-4 bg-blue-500 text-white py-2 rounded-xl hover:bg-blue-600 transition">Logout</button>
      <button onClick={getDetails} className="w-40 mt-4 bg-pink-500 text-white py-2 rounded-xl hover:bg-blue-600 transition">Get Details</button>
    </div>
  );
}