import { Module } from '@nestjs/common';
import { ProcessesService } from './processes.service';
import { ProcessesController } from './processes.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProcessEntity } from 'src/entities/process.entity';
import { ProcessLogEntity } from 'src/entities/process.log.entity';
import { ProcessMapper } from 'src/mapper/process.mapper';
import { ProcessRepository } from 'src/repository/process.repository';

@Module({
  imports: [TypeOrmModule.forFeature([ProcessEntity, ProcessLogEntity])],
  controllers: [ProcessesController],
  providers: [ProcessesService, ProcessMapper, ProcessRepository],
})
export class ProcessesModule {}
