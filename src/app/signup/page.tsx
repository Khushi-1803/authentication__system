"use client"
import Link from "next/link";
import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import toast from "react-hot-toast";
export default function SignPage(){
    const router = useRouter();
    const [user,setUser] = React.useState({
        email:"",
        password:"",
        username:""
    })
    const [buttonDisabled,setButtonDisabled] = React.useState(false)
    const [loading,setLoading] = React.useState(false)
    const onSignUp = async()=>{
      try {
        setLoading(true);
        const response = await axios.post("/api/users/signup",user);
        console.log("Signup sucess",response.data);
        router.push("/login")
        
        
      } catch (error:any) {
        console.log("Signup failed",error.message);
        
        toast.error(error.message)
      }
      finally{
        setLoading(false)
      }
        
    }
    useEffect(()=>{
      if(user.email.length>0 && user.password.length>0 && user.username.length>0){
        setButtonDisabled(false)
      }else{
        setButtonDisabled(true)
      }
      

    },[user])
    return(
         <div className="bg-gray-100 flex items-center justify-center min-h-screen">
      <div className="bg-black p-8 rounded-2xl shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center">{loading ?"Processing": "Signup" }</h2>

        <form className="space-y-4"
          onSubmit={(e) => {
          e.preventDefault();
          onSignUp();
      }}>
          <div>
            <label htmlFor="username" className="block text-sm font-medium text-white">Username</label>
            <input
            id="username"
              type="text"
              value={user.username}
              onChange={(e)=>setUser({...user,username:e.target.value})}
              placeholder="Enter username"
              className="mt-1 w-full px-4 py-2 border rounded-xl "
            />
          </div>

          <div>
            <label htmlFor="email" className="block text-sm font-medium text-white">Email</label>
            <input
              id="email"
              value={user.email}
               onChange={(e)=>setUser({...user,email:e.target.value})}
              type="email"
              placeholder="Enter email"
              className="mt-1 w-full px-4 py-2 border rounded-xl"
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium text-white">Password</label>
            <input
              id="password"
              value={user.password}
               onChange={(e)=>setUser({...user,password:e.target.value})}
              type="password"
              placeholder="Enter password"
              className="mt-1 w-full px-4 py-2 border rounded-xl"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 rounded-xl hover:bg-blue-600 transition"
          >
           {buttonDisabled ? "No Signup" : "Signup"}
          </button>
        </form>
        <Link className="mt-4" href="/login">Visit Login Page</Link>
        </div>
        </div>
    )
   
}