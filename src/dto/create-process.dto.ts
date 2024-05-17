import { AutoMap } from '@automapper/classes';

export class CreateProcessDto {
  @AutoMap()
  pid: number;

  @AutoMap()
  createdDate: Date;
}
