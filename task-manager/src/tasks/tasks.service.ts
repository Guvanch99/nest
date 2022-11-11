import { Injectable } from '@nestjs/common';
import {InjectModel} from "@nestjs/sequelize";
import {TasksModel} from "./tasks.model";
import {TaskCreateDto} from "./dto/task-create.dto";

@Injectable()
export class TasksService {
  constructor(@InjectModel(TasksModel) private tasksRepository :typeof TasksModel) {
  }
  async getAllTasks(){
    return await this.tasksRepository.findAll()
  }
  async createTask(dto:TaskCreateDto){
    return await this.tasksRepository.create(dto)
  }
  async getTask(id:number){
    return await this.tasksRepository.findOne({where:{id}})
  }
  async updateTask(dto:TaskCreateDto, id:number){
    return await this.tasksRepository.update(dto,{where:{id},  returning:['name', 'id', 'completed']})
  }
  async deleteTask(id:number){
    return await this.tasksRepository.destroy({where:{id}})
  }
}
