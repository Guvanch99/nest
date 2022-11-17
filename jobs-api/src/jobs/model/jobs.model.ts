import {
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  Model,
  Table,
} from 'sequelize-typescript';
import { IsString, Max } from 'class-validator';
import { UserModel } from '../../users/model/user.model';

export const Statuses = ['interview', 'declined', 'pending'];

@Table({ tableName: 'jobs' })
export class JobsModel extends Model {
  @Column({
    type: DataType.INTEGER,
    unique: true,
    autoIncrement: true,
    primaryKey: true,
  })
  id: string;

  @Column({ type: DataType.STRING, allowNull: false })
  @IsString({ message: 'company must be string' })
  @Max(50, { message: 'company must be 40' })
  company: string;

  @Column({ type: DataType.STRING, allowNull: false })
  @Max(200, { message: 'position must be not more than 200 characters' })
  position: string;

  @Column({
    type: DataType.ENUM({ values: Statuses }),
    defaultValue: 'pending',
    validate: {
      isIn: [Statuses],
    },
  })
  status: string;

  @ForeignKey(() => UserModel)
  @Column
  createdBy: number;

  @BelongsTo(() => UserModel)
  user: UserModel;
}
