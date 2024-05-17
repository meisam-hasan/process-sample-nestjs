import { Injectable } from '@nestjs/common';
import { ProcessEntity } from 'src/entities/process.entity';
import { DataSource, Repository } from 'typeorm';

@Injectable()
export class ProcessRepository extends Repository<ProcessEntity> {
  constructor(private datasource: DataSource) {
    super(ProcessEntity, datasource.createEntityManager());
  }

  async findProcessWithLogs(pid: number): Promise<ProcessEntity> {
    return await this.findOne({
      where: { pid: pid },
      relations: ['logs'],
    });
  }

  async findAllProcess(): Promise<ProcessEntity[]> {
    return await this.find({ relations: ['logs'] });
  }
}
