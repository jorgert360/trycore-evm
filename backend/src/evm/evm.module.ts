import { Module } from '@nestjs/common';
import { EvMService } from './evm.service.js';

@Module({
  providers: [EvMService],
  exports: [EvMService],
})
export class EvMModule {}