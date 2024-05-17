import { Injectable } from '@nestjs/common';
import { InjectMapper } from '@automapper/nestjs';
import { Mapper } from '@automapper/core';
import { InjectRepository } from '@nestjs/typeorm';
import { ProcessEntity } from 'src/entities/process.entity';
import { ProcessRepository } from 'src/repository/process.repository';
import { ProcessLogEntity } from 'src/entities/process.log.entity';
import { ProcessLogRepository } from 'src/repository/process.log.repository';
import { startProcess, stopProcess } from './process.handle';

@Injectable()
export class ProcessesService {
  constructor(
    @InjectMapper() private mapper: Mapper,
    private readonly processRepository: ProcessRepository,
    @InjectRepository(ProcessLogEntity)
    private processLogRepository: ProcessLogRepository,
  ) {}

  async create(minute: number): Promise<ProcessEntity> {
    return await startProcess(
      this.processRepository,
      this.processLogRepository,
      minute,
    );
  }

  async findAll() {
    return this.processRepository.findAllProcess();
  }

  async findOne(pid: number) {
    return await this.processRepository.findProcessWithLogs(pid);
  }

  // update(id: number, updateProcessDto: UpdateProcessDto) {
  //   return `This action updates a #${id} process`;
  // }

  async remove(id: number) {
    return await stopProcess(id, this.processRepository);
  }
}
