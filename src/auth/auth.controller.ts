import { Controller, Post, Body, Param, Headers } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignUpAuthDto } from './dto/sign-up-auth.dto';
import { SignInAuthDto } from './dto/sign-in-auth.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}
  //회원가입
  @Post('/sign-up')
  async signUp(@Body() signUpAuthDto: SignUpAuthDto): Promise<void> {
    return this.authService.signUp(signUpAuthDto);
  }
  // //로그인
  // @Post('/sign-in')
  // async signIn(
  //   @Body() signInAuthDto: SignInAuthDto
  // ): Promise<{ accessToken: string }> {
  //   return this.authService.signIn(signInAuthDto);
  // }
  // //로그아웃
  // @Post('/sign-out')
  // async signOut(@Param('id') id: string) {
  //   return this.authService.signOut(+id);
  // }
  //토큰 발급
  // @Post('/token')
  // async token(@Headers('authorization') rawToken: string) {
  //   const token = this.authService.extractTokenFromHeader(rawToken, true);

  //   const newToken = this.authService.rotateToken(token, false);

  //   return {
  //     accessToken: newToken,
  //   };
  // }
}
