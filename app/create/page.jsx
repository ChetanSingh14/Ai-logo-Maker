"use client";
import React, { useState, useEffect } from "react";
import LogoTitle from "./_components/LogoTitle";
import { Button } from "@/components/ui/button";
import { ArrowLeft, ArrowRight } from "lucide-react";
import LogoDesc from "./_components/LogoDesc";
import LogoColorPalette from "./_components/LogoColorPalette";
import LogoDesigns from "./_components/LogoDesigns";
import LogoIdea from "./_components/LogoIdea";

function CreateLogo() {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({});

  const onHandleInputChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  useEffect(() => {
    console.log("Updated formData:", formData);
  }, [formData]); // ✅ Logs updated state

  return (
    <div className="mt-28 p-10 border rounded-xl">
      {step === 1 && (
        <LogoTitle onHandleInputChange={onHandleInputChange} formData={formData} />
      )}
      {step === 2 && (
        <LogoDesc onHandleInputChange={onHandleInputChange} formData={formData} />
      )}
      {step === 3 && (
        <LogoColorPalette onHandleInputChange={onHandleInputChange} formData={formData} />
      )}
      {step === 4 && (
        <LogoDesigns onHandleInputChange={onHandleInputChange} formData={formData} />
      )}
      {step === 5 && (
        <LogoIdea onHandleInputChange={onHandleInputChange} formData={formData} />
      )}

      <div className="flex items-center justify-between mt-10">
        {step !== 1 && (
          <Button variant="outline" onClick={() => setStep(step - 1)}>
            <ArrowLeft />
            Previous
          </Button>
        )}
        <Button onClick={() => setStep(step + 1)}>
          <ArrowRight />
          Continue
        </Button>
      </div>
    </div>
  );
}

export default CreateLogo;
