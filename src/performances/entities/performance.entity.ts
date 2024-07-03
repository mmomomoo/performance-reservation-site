import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
  DeleteDateColumn,
} from 'typeorm';
import { Seat } from './seat.entity';
import { Reservation } from '../../reservations/entities/reservation.entity';
import { Bookmark } from '../../bookmarks/entities/bookmark.entity';
import { PerformanceImage } from './perfomance-image.entity';

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

  @Column({ type: 'simple-array', nullable: false })
  dates: string[];

  @Column({ type: 'simple-array', nullable: false })
  times: string[];

  @CreateDateColumn({ type: 'datetime', nullable: false })
  createdAt: Date;

  @UpdateDateColumn({ type: 'datetime', nullable: false })
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt?: Date;

  @OneToMany(() => Seat, (seat) => seat.performance)
  seats: Seat[];

  @OneToMany(() => Reservation, (reservation) => reservation.performance)
  reservations: Reservation[];

  @OneToMany(() => Bookmark, (bookmark) => bookmark.performance)
  bookmarks: Bookmark[];

  @OneToMany(
    () => PerformanceImage,
    (performanceImage) => performanceImage.performance
  )
  performanceImages: PerformanceImage[];
}
