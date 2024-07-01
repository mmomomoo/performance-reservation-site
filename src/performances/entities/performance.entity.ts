import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
} from 'typeorm';
import { Seat } from './seat.entity';
import { Reservation } from '../../reservations/entities/reservation.entity';
import { Bookmark } from '../../bookmarks/entities/bookmark.entity';

@Entity('performances')
export class Performance {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', nullable: false })
  name: string;

  @Column({ type: 'text', nullable: false })
  description: string;

  @Column({
    type: 'enum',
    enum: ['concert', 'theatre', 'sport', 'exhibition'],
    nullable: false,
  })
  category: string;

  @Column({ type: 'varchar', nullable: false })
  location: string;

  @Column({ type: 'int', nullable: false })
  price: number;

  @Column({ type: 'varchar', nullable: true })
  image?: string;

  @Column({ type: 'date', nullable: false })
  dates: Date;

  @CreateDateColumn({ type: 'datetime', nullable: false })
  createdAt: Date;

  @UpdateDateColumn({ type: 'datetime', nullable: false })
  updatedAt: Date;

  @OneToMany(() => Seat, (seat) => seat.performance)
  seats: Seat[];

  @OneToMany(() => Reservation, (reservation) => reservation.performance)
  reservations: Reservation[];

  @OneToMany(() => Bookmark, (bookmark) => bookmark.performance)
  bookmarks: Bookmark[];
}
