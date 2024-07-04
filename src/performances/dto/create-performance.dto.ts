import { IsEnum, IsIn, IsNotEmpty, IsString } from 'class-validator';
import { PerformanceCategory } from '../entities/category.enum';

export class CreatePerformanceDto {
  @IsString()
  @IsNotEmpty({ message: '공연 이름을 입력해주세요.' })
  name: string;

  @IsString()
  @IsNotEmpty({ message: '공연 설명을 입력해주세요.' })
  description: string;

  @IsString()
  @IsIn(Object.values(PerformanceCategory))
  @IsEnum(PerformanceCategory)
  @IsNotEmpty({ message: '카테고리를 입력해주세요.' })
  category: PerformanceCategory;

  @IsString()
  @IsNotEmpty({ message: '공연 지역을 입력해주세요.' })
  location: string;

  @IsNotEmpty({ message: '가격을 입력해주세요.' })
  price: number;

  @IsString()
  @IsNotEmpty({ message: '공연 날짜을 입력해주세요.' })
  dates: string[];

  @IsString()
  @IsNotEmpty({ message: '공연 시간을 입력해주세요.' })
  times: string[];
}
