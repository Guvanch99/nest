import { Module } from '@nestjs/common';
import { TasksController } from './tasks.controller';
import { TasksService } from './tasks.service';
import { SequelizeModule } from "@nestjs/sequelize";
import { TasksModel } from "./tasks.model";

@Module({
  controllers: [TasksController],
  providers: [TasksService],
  imports:[ SequelizeModule.forFeature([TasksModel]) ]
})
export class TasksModule {}
