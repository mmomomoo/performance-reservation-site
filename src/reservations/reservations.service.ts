import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateReservationDto } from './dto/create-reservation.dto';
// import { UpdateReservationDto } from './dto/update-reservation.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { FindOneOptions, FindOptionsWhere, Repository } from 'typeorm';
import { Seat } from 'src/performances/entities/seat.entity';
import { User } from 'src/users/entities/user.entity';
import { Reservation } from './entities/reservation.entity';
import { CreateReservationWithoutSeatDto } from './dto/create-reservation-without-seat.dto';
import { Status } from './entities/status.enum';
import { Performance } from 'src/performances/entities/performance.entity';

@Injectable()
export class ReservationsService {
  constructor(
    @InjectRepository(Performance)
    private readonly performanceRepository: Repository<Performance>,
    @InjectRepository(Seat)
    private readonly seatRepository: Repository<Seat>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    @InjectRepository(Reservation)
    private reservationRepository: Repository<Reservation>
  ) {}

  async createWithoutSeat(
    createReservationWithoutSeatDto: CreateReservationWithoutSeatDto
  ): Promise<Reservation> {
    const { userId, performanceId, ticketCount } =
      createReservationWithoutSeatDto;

    const user = await this.userRepository.findOne({ where: { id: userId } });
    if (!user) {
      throw new NotFoundException('유저를 찾을 수 없습니다.');
    }

    const performanceOptions: FindOneOptions<Performance> = {
      where: { id: performanceId },
      select: ['name', 'location'] as (keyof Performance)[],
    };
    const performance =
      await this.performanceRepository.findOne(performanceOptions);
    if (!performance) {
      throw new NotFoundException('공연을 찾을 수 없습니다.');
    }

    const seatOptions: FindOneOptions<Seat> = {
      where: { performance: { id: performanceId }, isReserved: false },
    };
    const seat = await this.seatRepository.findOne(seatOptions);
    if (!seat) {
      throw new BadRequestException('좌석을 찾을 수 없습니다.');
    }

    const totalCost = seat.price * ticketCount;
    if (totalCost > user.point) {
      throw new BadRequestException('포인트가 부족합니다.');
    }

    if (seat.seatCount < ticketCount) {
      throw new BadRequestException('현 좌석 수가 원하시는 좌석보다 적습니다.');
    }

    seat.seatCount -= ticketCount;
    user.point -= totalCost;

    return await this.seatRepository.manager.transaction(
      async (transactionalEntityManager) => {
        await transactionalEntityManager.save(user);
        await transactionalEntityManager.save(seat);

        const reservation = this.reservationRepository.create({
          user,
          performance,
          seat,
          name: performance.name,
          location: performance.location,
          status: Status.RESERVED,
          ticketCount, // 요청된 티켓 수량
        });
        await transactionalEntityManager.save(reservation);
        return reservation;
      }
    );
  }
  async findAll() {
    return await this.reservationRepository
      .createQueryBuilder('reservation')
      .leftJoinAndSelect('reservation.performance', 'performance')
      .select(['reservation.id', 'reservation.name', 'performance.dates'])
      .orderBy('performance.dates', 'DESC')
      .getMany();
  }
  // update(id: number, updateReservationDto: UpdateReservationDto) {
  //   return `This action updates a #${id} reservation`;
  // }

  remove(id: number) {
    return `This action removes a #${id} reservation`;
  }
}
