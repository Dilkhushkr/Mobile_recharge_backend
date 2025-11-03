import { Request, Response } from 'express'
import User from '../model/userModel'
import twilio from 'twilio';


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




