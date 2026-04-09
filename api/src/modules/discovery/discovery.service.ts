import { Injectable } from '@nestjs/common'

import { PrismaService } from '../../prisma/prisma.service'
import { RedisService } from '../../redis/redis.service'

/**
 * DiscoveryService — queries PostGIS for radius search,
 * aggregates Meilisearch results, handles feed curation and bookmarks.
 */
@Injectable()
export class DiscoveryService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly redis: RedisService,
  ) {}
}
