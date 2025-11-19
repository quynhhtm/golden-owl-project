// src/seeder/seeder.service.ts
import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as fs from 'fs';
import * as csv from 'csv-parser';
import { StudentScore } from '../student-score/entities/student-score.entity';

@Injectable()
export class SeederService {
  private readonly logger = new Logger(SeederService.name);
  private readonly CHUNK_SIZE = 500; // Số record insert một lần

  constructor(
    @InjectRepository(StudentScore)
    private readonly scoresRepository: Repository<StudentScore>,
  ) {}

  async seedData(): Promise<void> {
    console.log('[SeederService] Bắt đầu quá trình nhập liệu từ CSV...');

    const stream = fs.createReadStream('./diem_thi_thpt_2024.csv')
      .pipe(csv());

    let buffer: StudentScore[] = [];

    for await (const row of stream) {
      const student = this.scoresRepository.create({
        registrationNumber: row['sbd'] || '',
        math: this.parseNumber(row['toan']),
        literature: this.parseNumber(row['ngu_van']),
        foreignLanguageScore: this.parseNumber(row['ngoai_ngu']),
        foreignLanguageCode: row['ma_ngoai_ngu'] || '',
        physics: this.parseNumber(row['vat_li']),
        chemistry: this.parseNumber(row['hoa_hoc']),
        biology: this.parseNumber(row['sinh_hoc']),
        history: this.parseNumber(row['lich_su']),
        geography: this.parseNumber(row['dia_li']),
        civicEducation: this.parseNumber(row['gdcd']),
      });

      buffer.push(student);

      // Khi đủ CHUNK_SIZE thì insert batch
      if (buffer.length >= this.CHUNK_SIZE) {
        await this.scoresRepository.save(buffer);
        buffer = []; // reset buffer
      }
    }

    // Insert phần còn lại
    if (buffer.length > 0) {
      await this.scoresRepository.save(buffer);
    }

    console.log('[SeederService] Hoàn tất import CSV!');
  }

  private parseNumber(value: string | undefined): number | null {
    if (!value || value.trim() === '') return null;
    const num = parseFloat(value);
    return isNaN(num) ? null : num;
  }
}
