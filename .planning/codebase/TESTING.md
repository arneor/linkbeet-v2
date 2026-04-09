# TESTING.md — Test Structure & Practices

## Test Frameworks

### API (`api/`)

- **Jest 30** + **ts-jest** — unit and e2e tests
- **@nestjs/testing** — NestJS test module utilities
- **Supertest 7** — HTTP integration testing

### Web/Admin

- No test framework configured yet (TBD in Phase 2)

### Mobile

- No test framework configured yet (TBD; likely Jest + RNTL)

### Shared Packages

- No tests currently defined

---

## API Test Configuration

### Unit Tests (`jest.config.ts`)

```typescript
{
  rootDir: 'src',
  testRegex: '.*\\.spec\\.ts$',       // *.spec.ts files inside src/
  transform: { '^.+\\.(t|j)s$': 'ts-jest' },
  collectCoverageFrom: ['**/*.(t|j)s'],
  coverageDirectory: '../coverage',
  testEnvironment: 'node',
  moduleNameMapper: {
    '^@common/(.*)$': '<rootDir>/common/$1',
    '^@config/(.*)$': '<rootDir>/config/$1',
    '^@modules/(.*)$': '<rootDir>/modules/$1',
    '^@prisma-client$': '<rootDir>/prisma/prisma.service',
    '^@redis$': '<rootDir>/redis/redis.service',
  }
}
```

### E2E Tests (`test/jest-e2e.json`)

```json
{
  "rootDir": ".",
  "testRegex": ".e2e-spec.ts$",
  "transform": { "^.+\\.(t|j)s$": "ts-jest" }
}
```

---

## Current Test Coverage

- **0 unit tests** exist currently — no `.spec.ts` files found in `api/src/`
- **0 e2e tests** exist — `api/test/` is empty
- **All module stubs** created but not implemented — testing is Phase 2+ work

---

## Turbo Test Commands

```bash
pnpm test              # turbo run test (all)
pnpm test:coverage     # turbo run test:coverage
pnpm test:e2e         # turbo run test:e2e
```

Per-package:

```bash
pnpm --filter api jest
pnpm --filter api jest --coverage
pnpm --filter api jest --config ./test/jest-e2e.json
```

---

## Intended Testing Strategy (Phase 2+)

### Unit Tests

- NestJS services tested with `TestingModule`
- Prisma mocked via jest.mock or PrismaService stub
- Redis mocked similarly
- Pattern: colocate `*.spec.ts` next to source file

### E2E Tests

- Supertest against running NestJS test server
- PostgreSQL test DB or in-memory mock
- Cover key flows: auth, profile CRUD, payment

### CI Integration

- Tests run in GitHub Actions `api.yml` pipeline (currently lint + build only — tests to be added
  when written)
