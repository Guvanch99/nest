import {Column, DataType, Model, Table} from 'sequelize-typescript';

interface ITasksModel{
  name: string
}

@Table({ tableName: 'tasks' })
export class TasksModel extends Model<TasksModel, ITasksModel> {
  @Column({
    type:DataType.INTEGER,
    unique:true,
    autoIncrement:true,
    primaryKey:true
  })
  id:number;

  @Column({type:DataType.STRING, allowNull:false})
  name: string;

  @Column({type:DataType.BOOLEAN, defaultValue:false})
  completed: boolean;
}
