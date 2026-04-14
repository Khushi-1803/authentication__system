import { connect } from "@/dbConfig/dbconfig";
import User from "@/models/userModel"
import { NextRequest,NextResponse } from "next/server";
import bcryptjs from "bcryptjs"
import { error } from "console";
import { sendMail } from "@/helpers/mailer";

connect()

export async function POST(request:NextRequest){
    try {
        const reqBody = await request.json()
        const {username,email,password} = reqBody
        //check if user already exist
        const user = await User.findOne({email})
        if(user){
            return NextResponse.json({error:"User already exists"},{status:400})
        }
        //hashing password
        const salt = await bcryptjs.genSalt(10)
        const hashPassword = await bcryptjs.hash(password,salt)
        //new user
        const newUser=new User({
            username,
            email,
            password:hashPassword

        })
        

        const savedUser = await newUser.save()
        //send verification email
        await sendMail({email,emailType:"VERIFY",userId:savedUser._id})
        return NextResponse.json({message:"User created sucessfully",
            success:true,
            savedUser
        })
    } catch (error:any) {
       return NextResponse.json({error:error.message},{status:500}) 
    }
}