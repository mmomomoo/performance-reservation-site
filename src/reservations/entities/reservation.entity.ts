import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { Status } from './status.enum';
import { User } from 'src/users/entities/user.entity';
import { Seat } from 'src/performances/entities/seat.entity';
import { Performance } from '../../performances/entities/performance.entity';

@Entity('reservations') // 데이터베이스 테이블 이름을 명시적으로 지정
export class Reservation {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', nullable: false })
  name: string;

  @Column({ type: 'varchar', nullable: false })
  location: string;

  @Column({ type: 'enum', enum: Status, nullable: false })
  status: Status;

  @Column({ type: 'int', nullable: false })
  ticketCount: number;

  @CreateDateColumn({ type: 'datetime', nullable: false })
  createdAt: Date;

  @UpdateDateColumn({ type: 'datetime', nullable: false })
  updatedAt: Date;

  @ManyToOne(() => User, (user) => user.reservations)
  @JoinColumn({ name: 'userId' })
  user: User;

  @ManyToOne(() => Performance, (performance) => performance.reservations)
  @JoinColumn({ name: 'performancesId' })
  performance: Performance;

  @ManyToOne(() => Seat, (seat) => seat.reservations)
  @JoinColumn({ name: 'seatsId' })
  seat: Seat;
}
