import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { Expense } from '../expenses/expense.schema.js';
import { Income } from '../income/income.schema.js';

@Injectable()
export class ReportsService {
  constructor(
    @InjectModel('Expense') private expenseModel: Model<Expense>,
    @InjectModel('Income') private incomeModel: Model<Income>,
  ) {}

  async getSummary(userId: string) {
    const uid = new Types.ObjectId(userId);

    const [expenseTotal] = await this.expenseModel.aggregate([
      { $match: { user: uid } },
      { $group: { _id: null, total: { $sum: '$amount' } } },
    ]);

    const [incomeTotal] = await this.incomeModel.aggregate([
      { $match: { user: uid } },
      { $group: { _id: null, total: { $sum: '$amount' } } },
    ]);

    const totalExpense = expenseTotal?.total || 0;
    const totalIncome = incomeTotal?.total || 0;

    return {
      totalIncome,
      totalExpense,
      balance: totalIncome - totalExpense,
    };
  }

  async getCategoryWise(userId: string) {
    const uid = new Types.ObjectId(userId);
    return this.expenseModel.aggregate([
      { $match: { user: uid } },
      { $group: { _id: '$category', total: { $sum: '$amount' } } },
      { $sort: { total: -1 } },
    ]);
  }

  async getMonthly(userId: string) {
    const uid = new Types.ObjectId(userId);
    return this.expenseModel.aggregate([
      { $match: { user: uid } },
      {
        $group: {
          _id: { year: { $year: '$date' }, month: { $month: '$date' } },
          total: { $sum: '$amount' },
        },
      },
      { $sort: { '_id.year': 1, '_id.month': 1 } },
    ]);
  }
}