import {Body, Controller, Delete, Get, Param, Patch, Post} from '@nestjs/common';
import {TasksService} from "./tasks.service";
import {TaskCreateDto} from "./dto/task-create.dto";

@Controller('tasks')
export class TasksController {
 constructor(private tasksService: TasksService) {}

  @Get()
  getAllTasks(){
   return this.tasksService.getAllTasks()
  }
  @Post()
  createTask(@Body()dto: TaskCreateDto){
    return this.tasksService.createTask(dto)
  }
  @Patch('/:id')
  updateTask(@Body()dto:TaskCreateDto, @Param('id') id: number ){
    return this.tasksService.updateTask(dto, id)
  }
  @Delete('/:id')
  deleteTask(@Param('id') id:number){
    return this.tasksService.deleteTask(id)
  }
  @Get('/:id')
  getTask(@Param('id') id:number){
    return this.tasksService.getTask(id)
  }
}
