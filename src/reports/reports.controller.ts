import { Controller, Get, UseGuards, Request } from '@nestjs/common';
import { ReportsService } from './reports.service.js';
import { JwtAuthGuard } from '../auth/jwt-auth.guard.js';
@UseGuards(JwtAuthGuard)
@Controller('reports')
export class ReportsController {
  constructor(private reportsService: ReportsService) {}

  @Get('summary')
  getSummary(@Request() req: any) {
    return this.reportsService.getSummary(req.user.userId);
  }

  @Get('category-wise')
  getCategoryWise(@Request() req: any) {
    return this.reportsService.getCategoryWise(req.user.userId);
  }

  @Get('monthly')
  getMonthly(@Request() req: any) {
    return this.reportsService.getMonthly(req.user.userId);
  }
}