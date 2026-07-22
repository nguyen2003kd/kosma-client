# Docker Setup for case-smeq

This project includes Docker configuration for development, staging, and production environments.

## Files Created

- `Dockerfile` - Multi-stage Docker build configuration
- `docker-compose.yml` - Docker Compose orchestration file
- `.dockerignore` - Files to exclude from Docker builds

## Quick Start

### Development Environment

```bash
# Build and start development container
docker-compose --profile dev up --build

# Or run in detached mode
docker-compose --profile dev up -d --build
```

### Production Environment

```bash
# Build and start production container
docker-compose --profile prod up --build

# Or run in detached mode
docker-compose --profile prod up -d --build
```

### Staging Environment

```bash
# Build and start staging container
docker-compose --profile staging up --build

# Or run in detached mode
docker-compose --profile staging up -d --build
```

## Environment Variables

Create a `.env` file in the project root with your environment variables:

```env
PORT=3001
NODE_ENV=development
# Add other environment variables as needed
```

## Docker Commands

### Build only
```bash
docker-compose --profile dev build
docker-compose --profile prod build
```

### Stop containers
```bash
docker-compose --profile dev down
docker-compose --profile prod down
```

### View logs
```bash
docker-compose --profile dev logs -f
docker-compose --profile prod logs -f
```

### Remove volumes (clean restart)
```bash
docker-compose --profile dev down -v
```

## Port Configuration

- **Development**: Port 3001 (configurable via PORT env variable)
- **Production**: Port 3001 (configurable via PORT env variable)
- **Staging**: Port 3002 (configurable via PORT env variable)

## Docker Features

### Development Mode
- Hot reload enabled with volume mounting
- All dependencies installed including devDependencies
- Node modules cached in anonymous volume for performance
- File watching with CHOKIDAR_USEPOLLING

### Production Mode
- Optimized multi-stage build
- Standalone Next.js output
- Only production dependencies
- Non-root user for security
- Smaller image size
- Health checks configured

## Healthcheck

All containers include health checks that verify the application is responding on the configured port.

## Network

All services are connected to the `case-smeq-network` bridge network.
