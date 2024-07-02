import {
  IsEmail,
  IsNotEmpty,
  IsString,
  MaxLength,
  MinLength,
  IsIn,
} from 'class-validator';
import { UserRole } from '../../users/entities/user-role.enum';
import { Match } from '../../../util/match.decorator';

export class SignUpAuthDto {
  @IsEmail()
  @IsNotEmpty({ message: '이메일을 입력해주세요.' })
  email: string;

  @IsString()
  @MinLength(8, { message: '비밀번호는 최소 8글자 입니다.' })
  @MaxLength(20, { message: '비밀번호는 최대 20글자 입니다.' })
  @IsNotEmpty({ message: '비밀번호를 입력해주세요.' })
  password: string;

  @IsString()
  @IsNotEmpty({ message: '비밀번호 확인을 입력해주세요.' })
  @Match('password', { message: '비밀번호가 일치하지 않습니다.' })
  passwordConfirm: string;

  @IsString()
  @IsNotEmpty({ message: '이름을 입력해주세요.' })
  userName: string;

  @IsString()
  @IsIn(Object.values(UserRole))
  @IsNotEmpty({ message: '일반 계정과 관리자 계정중에 선택해 주세요.' })
  role: string;
}
