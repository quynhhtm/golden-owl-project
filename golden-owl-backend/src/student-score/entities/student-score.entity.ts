import { Entity, Column, PrimaryGeneratedColumn, Unique } from 'typeorm';

@Entity('student_scores')
@Unique(['registrationNumber'])
export class StudentScore {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'registration_number', length: 20 })
  registrationNumber: string;

  @Column({ length: 100, nullable: true })
  name: string;

  @Column({ type: 'decimal', precision: 4, scale: 2, nullable: true })
  math: number;

  @Column({ type: 'decimal', precision: 4, scale: 2, nullable: true })
  literature: number;

  @Column({ type: 'decimal', precision: 4, scale: 2, nullable: true })
  physics: number;

  @Column({ type: 'decimal', precision: 4, scale: 2, nullable: true })
  chemistry: number;

  @Column({ type: 'decimal', precision: 4, scale: 2, nullable: true })
  biology: number;

  @Column({ type: 'decimal', precision: 4, scale: 2, nullable: true })
  history: number;

  @Column({ type: 'decimal', precision: 4, scale: 2, nullable: true })
  geography: number;

  @Column({ type: 'decimal', precision: 4, scale: 2, nullable: true, name: 'civic_education' })
  civicEducation: number;

  @Column({ type: 'decimal', precision: 4, scale: 2, nullable: true, name: 'foreign_language_score' })
  foreignLanguageScore: number;

  @Column({ type: 'varchar', length: 10, nullable: true, name: 'foreign_language_code' })
  foreignLanguageCode: string; 
}
