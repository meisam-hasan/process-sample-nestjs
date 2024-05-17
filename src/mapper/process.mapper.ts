import { createMap, extend, Mapper, MappingProfile } from '@automapper/core';
import { AutomapperProfile, InjectMapper } from '@automapper/nestjs';
import { Injectable } from '@nestjs/common';
import { CreateProcessDto } from 'src/dto/create-process.dto';
import { ProcessDto } from 'src/dto/process.dto';
import { ProcessDtoList } from 'src/dto/process.dto.list';
import { ProcessList } from 'src/dto/process.list';
import { ProcessLogDto } from 'src/dto/process.log.dto';
import { ProcessEntity } from 'src/entities/process.entity';
import { ProcessLogEntity } from 'src/entities/process.log.entity';

@Injectable()
export class ProcessMapper extends AutomapperProfile {
  constructor(@InjectMapper() mapper: Mapper) {
    super(mapper);
  }
  get profile(): MappingProfile {
    return (mapper) => {
      const createProcessDtoMapper = createMap(
        mapper,
        ProcessEntity,
        CreateProcessDto,
      );
      createMap(mapper, CreateProcessDto, ProcessEntity);
      createMap(mapper, ProcessLogEntity, ProcessLogDto);
      createMap(
        mapper,
        ProcessEntity,
        ProcessDto,
        extend(createProcessDtoMapper),
      );
      createMap(mapper, ProcessList, ProcessDtoList);
    };
  }
}
