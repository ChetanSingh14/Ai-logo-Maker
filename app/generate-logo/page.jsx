"use client";
import React, { useContext, useEffect, useState } from "react";
import { UserDetailContex } from "../_context/UserDetailContext";
import Lookup from "../_data/Lookup";
import Prompt from "../_data/Prompt";
import axios from "axios";
import Image from "next/image";
import { DownloadIcon, LayoutDashboard, LoaderIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useSearchParams, useRouter } from "next/navigation";
import { toast } from "sonner";

function GenerateLogo() {
  const { userDetail } = useContext(UserDetailContex);
  const [formData, setFormData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [logoImage, setLogoImage] = useState(null);
  const searchParams = useSearchParams();
  const modelType = searchParams.get("type");
  const router = useRouter();

  useEffect(() => {
    if (typeof window !== "undefined" && userDetail?.email) {
      const storedData = localStorage.getItem("formData");
      if (storedData) {
        setFormData(JSON.parse(storedData));
      }
    }
  }, [userDetail]);

  useEffect(() => {
    if (formData?.title) {
      GenerateAILogo();
    }
  }, [formData]);

  useEffect(() => {
    if (typeof window !== "undefined" && logoImage) {
      localStorage.clear();
    }
  }, [logoImage]);

  const GenerateAILogo = async () => {
    if (modelType !== "Free" && userDetail?.credits <= 0) {
      toast.error("Not enough credits!");
      return;
    }

    setLoading(true);
    const PROMPT = Prompt.LOGO_PROMPT
      .replace("{logoTitle}", formData?.title)
      .replace("{logoDesc}", formData?.description)
      .replace("{logoColor}", formData?.Palette)
      .replace("{logoDesign}", formData?.designs?.title)
      .replace("{logoPrompt}", formData?.designs?.prompt);

    try {
      const result = await axios.post("/api/ai-logo-model", {
        prompt: PROMPT,
        email: userDetail?.email,
        title: formData.title,
        description: formData.description,
        type: modelType,
        userCredit: userDetail?.credits,
      });

      setLogoImage(result.data?.image);
    } catch (error) {
      console.error("Error generating logo:", error);
      toast.error("Failed to generate logo. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleDownload = () => {
    if (!logoImage) return;
    const link = document.createElement("a");
    link.href = logoImage;
    link.download = "generated_logo.png";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="mt-16 flex flex-col items-center justify-center">
      {loading ? (
        <div className="flex flex-col items-center mt-2">
          <h2 className="font-bold text-3xl text-red-600">{Lookup.LoadingWaitTitle}</h2>
          <p className="text-xl text-gray-500">{Lookup.LoadingWaitDesc}</p>
          <LoaderIcon className="animate-spin my-2" />
          <Image src="/loading.gif" alt="loading" width={200} height={100} />
          <h2 className="mt-2 font-medium text-2xl text-gray-500">Do not refresh</h2>
        </div>
      ) : logoImage ? (
        <div className="mt-5 text-center">
          <Image src={logoImage} alt="Generated Logo" width={300} height={300} className="rounded-xl shadow-md" />
          <div className="mt-4 flex items-center gap-5">
            <Button onClick={handleDownload}>
              <DownloadIcon className="mr-2" /> Download
            </Button>
            <Button variant="outline" onClick={() => router.push("/dashboard")}>
              <LayoutDashboard className="mr-2" /> Dashboard
            </Button>
          </div>
        </div>
      ) : (
        <h2 className="text-gray-500 text-lg">No logo generated yet.</h2>
      )}
    </div>
  );
}

export default GenerateLogo;