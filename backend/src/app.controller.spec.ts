import { Test, TestingModule } from '@nestjs/testing';
import { AppController } from './app.controller.js';
import { AppService } from './app.service.js';
import { PrismaService } from './prisma/prisma.service.js';

describe('AppController', () => {
  let appController: AppController;

  const prismaServiceMock = {
    db: {
      orm: {
        public: {
          Project: {
            all: async () => [],
          },
        },
      },
    },
  };

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [AppController],
      providers: [
        AppService,
        {
          provide: PrismaService,
          useValue: prismaServiceMock,
        },
      ],
    }).compile();

    appController = app.get<AppController>(AppController);
  });

  describe('root', () => {
    it('should return API status and projects', async () => {
      await expect(appController.getHello()).resolves.toEqual({
        message: 'Trycore EVM API running',
        projects: [],
      });
    });
  });
});