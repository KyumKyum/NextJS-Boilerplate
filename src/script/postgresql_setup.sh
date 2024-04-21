#!/bin/sh

if docker container inspect postgres >/dev/null 2>&1; then
  echo 'Container for postgres exists! Terminating the container...'
  docker stop postgres
  echo
fi

####### POSTGRESQL #######
echo "🚀[POSTGRESQL] Initiating set up for PostgreSQL..."

# Define paths and ports
SCRIPT_PATH="$( cd -- "$(dirname "$0")" >/dev/null 2>&1 ; pwd -P )"
PROJECT_PATH="$(dirname "$SCRIPT_PATH")"
DATA_PORT=6457

echo "Project Path: $PROJECT_PATH"

set -e

# Check and stop running postgres container
CONTAINER_NAME="postgres"

# Create data directory for storing PostgreSQL data
mkdir -p "$PROJECT_PATH/../pgdata"

# Ensure the volume exists
if ! docker volume ls | grep -q postgres_data; then
    echo 'Volume does not exist! Creating...'
    docker volume create postgres_data
    echo
fi

# Run PostgreSQL container
docker run --rm --name $CONTAINER_NAME -p ${DATA_PORT}:5432 \
  -v "$PROJECT_PATH/../pgdata:/var/lib/postgresql/data" \
  -e POSTGRES_PASSWORD=postgres \
  -e POSTGRES_USER=postgres \
  -d postgres:9.6.15-alpine

echo "PostgreSQL Container started! Testing the connection..."

MAX_RETRIES=30
WAIT_SECONDS=2
ATTEMPTS=0

# Attempt connection to PostgreSQL
until docker exec $CONTAINER_NAME pg_isready -U postgres -h localhost -p 5432; do
  ATTEMPTS=$((ATTEMPTS + 1))

  if [ $ATTEMPTS -ge $MAX_RETRIES ]; then
    echo "❌ Error: Failed to connect to PostgreSQL after $MAX_RETRIES attempts. Exiting... ❌"
    exit 1
  fi

  echo "⚠️Connection attempt $ATTEMPTS failed. Retrying in $WAIT_SECONDS seconds..."
  sleep $WAIT_SECONDS
done

CONTAINER_ID="$(docker ps -aqf "name=$CONTAINER_NAME")"

# Check if the 'project' database exists and create it if not
DB_EXISTS=$(docker exec "$CONTAINER_ID" psql -U postgres -tAc "SELECT 1 FROM pg_database WHERE datname = 'project'")
if [ "$DB_EXISTS" != "1" ]; then
  docker exec "$CONTAINER_ID" psql -U postgres -c "CREATE DATABASE project WITH ENCODING='UTF8' LC_COLLATE='en_US.utf8' LC_CTYPE='en_US.utf8';"
  echo "Database 'project' created."
else
  echo "Database 'project' already exists."
fi

echo "✨ Connection Successful! PostgreSQL is up and running! ✨"

echo "💫Finished setting up! Enjoy your development! :)"
