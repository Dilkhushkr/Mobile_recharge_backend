import { Request } from 'express';
import { Document } from 'mongoose';

export interface IUser extends Document {
  _id: string;
  phone: string;
  otp?: string | null;
  isVerified?: boolean;
}

export interface CustomRequest extends Request {
  user?: IUser;
}
