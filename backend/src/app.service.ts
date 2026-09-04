import { Injectable } from '@nestjs/common';
import { PrismaService } from './prisma/prisma.service.js';

@Injectable()
export class AppService {
  constructor(private readonly prisma: PrismaService) {}

  async getHello() {
    const projects = await this.prisma.db.orm.public.Project.all();

    return {
      message: 'Trycore EVM API running',
      projects,
    };
  }
}