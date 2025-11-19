import { Controller, Get } from '@nestjs/common';
import { ReportService } from './report.service';

@Controller('reports')
export class ReportController {
  constructor(private readonly reportService: ReportService) {}

  @Get('subject-stats')
  async getStats() {
    return this.reportService.getScoreStatistics();
  }

  @Get('top-a')
  async getTopA() {
    return this.reportService.getTop10GroupA();
  }
}