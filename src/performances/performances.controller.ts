import {
  Controller,
  Get,
  Post,
  Body,
  // Patch,
  Param,
  // Delete,
  UseGuards,
  // UseInterceptors,
  // UploadedFile,
  Query,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { PerformancesService } from './performances.service';
import { CreatePerformanceDto } from './dto/create-performance.dto';
// import { UpdatePerformanceDto } from './dto/update-performance.dto';
import { UserRole } from 'src/users/entities/user-role.enum';
import { RolesGuard } from 'src/auth/roles.guard';
import { Roles } from 'src/auth/roles.decorator';
import { FileInterceptor } from '@nestjs/platform-express';
import { PerformanceCategory } from './entities/category.enum';
import { Seat } from './entities/seat.entity';

@UseGuards(RolesGuard)
@Controller('performances')
export class PerformancesController {
  constructor(private readonly performancesService: PerformancesService) {}

  //공연 등록 >> 좌석 수만 등록
  @Roles(UserRole.ADMIN)
  @Post()
  create(@Body() createPerformanceDto: CreatePerformanceDto): Promise<void> {
    return this.performancesService.create(createPerformanceDto);
  }

  //공연 글 사진 등록
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

  // 공연 검색 > 카테고리별 + 이름
  @Get('/search/category')
  searchCategory(
    @Query('name') name: string,
    @Query('category') category: PerformanceCategory
  ) {
    return this.performancesService.searchCategory(name, category);
  }

  // //공연 글 수정
  // @Roles(UserRole.ADMIN)
  // @Patch(':id')
  // update(
  //   @Param('id') id: string,
  //   @Body() updatePerformanceDto: UpdatePerformanceDto
  // ) {
  //   return this.performancesService.update(+id, updatePerformanceDto);
  // }

  // // 공연 글 삭제
  // @Roles(UserRole.ADMIN)
  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.performancesService.remove(+id);
  // }

  // //공연 좌석 등록 >> 좌석 지정일때
  // @Roles(UserRole.ADMIN)
  // @Post('/:id/seats/register')
  // registerSeats(@Param('id') id: string) {
  //   return this.performancesService.registerSeats(+id);
  // }

  //공연 남은 좌석 수 확인
  @Roles(UserRole.ADMIN, UserRole.USER)
  @Get('/:id/seats')
  findOneSeat(@Param('id') id: number): Promise<Partial<Seat>[]> {
    return this.performancesService.findOneSeat(+id);
  }
}
