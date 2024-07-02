// ValidationPipe를 NestJS의 전역 파이프라인에 추가하여 들어오는 요청 데이터를 검증하고 변환합니다.
// 이 파이프는 DTO(Data Transfer Object를 사용하여 유효성 검사
import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core'; //Nest 애플리케이션의 인스턴스를 생성하는 데 사용
import { AppModule } from './app.module'; //Nest 애플리케이션의 모든 모듈, 컨트롤러, 서비스가 여기서 연결
import 'reflect-metadata'; // TypeScript의 데코레이터 기능을 지원하기 위해 사용
import { PORT } from './constants/env.constant';
//bootstrap 함수는 애플리케이션을 초기화하고 시작
async function bootstrap() {
  //NestFactory.create 메서드를 사용하여 AppModule을 기반으로 새로운 Nest 애플리케이션 인스턴스를 생성
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(
    //ValidationPipe를 전역 파이프로 설정하여 모든 들어오는 요청에 대해 데이터 검증 및 변환을 수행
    new ValidationPipe({
      transform: true, //true 옵션은 요청 객체를 DTO 클래스의 인스턴스로 자동 변환
    })
  );

  await app.listen(PORT);
}
bootstrap();
