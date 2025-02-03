---
sidebar_position: 3
---

# Installation
 
> 👋 Hey there! Before you jump into the installation, [ping us for a quick call ](https://www.datomni.com/contact) - we'll get you set up with access to our Docker images. We're excited to help you get started, but please note that our availability is limited!

Omni Identity is a Dockerized application primarily intended for deployment on your own cloud infrastructure to fulfill one of the tenets of Omni CDI: maximum data ownership. This guide will help you set up your own identity resolution platform using Docker and Terraform. Please note that Omni Identity is currently not licensed as an open-source platform, so the guide below will only be relevant if we're collaborating.

## Table of contents

- [Docker Guide](#docker-guide)
  - [Introduction](#introduction)
  - [Quick Start](#quick-start)
  - [Production Deployment](#production-deployment)
  - [Local Deployment](#local-deployment)
  - [Docker File](#docker-file)

## Docker Guide
### Introduction

Omni Identity uses Docker containers for easy deployment and scalability. This guide will walk you through the setup process for both development and production environments.

### Quick Start

1. Set up Environment Configuration
    ```bash
    cp .env.example .env
    ```
    Configure the following variables in .env:
    ```
    APP_NAME=OmniIdentity
    APP_ENV=production
    APP_KEY=base64:z2YuIA8KN5Dv8RNWkcoGlDPcVQPhD237VaDJayyuHkM=
    APP_DEBUG=false
    APP_URL=http://localhost
    APP_PORT=80
    DASHBOARD_PREFIX=/

    LOG_CHANNEL=stack
    LOG_DEPRECATIONS_CHANNEL=null
    LOG_LEVEL=debug

    DB_CONNECTION=pgsql
    DB_HOST=pgsql
    DB_PORT=5432
    DB_DATABASE=laravel
    DB_USERNAME=root
    DB_PASSWORD=pass

    BROADCAST_DRIVER=log
    CACHE_DRIVER=redis
    FILESYSTEM_DISK=local
    QUEUE_CONNECTION=sync
    SESSION_DRIVER=redis
    SESSION_LIFETIME=120

    REDIS_HOST=redis
    REDIS_PASSWORD=null
    REDIS_PORT=6379

    MAIL_MAILER=smtp
    MAIL_HOST=mailhog
    MAIL_PORT=1025
    MAIL_USERNAME=null
    MAIL_PASSWORD=null
    MAIL_ENCRYPTION=null
    MAIL_FROM_ADDRESS="hello@example.com"
    MAIL_FROM_NAME="${APP_NAME}"
    ```

2. Start Docker Containers
    ```bash
    docker-compose up -d app
    ```

### Production Deployment

Follow these steps for a production deployment:

1. Install Dependencies
    ```bash
    docker-compose exec app composer install --no-dev
    ```

2. Database Setup
    ```bash
    docker-compose exec app php artisan migrate
    ```
    > **Important**: Always backup your database before running migrations in production.

3. Create Admin User
    ```bash
    docker-compose exec app php artisan orchid:admin admin admin@omni-identity.app pass
    ```

4. Storage Configuration
    ```bash
    docker-compose exec app php artisan storage:link
    sudo chown -R www-data:www-data ./storage/
    sudo chmod -R 755 ./storage/
    ```

5. SSL Configuration
    ```bash
    sudo apt-get install certbot
    sudo certbot --apache -d identity.yourdomain.com
    ```

6. Rebuild and Start
    ```bash
    docker-compose up -d
    ```

#### Production Considerations

- **Scaling**: For handling high volumes of identity resolution requests:
  ```bash
  docker-compose up --scale app=3 -d
  ```
- **Security**: Implement fail2ban and proper file permissions
- **Monitoring**: Consider using Prometheus or Grafana for tracking identity resolution metrics
- **Logging**: Access container logs:
  ```bash
  docker-compose logs -f app
  ```

### Local Deployment

For local development, follow these steps:

1. Clone the repository
2. Copy and configure .env
3. Start containers with development configuration:
    ```bash
    docker-compose -f docker-compose.dev.yml up -d
    ```

### Docker File

The application uses a multi-stage Dockerfile for optimized builds. Configuration details can be found in the root directory's `Dockerfile`.
