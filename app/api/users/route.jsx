import { db } from "@/configs/FirebaseConfig";
import { doc, setDoc, getDoc } from "firebase/firestore"; 
import { NextResponse } from "next/server";

export async function POST(req) {
    try {
        const { userEmail, userName } = await req.json();
        if (!userEmail || !userName) {
            return NextResponse.json({ error: "Missing user data" }, { status: 400 });
        }

        const docRef = doc(db, "users", userEmail);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
            return NextResponse.json(docSnap.data(), { status: 200 });
        } else {
            // Insert new user
            const data = {
                userName: userName,
                email: userEmail,
                credits: 5
            };
            await setDoc(docRef, data);
            return NextResponse.json(data, { status: 201 });
        }
    } catch (error) {
        console.error("Error saving user:", error);
        return NextResponse.json({ error: error.message || "Internal Server Error" }, { status: 500 });
    }
}
