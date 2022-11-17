import { Inject, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { CreateJobDto } from './dto/create-job.dto';
import { UpdateJobDto } from './dto/update-job.dto';
import { REQUEST } from '@nestjs/core';
import { Request } from 'express';
import { JobsModel } from './model/jobs.model';

@Injectable()
export class JobsService {
  constructor(
    @InjectModel(JobsModel) private jobsRepo: typeof JobsModel,
    @Inject(REQUEST) private request: Request,
  ) {}

  async createJob(dto: CreateJobDto) {
    const userId = (this.request as any).user.id;
    console.log('userId', userId);
    return await this.jobsRepo.create({ ...dto, createdBy: userId });
  }

  async updateJob(dto: UpdateJobDto) {
    return dto;
  }

  async deleteJob(jobId: number) {
    return jobId;
  }

  async getAllJobs(userId: number) {
    return userId;
  }

  async getJob(jobId: number) {
    return jobId;
  }
}
