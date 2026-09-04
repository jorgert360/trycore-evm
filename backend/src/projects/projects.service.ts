import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service.js';
import { CreateProjectDto } from './dto/create-project.dto.js';
import { UpdateProjectDto } from './dto/update-project.dto.js';

@Injectable()
export class ProjectsService {
  constructor(private readonly prisma: PrismaService) {}

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
      throw new NotFoundException(`Project with id ${id} was not found`);
    }

    return project;
  }

  async update(id: number, updateProjectDto: UpdateProjectDto) {
    await this.findOne(id);

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

    return project;
  }

  async remove(id: number) {
    await this.findOne(id);

    return this.prisma.db.orm.public.Project
      .where({ id })
      .delete();
  }
}