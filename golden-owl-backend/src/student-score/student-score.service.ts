import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { StudentScore } from './entities/student-score.entity';

@Injectable()
export class StudentScoreService {
  constructor(
    @InjectRepository(StudentScore)
    private scoresRepository: Repository<StudentScore>,
  ) {}

  async findOneByRegNo(registrationNumber: string) {
    if (!/^\d+$/.test(registrationNumber)) {
      throw new BadRequestException('Số báo danh không hợp lệ.');
    }

    const score = await this.scoresRepository.findOne({
      where: { registrationNumber },
      select: [
        'name', 
        'registrationNumber', 
        'math', 'physics', 'chemistry', 'biology',
        'literature', 'history', 'geography', 
        'civicEducation', 'foreignLanguageCode', 'foreignLanguageScore',
        'id',
      ],
    });

    if (!score) {
      throw new NotFoundException(`Không tìm thấy điểm cho SBD: ${registrationNumber}`);
    }
    return score;
  }
}