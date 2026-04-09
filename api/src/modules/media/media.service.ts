import { Injectable } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'

import { PrismaService } from '../../prisma/prisma.service'

/**
 * MediaService — interfaces with AWS S3 API (Cloudflare R2),
 * generates presigned URLs, handles blurhash generation.
 */
@Injectable()
export class MediaService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly config: ConfigService,
  ) {}
}
