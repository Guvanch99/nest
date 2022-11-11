import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { IsEmail, Min, Max, IsString } from 'class-validator';
import { RolesModel } from './roles.model';

@Entity({ name: 'users' })
export class UsersModel {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', nullable: false })
  @Min(4, { message: 'Min value is 4' })
  @Max(25, { message: 'Max value is 25' })
  name: string;

  @Column({ type: 'varchar', nullable: false, unique: true })
  @IsEmail({}, { message: 'Please provide correct email' })
  email: string;

  @Column({ type: 'varchar', default: true, nullable: false })
  @IsString()
  password: string;

  @OneToMany(() => RolesModel, (role) => role.user)
  roles: RolesModel[];
}
