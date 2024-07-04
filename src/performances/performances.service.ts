import { Injectable } from '@nestjs/common';
import { CreatePerformanceDto } from './dto/create-performance.dto';
import { UpdatePerformanceDto } from './dto/update-performance.dto';
import { Performance } from './entities/performance.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class PerformancesService {
  constructor(
    @InjectRepository(Performance)
    private readonly performanceRepository: Repository<Performance>
  ) {}
  //공연 등록
  create(createPerformanceDto: CreatePerformanceDto) {
    return 'This action adds a new performance';
  }

  //공연 전체 조회
  async findAll() {
    return await this.performanceRepository.find({
      select: ['id', 'name'],
    });
  }
  //공연 상세 조회
  findOne(id: number) {
    return `This action returns a #${id} performance`;
  }
  //이름으로 조회
  searchName() {
    return `This action returns all performances`;
  }
  //카테고리로 조회
  searchCategory() {
    return `This action returns all performances`;
  }
  //공연 글 업데이트
  update(id: number, updatePerformanceDto: UpdatePerformanceDto) {
    return `This action updates a #${id} performance`;
  }
  //공연 글 삭제
  remove(id: number) {
    return `This action removes a #${id} performance`;
  }
}
