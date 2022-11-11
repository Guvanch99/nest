import { Module } from '@nestjs/common';
import { TasksModule } from './tasks/tasks.module';
import {ConfigModule} from "@nestjs/config";
import {SequelizeModule} from "@nestjs/sequelize";
import {TasksModel} from "./tasks/tasks.model";

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
    }),
    SequelizeModule.forRoot({
      dialect: 'postgres',
      host: process.env.PG_HOST,
      port: process.env.PG_PORT as unknown as number,
      username: process.env.PG_USER,
      password: process.env.PG_PASSWORD as unknown as string,
      database: process.env.PG_DATABASE,
      models: [TasksModel],
      autoLoadModels: true,
    }),
    TasksModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule {
}
