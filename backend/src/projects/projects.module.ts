import { Module } from '@nestjs/common';
import { EvMModule } from '../evm/evm.module.js';
import { ProjectsController } from './projects.controller.js';
import { ProjectsService } from './projects.service.js';

@Module({
  imports: [EvMModule],
  controllers: [ProjectsController],
  providers: [ProjectsService],
})
export class ProjectsModule {}