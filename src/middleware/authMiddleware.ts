import jwt from "jsonwebtoken";
import { Response, NextFunction } from 'express';
import User from "../model/userModel"
import { CustomRequest } from '../types/express';

export const protect = async (req: CustomRequest, res: Response, next: NextFunction) => {
  try {
    const token = req.cookies.token;

    console.log("Auth Middleware Token:", token);

    if (!token)
      return res.status(401).json({ message: "Not authorized, no token ❌" });

    const decoded = jwt.verify(token, process.env.JWT_SECRET || '');
    if (!decoded || typeof decoded === 'string') {
      return res.status(401).json({ message: "Invalid token ❌" });
    }

    req.user = await User.findById((decoded as any).id).select("-otp");
    next();
  } catch (error) {
    res.status(401).json({ message: "Invalid or expired token ❌" });
  }
};
