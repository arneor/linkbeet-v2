# Linkbeet V2 — Architecture

## Overview

Linkbeet V2 is a biolink platform built as a Turborepo monorepo with the following apps:

- web/ → Next.js 15 (public client)
- admin/ → Next.js 15 (internal admin)
- mobile/ → React Native Expo (iOS + Android)
- api/\* → NestJS microservices (7 services)

## Shared Packages

- @linkbeet/types → TypeScript types
- @linkbeet/validations → Zod schemas
- @linkbeet/constants → Colors, spacing, app constants
- @linkbeet/utils → Utility functions
- @linkbeet/db → Prisma client + schema
- @linkbeet/kafka → Kafka event types
- @linkbeet/ui → Web shared components

## Environments

- development → local Docker
- staging → AWS ECS (pre-production)
- production → AWS ECS (live)

## Services & Ports

- auth → 3001
- profile → 3002
- search → 3003
- catalog → 3004
- booking → 3005
- payment → 3006
- analytics → 3007
- Kong API Gateway → 8000 (public), 8001 (admin)
