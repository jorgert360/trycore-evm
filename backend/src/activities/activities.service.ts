import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service.js';
import { CreateActivityDto } from './dto/create-activity.dto.js';
import { UpdateActivityDto } from './dto/update-activity.dto.js';

@Injectable()
export class ActivitiesService {
  constructor(private readonly prisma: PrismaService) {}

  private async ensureProjectExists(projectId: number) {
    const project = await this.prisma.db.orm.public.Project
      .where({ id: projectId })
      .first();

    if (!project) {
      throw new NotFoundException(
        `Project with id ${projectId} was not found`,
      );
    }
  }

  async create(createActivityDto: CreateActivityDto) {
    await this.ensureProjectExists(createActivityDto.projectId);

    return this.prisma.db.orm.public.Activity.create({
      name: createActivityDto.name,
      bac: createActivityDto.bac,
      plannedProgress: createActivityDto.plannedProgress,
      actualProgress: createActivityDto.actualProgress,
      actualCost: createActivityDto.actualCost,
      projectId: createActivityDto.projectId,
    });
  }

  async findAll() {
    return this.prisma.db.orm.public.Activity.all();
  }

  async findOne(id: number) {
    const activity = await this.prisma.db.orm.public.Activity
      .where({ id })
      .first();

    if (!activity) {
      throw new NotFoundException(
        `Activity with id ${id} was not found`,
      );
    }

    return activity;
  }

  async update(id: number, updateActivityDto: UpdateActivityDto) {
    await this.findOne(id);

    if (updateActivityDto.projectId !== undefined) {
      await this.ensureProjectExists(updateActivityDto.projectId);
    }

    return this.prisma.db.orm.public.Activity
      .where({ id })
      .update({
        ...(updateActivityDto.name !== undefined && {
          name: updateActivityDto.name,
        }),
        ...(updateActivityDto.bac !== undefined && {
          bac: updateActivityDto.bac,
        }),
        ...(updateActivityDto.plannedProgress !== undefined && {
          plannedProgress: updateActivityDto.plannedProgress,
        }),
        ...(updateActivityDto.actualProgress !== undefined && {
          actualProgress: updateActivityDto.actualProgress,
        }),
        ...(updateActivityDto.actualCost !== undefined && {
          actualCost: updateActivityDto.actualCost,
        }),
        ...(updateActivityDto.projectId !== undefined && {
          projectId: updateActivityDto.projectId,
        }),
      });
  }

  async remove(id: number) {
    await this.findOne(id);

    return this.prisma.db.orm.public.Activity
      .where({ id })
      .delete();
  }
}