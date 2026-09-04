import { Module } from '@nestjs/common';
import { ActivitiesModule } from './activities/activities.module.js';
import { AppController } from './app.controller.js';
import { AppService } from './app.service.js';
import { PrismaModule } from './prisma/prisma.module.js';
import { ProjectsModule } from './projects/projects.module.js';

@Module({
  imports: [
    PrismaModule,
    ProjectsModule,
    ActivitiesModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}