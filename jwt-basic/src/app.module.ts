import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModel } from './auth/models/users.model';
import { RolesModel } from './auth/models/roles.model';

@Module({
  controllers: [],
  providers: [],
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
    }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.PG_HOST,
      port: process.env.PG_PORT as unknown as number,
      username: process.env.PG_USER,
      password: process.env.PG_PASSWORD as unknown as string,
      database: process.env.PG_DATABASE,
      entities: [UsersModel, RolesModel],
      synchronize: true,
    }),
    AuthModule,
  ],
})
export class AppModule {}
