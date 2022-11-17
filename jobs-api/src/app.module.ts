import { Module, CacheModule } from '@nestjs/common';
import type { ClientOpts } from 'redis';
import { AuthModule } from './auth/auth.module';
import { JobsModule } from './jobs/jobs.module';
import { SequelizeModule } from '@nestjs/sequelize';
import { ConfigModule } from '@nestjs/config';
import { UsersModule } from './users/users.module';
import { UserModel } from './users/model/user.model';
import { JobsModel } from './jobs/model/jobs.model';
import * as redisStore from 'cache-manager-redis-store';

@Module({
  imports: [
    CacheModule.register<ClientOpts>({
      isGlobal: true,
      store: redisStore,
      host: 'localhost',
      port: 6379,
    }),
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
      models: [JobsModel, UserModel],
      autoLoadModels: true,
    }),
    AuthModule,
    JobsModule,
    UsersModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
