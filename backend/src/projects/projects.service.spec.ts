import { describe, expect, it, beforeEach, jest } from '@jest/globals';
import { NotFoundException } from '@nestjs/common';
import { EvMService } from '../evm/evm.service.js';
import { PrismaService } from '../prisma/prisma.service.js';
import { ProjectsService } from './projects.service.js';

interface ProjectRecord {
  id: number;
  name: string;
  description: string | null;
}

interface ActivityRecord {
  id: number;
  name: string;
  bac: number;
  plannedProgress: number;
  actualProgress: number;
  actualCost: number;
  projectId: number;
}

describe('ProjectsService', () => {
  let service: ProjectsService;

  const projectFirst =
    jest.fn<() => Promise<ProjectRecord | null>>();

  const projectUpdate =
    jest.fn<
      (data: Partial<ProjectRecord>) => Promise<ProjectRecord | null>
    >();

  const projectDelete =
    jest.fn<() => Promise<ProjectRecord | null>>();

  const projectCreate =
    jest.fn<
      (data: {
        name: string;
        description: string | null;
      }) => Promise<ProjectRecord>
    >();

  const projectAll =
    jest.fn<() => Promise<ProjectRecord[]>>();

  const activityAll =
    jest.fn<() => Promise<ActivityRecord[]>>();

  const projectWhere = {
    first: projectFirst,
    update: projectUpdate,
    delete: projectDelete,
  };

  const activityWhere = {
    all: activityAll,
  };

  const prismaMock = {
    db: {
      orm: {
        public: {
          Project: {
            create: projectCreate,
            all: projectAll,
            where: jest.fn(() => projectWhere),
          },
          Activity: {
            where: jest.fn(() => activityWhere),
          },
        },
      },
    },
  };

  beforeEach(() => {
    jest.clearAllMocks();

    service = new ProjectsService(
      prismaMock as unknown as PrismaService,
      new EvMService(),
    );
  });

  it('should create a project', async () => {
    const project: ProjectRecord = {
      id: 1,
      name: 'Proyecto EVM',
      description: null,
    };

    projectCreate.mockResolvedValue(project);

    const result = await service.create({
      name: 'Proyecto EVM',
    });

    expect(projectCreate).toHaveBeenCalledWith({
      name: 'Proyecto EVM',
      description: null,
    });

    expect(result).toEqual(project);
  });

  it('should return all projects', async () => {
    const projects: ProjectRecord[] = [
      {
        id: 1,
        name: 'Proyecto 1',
        description: null,
      },
      {
        id: 2,
        name: 'Proyecto 2',
        description: 'Proyecto de prueba',
      },
    ];

    projectAll.mockResolvedValue(projects);

    const result = await service.findAll();

    expect(result).toEqual(projects);
    expect(projectAll).toHaveBeenCalledTimes(1);
  });

  it('should return a project with activities and consolidated EVM', async () => {
    const project: ProjectRecord = {
      id: 1,
      name: 'Proyecto EVM',
      description: null,
    };

    const activities: ActivityRecord[] = [
      {
        id: 1,
        name: 'Backend',
        bac: 10000,
        plannedProgress: 50,
        actualProgress: 40,
        actualCost: 4500,
        projectId: 1,
      },
      {
        id: 2,
        name: 'Frontend',
        bac: 20000,
        plannedProgress: 60,
        actualProgress: 50,
        actualCost: 11000,
        projectId: 1,
      },
    ];

    projectFirst.mockResolvedValue(project);
    activityAll.mockResolvedValue(activities);

    const result = await service.findOne(1);

    expect(result.id).toBe(1);
    expect(result.activities).toHaveLength(2);

    expect(result.activities[0].evm.pv).toBe(5000);
    expect(result.activities[0].evm.ev).toBe(4000);

    expect(result.evm.bac).toBe(30000);
    expect(result.evm.pv).toBe(17000);
    expect(result.evm.ev).toBe(14000);
    expect(result.evm.cv).toBe(-1500);
    expect(result.evm.sv).toBe(-3000);
    expect(result.evm.cpi).toBeCloseTo(14000 / 15500);
    expect(result.evm.spi).toBeCloseTo(14000 / 17000);
  });

  it('should return an empty EVM consolidation when project has no activities', async () => {
    const project: ProjectRecord = {
      id: 1,
      name: 'Proyecto vacío',
      description: null,
    };

    projectFirst.mockResolvedValue(project);
    activityAll.mockResolvedValue([]);

    const result = await service.findOne(1);

    expect(result.activities).toEqual([]);
    expect(result.evm).toEqual({
      bac: 0,
      pv: 0,
      ev: 0,
      cv: 0,
      sv: 0,
      cpi: null,
      spi: null,
      eac: null,
      vac: null,
    });
  });

  it('should throw when project is not found', async () => {
    projectFirst.mockResolvedValue(null);

    await expect(service.findOne(999)).rejects.toBeInstanceOf(
      NotFoundException,
    );
  });

  it('should update a project', async () => {
    const existingProject: ProjectRecord = {
      id: 1,
      name: 'Proyecto anterior',
      description: null,
    };

    const updatedProject: ProjectRecord = {
      id: 1,
      name: 'Proyecto actualizado',
      description: 'Descripción actualizada',
    };

    projectFirst.mockResolvedValue(existingProject);
    projectUpdate.mockResolvedValue(updatedProject);

    const result = await service.update(1, {
      name: 'Proyecto actualizado',
      description: 'Descripción actualizada',
    });

    expect(projectUpdate).toHaveBeenCalledWith({
      name: 'Proyecto actualizado',
      description: 'Descripción actualizada',
    });

    expect(result).toEqual(updatedProject);
  });

  it('should allow an update with no fields', async () => {
    const existingProject: ProjectRecord = {
      id: 1,
      name: 'Proyecto',
      description: null,
    };

    projectFirst.mockResolvedValue(existingProject);
    projectUpdate.mockResolvedValue(existingProject);

    const result = await service.update(1, {});

    expect(projectUpdate).toHaveBeenCalledWith({});
    expect(result).toEqual(existingProject);
  });

  it('should throw when updating a project that does not exist', async () => {
    projectFirst.mockResolvedValue(null);

    await expect(
      service.update(999, {
        name: 'Proyecto',
      }),
    ).rejects.toBeInstanceOf(NotFoundException);

    expect(projectUpdate).not.toHaveBeenCalled();
  });

  it('should throw when project disappears during update', async () => {
    const existingProject: ProjectRecord = {
      id: 1,
      name: 'Proyecto',
      description: null,
    };

    projectFirst.mockResolvedValue(existingProject);
    projectUpdate.mockResolvedValue(null);

    await expect(
      service.update(1, {
        name: 'Proyecto actualizado',
      }),
    ).rejects.toBeInstanceOf(NotFoundException);
  });

  it('should delete a project', async () => {
    const project: ProjectRecord = {
      id: 1,
      name: 'Proyecto',
      description: null,
    };

    projectFirst.mockResolvedValue(project);
    projectDelete.mockResolvedValue(project);

    const result = await service.remove(1);

    expect(projectDelete).toHaveBeenCalledTimes(1);
    expect(result).toEqual(project);
  });

  it('should throw when deleting a project that does not exist', async () => {
    projectFirst.mockResolvedValue(null);

    await expect(service.remove(999)).rejects.toBeInstanceOf(
      NotFoundException,
    );

    expect(projectDelete).not.toHaveBeenCalled();
  });
});