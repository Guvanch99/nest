import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { CreateUserDto } from './dtos/create-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { UsersModel } from './models/users.model';
import { Repository } from 'typeorm';
import { RolesModel, UserRole } from './models/roles.model';
import { JwtService } from '@nestjs/jwt';
import { LoginDto } from './dtos/login.dto';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(UsersModel)
    private usersRepository: Repository<UsersModel>,
    @InjectRepository(RolesModel)
    private rolesRepository: Repository<RolesModel>,
    private jwtService: JwtService,
  ) {}

  async registration(dto: CreateUserDto) {
    const candidate = await this.usersRepository.findOne({
      where: { email: dto.email },
    });
    if (candidate) {
      throw new HttpException(
        'with this email already exists user',
        HttpStatus.BAD_REQUEST,
      );
    }
    const hashPassword = await bcrypt.hash(dto.password, 5);
    const userRole = await this.rolesRepository.findOne({
      where: { role: UserRole.USER },
    });
    console.log('userRole', userRole);
    const user = await this.usersRepository.save({
      name: dto.name,
      email: dto.email,
      password: hashPassword,
      roles: [userRole],
    });
    console.log('user', user);
    const jwtPayload = {
      ...user,
    };
    const token = this.jwtService.sign(jwtPayload);

    return {
      user,
      token,
    };
  }

  async login(dto: LoginDto) {
    const user = await this.usersRepository.findOne({
      where: { email: dto.email },
    });
    if (!user) {
      throw new HttpException(
        'User with this email doesnt exist',
        HttpStatus.BAD_REQUEST,
      );
    }

    const validatePassword = await bcrypt.compare(dto.password, user.password);
    if (!validatePassword) {
      throw new HttpException('Password in correct', HttpStatus.BAD_REQUEST);
    }
    const token = this.jwtService.sign({ id: user.id, role: user.roles });

    return {
      user,
      token,
    };
  }

  async get() {
    await this.rolesRepository.save({
      role: UserRole.ADMIN,
    });
    await this.rolesRepository.save({
      role: UserRole.USER,
    });
  }
}
