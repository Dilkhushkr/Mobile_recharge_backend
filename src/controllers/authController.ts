import  { Request, Response } from 'express'
import User from '../model/userModel'
import twilio from 'twilio';
import jwt from 'jsonwebtoken';
import { CustomRequest } from '../types/express';

const client = twilio(
  process.env.TWILIO_ACCOUNT_SID,
  process.env.TWILIO_AUTH_TOKEN
);

const generateOTP = () => Math.floor(100000 + Math.random() * 900000).toString();

export const sendOTP = async (req: Request, res: Response) => {

    try{

        const {phone} = req.body;
        if(!phone){
            return res.status(400).json({message: "Phone number is required"})
        }
        
        let user = await User.findOne({
            phone
        })

        const otp = generateOTP();

        if(!user){
            user = await User.create({
                phone,
                otp
            })
        }
        else{
            user.otp = otp;
            await user.save();
        }


        await client.messages.create({
      body: `Your verification code is ${otp}`,
      from: process.env.TWILIO_PHONE_NUMBER,
      to: phone.startsWith("+") ? phone : `+91${phone}` 
    });


        console.log(`OTP for ${phone} is ${otp}`)
        res.status(200).json({
            message : "OTP sent successfully",
            
        });

    }catch(err){
        res.status(500).json({
            message : "Internal Server Error"
        })
    }

}

export const verifyOTP = async (req : Request,res : Response)=>{
    try{
        const {phone , otp} = req.body;
        const user = await User.findOne({
            phone
        });

        if(!user){
            return res.status(400).json({
                message : "User not found "
            })
        }

        if(user.otp !== otp){
            return res.status(400).json({
                message : "Invalid OTP"
            })
        }

        user.isVerified = true;
        user.otp = null
        await user.save();


        const jwtSecret = process.env.JWT_SECRET;
        if (!jwtSecret) {
            return res.status(500).json({ message: "JWT secret not configured" });
        }

        const token = jwt.sign(
            { id: user._id, phone: user.phone },
            jwtSecret,
            { expiresIn: '1d' }
        );
        console.log("Generated JWT Token:", token);

     res.cookie("token", token, {
       httpOnly: true,
       secure:process.env.NODE_ENV === "production",
       sameSite:process.env.NODE_ENV === "production" ? "none" : "lax",
    });


        res.json({
            message : "OTP verified successfully",
            token,
            user : {phone : user.phone, isVerified : user.isVerified}
        })


    }catch(err){

        res.status(500).json({
            message : "Internal Server Error"
        })

    }

}


export const getProfile = (req: CustomRequest, res: Response ) => {
    res.json({
        message: "User profile fetched successfully",
        user: req.user,
    });
}



export const logout = (req : Request , res : Response) => {

    res.clearCookie("token",{
        httpOnly: true,
        secure: false, // true in production (HTTPS)
        sameSite: "strict",
    })

    res.json({
        message : "Logged out successfully"
    })  

}




