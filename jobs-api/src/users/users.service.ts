import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { UserModel } from './model/user.model';
import { CreateUserDto } from './dto/create-user.dto';

@Injectable()
export class UsersService {
  constructor(@InjectModel(UserModel) private userRepo: typeof UserModel) {}

  async createUser(dto: CreateUserDto) {
    return await this.userRepo.create({ ...dto });
  }

  async getUserByEmail(email: string) {
    return await this.userRepo.findOne({
      where: { email },
    });
  }

  async getAllUsers() {
    return await this.userRepo.findAll({ include: { all: true } });
  }
}
