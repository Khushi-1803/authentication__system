import React from "react";

export default async function UserProfilePage({params}:any) {
    const { id } = await params;
  return (
    <div className="bg-black flex flex-col items-center justify-center min-h-screen">
      <h1 className="text-white text-3xl font-bold">Profile Page</h1>
      <p className="text-white text-xl">Profile</p>
      <span className="text-white text-lg">{id}</span>
    </div>
  );
}