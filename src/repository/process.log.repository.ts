import { Injectable } from '@nestjs/common';
import { ProcessLogEntity } from 'src/entities/process.log.entity';
import { DataSource, Repository } from 'typeorm';

@Injectable()
export class ProcessLogRepository extends Repository<ProcessLogEntity> {
  constructor(private datasource: DataSource) {
    super(ProcessLogEntity, datasource.createEntityManager());
  }
}
