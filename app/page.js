"use client"

import Button from "@/components/Button";
import InputText from "@/components/InputText";
import React, {useState, useEffect} from "react";
export default function Home() {

  const [Tree, setTree] = useState("")
  
  useEffect(() => {
    console.log(Tree)
  }, [Tree])
  
  const handleChange = (e)=>{
    setTree(e.target.value)
  }

  return (
    <div className="grid grid-cols-2 w-full h-[calc(100vh-104px)] px-10">
      
      <div className="left w-full h-full bg-black p-10 flex items-start justify-center flex-col gap-10">
        <div className="text flex flex-col h-max self-start gap-10">
          <h1 className="font-extrabold text-5xl">Everything you are. In one, simple link in bio.</h1>

          <p className="text-[18px]">Join people using this clone for their link in bio. One link to help you share everything you create, curate and sell from your Instagram, TikTok, Twitter, YouTube and other social media profiles.</p>
        </div>
        <div>
          <label htmlFor="handleName" className="flex flex-col">
            Example: linktr.ee/johntilbury
            </label>
            
          <div className="input flex justify-start items-center gap-4">
            <InputText 
            name="handleName"
            value={Tree}
            placeholder="johntilbury"
            onChange={(e)=>handleChange(e)}
             />
            {Tree.trim() &&
            <Button className="w-auto h-[64px] px-6 py-4" text="Claim your Linktree" link={`/generate?tree=${Tree}`} />}
          </div>
          
          
        </div>
      </div>

      <div className="flex justify-center items-center right w-full h-full ">
        <img className="w-[100%] h-[90%]" src="/right-bg.png" alt="" />
      </div>

    </div>
  );
}
 