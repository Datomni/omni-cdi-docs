---
sidebar_position: 3
---

# Installation

> 👋 Hey there! Before you jump into the installation, [ping us for a quick call ](https://www.datomni.com/contact) - we'll get you set up with access to our Docker images. We're excited to help you get started, but please note that our availability is limited!

Omni ETL provides a separate Dockerized application for each data source. While the installation process remains consistent across all applications, minor custom steps may be required due to special needs in the configuration of individual data sources. Currently all ETL apps write to BigQuery instances. This document will guide you through the deployment of an Omni ETL instance, providing links to tool-specific configurations as necessary.
<!-- 
## Table of contents

- [Docker Guide](#docker-guide)
  - [Introduction](#introduction)
  - [Quick Start](#quick-start)
  - [Production Deployment](#production-deployment)
  - [Local Deployment](#local-deployment)
  - [Docker File](#docker-file) -->

## Docker guide

The project repository you receive contains the individual file for production deployment: `docker-compose.yml`.

Ensure Docker and Docker Compose are installed on your production server.

Copy the `.env.example` file to `.env` and configure the environment variables:

```bash
cp .env.example .env
```

Edit your `.env` file to specify the hours and days when the sync should run, as well as the `table_id` and the path to BigQuery service account, as well as any data-source specific configuration details.

### Production deployment

The deployed is managed by Docker Compose. Here's a brief description of the services defined in your Omni ETL instance of `docker-compose.yml` file:

- `redis`: This service uses the official Redis image and mounts the current directory to `/app/redis` inside the container.

- `app`: This service builds an image from the `./app` directory, sets up necessary configurations, dependencies, and environment variables, then runs the application using `entrypoint.sh`, which spins up the Celery workers responsible for managing the data sync. It depends on the `redis` service.

- `nginx`: This service builds an Nginx image from the `./nginx` directory and forwards requests to the app service. It exposes port 5000 on the host machine.

The second important file is the `uwsi.ini` configuration file, which sets up uWSGI to run the Flask application. It specifies the working directory, callable application, number of worker processes, and other less relevant details.

Run `docker-compose build` to build the Docker images.

Run `docker-compose up -d` to start the containers in detached mode.

Check if the containers are running using `docker ps`.