import {
  HttpException,
  HttpStatus,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcryptjs from 'bcryptjs';
import { UsersService } from '../users/users.service';
import { CreateUserDto } from '../users/dto/create-user.dto';
import { UserModel } from '../users/model/user.model';
import { RedisService } from './redis.service';
import {
  jwtRefreshExpire,
  redisCacheTimeInSeconds,
} from '../consts/expriite.consts';

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    private userService: UsersService,
    private redisService: RedisService,
  ) {}

  async register(dto: CreateUserDto) {
    const isUserWithEmail = await this.userService.getUserByEmail(dto.email);

    if (isUserWithEmail) {
      throw new HttpException('User is exist', HttpStatus.BAD_REQUEST);
    }

    const salt = await bcryptjs.genSalt(10);
    const hashPassword = await bcryptjs.hash(dto.password, salt);
    const user = await this.userService.createUser({
      ...dto,
      password: hashPassword,
    });
    const { token } = await this.generateAccessToken(user);
    const { refreshToken } = await this.generateRefreshToken(user.id, token);
    await this.redisService.set({
      key: user.id,
      value: refreshToken,
      time: redisCacheTimeInSeconds,
    });
    return {
      token,
      refreshToken,
      user: {
        name: user.name,
        email: user.email,
        id: user.id,
      },
    };
  }

  async login(dto: CreateUserDto) {
    const user = await this.validateUser(dto);
    const { token } = await this.generateAccessToken(user);
    const { refreshToken } = await this.generateRefreshToken(user.id, token);
    await this.redisService.set({
      key: user.id,
      value: refreshToken,
      time: redisCacheTimeInSeconds,
    });
    return {
      token,
      refreshToken,
      user: {
        email: user.email,
        name: user.name,
        id: user.id,
      },
    };
  }

  private async generateAccessToken(user: UserModel) {
    const payload = {
      name: user.name,
      email: user.email,
      id: user.id,
    };
    return {
      token: this.jwtService.sign(payload),
    };
  }

  private async generateRefreshToken(id: string, token: string) {
    const payload = {
      id,
      token,
    };
    return {
      refreshToken: this.jwtService.sign(payload, {
        expiresIn: jwtRefreshExpire,
      }),
    };
  }

  private async validateUser(userDto: CreateUserDto) {
    const user = await this.userService.getUserByEmail(userDto.email);
    const passwordEquals = await bcryptjs.compare(
      userDto.password,
      String(user.password),
    );
    if (user && passwordEquals) {
      return user;
    }
    throw new UnauthorizedException({ message: 'Incorrect Email or Password' });
  }
}
