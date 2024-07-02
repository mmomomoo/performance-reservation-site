import { Injectable, BadRequestException } from '@nestjs/common';
import { SignUpAuthDto } from './dto/sign-up-auth.dto';
import { SignInAuthDto } from './dto/sign-in-auth.dto';
import bcrypt from 'bcrypt';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/users/entities/user.entity';
import { Repository } from 'typeorm';
import { UserRole } from 'src/users/entities/user-role.enum';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>
  ) {}
  //회원가입
  async signUp(signUpAuthDto: SignUpAuthDto): Promise<void> {
    const { email, password, userName, role } = signUpAuthDto;

    const existingUser = await this.findByEmail(email);
    if (existingUser) {
      throw new BadRequestException('이미 존재하는 이메일 입니다.');
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = this.usersRepository.create({
      email,
      password: hashedPassword,
      username: userName, // username 속성으로 맞춤
      role: role as UserRole,
    });

    await this.usersRepository.save(user);
  }
  // //로그인
  // signIn(signInAuthDto: SignInAuthDto): Promise<{ accessToken: string }> {
  //   return { accessToken };
  // }
  // signOut(id: number) {
  //   return `This action returns a #${id} auth`;
  // }

  // token(id: number) {
  //   return `This action returns a #${id} auth`;
  // }
  // 이미 존재하는 이메일인가 찾기용
  async findByEmail(email: string): Promise<User | null> {
    return this.usersRepository.findOne({ where: { email } });
  }
}
