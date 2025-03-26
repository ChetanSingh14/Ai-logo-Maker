import { NextResponse } from "next/server";
import { AILogoPrompt } from "@/configs/AiModels";
export async function POST(req){
    const {prompt}=await req.json();
    
    try{
        //Generate AI Prompt for Logo 
        const AiPromptResult=await AILogoPrompt.sendMessage(prompt);
        console.log(JSON.parse(AiPromptResult.response.text()))
        const AIPrompt=JSON.parse(AiPromptResult.response.text()).prompt
        return NextResponse.json(AIPrompt)
                //AI logo image model

    }catch{
        
    }
}