import { NextResponse } from "next/server";
import { AILogoPrompt } from "@/configs/AiModels";
import axios from "axios";
import { doc, setDoc } from "firebase/firestore";

export async function POST(req) {
  try {
    const { prompt,email,title,description } = await req.json();

    if (!prompt) {
      return NextResponse.json({ error: "Prompt is required" }, { status: 400 });
    }

    // Generate AI Prompt for Logo
    const AiPromptResult = await AILogoPrompt.sendMessage(prompt);
    const responseText = await AiPromptResult.response.text();
    const AIPrompt = JSON.parse(responseText).prompt;

    // Send prompt to Hugging Face API
    const response = await axios.post(
      "https://router.huggingface.co/hf-inference/models/black-forest-labs/FLUX.1-dev",
      AIPrompt,
      {
        headers: {
          Authorization: `Bearer ${process.env.HUGGING_FACE_API_KEY}`, // ✅ Added space
          "Content-Type": "application/json",
        },
        responseType: "arraybuffer",
      }
    );

    // Convert binary image data to base64
    const buffer = Buffer.from(response.data, "binary");
    const base64Image = buffer.toString("base64");
    const base64ImageWithMime = `data:image/png;base64,${base64Image}`; 

    //save image to firebase 
    try{
        await setDoc(doc(db,"users",email,"logos",Date.now().toString()),{
            image:base64ImageWithMime,
            title:title,
            description:description
        })
    }catch{

    }

    console.log(base64ImageWithMime);

    return NextResponse.json({ image: base64ImageWithMime }, { status: 200 });

  } catch (e) {
    console.error("Error processing AI logo request:", e);
    return NextResponse.json(
      { error: e.message || "Internal Server Error" },
      { status: 500 }
    );
  }
}
