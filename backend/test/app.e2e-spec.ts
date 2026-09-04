import { INestApplication } from '@nestjs/common';
import {
  afterAll,
  beforeAll,
  describe,
  expect,
  it,
} from '@jest/globals';
import { Test, TestingModule } from '@nestjs/testing';
import request from 'supertest';
import { AppModule } from '../src/app.module.js';
import { db } from '../src/prisma/db.js';

describe('Trycore EVM API (e2e)', () => {
  let app: INestApplication;

  let projectId: number;
  let activityId: number;

  beforeAll(async () => {
    const moduleFixture: TestingModule =
      await Test.createTestingModule({
        imports: [AppModule],
      }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  afterAll(async () => {
    await app.close();
    await db.close();
  });

  describe('Projects endpoints', () => {
    it('POST /projects should create a project', async () => {
      const response = await request(app.getHttpServer())
        .post('/projects')
        .send({
          name: 'E2E Test Project',
          description: 'Project created by integration test',
        })
        .expect(201);

      expect(response.body).toEqual(
        expect.objectContaining({
          id: expect.any(Number),
          name: 'E2E Test Project',
          description: 'Project created by integration test',
        }),
      );

      projectId = response.body.id;
    });

    it('GET /projects should return projects', async () => {
      const response = await request(app.getHttpServer())
        .get('/projects')
        .expect(200);

      expect(Array.isArray(response.body)).toBe(true);

      expect(
        response.body.some(
          (project: { id: number }) => project.id === projectId,
        ),
      ).toBe(true);
    });

    it('GET /projects/:id should return project contract', async () => {
      const response = await request(app.getHttpServer())
        .get(`/projects/${projectId}`)
        .expect(200);

      expect(response.body).toEqual(
        expect.objectContaining({
          id: projectId,
          name: 'E2E Test Project',
          description: 'Project created by integration test',
          activities: expect.any(Array),
          evm: expect.objectContaining({
            bac: expect.any(Number),
            pv: expect.any(Number),
            ev: expect.any(Number),
            cv: expect.any(Number),
            sv: expect.any(Number),
          }),
        }),
      );
    });

    it('PATCH /projects/:id should update a project', async () => {
      const response = await request(app.getHttpServer())
        .patch(`/projects/${projectId}`)
        .send({
          name: 'E2E Updated Project',
        })
        .expect(200);

      expect(response.body).toEqual(
        expect.objectContaining({
          id: projectId,
          name: 'E2E Updated Project',
        }),
      );
    });
  });

  describe('Activities endpoints', () => {
    it('POST /activities should create an activity with EVM metrics', async () => {
      const response = await request(app.getHttpServer())
        .post('/activities')
        .send({
          name: 'E2E Development Activity',
          bac: 10000,
          plannedProgress: 50,
          actualProgress: 40,
          actualCost: 4500,
          projectId,
        })
        .expect(201);

      expect(response.body).toEqual(
        expect.objectContaining({
          id: expect.any(Number),
          name: 'E2E Development Activity',
          bac: 10000,
          plannedProgress: 50,
          actualProgress: 40,
          actualCost: 4500,
          projectId,
          evm: expect.objectContaining({
            bac: 10000,
            pv: 5000,
            ev: 4000,
            cv: -500,
            sv: -1000,
          }),
        }),
      );

      activityId = response.body.id;
    });

    it('GET /activities should return activities', async () => {
      const response = await request(app.getHttpServer())
        .get('/activities')
        .expect(200);

      expect(Array.isArray(response.body)).toBe(true);

      expect(
        response.body.some(
          (activity: { id: number }) =>
            activity.id === activityId,
        ),
      ).toBe(true);
    });

    it('GET /activities/:id should return activity with EVM metrics', async () => {
      const response = await request(app.getHttpServer())
        .get(`/activities/${activityId}`)
        .expect(200);

      expect(response.body).toEqual(
        expect.objectContaining({
          id: activityId,
          name: 'E2E Development Activity',
          projectId,
          evm: expect.objectContaining({
            pv: 5000,
            ev: 4000,
            cv: -500,
            sv: -1000,
          }),
        }),
      );
    });

    it('PATCH /activities/:id should update activity and recalculate EVM', async () => {
      const response = await request(app.getHttpServer())
        .patch(`/activities/${activityId}`)
        .send({
          actualProgress: 60,
          actualCost: 5200,
        })
        .expect(200);

      expect(response.body).toEqual(
        expect.objectContaining({
          id: activityId,
          actualProgress: 60,
          actualCost: 5200,
          evm: expect.objectContaining({
            ev: 6000,
            cv: 800,
          }),
        }),
      );
    });

    it('DELETE /activities/:id should delete activity', async () => {
      const response = await request(app.getHttpServer())
        .delete(`/activities/${activityId}`)
        .expect(200);

      expect(response.body).toEqual(
        expect.objectContaining({
          id: activityId,
        }),
      );
    });
  });

  describe('Project deletion', () => {
    it('DELETE /projects/:id should delete project', async () => {
      const response = await request(app.getHttpServer())
        .delete(`/projects/${projectId}`)
        .expect(200);

      expect(response.body).toEqual(
        expect.objectContaining({
          id: projectId,
        }),
      );
    });
  });
});