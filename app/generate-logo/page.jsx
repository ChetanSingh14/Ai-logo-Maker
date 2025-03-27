"use client";
import React, { useContext, useEffect, useState } from "react";
import { UserDetailContex } from "../_context/UserDetailContext";

import Prompt from "../_data/Prompt";
import axios from "axios";
import Image from "next/image";

function GenerateLogo() {
  const { userDetail, setUserDetail } = useContext(UserDetailContex);
  const [formData, setFormData] = useState();
  const [loading, setLoading] = useState(false);
  const [logoImage, setLogoImage] = useState();
  useEffect(() => {
    if (typeof window != undefined && userDetail?.email) {
      const storage = localStorage.getItem("formData");
      if (storage) {
        setFormData(JSON.parse(storage));
        console.log(JSON.parse(storage));
      }
    }
  }, [userDetail]);
  useEffect(() => {
    if (formData?.title) {
      GenerateAILogo();
    }
  }, [formData]);

  const GenerateAILogo = async () => {
    setLoading(true);
    const PROMPT = Prompt.LOGO_PROMPT.replace("{logoTitle}", formData?.title)
      .replace("{logoDesc}", formData?.description)
      .replace("{logoColor}", formData?.Palette)
      .replace("{logoDesign}", formData?.designs?.title)
      .replace("{logoPrompt}", formData?.designs?.prompt);
    console.log(PROMPT);

    //generate logo prompt from AI
    // generate logo image
    const result = await axios.post("/api/ai-logo-model", {
      prompt: PROMPT,
      email: userDetail?.email,
      title: formData.title,
      description: formData.description,
    });
    console.log(result?.data);
    setLogoImage(result.data?.image);
    setLoading(false);
  };

  return (
    <div>
      <h2>{loading&&'Loading...'}</h2>
      {!loading&&<Image src={logoImage} alt='logo' width={200} height={200}/>}
    </div>
  );
}

export default GenerateLogo;
