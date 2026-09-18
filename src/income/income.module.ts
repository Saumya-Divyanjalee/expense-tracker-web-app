import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { PassportModule } from '@nestjs/passport';
import { IncomeSchema } from './income.schema.js';
import { IncomeService } from './income.service.js';
import { IncomeController } from './income.controller.js';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Income', schema: IncomeSchema }]),
    PassportModule.register({ defaultStrategy: 'jwt' }),
  ],
  controllers: [IncomeController],
  providers: [IncomeService],
})
export class IncomeModule {}