// src/seeder/seeder.module.ts
import { Module } from '@nestjs/common';
import { SeederService } from './seeder.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { StudentScore } from '../student-score/entities/student-score.entity';

@Module({
  imports: [TypeOrmModule.forFeature([StudentScore])],
  providers: [SeederService],
  exports: [SeederService],
})
export class SeederModule {}