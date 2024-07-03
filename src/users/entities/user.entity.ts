import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  OneToOne,
  OneToMany,
  DeleteDateColumn,
} from 'typeorm';
import { Reservation } from '../../reservations/entities/reservation.entity';
import { RefreshToken } from '../../auth/entities/refresh-token.entity';
import { Bookmark } from '../../bookmarks/entities/bookmark.entity';
import { UserRole } from './user-role.enum';

@Entity('users') // 데이터베이스 테이블 이름을 명시적으로 지정
export class User {
  @PrimaryGeneratedColumn()
  id: number;
  @Column({ type: 'varchar', unique: true, nullable: false })
  email: string;
  @Column({ type: 'varchar', nullable: false, select: false })
  password: string;
  @Column({ type: 'varchar', nullable: false })
  username: string;
  @Column({
    type: 'enum',
    enum: UserRole,
    nullable: false,
    default: UserRole.USER,
  })
  role: UserRole; //enum만들어서 넣음
  @Column({ type: 'int', default: 1000000, nullable: false })
  point: number;
  @Column({ type: 'varchar' })
  profileImage?: string;
  //type: 'timestamp' 옵션을 통해 데이터베이스에 timestamp 타입으로 저장됩니다.
  //이 옵션을 통해 날짜와 시간이 함께 저장됩니다.
  // timestamp 데이터베이스 서버의 타임존 설정에 따라 로컬 시간으로 변환할 수 있습니다.
  @CreateDateColumn({ type: 'datetime', nullable: false })
  createdAt: Date; //@CreateDateColumn은 기본값으로 timestamp로 들어간다.

  @UpdateDateColumn({ type: 'datetime', nullable: false })
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt?: Date;

  @OneToMany(() => Reservation, (reservation) => reservation.userId)
  reservations: Reservation[];
  @OneToOne(() => RefreshToken, (refreshToken) => refreshToken.userId)
  refreshToken: RefreshToken;
  @OneToMany(() => Bookmark, (bookmark) => bookmark.userId)
  bookmarks: Bookmark[];
}
