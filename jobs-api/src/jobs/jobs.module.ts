import { Module } from '@nestjs/common';
import { JobsController } from './jobs.controller';
import { JobsService } from './jobs.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { AuthModule } from '../auth/auth.module';
import { JobsModel } from './model/jobs.model';

@Module({
  controllers: [JobsController],
  providers: [JobsService],
  imports: [SequelizeModule.forFeature([JobsModel]), AuthModule],
})
export class JobsModule {}
