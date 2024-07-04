import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  OneToOne,
  JoinColumn,
} from 'typeorm';
import { User } from '../../users/entities/user.entity';

@Entity('refreshTokens')
export class RefreshToken {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', nullable: true })
  refreshToken: string;

  @CreateDateColumn({ type: 'datetime', nullable: false })
  createdAt: Date;

  @Column({ type: 'datetime', nullable: false })
  expiresAt: Date;

  @OneToOne(() => User, (user) => user.refreshToken)
  @JoinColumn({ name: 'userId' })
  user: User;
}
