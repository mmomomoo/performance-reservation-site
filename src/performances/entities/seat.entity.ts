import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  OneToMany,
  JoinColumn,
} from 'typeorm';
import { Performance } from './performance.entity';
import { Reservation } from '../../reservations/entities/reservation.entity';

@Entity('seats')
export class Seat {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'int', nullable: false })
  seatCount: number;

  @Column({ type: 'varchar', nullable: false })
  seatNumber: string;

  @Column({ type: 'varchar', nullable: false })
  grade: string;

  @Column({ type: 'int', nullable: false })
  price: number;

  @CreateDateColumn({ type: 'datetime', nullable: false })
  createdAt: Date;

  @UpdateDateColumn({ type: 'datetime', nullable: false })
  updatedAt: Date;

  @ManyToOne(() => Performance, (performance) => performance.seats)
  @JoinColumn({ name: 'performancesId' })
  performance: Performance;

  @OneToMany(() => Reservation, (reservation) => reservation.seat)
  reservations: Reservation[];
}
