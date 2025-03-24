#!/bin/bash

rm -rf postgres_data
rm -rf src/prisma
docker compose down
echo "Starting postgres"
docker compose up -d postgres
echo "Waiting for postgres to be ready for migration..."

# Try to connect to Postgres until it's ready
max_attempts=60
attempt=0
while [ $attempt -lt $max_attempts ]; do
  attempt=$((attempt+1))
  if docker exec $(docker ps -q -f name=postgres) pg_isready -h localhost -q 2>/dev/null; then
    echo "Postgres is ready!"
    break
  fi
  echo "Waiting for postgres to be ready for migration... (attempt $attempt/$max_attempts)"
  sleep 1
done

if [ $attempt -eq $max_attempts ]; then
  echo "Failed to connect to postgres after $max_attempts attempts. Exiting."
  exit 1
fi

echo "Migrating prisma"
pnpm prisma:migrate

echo "Ready!"
