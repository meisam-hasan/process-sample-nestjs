import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { ProcessEntity } from './process.entity';
import { AutoMap } from '@automapper/classes';

@Entity()
export class ProcessLogEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @AutoMap()
  @Column()
  processPid: number;

  @AutoMap()
  @Column({ type: 'timestamp' })
  logTime: Date;

  @ManyToOne(() => ProcessEntity, (process) => process.logs, {
    cascade: true,
    onDelete: 'CASCADE',
  })
  @JoinColumn({ referencedColumnName: 'pid' })
  process: ProcessEntity;

  @CreateDateColumn({ type: 'timestamp' })
  createdDate: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  updatedDate: Date;
}
