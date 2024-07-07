import {
  Controller,
  Get,
  Post,
  Body,
  // Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { ReservationsService } from './reservations.service';
// import { CreateReservationDto } from './dto/create-reservation.dto';
import { CreateReservationWithoutSeatDto } from './dto/create-reservation-without-seat.dto';
// import { UpdateReservationDto } from './dto/update-reservation.dto';

@Controller('reservations')
export class ReservationsController {
  constructor(private readonly reservationsService: ReservationsService) {}

  // 공연 예약 생성
  @Post('/without-seat')
  createWithoutSeate(
    @Body() createReservationWithoutSeatDto: CreateReservationWithoutSeatDto
  ) {
    return this.reservationsService.createWithoutSeat(
      createReservationWithoutSeatDto
    );
  }
  // 좌석 지정 공연 예약
  // @Post()
  // create1(@Body() createReservationDto: CreateReservationDto) {
  //   return this.reservationsService.create1(createReservationDto);
  // }

  // 예약 확인하기
  @Get('/me')
  findAll() {
    return this.reservationsService.findAll();
  }

  // @Get(':id')
  // findOne(@Param('id') id: string) {
  //   return this.reservationsService.findOne(+id);
  // }

  // @Patch(':id')
  // update(
  //   @Param('id') id: string,
  //   @Body() updateReservationDto: UpdateReservationDto
  // ) {
  //   return this.reservationsService.update(+id, updateReservationDto);
  // }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.reservationsService.remove(+id);
  // }
}
