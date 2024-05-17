import { AutoMap } from '@automapper/classes';
import { ProcessDto } from './process.dto';

export class ProcessDtoList {
  @AutoMap(() => ProcessDto)
  processList: ProcessDto[];
}
