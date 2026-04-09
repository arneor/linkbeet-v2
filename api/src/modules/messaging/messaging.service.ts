import { Injectable } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'

import { PrismaService } from '../../prisma/prisma.service'

/**
 * MessagingService — Issues FCM tokens, syncs chat references,
 * sends push notifications. Chat data itself lives in Firebase RTDB.
 */
@Injectable()
export class MessagingService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly config: ConfigService,
  ) {}
}
