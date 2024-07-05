import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { User } from '../../users/entities/user.entity';
import { Performance } from '../../performances/entities/performance.entity';

@Entity('bookmarks')
export class Bookmark {
  @PrimaryGeneratedColumn()
  id: number;

  @CreateDateColumn({ type: 'datetime', nullable: false })
  createdAt: Date;

  @UpdateDateColumn({ type: 'datetime', nullable: false })
  updatedAt: Date;

  @ManyToOne(() => User, (user) => user.bookmarks)
  @JoinColumn({ name: 'userId' }) // 외래 키 연결
  user: User;

  @ManyToOne(() => Performance, (performance) => performance.bookmarks)
  @JoinColumn({ name: 'performancesId' }) // 외래 키 연결
  performance: Performance;
}
