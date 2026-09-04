import { describe, expect, it, beforeEach, jest } from '@jest/globals';
import { NotFoundException } from '@nestjs/common';
import { EvMService } from '../evm/evm.service.js';
import { PrismaService } from '../prisma/prisma.service.js';
import { ActivitiesService } from './activities.service.js';

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

describe('ActivitiesService', () => {
  let service: ActivitiesService;

  const projectFirst =
    jest.fn<() => Promise<ProjectRecord | null>>();

  const activityFirst =
    jest.fn<() => Promise<ActivityRecord | null>>();

  const activityCreate =
    jest.fn<
      (data: Omit<ActivityRecord, 'id'>) => Promise<ActivityRecord>
    >();

  const activityAll =
    jest.fn<() => Promise<ActivityRecord[]>>();

  const activityUpdate =
    jest.fn<
      (data: Partial<ActivityRecord>) => Promise<ActivityRecord | null>
    >();

  const activityDelete =
    jest.fn<() => Promise<ActivityRecord | null>>();

  const projectWhere = {
    first: projectFirst,
  };

  const activityWhere = {
    first: activityFirst,
    update: activityUpdate,
    delete: activityDelete,
  };

  const prismaMock = {
    db: {
      orm: {
        public: {
          Project: {
            where: jest.fn(() => projectWhere),
          },
          Activity: {
            create: activityCreate,
            all: activityAll,
            where: jest.fn(() => activityWhere),
          },
        },
      },
    },
  };

  beforeEach(() => {
    jest.clearAllMocks();

    service = new ActivitiesService(
      prismaMock as unknown as PrismaService,
      new EvMService(),
    );
  });

  it('should create an activity with EVM metrics', async () => {
    const project: ProjectRecord = {
      id: 1,
      name: 'Proyecto',
      description: null,
    };

    const activity: ActivityRecord = {
      id: 1,
      name: 'Backend',
      bac: 10000,
      plannedProgress: 50,
      actualProgress: 40,
      actualCost: 4500,
      projectId: 1,
    };

    projectFirst.mockResolvedValue(project);
    activityCreate.mockResolvedValue(activity);

    const result = await service.create({
      name: 'Backend',
      bac: 10000,
      plannedProgress: 50,
      actualProgress: 40,
      actualCost: 4500,
      projectId: 1,
    });

    expect(activityCreate).toHaveBeenCalledWith({
      name: 'Backend',
      bac: 10000,
      plannedProgress: 50,
      actualProgress: 40,
      actualCost: 4500,
      projectId: 1,
    });

    expect(result.evm.pv).toBe(5000);
    expect(result.evm.ev).toBe(4000);
    expect(result.evm.cv).toBe(-500);
    expect(result.evm.sv).toBe(-1000);
    expect(result.evm.cpi).toBeCloseTo(4000 / 4500);
    expect(result.evm.spi).toBe(0.8);
    expect(result.evm.eac).toBeCloseTo(11250);
    expect(result.evm.vac).toBeCloseTo(-1250);
  });

  it('should throw when creating an activity for a missing project', async () => {
    projectFirst.mockResolvedValue(null);

    await expect(
      service.create({
        name: 'Backend',
        bac: 10000,
        plannedProgress: 50,
        actualProgress: 40,
        actualCost: 4500,
        projectId: 999,
      }),
    ).rejects.toBeInstanceOf(NotFoundException);

    expect(activityCreate).not.toHaveBeenCalled();
  });

  it('should return all activities with EVM metrics', async () => {
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

    activityAll.mockResolvedValue(activities);

    const result = await service.findAll();

    expect(result).toHaveLength(2);
    expect(result[0].evm.pv).toBe(5000);
    expect(result[1].evm.pv).toBe(12000);
    expect(result[1].evm.ev).toBe(10000);
  });

  it('should return an activity with EVM metrics', async () => {
    const activity: ActivityRecord = {
      id: 1,
      name: 'Backend',
      bac: 10000,
      plannedProgress: 50,
      actualProgress: 40,
      actualCost: 4500,
      projectId: 1,
    };

    activityFirst.mockResolvedValue(activity);

    const result = await service.findOne(1);

    expect(result.id).toBe(1);
    expect(result.evm.pv).toBe(5000);
    expect(result.evm.ev).toBe(4000);
  });

  it('should throw when activity is not found', async () => {
    activityFirst.mockResolvedValue(null);

    await expect(service.findOne(999)).rejects.toBeInstanceOf(
      NotFoundException,
    );
  });

  it('should update all activity fields and recalculate EVM', async () => {
    const existingActivity: ActivityRecord = {
      id: 1,
      name: 'Backend',
      bac: 10000,
      plannedProgress: 50,
      actualProgress: 40,
      actualCost: 4500,
      projectId: 1,
    };

    const project: ProjectRecord = {
      id: 2,
      name: 'Proyecto 2',
      description: null,
    };

    const updatedActivity: ActivityRecord = {
      id: 1,
      name: 'Backend actualizado',
      bac: 12000,
      plannedProgress: 70,
      actualProgress: 60,
      actualCost: 7000,
      projectId: 2,
    };

    activityFirst.mockResolvedValue(existingActivity);
    projectFirst.mockResolvedValue(project);
    activityUpdate.mockResolvedValue(updatedActivity);

    const result = await service.update(1, {
      name: 'Backend actualizado',
      bac: 12000,
      plannedProgress: 70,
      actualProgress: 60,
      actualCost: 7000,
      projectId: 2,
    });

    expect(activityUpdate).toHaveBeenCalledWith({
      name: 'Backend actualizado',
      bac: 12000,
      plannedProgress: 70,
      actualProgress: 60,
      actualCost: 7000,
      projectId: 2,
    });

    expect(result.evm.pv).toBe(8400);
    expect(result.evm.ev).toBe(7200);
    expect(result.evm.cv).toBe(200);
    expect(result.evm.sv).toBe(-1200);
  });

  it('should update without checking project when projectId is not provided', async () => {
    const activity: ActivityRecord = {
      id: 1,
      name: 'Backend',
      bac: 10000,
      plannedProgress: 50,
      actualProgress: 40,
      actualCost: 4500,
      projectId: 1,
    };

    activityFirst.mockResolvedValue(activity);
    activityUpdate.mockResolvedValue(activity);

    const result = await service.update(1, {});

    expect(projectFirst).not.toHaveBeenCalled();
    expect(activityUpdate).toHaveBeenCalledWith({});
    expect(result.id).toBe(1);
  });

  it('should throw when updating an activity that does not exist', async () => {
    activityFirst.mockResolvedValue(null);

    await expect(
      service.update(999, {
        actualProgress: 60,
      }),
    ).rejects.toBeInstanceOf(NotFoundException);

    expect(activityUpdate).not.toHaveBeenCalled();
  });

  it('should throw when new project does not exist during update', async () => {
    const activity: ActivityRecord = {
      id: 1,
      name: 'Backend',
      bac: 10000,
      plannedProgress: 50,
      actualProgress: 40,
      actualCost: 4500,
      projectId: 1,
    };

    activityFirst.mockResolvedValue(activity);
    projectFirst.mockResolvedValue(null);

    await expect(
      service.update(1, {
        projectId: 999,
      }),
    ).rejects.toBeInstanceOf(NotFoundException);

    expect(activityUpdate).not.toHaveBeenCalled();
  });

  it('should throw when activity disappears during update', async () => {
    const activity: ActivityRecord = {
      id: 1,
      name: 'Backend',
      bac: 10000,
      plannedProgress: 50,
      actualProgress: 40,
      actualCost: 4500,
      projectId: 1,
    };

    activityFirst.mockResolvedValue(activity);
    activityUpdate.mockResolvedValue(null);

    await expect(
      service.update(1, {
        actualProgress: 60,
      }),
    ).rejects.toBeInstanceOf(NotFoundException);
  });

  it('should delete an activity', async () => {
    const activity: ActivityRecord = {
      id: 1,
      name: 'Backend',
      bac: 10000,
      plannedProgress: 50,
      actualProgress: 40,
      actualCost: 4500,
      projectId: 1,
    };

    activityFirst.mockResolvedValue(activity);
    activityDelete.mockResolvedValue(activity);

    const result = await service.remove(1);

    expect(activityDelete).toHaveBeenCalledTimes(1);
    expect(result).toEqual(activity);
  });

  it('should throw when deleting an activity that does not exist', async () => {
    activityFirst.mockResolvedValue(null);

    await expect(service.remove(999)).rejects.toBeInstanceOf(
      NotFoundException,
    );

    expect(activityDelete).not.toHaveBeenCalled();
  });
});