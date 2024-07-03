import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PerformancesService } from './performances.service';
import { PerformancesController } from './performances.controller';
import { Performance } from './entities/performance.entity';
@Module({
  imports: [TypeOrmModule.forFeature([Performance])],
  controllers: [PerformancesController],
  providers: [PerformancesService],
})
export class PerformancesModule {}
