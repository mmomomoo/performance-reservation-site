import { Injectable } from '@nestjs/common';
import { CreatePerformanceDto } from './dto/create-performance.dto';
import { UpdatePerformanceDto } from './dto/update-performance.dto';
import { Performance } from './entities/performance.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Like, Repository } from 'typeorm';
import { PerformanceCategory } from './entities/category.enum';
import { Seat } from './entities/seat.entity';

@Injectable()
export class PerformancesService {
  constructor(
    @InjectRepository(Performance)
    private readonly performanceRepository: Repository<Performance>,
    @InjectRepository(Seat)
    private readonly seatRepository: Repository<Seat>
  ) {}
  //공연 등록
  async create(createPerformanceDto: CreatePerformanceDto): Promise<void> {
    // const { name, description, category, location, price, dates, times } =
    const { seatCount, ...performanceInfo } = createPerformanceDto;

    const performance = this.performanceRepository.create(performanceInfo);
    const savedPerformance = await this.performanceRepository.save(performance);

    const seat = this.seatRepository.create({
      seatCount,
      performance: savedPerformance, // 연관 관계 설정
    });
    await this.seatRepository.save(seat);
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
  async searchCategory(name: string, category: PerformanceCategory) {
    let performance;
    if (name) {
      performance = await this.performanceRepository.find({
        where: { category, name: Like(`%${name}%`) }, //SQL의 LIKE 연산자를 사용해서 일부 검색도 가능해게 구현
      });
    } else {
      performance = await this.performanceRepository.find({
        where: { category }, //SQL의 LIKE 연산자를 사용해서 일부 검색도 가능해게 구현
      });
    }
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

  //좌석 지정 자리 만들기
  registerSeats(id: number) {
    return `This action removes a #${id} performance`;
  }

  // 공연 좌석 파악
  async findOneSeat(performanceId: number): Promise<Seat[]> {
    const performance = await this.performanceRepository.findOne({
      where: { id: performanceId },
      relations: ['seats'],
    });
    if (!performance) {
      throw new Error('좌석을 찾을 수 없습니다.');
    }
    return performance.seats;
  }
}
