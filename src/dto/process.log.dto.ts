import { AutoMap } from '@automapper/classes';
export class ProcessLogDto {
  @AutoMap()
  processPid: number;

  @AutoMap()
  logTime: Date;
}
