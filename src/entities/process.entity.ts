import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
  Index,
} from 'typeorm';
import { AutoMap } from '@automapper/classes';
import { ProcessLogEntity } from './process.log.entity';

@Entity()
export class ProcessEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @AutoMap()
  @Column()
  @Index({ unique: true })
  pid: number;

  @AutoMap()
  @Column()
  processID: number;

  @AutoMap(() => ProcessLogEntity)
  @OneToMany(() => ProcessLogEntity, (processLog) => processLog.process)
  logs: ProcessLogEntity[];

  @AutoMap()
  @CreateDateColumn({ type: 'timestamp' })
  createdDate: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  updatedDate: Date;
}
