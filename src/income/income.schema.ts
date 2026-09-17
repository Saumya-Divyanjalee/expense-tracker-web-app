import { Schema, Document, Types } from 'mongoose';

export const IncomeSchema = new Schema({
  user: { type: Types.ObjectId, ref: 'User', required: true },
  title: { type: String, required: true },
  amount: { type: Number, required: true },
  source: { type: String, required: true },
  date: { type: Date, required: true },
}, { timestamps: true });

export interface Income extends Document {
  user: Types.ObjectId;
  title: string;
  amount: number;
  source: string;
  date: Date;
}