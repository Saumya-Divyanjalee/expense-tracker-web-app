import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { IncomeSchema } from './income.schema';
import { IncomeService } from './income.service';
import { IncomeController } from './income.controller';

@Module({
  imports: [MongooseModule.forFeature([{ name: 'Income', schema: IncomeSchema }])],
  controllers: [IncomeController],
  providers: [IncomeService],
})
export class IncomeModule {}