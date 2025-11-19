import { Controller, Get, Param } from '@nestjs/common';
import { StudentScoreService } from './student-score.service';

@Controller('scores')
export class StudentScoreController {
  constructor(private readonly studentScoreService: StudentScoreService) {}

  @Get(':registrationNumber')
  async getScore(@Param('registrationNumber') regNo: string) {
    return this.studentScoreService.findOneByRegNo(regNo);
  }
}