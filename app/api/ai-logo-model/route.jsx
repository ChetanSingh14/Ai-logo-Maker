import { NextResponse } from "next/server";
import { AILogoPrompt } from "@/configs/AiModels";
import axios from "axios";
import { db } from "@/configs/FirebaseConfig";
import { doc, setDoc, updateDoc } from "firebase/firestore";

export async function POST(req) {
  try {
    const { prompt, email, title, description,userCredit} = await req.json();

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
    AIPrompt , // ✅ Ensure correct request format
      {
        headers: {
          Authorization: `Bearer ${process.env.HUGGING_FACE_API_KEY}`,
          "Content-Type": "application/json",
        },
        responseType: "arraybuffer",
      }
    );

    // Convert binary image data to base64
    const buffer = Buffer.from(response.data, "binary");
    const base64Image = buffer.toString("base64");
    const base64ImageWithMime = `data:image/png;base64,${base64Image}`;

    const docRef=doc(db,'users',email)
    await updateDoc(docRef,{
      credits:Number(userCredit)-1
    })

    // Save image to Firebase Firestore
    try {
      await setDoc(doc(db, "users", email, "logos", Date.now().toString()), {
        image: base64ImageWithMime,
        title: title || "Untitled Logo",
        description: description || "No description provided",
        timestamp: new Date().toISOString(),
      });
      console.log("✅ Image successfully stored in Firestore!");
    } catch (error) {
      console.error("❌ Firestore Error:", error);
      return NextResponse.json({ error: "Failed to save image to Firestore" }, { status: 500 });
    }

    return NextResponse.json({ image: base64ImageWithMime }, { status: 200 });

  } catch (e) {
    console.error("Error processing AI logo request:", e);
    return NextResponse.json(
      { error: e.message || "Internal Server Error" },
      { status: 500 }
    );
  }
}
