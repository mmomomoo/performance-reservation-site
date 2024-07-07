import {
  Controller,
  Post,
  Body,
  Param,
  Headers,
  UseGuards,
  Get,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignUpAuthDto } from './dto/sign-up-auth.dto';
import { SignInAuthDto } from './dto/sign-in-auth.dto';
import { AuthGuard } from '@nestjs/passport';
import { UserInfo } from '../../util/userinfo.decorator';
import { User } from 'src/users/entities/user.entity';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  //회원가입
  @Post('/sign-up')
  async signUp(@Body() signUpAuthDto: SignUpAuthDto): Promise<User> {
    return this.authService.signUp(signUpAuthDto);
  }

  //로그인
  @Post('/sign-in')
  async signIn(
    @Body() signInAuthDto: SignInAuthDto
  ): Promise<{ accessToken: string; refreshToken: string }> {
    console.log('signIn endpoint hit');
    return this.authService.signIn(signInAuthDto);
  }
  // //로그아웃
  // @Post('/sign-out')
  // async signOut(@Param('id') id: string) {
  //   return this.authService.signOut(+id);
  // }

  //토큰 발급
  @Post('/refresh-token')
  async refreshToken(
    @Headers('authorization') authorization: string
  ): Promise<string> {
    console.log('Authorization Header:', authorization);
    return this.authService.refreshToken(authorization);
  }

  @UseGuards(AuthGuard('jwt'))
  @Get('email')
  getEmail(@UserInfo() user: User) {
    return { email: user.email };
  }
}
