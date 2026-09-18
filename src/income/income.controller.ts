import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Request } from '@nestjs/common';
import { IncomeService } from './income.service.js';
import { CreateIncomeDto } from './dto/create-income.dto.js';
import { UpdateIncomeDto } from './dto/update-income.dto.js';
import { JwtAuthGuard } from '../auth/jwt-auth.guard.js';

@UseGuards(JwtAuthGuard)
@Controller('income')
export class IncomeController {
  constructor(private incomeService: IncomeService) {}

  @Post()
  create(@Request() req: any, @Body() dto: CreateIncomeDto) {
    return this.incomeService.create(req.user.userId, dto);
  }

  @Get()
  findAll(@Request() req: any) {
    return this.incomeService.findAll(req.user.userId);
  }

  @Patch(':id')
  update(@Request() req: any, @Param('id') id: string, @Body() dto: UpdateIncomeDto) {
    return this.incomeService.update(req.user.userId, id, dto);
  }

  @Delete(':id')
  remove(@Request() req: any, @Param('id') id: string) {
    return this.incomeService.remove(req.user.userId, id);
  }
}