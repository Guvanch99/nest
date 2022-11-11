import { Module } from '@nestjs/common';
import { ProductsModule } from './products/products.module';
import { SequelizeModule } from '@nestjs/sequelize';
import { ConfigModule } from '@nestjs/config';
import { ProductsModel } from './products/products.model';
import { AuthModule } from './auth/auth.module';

@Module({
  controllers: [],
  providers: [],
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
      models: [ProductsModel],
      autoLoadModels: true,
    }),
    ProductsModule,
    AuthModule,
  ],
})
export class AppModule {}
