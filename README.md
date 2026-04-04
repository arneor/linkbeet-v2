# Linkbeet v2

A production-ready, cloud-native digital touchpoint platform — create your personalized bio-link
page, manage links, book services, and track analytics.

## 🏗️ Architecture

Built as a **Turborepo monorepo** with `pnpm` workspaces:

```
linkbeet-v2/
├── web/          → Next.js 15 (public client, port 3000)
├── admin/        → Next.js 15 (internal admin, port 3010)
├── mobile/       → Expo React Native
├── api/
│   ├── auth/     → Auth service (port 3001)
│   ├── profile/  → Profile service (port 3002)
│   ├── search/   → Search service (port 3003)
│   ├── catalog/  → Catalog service (port 3004)
│   ├── booking/  → Booking service (port 3005)
│   ├── payment/  → Payment service (port 3006)
│   └── analytics/→ Analytics service (port 3007)
├── shared/
│   ├── ui/       → @linkbeet/ui
│   ├── db/       → @linkbeet/db (Prisma)
│   ├── validations/ → @linkbeet/validations (Zod)
│   ├── types/    → @linkbeet/types
│   └── kafka/    → @linkbeet/kafka
├── infra/        → Terraform, Kong, Docker
├── .github/      → CI/CD workflows
├── monitoring/   → Grafana + Loki
└── docs/         → Documentation
```

## 🚀 Getting Started

### Prerequisites

- Node.js >= 20
- pnpm >= 9
- Docker Desktop

### 1. Install dependencies

```bash
pnpm install
```

### 2. Start infrastructure (dev)

```bash
docker compose -f infra/docker/docker-compose.dev.yml up -d
```

### 3. Set up environment variables

```bash
cp .env.example .env
# Edit .env with your values
```

### 4. Run database migrations

```bash
cd shared/db
pnpm db:push
```

### 5. Start all apps

```bash
pnpm dev
```

Or start individual apps:

```bash
pnpm dev --filter=@linkbeet/web
pnpm dev --filter=@linkbeet/admin
pnpm dev --filter=@linkbeet/api-auth
```

## 📜 Scripts

| Command      | Description                |
| ------------ | -------------------------- |
| `pnpm dev`   | Start all apps in dev mode |
| `pnpm build` | Build all apps             |
| `pnpm lint`  | Lint all apps              |
| `pnpm test`  | Run all tests              |
| `pnpm clean` | Clean all build outputs    |

## 🛠️ Tech Stack

- **Frontend**: Next.js 15, React 19, Tailwind CSS, NextAuth v5
- **Mobile**: Expo, React Native
- **Backend**: NestJS 10 microservices
- **Database**: PostgreSQL (Prisma ORM), MongoDB
- **Cache**: Redis (Upstash)
- **Search**: Elasticsearch
- **Messaging**: Apache Kafka
- **API Gateway**: Kong
- **Infrastructure**: AWS ECS, RDS, ElastiCache, CloudFront, S3
- **Monitoring**: Grafana + Loki
- **CI/CD**: GitHub Actions + Turborepo

## 📖 Documentation

- [Architecture](./docs/architecture.md)
- [API Reference](./docs/api.md)
- [Runbooks](./docs/runbooks/)
