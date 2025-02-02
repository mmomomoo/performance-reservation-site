import { IsNotEmpty, IsNumber, IsString, IsEnum } from 'class-validator';
import { Status } from '../entities/status.enum';

export class CreateReservationDto {
  @IsNotEmpty()
  @IsNumber()
  userId: number;

  @IsNotEmpty()
  @IsNumber()
  seatId: number;

  @IsNotEmpty()
  @IsNumber()
  performanceId: number;

  @IsNotEmpty()
  @IsString()
  userName: string;

  // @IsNotEmpty()
  // @IsNumber()
  // point: number;

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
  @IsNumber()
  totalPrice: number;

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
  seatCount: number;
}
