import { Injectable } from '@nestjs/common';
import { CreatePerformanceDto } from './dto/create-performance.dto';
import { UpdatePerformanceDto } from './dto/update-performance.dto';
import { Performance } from './entities/performance.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Like, Repository } from 'typeorm';
import { PerfomanceCategory } from './entities/category.enum';

@Injectable()
export class PerformancesService {
  constructor(
    @InjectRepository(Performance)
    private readonly performanceRepository: Repository<Performance>
  ) {}
  //공연 등록
  async create(createPerformanceDto: CreatePerformanceDto): Promise<void> {
    // const { name, description, category, location, price, dates, times } =
    const { ...performanceInfo } = createPerformanceDto;
    await this.performanceRepository.save(performanceInfo);
    return;
  }
  //공연 글 이미지 등록
  async imageCreate() {
    return await this.performanceRepository.find({
      // select: ['id', 'name'],
    });
  }
  //공연 전체 조회
  async findAll() {
    return await this.performanceRepository.find({
      select: ['id', 'name'],
    });
  }
  //공연 상세 조회
  async findOne(id: number) {
    const performance = await this.performanceRepository.findOne({
      where: { id },
      // select: [
      //   'id',
      //   'name',
      //   'description',
      //   'category',
      //   'location',
      //   'price',
      //   'dates',
      //   'times',
      // ],
    });
    return performance;
  }
  //이름으로 찾아보기
  async searchName(name: string) {
    const performance = await this.performanceRepository.find({
      where: { name: Like(`%${name}%`) }, //SQL의 LIKE 연산자를 사용해서 일부 검색도 가능해게 구현
    });
    performance.sort((a, b) => {
      return b.createdAt.getTime() - a.createdAt.getTime();
    });
    return performance;
  }
  //카테고리로 선택해서 검색
  async searchCategory(perfomanceCategory: PerfomanceCategory) {
    const performance = await this.performanceRepository.find({
      where: { category: perfomanceCategory, name: Like(`%${name}%`) }, //SQL의 LIKE 연산자를 사용해서 일부 검색도 가능해게 구현
    });
    performance.sort((a, b) => {
      return b.createdAt.getTime() - a.createdAt.getTime();
    });
    return performance;
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
