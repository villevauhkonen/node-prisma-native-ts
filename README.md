# Prisma with Node.js native Typescript support

Sample project to test Prisma with Node.js native Typescript support.

## Prerequisites

- Node.js 23.x or higher
- pnpm 10.x or higher
- Docker

## Setup

```bash
pnpm install
pnpm prisma:generate
```

## Development

```bash
docker compose up -d postgres
pnpm run dev
```

## Build

```bash
pnpm run build
```

## Run

```bash
pnpm run start
```

## Docker

```bash
docker compose up --build
```

