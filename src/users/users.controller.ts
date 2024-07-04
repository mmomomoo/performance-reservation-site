import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Req,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserRole } from './entities/user-role.enum';
import { Roles } from 'src/auth/roles.decorator';

@Controller('users')
export class UsersController {
  //private > 클래스 안에서만 사용하게 하기
  constructor(private readonly usersService: UsersService) {}

  //프로필 보기 구현
  @Get('/me')
  @Roles(UserRole.ADMIN, UserRole.USER)
  async readMe(@Req() req: any) {
    const userPayload = req.user;
    const user = await this.usersService.readMe(userPayload);
    return user;
  }

  // @Post()
  // create(@Body() createUserDto: CreateUserDto) {
  //   return this.usersService.create(createUserDto);
  // }

  // @Get(':id')
  // findOne(@Param('id') id: string) {
  //   return this.usersService.findOne(+id);
  // }

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
  //   return this.usersService.update(+id, updateUserDto);
  // }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.usersService.remove(+id);
  // }
}
