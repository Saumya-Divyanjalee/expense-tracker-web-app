
import { Schema, Document } from 'mongoose';
import { Types } from 'mongoose';

export const ExpenseSchema = new Schema({
  user: { type: Types.ObjectId, ref: 'User', required: true },
  title: { type: String, required: true },
  amount: { type: Number, required: true },
  category: { type: String, required: true },
  date: { type: Date, required: true },
  description: String,
}, { timestamps: true });

export interface Expense extends Document {
  user: Types.ObjectId;
  title: string;
  amount: number;
  category: string;
  date: Date;
  description?: string;
}