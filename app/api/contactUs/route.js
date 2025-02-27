import { NextResponse } from "next/server";
import ContactUs from "@/app/db/contactUs";   

export async function POST(req) {
    try {
         const { email, phone, message, LoggedUsername, LoggedEmail } = await req.json();
        
         const feedback = await ContactUs.create({
            email,
            phone,
            message,
            LoggedUsername,
            LoggedEmail
        });

         return NextResponse.json({ message: "Feedback submitted successfully" }, { status: 200, feedback });

    } catch (error) {
        console.error("Error processing request:", error);
          return NextResponse.json({ message: "Error submitting feedback" }, { status: 500 });
    }
}
