// src/report/report.service.ts
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { StudentScore } from '../student-score/entities/student-score.entity';

@Injectable()
export class ReportService {
  constructor(
    @InjectRepository(StudentScore)
    private scoresRepository: Repository<StudentScore>,
  ) {}

  // Feature: Thống kê 4 cấp độ điểm theo môn
  async getScoreStatistics() {
    const subjects = ['math', 'physics', 'chemistry', 'literature', 'history', 'geography', 'civicEducation', 'foreignLanguageScore'];
    const results = {};

    for (const subject of subjects) {
      // Logic: >=8, [6, 8), [4, 6), <4
      const rawResult = await this.scoresRepository.createQueryBuilder('score')
        .select([
          `COUNT(CASE WHEN score.${subject} >= 8.0 THEN 1 END) AS level_1`,
          `COUNT(CASE WHEN score.${subject} < 8.0 AND score.${subject} >= 6.0 THEN 1 END) AS level_2`,
          `COUNT(CASE WHEN score.${subject} < 6.0 AND score.${subject} >= 4.0 THEN 1 END) AS level_3`,
          `COUNT(CASE WHEN score.${subject} < 4.0 THEN 1 END) AS level_4`,
        ])
        .getRawOne();
        
      results[subject] = {
        l1: parseInt(rawResult.level_1 || 0),
        l2: parseInt(rawResult.level_2 || 0),
        l3: parseInt(rawResult.level_3 || 0),
        l4: parseInt(rawResult.level_4 || 0),
      };
    }
    return results;
  }

  // Feature: List Top 10 khối A (Toán + Lý + Hóa)
  async getTop10GroupA() {
    const topStudents = await this.scoresRepository.createQueryBuilder('score')
      .select([
        'score.registrationNumber', 
        'score.name', 
        'score.math', 
        'score.physics', 
        'score.chemistry', 
        ` (COALESCE(score.math, 0) + COALESCE(score.physics, 0) + COALESCE(score.chemistry, 0)) AS total_a `,
      ])
      .orderBy('total_a', 'DESC')
      .take(10)
      .getRawMany();
      
    return topStudents;
}
}