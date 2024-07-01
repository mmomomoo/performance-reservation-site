import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
} from 'typeorm';
import { Status } from './status.enum';
import { User } from 'src/users/entities/user.entity';
import { Seat } from 'src/performances/entities/seat.entity';
import { Performance } from '../../performances/entities/performance.entity';

@Entity('reservations') // 데이터베이스 테이블 이름을 명시적으로 지정
export class Reservation {
  @PrimaryGeneratedColumn()
  id: number;
  @Column({ type: 'int', nullable: false })
  userId: number;
  @Column({ type: 'int', nullable: false })
  performanceId: number;
  @Column({ type: 'varchar', nullable: false })
  performanceName: string;
  @Column({ type: 'varchar', nullable: false })
  performanceLocation: string;
  @Column({ type: 'enum', enum: Status, nullable: false })
  status: Status;
  @CreateDateColumn({ type: 'datetime', nullable: false })
  createdAt: Date;
  @UpdateDateColumn({ type: 'datetime', nullable: false })
  updatedAt: Date;

  @ManyToOne(() => User, (user) => user.reservations)
  user: User;

  @ManyToOne(() => Performance, (performance) => performance.reservations)
  performance: Performance;

  @ManyToOne(() => Seat, (seat) => seat.reservations)
  seat: Seat;
}
