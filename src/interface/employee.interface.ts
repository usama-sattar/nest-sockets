import { Document } from 'mongoose';

export interface IEmployee extends Document {
  readonly username: string;
  readonly email: string;
  readonly createdBy: string;
}
export interface createEmployee {
  readonly success: boolean;
  readonly message: string;
  readonly employee?: IEmployee;
}
export interface deleteEmployee {
  readonly success: boolean;
  readonly message: string;
  readonly employee?: IEmployee;
}
