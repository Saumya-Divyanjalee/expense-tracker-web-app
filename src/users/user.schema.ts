import { Schema, Document } from 'mongoose';

export const UserSchema = new Schema({
  name: String,
  email: { type: String, unique: true },
  password: String,
});

export interface User extends Document {
  name: string;
  email: string;
  password: string;
}