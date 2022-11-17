import { forwardRef, Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { ConfigModule } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { UsersModule } from '../users/users.module';
import { RedisService } from './redis.service';
import { jwtAccessExpire } from '../consts/expriite.consts';

@Module({
  controllers: [AuthController],
  providers: [AuthService, RedisService],
  imports: [
    forwardRef(() => UsersModule),
    ConfigModule.forRoot({
      envFilePath: '.env',
    }),
    JwtModule.register({
      secret: process.env.PRIVATE_KEY,
      signOptions: { expiresIn: jwtAccessExpire },
    }),
  ],
  exports: [JwtModule, AuthService],
})
export class AuthModule {}
