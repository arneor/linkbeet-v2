# Linkbeet V2 — Architecture

Version: 2.3 | Updated: April 2026

## Overview

Linkbeet V2 is a hyperlocal community commerce platform built as a Turborepo monorepo.

## Apps

- `web/` → Next.js 15 (public client — linkbeet.com)
- `admin/` → Next.js 15 (internal admin — admin.linkbeet.com)
- `mobile/` → React Native Expo (iOS + Android)
- `api/` → NestJS Monolith (api.linkbeet.com:3000)

## Architecture Decision: Monolith over Microservices

Phase 2 uses a single NestJS monolith with feature modules. Microservices migration planned at 1M+
users (Phase 4). Redis Streams as internal event bus (replaces Kafka — Phase 4).

## Backend Modules

`AuthModule`, `AccountModule`, `ProfileModule`, `ConnectionsModule`, `DiscoveryModule`,
`CommerceModule`, `BookingModule`, `PaymentsModule`, `CRMModule`, `NotificationsModule`,
`RatingsModule`, `AnalyticsModule`, `ReferralModule`, `AdminModule`, `MediaModule`, `WalletModule`,
`SupportModule`, `GamificationModule` (Phase 3), `MessagingModule` (Phase 3)

## Key Tech Choices

- **Better Auth** (not NextAuth) — user data stays in our PostgreSQL
- **PostgreSQL + PostGIS** — geo queries for hyperlocal discovery
- **Meilisearch** — typo-tolerant text search + geo search
- **Redis Streams** — internal event bus for notifications, analytics
- **Cloudflare R2** — object storage (not AWS S3)
- **imgproxy** — WebP, device-responsive resize for 3G India
- **Razorpay Route** — payments + auto-splits to sellers
- **Firebase Cloud Messaging** — push notifications

## Environments

- `development` → local Docker (PostGIS + Redis + Meilisearch + imgproxy)
- `staging` → AWS ECS ap-south-1, RDS db.t3.micro
- `production` → AWS ECS ap-south-1, RDS db.t3.medium Multi-AZ

## Service Ports (local)

| Service     | Port |
| ----------- | ---- |
| api         | 3000 |
| web         | 3001 |
| admin       | 3002 |
| PostgreSQL  | 5432 |
| Redis       | 6379 |
| Meilisearch | 7700 |
| imgproxy    | 8080 |
| pgAdmin     | 5050 |

## Infrastructure

- **AWS ECS** (Docker) — api monolith, ap-south-1 Mumbai
- **Vercel** — web + admin
- **Meilisearch** — self-hosted EC2
- **imgproxy** — self-hosted EC2
- **Cloudflare R2** — media storage
- **Terraform** — all AWS resources as code
- **GitHub Actions** — CI/CD all 4 surfaces
- **AWS WAF + Shield**
- **Grafana + Loki** — observability from Phase 2 day 1
