"use client";
import React, { useContext, useEffect, useState } from "react";
import { UserDetailContex } from "../_context/UserDetailContext";
import Prompt from "../_data/Prompt";

function GenerateLogo() {
  const { userDetail, setUserDetail } = useContext(UserDetailContex);
  const [formData, setFormData] = useState();
  useEffect(() => {
    if (typeof window != undefined && userDetail?.email) {
      const storage = localStorage.getItem("formData");
      if (storage) {
        setFormData(JSON.parse(storage));
        console.log(JSON.parse(storage));
      }
    }
  }, [userDetail]);
  useEffect(()=>{
    if(formData?.title){
      GenerateAILogo();
    }
  },[formData])

  const GenerateAILogo = () => {
    const PROMPT = Prompt.LOGO_PROMPT.replace("{logoTitle}", formData?.title)
      .replace("{logoDesc}", formData?.description)
      .replace("{logoColor}", formData?.Palette)
      .replace("{logoDesign}", formData?.designs?.title)
      .replace("{logoPrompt}", formData?.designs?.prompt);
      console.log(PROMPT)

      //generate logo prompt from AI
      // generate logo image 
  };

  return <div>gekjbfds</div>;
}

export default GenerateLogo;
