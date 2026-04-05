# Local Development Setup

## Prerequisites

- Node.js 20+
- pnpm 9+
- Docker Desktop

## Setup Steps

1. Clone the repo
2. Run: pnpm install
3. Copy .env.example to .env.development in each app
4. Run: docker compose -f infra/docker/docker-compose.dev.yml up -d
5. Run: pnpm dev

## Run individual apps

pnpm --filter web dev pnpm --filter admin dev pnpm --filter mobile dev pnpm --filter
@linkbeet/api-auth dev
