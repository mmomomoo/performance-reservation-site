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

@Entity('images')
export class Image {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'int', nullable: false })
  performanceId: number;

  @Column({ type: 'varchar', nullable: true })
  imageUrl?: string;

  @CreateDateColumn({ type: 'datetime', nullable: false })
  createdAt: Date;

  @UpdateDateColumn({ type: 'datetime', nullable: false })
  updatedAt: Date;

  @ManyToOne(() => Performance, (performance) => performance.images)
  @JoinColumn({ name: 'performanceId' }) // 외래 키 연결
  performance: Performance;
}
