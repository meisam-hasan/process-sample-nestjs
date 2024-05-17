import { AutoMap } from '@automapper/classes';
import { ProcessEntity } from 'src/entities/process.entity';

export class ProcessList {
  @AutoMap(() => ProcessEntity)
  processList: ProcessEntity[];
}
