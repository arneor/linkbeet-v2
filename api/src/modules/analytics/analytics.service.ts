import { Injectable } from '@nestjs/common'

import { PrismaService } from '../../prisma/prisma.service'
import { RedisService } from '../../redis/redis.service'

/**
 * AnalyticsService — writes events asynchronously to Redis Streams
 * or background queue, queries Prisma for reporting.
 */
@Injectable()
export class AnalyticsService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly redis: RedisService,
  ) {}
}
