import { NextResponse } from "next/server";
import Signup from "@/app/db/accountscreated";  

export async function POST(req) {
    try {
        const { email, password } = await req.json();
         console.log("Received to backend:", email, password);
          const existingUser = await Signup.findOne({where:{email,password}});  
         if (existingUser) {
             return NextResponse.json({ message: "Login Successful",username:existingUser.username }, { status: 200 });
        }
        return NextResponse.json({ message: "User Not Found" }, { status: 500 });
     } catch (error) {
        console.error("Error processing request:", error);
        return NextResponse.json({ message: "Invalid Credentials" }, { status: 500 });
    }
 }