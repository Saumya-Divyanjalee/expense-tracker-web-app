import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Expense } from './expense.schema.js';
import { CreateExpenseDto } from './dto/create-expense.dto.js';
import { UpdateExpenseDto } from './dto/update-expense.dto.js';
@Injectable()
export class ExpensesService {
  constructor(@InjectModel('Expense') private expenseModel: Model<Expense>) {}

  create(userId: string, dto: CreateExpenseDto) {
    return this.expenseModel.create({ ...dto, user: userId });
  }

  findAll(userId: string) {
    return this.expenseModel.find({ user: userId }).sort({ date: -1 });
  }

  async findOne(userId: string, id: string) {
    const exp = await this.expenseModel.findOne({ _id: id, user: userId });
    if (!exp) throw new NotFoundException('Expense not found');
    return exp;
  }

  async update(userId: string, id: string, dto: UpdateExpenseDto) {
    const exp = await this.expenseModel.findOneAndUpdate(
      { _id: id, user: userId },
      dto,
      { new: true },
    );
    if (!exp) throw new NotFoundException('Expense not found');
    return exp;
  }

  async remove(userId: string, id: string) {
    const exp = await this.expenseModel.findOneAndDelete({ _id: id, user: userId });
    if (!exp) throw new NotFoundException('Expense not found');
    return { deleted: true };
  }
}