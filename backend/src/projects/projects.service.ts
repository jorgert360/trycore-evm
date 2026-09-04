import { Injectable, NotFoundException } from '@nestjs/common';
import { EvMService } from '../evm/evm.service.js';
import { PrismaService } from '../prisma/prisma.service.js';
import { CreateProjectDto } from './dto/create-project.dto.js';
import { UpdateProjectDto } from './dto/update-project.dto.js';

@Injectable()
export class ProjectsService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly evmService: EvMService,
  ) {}

  async create(createProjectDto: CreateProjectDto) {
    return this.prisma.db.orm.public.Project.create({
      name: createProjectDto.name,
      description: createProjectDto.description ?? null,
    });
  }

  async findAll() {
    return this.prisma.db.orm.public.Project.all();
  }

  async findOne(id: number) {
    const project = await this.prisma.db.orm.public.Project
      .where({ id })
      .first();

    if (!project) {
      throw new NotFoundException(
        `Project with id ${id} was not found`,
      );
    }

    const activities = await this.prisma.db.orm.public.Activity
      .where({ projectId: id })
      .all();

    const activitiesWithEvm = activities.map((activity) => ({
      ...activity,
      evm: this.evmService.calculate({
        bac: activity.bac,
        plannedProgress: activity.plannedProgress,
        actualProgress: activity.actualProgress,
        actualCost: activity.actualCost,
      }),
    }));

    const totals = activitiesWithEvm.reduce(
      (accumulator, activity) => {
        accumulator.bac += activity.bac;
        accumulator.pv += activity.evm.pv;
        accumulator.ev += activity.evm.ev;
        accumulator.actualCost += activity.actualCost;

        return accumulator;
      },
      {
        bac: 0,
        pv: 0,
        ev: 0,
        actualCost: 0,
      },
    );

    const evm = this.evmService.calculateFromValues(totals);

    return {
      ...project,
      activities: activitiesWithEvm,
      evm,
    };
  }

  async update(id: number, updateProjectDto: UpdateProjectDto) {
    const existingProject = await this.prisma.db.orm.public.Project
      .where({ id })
      .first();

    if (!existingProject) {
      throw new NotFoundException(
        `Project with id ${id} was not found`,
      );
    }

    const project = await this.prisma.db.orm.public.Project
      .where({ id })
      .update({
        ...(updateProjectDto.name !== undefined && {
          name: updateProjectDto.name,
        }),
        ...(updateProjectDto.description !== undefined && {
          description: updateProjectDto.description,
        }),
      });

    if (!project) {
      throw new NotFoundException(
        `Project with id ${id} was not found`,
      );
    }

    return project;
  }

  async remove(id: number) {
    const project = await this.prisma.db.orm.public.Project
      .where({ id })
      .first();

    if (!project) {
      throw new NotFoundException(
        `Project with id ${id} was not found`,
      );
    }

    return this.prisma.db.orm.public.Project
      .where({ id })
      .delete();
  }
}