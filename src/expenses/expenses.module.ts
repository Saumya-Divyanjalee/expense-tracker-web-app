import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { PassportModule } from '@nestjs/passport';
import { ExpenseSchema } from './expense.schema.js';
import { ExpensesService } from './expenses.service.js';
import { ExpensesController } from './expenses.controller.js';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Expense', schema: ExpenseSchema }]),
    PassportModule.register({ defaultStrategy: 'jwt' }),
  ],
  controllers: [ExpensesController],
  providers: [ExpensesService],
})
export class ExpensesModule {}