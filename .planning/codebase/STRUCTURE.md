# STRUCTURE.md — Directory Layout & Organization

## Root

```
linkbeet-v2/
├── .github/
│   └── workflows/
│       └── api.yml              — API CI pipeline (lint + build)
├── .husky/
│   ├── pre-commit               — npx pnpm exec lint-staged
│   ├── commit-msg               — npx pnpm exec commitlint --edit
│   └── pre-push                 — npx pnpm run build
├── .planning/                   — GSD planning context (this directory)
│   └── codebase/                — Codebase analysis documents
├── admin/                       — Next.js admin app
├── api/                         — NestJS monolith
├── docs/
│   ├── architecture.md          — Architecture overview (v2.3, April 2026)
│   └── prd/                     — Product requirements documents
├── infra/
│   └── docker/
│       ├── docker-compose.dev.yml
│       ├── docker-compose.staging.yml
│       ├── docker-compose.yml
│       └── init-scripts/postgis.sql
├── mobile/                      — Expo React Native app
├── shared/                      — Shared packages
│   ├── constants/               — @linkbeet/constants
│   ├── types/                   — @linkbeet/types
│   ├── ui/                      — @linkbeet/ui
│   ├── utils/                   — @linkbeet/utils
│   └── validations/             — @linkbeet/validations
├── web/                         — Next.js public web app
├── .editorconfig
├── .env.example                 — Root env template
├── .lintstagedrc.js             — lint-staged config
├── .npmrc                       — pnpm config
├── commitlint.config.js
├── eslint.config.base.mjs       — Shared ESLint config
├── eslint.config.mjs            — Root ESLint (extends base)
├── package.json                 — Root scripts (turbo run ...)
├── prettier.config.js
├── pnpm-workspace.yaml          — Workspace package declarations
├── tsconfig.base.json           — Shared TS compiler options
├── tsconfig.json                — Root tsconfig (references all)
└── turbo.json                   — Turborepo pipeline config
```

---

## API (`api/`)

```
api/
├── prisma/
│   ├── schema.prisma            — Prisma schema (EMPTY — to be defined)
│   └── migrations/              — Prisma migrations (empty)
├── src/
│   ├── app.module.ts            — Root NestJS module
│   ├── main.ts                  — Bootstrap entry point
│   ├── config/
│   │   ├── index.ts             — Re-exports all configs
│   │   ├── app.config.ts
│   │   ├── database.config.ts
│   │   ├── redis.config.ts
│   │   ├── jwt.config.ts
│   │   ├── meilisearch.config.ts
│   │   ├── razorpay.config.ts
│   │   ├── storage.config.ts
│   │   ├── firebase.config.ts
│   │   ├── better-auth.config.ts
│   │   └── imgproxy.config.ts
│   ├── common/
│   │   ├── decorators/public.decorator.ts   — @Public() skip auth
│   │   ├── filters/http-exception.filter.ts — RFC 7807 responses
│   │   ├── guards/jwt-auth.guard.ts         — Global JWT guard
│   │   └── interceptors/logging.interceptor.ts
│   ├── prisma/
│   │   ├── prisma.module.ts     — @Global() PrismaModule
│   │   └── prisma.service.ts    — PrismaClient wrapper
│   ├── redis/
│   │   ├── redis.module.ts      — @Global() RedisModule
│   │   └── redis.service.ts     — ioredis wrapper
│   └── modules/                 — 20 feature modules
│       ├── auth/
│       │   ├── auth.module.ts
│       │   ├── auth.controller.ts
│       │   ├── auth.service.ts
│       │   └── dto/
│       └── [other modules — same structure]
├── test/
│   └── jest-e2e.json
├── .env.example
├── Dockerfile
├── docker-compose.yml
├── jest.config.ts
├── nest-cli.json
├── package.json
├── tsconfig.build.json
└── tsconfig.json
```

---

## Web (`web/src/`)

```
web/src/
├── app/
│   ├── (auth)/                  — Route group: unauthenticated
│   │   ├── login/
│   │   └── register/
│   ├── (dashboard)/             — Route group: protected
│   │   ├── dashboard/page.tsx   — Dashboard page (imports auth)
│   │   └── layout.tsx           — Checks session, redirects
│   ├── [username]/              — Public profile page
│   ├── api/auth/[...nextauth]/  — Better Auth route handler
│   ├── favicon.ico
│   ├── globals.css
│   ├── layout.tsx               — Root layout
│   └── page.tsx                 — Landing page
├── components/                  — Reusable React components
├── hooks/                       — Custom React hooks
├── lib/
│   ├── auth.ts                  — Better Auth server instance + handlers
│   └── auth-client.ts           — Better Auth client (createAuthClient)
├── middleware.ts                — Route protection middleware
├── store/                       — Zustand stores
└── types/                       — App-specific types
```

---

## Mobile (`mobile/`)

```
mobile/
├── app/
│   └── index.tsx                — Root → redirects to /(tabs)
├── src/
│   └── features/
│       ├── auth/
│       │   ├── index.ts         — Exports LoginScreen
│       │   └── screens/LoginScreen.tsx
│       ├── profile/
│       │   ├── index.ts         — Exports ProfileScreen, PublicProfileScreen
│       │   └── screens/ProfileScreen.tsx
│       └── [15 other domains]/  — Each has:
│           ├── index.ts         — Public API exports
│           ├── components/
│           ├── screens/
│           ├── hooks/
│           ├── services/
│           ├── store/
│           ├── types/
│           └── utils/
├── .env.development
├── .env.example
├── .env.production
├── .env.staging
└── package.json
```

---

## Shared Packages (`shared/`)

Each package follows this structure:

```
shared/[name]/
├── src/
│   └── index.ts    — Main exports
├── package.json    — @linkbeet/[name]
└── tsconfig.json
```

| Package       | Key Files                                                                                                                                  |
| ------------- | ------------------------------------------------------------------------------------------------------------------------------------------ |
| `constants`   | `src/app.ts`, `src/colors.ts`, `src/breakpoints.ts`, `src/typography.ts`, `src/spacing.ts`, `src/social-platforms.ts`, `src/query-keys.ts` |
| `types`       | `src/index.ts` — User, Link, Profile, SocialLink interfaces                                                                                |
| `utils`       | `src/array.ts`, `src/string.ts`, `src/url.ts`, `src/analytics.ts`, `src/format.ts`, `src/object.ts`                                        |
| `validations` | `src/index.ts` — Zod schemas                                                                                                               |
| `ui`          | `src/lib/utils.ts` (cn utility), `src/index.ts`                                                                                            |

---

## Naming Conventions

- **Files**: `kebab-case.ts`, `PascalCase.tsx` for components
- **Classes/Decorators**: `PascalCase`
- **Functions/Variables**: `camelCase`
- **Constants**: `SCREAMING_SNAKE_CASE`
- **Types/Interfaces**: `PascalCase`
- **Modules**: Named `[Feature]Module`, `[Feature]Service`, `[Feature]Controller`
- **Routes**: `/api/v1/[resource]` — plural noun, kebab-case
- **Feature dirs**: `mobile/src/features/[feature-name]/` — kebab-case
