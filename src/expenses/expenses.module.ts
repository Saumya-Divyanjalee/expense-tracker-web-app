import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ExpenseSchema } from './expense.schema';
import { ExpensesService } from './expenses.service';
import { ExpensesController } from './expenses.controller';

@Module({
  imports: [MongooseModule.forFeature([{ name: 'Expense', schema: ExpenseSchema }])],
  controllers: [ExpensesController],
  providers: [ExpensesService],
})
export class ExpensesModule {}