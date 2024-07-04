import {
  Module,
  MiddlewareConsumer,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import Joi from 'joi';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';
import { SnakeNamingStrategy } from 'typeorm-naming-strategies';

import { HealthModule } from './health/health.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PerformancesModule } from './performances/performances.module';
import { ReservationsModule } from './reservations/reservations.module';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { BookmarksModule } from './bookmarks/bookmarks.module';

import { User } from './users/entities/user.entity';
import { Reservation } from './reservations/entities/reservation.entity';
import { Performance } from './performances/entities/performance.entity';
import { Seat } from './performances/entities/seat.entity';
import { RefreshToken } from './auth/entities/refresh-token.entity';
import { Bookmark } from './bookmarks/entities/bookmark.entity';
import { PerformanceImage } from './performances/entities/perfomance-image.entity';
import { AuthMiddleware } from './auth/auth.middleware';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      validationSchema: Joi.object({
        JWT_SECRET_KEY: Joi.string().required(),
        DB_USERNAME: Joi.string().required(),
        DB_PASSWORD: Joi.string().required(),
        DB_HOST: Joi.string().required(),
        DB_PORT: Joi.number().required(),
        DB_NAME: Joi.string().required(),
        DB_SYNC: Joi.boolean().required(),
      }),
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (
        configService: ConfigService
      ): Promise<TypeOrmModuleOptions> => ({
        namingStrategy: new SnakeNamingStrategy(),
        type: 'mysql',
        username: configService.get<string>('DB_USERNAME'),
        password: configService.get<string>('DB_PASSWORD'),
        host: configService.get<string>('DB_HOST'),
        port: configService.get<number>('DB_PORT'),
        database: configService.get<string>('DB_NAME'),
        entities: [
          User,
          Reservation,
          Performance,
          Seat,
          RefreshToken,
          Bookmark,
          PerformanceImage,
        ],
        synchronize: configService.get<boolean>('DB_SYNC'),
        logging: true,
        connectTimeout: 30000, // 30초로 설정
        acquireTimeout: 30000, // 30초로 설정
      }),
      inject: [ConfigService],
    }),
    JwtModule.registerAsync({
      useFactory: (config: ConfigService) => ({
        secret: config.get<string>('JWT_SECRET_KEY'),
      }),
      inject: [ConfigService],
    }),
    PerformancesModule,
    ReservationsModule,
    UsersModule,
    AuthModule,
    HealthModule,
    BookmarksModule,
  ],
  controllers: [AppController],
  providers: [AppService, AuthMiddleware],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(AuthMiddleware) // 미들웨어 적용!
      .forRoutes(
        { path: 'users/me', method: RequestMethod.GET }
        // { path: '*', method: RequestMethod.ALL }
      ); // user/check 엔드포인트에만 적용
  }
}
