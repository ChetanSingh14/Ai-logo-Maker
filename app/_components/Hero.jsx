"use client";
import React, { useState } from "react";
import Lookup from "../_data/Lookup";
import { Button } from "@/components/ui/button";
import  Link from "next/link";
import LogoList from "../dashboard/_components/LogoList";

function Hero() {
  const [logoTitle, setLogoTitle] = useState("");
  return (
    <div className="flex items-center mt-32 flex-col gap-5 ">
      <h2 className="text-primary text-5xl text-center font-bold text-red-600">
        {Lookup.HeroHeading}
      </h2>
      <h2 className="text-5xl text-center font-bold">
        {Lookup.HeroSubheading}
      </h2>
      <p className="text-lg text-gray-500 text=center">{Lookup.HeroDesc}</p>
      <div className="flex gap-6 w-full max-w-2xl mt-24">
        <input
          type="text"
          onChange={(event) => setLogoTitle(event?.target.value)}
          placeholder={Lookup.InputTitlePlaceholder}
          className="p-3 border rounded-md w-full shadow-md"
        />
        
       <Link href={"/create?title=" + logoTitle}>
  <Button className="p-6">Get Started</Button>
</Link>


       
      </div>
      <LogoList/>
    </div>
  );
}

export default Hero;
