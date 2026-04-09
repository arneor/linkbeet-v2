import { FastifyRequest } from 'fastify'

import { JwtPayload } from './jwt-payload.type'

export type RequestWithUser = FastifyRequest & { user: JwtPayload }
