import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { JobsService } from './jobs.service';
import { CreateJobDto } from './dto/create-job.dto';
import { UpdateJobDto } from './dto/update-job.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('jobs')
@UseGuards(JwtAuthGuard)
export class JobsController {
  constructor(private jobsService: JobsService) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  createJob(@Body() dto: CreateJobDto) {
    return this.jobsService.createJob(dto);
  }

  @Get()
  getAllJobs() {
    return this.jobsService.getAllJobs(1);
  }

  @Get('/:id')
  // @UseGuards(JwtAuthGuard)
  getSingleJob(@Param('id') id: number) {
    return this.jobsService.getJob(id);
  }

  @Delete('/:id')
  // @UseGuards(JwtAuthGuard)
  deleteJob(@Param('id') id: number) {
    return this.jobsService.deleteJob(id);
  }

  @Patch('/:id')
  // @UseGuards(JwtAuthGuard)
  updateJob(@Param('id') jobId: number, @Body() dto: UpdateJobDto) {
    return this.jobsService.updateJob(dto);
  }
}
