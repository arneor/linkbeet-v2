import { Injectable } from '@nestjs/common'

import { PrismaService } from '../../prisma/prisma.service'
import { RedisService } from '../../redis/redis.service'

/**
 * GamificationService — Tracks points, issues badges,
 * calculates leaderboard positions (often via Redis Sorted Sets).
 */
@Injectable()
export class GamificationService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly redis: RedisService,
  ) {}
}
