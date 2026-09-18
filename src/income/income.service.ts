import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Income } from './income.schema.js';
import { CreateIncomeDto } from './dto/create-income.dto.js';
import { UpdateIncomeDto } from './dto/update-income.dto.js';

@Injectable()
export class IncomeService {
  constructor(@InjectModel('Income') private incomeModel: Model<Income>) {}

  create(userId: string, dto: CreateIncomeDto) {
    return this.incomeModel.create({ ...dto, user: userId });
  }

  findAll(userId: string) {
    return this.incomeModel.find({ user: userId }).sort({ date: -1 });
  }

  async update(userId: string, id: string, dto: UpdateIncomeDto) {
    const inc = await this.incomeModel.findOneAndUpdate({ _id: id, user: userId }, dto, { new: true });
    if (!inc) throw new NotFoundException('Income not found');
    return inc;
  }

  async remove(userId: string, id: string) {
    const inc = await this.incomeModel.findOneAndDelete({ _id: id, user: userId });
    if (!inc) throw new NotFoundException('Income not found');
    return { deleted: true };
  }
}