import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from './auth/auth.module.js';
import { UsersModule } from './users/users.module.js';
import { ExpensesModule } from './expenses/expenses.module.js';
import { IncomeModule } from './income/income.module.js';
import { ReportsModule } from './reports/reports.module.js';
@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    MongooseModule.forRoot(process.env.MONGODB_URI as string),
    AuthModule,
    UsersModule,
    ExpensesModule,
    IncomeModule,
    ReportsModule,
  ],
})
export class AppModule {}