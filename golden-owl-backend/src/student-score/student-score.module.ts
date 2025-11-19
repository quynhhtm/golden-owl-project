// src/student-score/student-score.module.ts
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { StudentScore } from './entities/student-score.entity';
import { StudentScoreController } from './student-score.controller';
import { StudentScoreService } from './student-score.service';

@Module({
  imports: [TypeOrmModule.forFeature([StudentScore])],
  controllers: [StudentScoreController],
  providers: [StudentScoreService],
  exports: [TypeOrmModule]
})
export class StudentScoreModule {}