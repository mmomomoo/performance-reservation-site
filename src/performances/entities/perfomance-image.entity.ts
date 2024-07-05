import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { Performance } from './performance.entity';

@Entity('performanceImages')
export class PerformanceImage {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', nullable: true })
  imageUrl?: string;

  @CreateDateColumn({ type: 'datetime', nullable: false })
  createdAt: Date;

  @UpdateDateColumn({ type: 'datetime', nullable: false })
  updatedAt: Date;

  @ManyToOne(() => Performance, (performance) => performance.performanceImages)
  @JoinColumn({ name: 'performancesId' }) // 외래 키 연결
  performance: Performance;
}
