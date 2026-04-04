# Linkbeet v2 — System Architecture

## Overview

Linkbeet v2 is a full-stack digital touchpoint platform built as a cloud-native, microservices-based
monorepo. It enables users to create a personalized bio-link page to share all their important
links, book services, and more.

---

## Architecture Diagram

```
                         ┌──────────────────────────┐
                         │      CloudFront CDN        │
                         └────────────┬─────────────┘
                                      │
              ┌───────────────────────┼───────────────────────┐
              │                       │                       │
       ┌──────▼──────┐       ┌────────▼──────┐     ┌─────────▼──────┐
       │  web (3000)  │       │ admin (3010)  │     │  mobile (Expo)  │
       │  Next.js 15  │       │  Next.js 15  │     │ React Native   │
       └──────┬───────┘       └───────┬──────┘     └────────┬───────┘
              │                       │                      │
              └───────────────────────▼──────────────────────┘
                                      │
                            ┌─────────▼──────────┐
                            │   Kong API Gateway   │
                            │  (port 8000/8001)   │
                            └─────────┬───────────┘
                                      │
        ┌─────────────────────────────┼─────────────────────────────┐
        │         │         │         │         │         │         │
  ┌─────▼──┐ ┌───▼───┐ ┌───▼──┐ ┌───▼───┐ ┌───▼───┐ ┌───▼───┐ ┌──▼───────┐
  │  auth  │ │profile│ │search│ │catalog│ │booking│ │payment│ │analytics │
  │  3001  │ │ 3002  │ │ 3003 │ │ 3004  │ │ 3005  │ │ 3006  │ │  3007    │
  └─────┬──┘ └───┬───┘ └───┬──┘ └───┬───┘ └───┬───┘ └───┬───┘ └──┬───────┘
        │        │         │        │          │          │        │
        └────────┴────────┬┴────────┴──────────┴──────────┘        │
                          │                                         │
              ┌───────────▼─────────────┐                          │
              │      Kafka (9092)        │◄─────────────────────────┘
              └───────────┬─────────────┘
                          │
     ┌────────────────────┼────────────────────┐
     │                    │                    │
┌────▼────┐       ┌───────▼──────┐     ┌──────▼──────┐
│PostgreSQL│       │   MongoDB    │     │    Redis     │
│  5432   │       │   27017      │     │    6379      │
└─────────┘       └──────────────┘     └─────────────┘
```

---

## Services

| Service         | Port | Purpose                                |
| --------------- | ---- | -------------------------------------- |
| `web`           | 3000 | Public Next.js client — bio-link pages |
| `admin`         | 3010 | Internal admin portal — org insights   |
| `mobile`        | —    | React Native Expo mobile client        |
| `api/auth`      | 3001 | Authentication, JWT, OAuth             |
| `api/profile`   | 3002 | User profiles, bio-link data           |
| `api/search`    | 3003 | Elasticsearch-based search             |
| `api/catalog`   | 3004 | Service catalog for bookable items     |
| `api/booking`   | 3005 | Booking & scheduling management        |
| `api/payment`   | 3006 | Payment processing (Stripe/Razorpay)   |
| `api/analytics` | 3007 | Click tracking, page views, insights   |

---

## Shared Packages

| Package                 | Description                          |
| ----------------------- | ------------------------------------ |
| `@linkbeet/ui`          | Shared React UI components           |
| `@linkbeet/db`          | Prisma client singleton + schema     |
| `@linkbeet/validations` | Zod validation schemas               |
| `@linkbeet/types`       | Shared TypeScript interfaces         |
| `@linkbeet/kafka`       | Kafka event types and client factory |

---

## Infrastructure

- **API Gateway**: Kong (declarative config)
- **CDN**: AWS CloudFront
- **Compute**: AWS ECS Fargate
- **Database**: PostgreSQL (RDS) + MongoDB Atlas
- **Cache**: Redis (ElastiCache)
- **Search**: Elasticsearch
- **Messaging**: Apache Kafka
- **Storage**: Cloudflare R2 / AWS S3
- **Monitoring**: Grafana + Loki
- **CI/CD**: GitHub Actions + Turborepo

---

## Data Flow

1. Client makes request → CloudFront CDN
2. Next.js SSR fetches data from microservices via Kong
3. Each service handles its domain logic
4. Services publish events to Kafka for async processing
5. Analytics service consumes events for metrics
