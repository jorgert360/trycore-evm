import { Module } from '@nestjs/common';
import { EvMModule } from '../evm/evm.module.js';
import { ActivitiesController } from './activities.controller.js';
import { ActivitiesService } from './activities.service.js';

@Module({
  imports: [EvMModule],
  controllers: [ActivitiesController],
  providers: [ActivitiesService],
})
export class ActivitiesModule {}