import { Module } from '@nestjs/common';
import { ReportService } from './report.service';
import { ReportController } from './report.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { StudentScore } from '../student-score/entities/student-score.entity'; 

@Module({
  imports: [TypeOrmModule.forFeature([StudentScore])], 
  providers: [ReportService],
  controllers: [ReportController]
})
export class ReportModule {}