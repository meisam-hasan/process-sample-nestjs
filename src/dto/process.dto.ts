import { AutoMap } from '@automapper/classes';
import { CreateProcessDto } from './create-process.dto';
import { ProcessLogDto } from './process.log.dto';

export class ProcessDto extends CreateProcessDto {
  @AutoMap(() => ProcessLogDto)
  logs: ProcessLogDto[];
}
