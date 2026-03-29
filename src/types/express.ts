import { Request } from 'express';
import { Document, Types } from 'mongoose';

export interface IUser extends Document {
  _id: Types.ObjectId;
  phone: string;
  otp?: string | null;
  isVerified?: boolean;
}

export interface CustomRequest extends Request {
  user?: IUser;
}
