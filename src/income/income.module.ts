import { Module } from '@nestjs/common';
import { IncomeService } from './income.service.js';
import { IncomeController } from './income.controller.js';

@Module({
  controllers: [IncomeController],
  providers: [IncomeService],
})
export class IncomeModule {}
