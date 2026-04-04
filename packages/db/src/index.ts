import { PrismaClient } from '@prisma/client';

// ─── Prisma Client Singleton ──────────────────────────────────────────────────
// This pattern prevents multiple PrismaClient instances in development
// due to hot module reloading (HMR) in Next.js.

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

export const db: PrismaClient =
  globalForPrisma.prisma ??
  new PrismaClient({
    log:
      process.env.NODE_ENV === 'development'
        ? ['query', 'error', 'warn']
        : ['error'],
  });

if (process.env.NODE_ENV !== 'production') {
  globalForPrisma.prisma = db;
}

// ─── Type Exports ─────────────────────────────────────────────────────────────
export * from '@prisma/client';

// ─── Named Alias ──────────────────────────────────────────────────────────────
export { db as prisma };
