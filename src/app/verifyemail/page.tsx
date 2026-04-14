"use client"
import axios from "axios"
import Link from "next/link"
import React, {useState,useEffect, useEffectEvent} from "react"
import { useRouter } from "next/router"

export default function verifyEmailPage(){
 const [token,setToken] = useState("")
 const[verified,setVerified] = useState(false)
 const[error,setError] = useState(false)

 const verifyUserEmail = async ()=> {
    try {
        await axios.post("/api/users/verifyemail",{token})
        setVerified(true)
    } catch (error:any) {
        setError(true);
        console.log(error.response.data);
        
    }
 }

 useEffect(() => {
  const urlToken = window.location.search.split("=")[1]
  setToken(urlToken || "")
 }, [])
 
 useEffect(() => {
   if(token.length>0){
    verifyUserEmail()
   }
 }, [token])
 

 return(

    <div className="flex flex-col items-center justify-center min-h-screen ">
  
  <h1 className="text-4xl mb-4">Verify Email</h1>

  <h2 className="p-2  text-white rounded">
    {token ? `${token}` : "no token"}
  </h2>

  {verified && (
    <div className="mt-4 text-center">
      <h2 className="text-2xl mb-2">Email Verified</h2>

      <Link href="/login" className="text-blue-500 underline">
        Login
      </Link>
    </div>
  )}
  {error && (
    <div className="mt-4 text-center">
      <h2 className="text-2xl mb-2 bg-red-500">Error</h2>
    </div>
  )}

</div>
 )
}