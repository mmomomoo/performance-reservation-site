import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  UseInterceptors,
  UploadedFile,
  Query,
} from '@nestjs/common';
import { PerformancesService } from './performances.service';
import { CreatePerformanceDto } from './dto/create-performance.dto';
import { UpdatePerformanceDto } from './dto/update-performance.dto';
import { UserRole } from 'src/users/entities/user-role.enum';
import { RolesGuard } from 'src/auth/roles.guard';
import { Roles } from 'src/auth/roles.decorator';
import { FileInterceptor } from '@nestjs/platform-express';
import { query } from 'express';

@UseGuards(RolesGuard)
@Controller('performances')
export class PerformancesController {
  constructor(private readonly performancesService: PerformancesService) {}

  //공연 등록
  @Roles(UserRole.ADMIN)
  @Post() //()에 api적기
  create(@Body() createPerformanceDto: CreatePerformanceDto): Promise<void> {
    return this.performancesService.create(createPerformanceDto);
  }

  // //공연 글 사진 등록
  // @Roles(UserRole.ADMIN)
  // @Post('/images')
  // @UseInterceptors(FileInterceptor('file'))
  // async imageCreate(@UploadedFile() file: Express.Multer.File) {
  //   await this.performancesService.imageCreate(file);
  // }

  //공연 목록 전체 보기
  @Get()
  findAll() {
    return this.performancesService.findAll();
  }

  //공연 상세 보기
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.performancesService.findOne(+id);
  }

  // 공연 검색 > 이름별
  @Get('/search/name')
  searchName(@Query('name') name: string) {
    return this.performancesService.searchName(name);
  }

  // 공연 검색 > 카테고리별
  @Get('/search/category')
  searchCategory() {
    return this.performancesService.searchCategory();
  }

  //공연 글 수정
  @Roles(UserRole.ADMIN)
  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updatePerformanceDto: UpdatePerformanceDto
  ) {
    return this.performancesService.update(+id, updatePerformanceDto);
  }

  // 공연 글 삭제
  @Roles(UserRole.ADMIN)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.performancesService.remove(+id);
  }
}
