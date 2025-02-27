import { NextResponse } from "next/server";
import Signup from "@/app/db/accountscreated";  

export async function POST(req) {
    try {
        const { username, email, password } = await req.json();
         console.log("Received to backend:", username, email, password);
          const existingUser = await Signup.findOne({where:{email}});  
         if (existingUser) {
             return NextResponse.json({ message: "Email already in use" }, { status: 400 });
        }
          await Signup.create({username:username, email:email, password:password});  
         return NextResponse.json({ message: "Account ready, log in." });
    } catch (error) {
        console.error("Error processing request:", error);
        return NextResponse.json({ message: "Error processing request" }, { status: 500 });
    }
}



