import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { PassportModule } from '@nestjs/passport';
import { ExpenseSchema } from '../expenses/expense.schema.js';
import { IncomeSchema } from '../income/income.schema.js';
import { ReportsService } from './reports.service.js';
import { ReportsController } from './reports.controller.js';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'Expense', schema: ExpenseSchema },
      { name: 'Income', schema: IncomeSchema },
    ]),
    PassportModule.register({ defaultStrategy: 'jwt' }),
  ],
  controllers: [ReportsController],
  providers: [ReportsService],
})
export class ReportsModule {}