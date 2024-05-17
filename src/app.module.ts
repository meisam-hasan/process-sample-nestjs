import { classes } from '@automapper/classes';
import { AutomapperModule } from '@automapper/nestjs';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { getEnvPath } from './config/utils.config';
import { TypeOrmConfigService } from './config/typeorm.config';
import { ProcessesModule } from './processes/processes.module';

const envFilePath: string = getEnvPath(`${__dirname}`);
console.log('envfilepath: ' + envFilePath);

@Module({
  imports: [
    ConfigModule.forRoot({ envFilePath: ['.env'], isGlobal: true }),
    TypeOrmModule.forRootAsync({
      useClass: TypeOrmConfigService,
    }),
    AutomapperModule.forRoot({
      strategyInitializer: classes(),
    }),
    ProcessesModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
