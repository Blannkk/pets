import { Document } from "mongoose";

export interface User extends Document {
     userName: string;
     email: string;
     password: string;
}