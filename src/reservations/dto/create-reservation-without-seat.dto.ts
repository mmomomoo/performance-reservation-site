import { IsNotEmpty, IsNumber } from 'class-validator';

export class CreateReservationWithoutSeatDto {
  @IsNotEmpty()
  @IsNumber()
  userId: number;

  @IsNotEmpty()
  @IsNumber()
  performanceId: number;

  @IsNotEmpty()
  @IsNumber()
  ticketCount: number;
}
