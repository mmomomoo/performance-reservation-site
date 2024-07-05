import { IsNotEmpty, IsString, IsNumber, IsEnum } from 'class-validator';
import { Status } from '../entities/status.enum';

export class CreateReservationWithoutSeatDto {
  @IsNotEmpty()
  @IsString()
  userName: string;

  @IsNotEmpty()
  @IsNumber()
  userId: number;

  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsString()
  location: string;

  @IsNotEmpty()
  @IsNumber()
  price: number;

  @IsNotEmpty()
  @IsString()
  dates: string;

  @IsNotEmpty()
  @IsString()
  times: string;

  @IsNotEmpty()
  @IsEnum(Status)
  status: Status;

  @IsNotEmpty()
  @IsNumber()
  performanceId: number;

  @IsNotEmpty()
  @IsNumber()
  ticketCount: number;
}
