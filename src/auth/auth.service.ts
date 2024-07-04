import {
  Injectable,
  BadRequestException,
  UnauthorizedException,
} from '@nestjs/common';
import { SignUpAuthDto } from './dto/sign-up-auth.dto';
import { SignInAuthDto } from './dto/sign-in-auth.dto';
import bcrypt from 'bcrypt';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/users/entities/user.entity';
import { Repository } from 'typeorm';
import { UserRole } from 'src/users/entities/user-role.enum';
import { JwtService } from '@nestjs/jwt';
import { RefreshToken } from './entities/refresh-token.entity';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
    @InjectRepository(RefreshToken)
    private refreshTokenRepository: Repository<RefreshToken>,
    private jwtService: JwtService
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
  //로그인
  async signIn(
    signInAuthDto: SignInAuthDto
  ): Promise<{ accessToken: string; refreshToken: string }> {
    const { email, password } = signInAuthDto;
    console.log('signInAuthDto:', signInAuthDto); // 로그 추가

    const existingUser = await this.findByEmail(email);
    console.log('existingUser:', existingUser);
    if (!existingUser) {
      throw new UnauthorizedException('존재하는 유저가 아닙니다.');
    }
    console.log('Password:', password);
    console.log('Hashed Password:', existingUser.password);

    const passwordMatched = await bcrypt.compare(
      password,
      existingUser.password
    );
    if (!passwordMatched) {
      throw new UnauthorizedException('비밀번호가 일치하지 않습니다.');
    }
    // 엑세스토큰 리프레쉬토큰 발급
    const payload = { sub: existingUser.id };
    const accessToken = this.jwtService.sign(payload, { expiresIn: '1h' });
    const refreshToken = this.jwtService.sign(payload, { expiresIn: '7d' });

    const refreshTokenEntity = this.refreshTokenRepository.create({
      refreshToken: refreshToken,
      user: existingUser,
      expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // 7일 후 만료
    });
    await this.refreshTokenRepository.save(refreshTokenEntity);

    return { accessToken, refreshToken };
  }
  //로그아웃
  signOut(id: number) {
    return `This action returns a #${id} auth`;
  }

  // 이미 존재하는 이메일인가 찾기용 /회원가입, 로그인,
  async findByEmail(email: string): Promise<User | null> {
    console.log('findByEmail called with email:', email);
    const user = this.usersRepository.findOne({ where: { email } });
    console.log('User found:', user);
    return user;
  }

  async refreshToken(authorization: string): Promise<string> {
    const token = await this.extractTokenFromHeader(authorization);
    return this.rotateToken(token);
  }

  async extractTokenFromHeader(authorization: string): Promise<string> {
    if (!authorization) {
      throw new UnauthorizedException('인증 헤더가 없습니다.');
    }
    const [type, token] = authorization.split(' ');

    if (type !== 'Bearer' || !token) {
      throw new UnauthorizedException('지원하지 않는 인증 방식입니다.');
    }
    return token;
  }

  private rotateToken(refreshToken: string): string {
    try {
      const payload = this.jwtService.verify(refreshToken);
      const newAccessToken = this.jwtService.sign(
        { userId: payload.userId },
        { expiresIn: '15m' }
      );
      return newAccessToken;
    } catch (error) {
      throw new UnauthorizedException('토큰 갱신에 실패했습니다.');
    }
  }
  async validateUser(payload: any) {
    return this.usersRepository.findOne({
      where: { id: payload.sub, role: payload.role },
    });
  }
}
