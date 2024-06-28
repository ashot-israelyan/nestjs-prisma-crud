import { Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit {
  private readonly logger = new Logger('PrismaService');

  async onModuleInit() {
    try {
      await this.$connect();

      this.logger.verbose('Connected to the database');
    } catch (err) {
      this.logger.error('Failed to connect to database ' + err);
    }
  }

  cleanDb() {
    return this.$transaction([
      this.bookmark.deleteMany(),
      this.user.deleteMany(),
    ]);
  }
}
