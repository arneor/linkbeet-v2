# INTEGRATIONS.md — External Services & APIs

## Database

| Service                     | Details                                                                                                     |
| --------------------------- | ----------------------------------------------------------------------------------------------------------- |
| **PostgreSQL + PostGIS 16** | Primary datastore; geo queries for hyperlocal discovery; local via Docker (`postgis/postgis:16-3.4-alpine`) |
| **Prisma ORM**              | Schema: `api/prisma/schema.prisma` (currently empty — schema Definition is planned Phase 2 deliverable)     |

## Cache / Event Bus

| Service               | Details                                                                                           |
| --------------------- | ------------------------------------------------------------------------------------------------- |
| **Redis 7** (ioredis) | Caching, session store, rate limiting; Redis Streams as internal event bus (`RedisModule` global) |
| **Upstash Redis**     | Edge rate limiting on Next.js web middleware                                                      |

## Search

| Service              | Details                                                                                 |
| -------------------- | --------------------------------------------------------------------------------------- |
| **Meilisearch v1.7** | Full-text + geo search; indices: `profiles`, `catalogue`; self-hosted EC2 in production |

## Authentication

| Service            | Details                                                                                                                                   |
| ------------------ | ----------------------------------------------------------------------------------------------------------------------------------------- |
| **Better Auth**    | Server-side sessions stored in PostgreSQL; replaces NextAuth; `api/src/config/better-auth.config.ts`; web client in `web/src/lib/auth.ts` |
| **JWT**            | Access (15m) + Refresh (7d) tokens; `@nestjs/jwt` + `passport-jwt`; global `JwtAuthGuard` with `@Public()` escape hatch                   |
| **Firebase Admin** | FCM push notifications; configured via `firebaseConfig` (`FIREBASE_PROJECT_ID`, `FIREBASE_CLIENT_EMAIL`, `FIREBASE_PRIVATE_KEY`)          |

## Payments

| Service      | Details                                                                                                                      |
| ------------ | ---------------------------------------------------------------------------------------------------------------------------- |
| **Razorpay** | Payment gateway for India (INR); Razorpay Route for seller splits; 2-5% platform commission; configured via `razorpayConfig` |

## Storage & Media

| Service           | Details                                                                                                                                              |
| ----------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Cloudflare R2** | Object storage (S3-compatible); accessed via `@aws-sdk/client-s3`; `R2_ACCOUNT_ID`, `R2_BUCKET_NAME`, `R2_PUBLIC_URL`                                |
| **imgproxy**      | On-the-fly image resizing + WebP conversion; optimised for 3G India; self-hosted EC2; configured via `IMGPROXY_URL`, `IMGPROXY_KEY`, `IMGPROXY_SALT` |

## Infrastructure & Deployment

| Service              | Details                                                                 |
| -------------------- | ----------------------------------------------------------------------- |
| **AWS ECS**          | API monolith container; `ap-south-1` Mumbai region                      |
| **AWS RDS**          | Managed PostgreSQL; `t3.micro` staging, `t3.medium Multi-AZ` production |
| **Vercel**           | Hosts `web/` and `admin/` Next.js apps                                  |
| **AWS WAF + Shield** | DDoS + bot protection                                                   |
| **Terraform**        | All AWS resources as code (IaC)                                         |

## Observability

| Service                    | Details                                                                                                             |
| -------------------------- | ------------------------------------------------------------------------------------------------------------------- |
| **Grafana + Loki**         | Centralized logging and dashboards; from Phase 2 day 1                                                              |
| **Sentry / OpenTelemetry** | Error tracking via `api/src/instrument.ts` pattern (referenced in legacy microservices, to be re-added to monolith) |

## CI/CD

| Service            | Details                                                                                                       |
| ------------------ | ------------------------------------------------------------------------------------------------------------- |
| **GitHub Actions** | `.github/workflows/api.yml` — lint, format-check, build on `api/**` changes; triggers on `main` and `staging` |

## Local Dev Stack (Docker Compose)

`infra/docker/docker-compose.dev.yml` provides:

- PostgreSQL + PostGIS on `:5432`
- Redis on `:6379`
- Meilisearch on `:7700`
- imgproxy on `:8080`
- pgAdmin on `:5050`

## Service Ports (local)

| Service         | Port |
| --------------- | ---- |
| api (NestJS)    | 3000 |
| web (Next.js)   | 3001 |
| admin (Next.js) | 3002 |
| PostgreSQL      | 5432 |
| Redis           | 6379 |
| Meilisearch     | 7700 |
| imgproxy        | 8080 |
| pgAdmin         | 5050 |
