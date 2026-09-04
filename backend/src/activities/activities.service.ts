import { Injectable, NotFoundException } from '@nestjs/common';
import { EvMService } from '../evm/evm.service.js';
import { PrismaService } from '../prisma/prisma.service.js';
import { CreateActivityDto } from './dto/create-activity.dto.js';
import { UpdateActivityDto } from './dto/update-activity.dto.js';

@Injectable()
export class ActivitiesService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly evmService: EvMService,
  ) {}

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

  private withEvm(activity: {
    id: number;
    name: string;
    bac: number;
    plannedProgress: number;
    actualProgress: number;
    actualCost: number;
    projectId: number;
  }) {
    return {
      ...activity,
      evm: this.evmService.calculate({
        bac: activity.bac,
        plannedProgress: activity.plannedProgress,
        actualProgress: activity.actualProgress,
        actualCost: activity.actualCost,
      }),
    };
  }

  async create(createActivityDto: CreateActivityDto) {
    await this.ensureProjectExists(createActivityDto.projectId);

    const activity = await this.prisma.db.orm.public.Activity.create({
      name: createActivityDto.name,
      bac: createActivityDto.bac,
      plannedProgress: createActivityDto.plannedProgress,
      actualProgress: createActivityDto.actualProgress,
      actualCost: createActivityDto.actualCost,
      projectId: createActivityDto.projectId,
    });

    return this.withEvm(activity);
  }

  async findAll() {
    const activities = await this.prisma.db.orm.public.Activity.all();

    return activities.map((activity) => this.withEvm(activity));
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

    return this.withEvm(activity);
  }

  async update(id: number, updateActivityDto: UpdateActivityDto) {
    const existingActivity =
      await this.prisma.db.orm.public.Activity
        .where({ id })
        .first();

    if (!existingActivity) {
      throw new NotFoundException(
        `Activity with id ${id} was not found`,
      );
    }

    if (updateActivityDto.projectId !== undefined) {
      await this.ensureProjectExists(updateActivityDto.projectId);
    }

    const activity = await this.prisma.db.orm.public.Activity
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

    if (!activity) {
      throw new NotFoundException(
        `Activity with id ${id} was not found`,
      );
    }

    return this.withEvm(activity);
  }

  async remove(id: number) {
    const existingActivity =
      await this.prisma.db.orm.public.Activity
        .where({ id })
        .first();

    if (!existingActivity) {
      throw new NotFoundException(
        `Activity with id ${id} was not found`,
      );
    }

    return this.prisma.db.orm.public.Activity
      .where({ id })
      .delete();
  }
}