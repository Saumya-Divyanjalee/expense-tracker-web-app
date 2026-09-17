import { IsString, IsNumber, IsDateString } from 'class-validator';

export class CreateIncomeDto {
  @IsString()
  title: string;

  @IsNumber()
  amount: number;

  @IsString()
  source: string;

  @IsDateString()
  date: string;
}