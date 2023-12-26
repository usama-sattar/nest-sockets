import { Document } from 'mongoose';

export interface IUser extends Document {
  readonly username: string;
  readonly email: string;
  readonly password: string;
}
export interface LoginUser {
  readonly success: boolean;
  readonly message: string;
  readonly user?: IUser;
  readonly accessToken?: string;
  readonly refreshToken?: string;
}
export interface SignupUser {
  readonly success: boolean;
  readonly message: string;
  readonly user?: IUser;
  readonly accessToken?: string;
  readonly refreshToken?: string;
}
