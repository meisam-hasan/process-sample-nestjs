import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  UseInterceptors,
} from '@nestjs/common';
import { ProcessesService } from './processes.service';
import { CreateProcessDto } from '../dto/create-process.dto';
import { MapInterceptor } from '@automapper/nestjs';
import { ProcessEntity } from 'src/entities/process.entity';
import { ProcessDto } from 'src/dto/process.dto';

@Controller()
export class ProcessesController {
  constructor(private readonly processesService: ProcessesService) {}

  @Post('create')
  @UseInterceptors(MapInterceptor(ProcessEntity, CreateProcessDto))
  async create(@Body() minute: number) {
    return await this.processesService.create(minute);
  }

  @Get('findAll')
  @UseInterceptors(MapInterceptor(ProcessEntity, ProcessDto))
  findAll() {
    return this.processesService.findAll();
  }

  @Get('process/:pid')
  @UseInterceptors(MapInterceptor(ProcessEntity, ProcessDto))
  findOne(@Param('pid') pid: number) {
    return this.processesService.findOne(pid);
  }

  @Delete('remove/:pid')
  async remove(@Param('pid') pid: number) {
    return await this.processesService.remove(pid);
  }
}
