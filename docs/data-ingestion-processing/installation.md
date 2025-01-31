# Installation

Omni Analytics is a Dockerized application primarily intended for deployment on your own cloud infrastructure to fulfill one of the tenets of Omni CDI: maximum data ownership. This guide will help you set up your own platform deployment using Docker and Terraform. Please note that Omni Analytics is currently not licensed as an open-source platform, so the guide below will only be relevant if we're collaborating.

## Table of Contents

- [Docker Guide](#docker-guide)
  - [Introduction](#introduction)
  - [Quick Start](#quick-start)
  - [Production Deployment](#production-deployment)
  - [Local Deployment](#local-deployment)
  - [Dockerfile](#dockerfile)
- [Terraform Guide](#terraform-guide)
  - [Quick Start](#terraform-quick-start)
  - [Repository](#repository)
  - [Prepare Existing Instance](#prepare-existing-instance)
  - [Domain Assignment](#domain-assignment)
  - [Project Deployment](#project-deployment)
  - [Automatic Deployment with GitHub Actions](#automatic-deployment-with-github-actions)

## Docker guide
### Introduction

The project repository you receive contains two files for deploying the application in a Docker container:
- Local deployment: `docker-compose.local.yml`
- Production deployment: `docker-compose.yml`

Before using locally, copy the `.env.example` file to `.env` and configure the environment variables:

```bash
cp .env.example .env
```

### Quick start
To get started, you can use the following commands:

```bash
./installer.sh
```

By default, the script uses the `docker-compose.yml` file to set up the application. If you want to use a different Docker Compose file, provide it as an argument when running the script. For example, to use the `docker-compose.local.yml` file, run:


```bash
./installer.sh docker-compose.local.yml
```

The `installer.sh` file is a shell script that automates the setup and deployment of your Docker-based Omni Analytics application. It performs the following steps:

- Accepts an optional argument specifying the Docker Compose file to use (defaults to `docker-compose.yml`).
- Runs `docker-compose up -d` to start services defined in the Docker Compose file in detached mode.
- Executes `composer install` inside the app service container to install PHP dependencies.
- Runs `php artisan migrate` inside the app service container to apply new database migrations.
- Creates a new admin user for the Orchid platform using `php artisan orchid:admin`.
- Creates a symbolic link from `public/storage` to `storage/app/public` with `php artisan storage:link`.
- Clears and optimizes the application cache.
- Changes permissions of the `./storage/` directory to make it writable.
- Ensures all services are up and running by running `docker-compose up -d` again.

This script simplifies the process of setting up and deploying your application, making it easy to get up and running with a single command.

### Production deployment

The `docker-compose.yml` file defines and manages multi-container Docker applications. Here's a brief description of the services defined in your Omni Analytics instance `docker-compose.yml` file:

- `app`: This service is built from the Dockerfile located at `./docker/php/Dockerfile`. It uses
  the `api-center-opv2/app:latest` image and depends on the `pgsql` and `redis` services. The application's code is
  mounted into the container at `/var/www/html`.

- `nginx`: This service uses the `nginx:alpine` image and depends on the `app` service. It exposes ports 80 and 443. The
  Nginx configuration files and the application's public and storage directories are mounted into the container.

- `worker`: This service is similar to the `app` service but is built from the Dockerfile located
  at `./docker/php/dev.Dockerfile`. It runs the `supervisord` command to manage processes.

- `schedule`: This service is similar to the `worker` service but runs the `crond` command to manage cron jobs.

- `pgsql`: This service uses the `postgres:16-alpine` image and sets up a PostgreSQL database with the specified
  environment variables. The database data is persisted in a Docker volume.

- `redis`: This service uses the `redis:alpine` image and sets up a Redis server. The Redis data is persisted in a
  Docker volume.

The `networks` section defines a network named `api-center-opv2` that is used by all services. The `volumes` section
defines two volumes, `pgsql` and `redis`, used by the `pgsql` and `redis` services respectively.

### Local deployment

The `docker-compose.local.yml` file is used to define and manage multi-container Docker applications for local development environments. Here's a brief description of the services defined in your `docker-compose.local.yml` file:

- `app`: This service uses the `api-center-opv2/app:latest` image and is built from the Dockerfile located
  at `./docker/php/Dockerfile`. The application's code is mounted into the container at `/var/www/html`. It depends on
  the `pgsql` and `redis` services and is part of the `api-center-opv2` network.

- `nginx`: This service uses the `nginx:alpine` image and depends on the `app` service. It exposes ports 80 and 443. The
  Nginx configuration files and the application's public and storage directories are mounted into the container. It is
  also part of the `api-center-opv2` network.

- `pgsql`: This service uses the `postgres:16-alpine` image and sets up a PostgreSQL database with the specified
  environment variables. The database data is persisted in a Docker volume named `pgsql`. It is part of
  the `api-center-opv2` network and has a health check configured to ensure the database is running correctly.

- `redis`: This service uses the `redis:alpine` image and sets up a Redis server. The Redis data is persisted in a
  Docker volume named `redis`. It is part of the `api-center-opv2` network and has a health check configured to ensure
  the Redis server is running correctly.

The `networks` section defines a network named `api-center-opv2` that is used by all services. The `volumes` section
defines two volumes, `pgsql` and `redis`, used by the `pgsql` and `redis` services respectively.

This configuration is typically used for local development environments, where you might need to run multiple
interdependent services. By using Docker Compose, you can manage these services in a coordinated way.

### Dockerfile

The `Dockerfile` is used to build a Docker image for a PHP application. Here's a brief description of what this file does:

- Starts from the `php:8.2-fpm-alpine` base image, which includes PHP 8.2 running on the Alpine Linux distribution
  with FastCGI Process Manager (FPM) pre-installed.
- Sets the timezone and installs Composer.
- Updates the package list of the Alpine Linux distribution and installs several necessary packages,
  including `curl`, `libpq-dev`, `icu-dev`, `zip`, `unzip`, `bash`, `gmp-dev`, and PHP development dependencies.
- Installs `supervisor` and `busybox-suid`. Supervisor is a process control system that allows you to monitor and
  control UNIX processes, and `busybox-suid` provides several stripped-down Unix tools in a single executable.
- Installs and configures the `zip` extension for PHP.
- Installs and enables the `redis` extension for PHP.
- Installs several other PHP extensions, including `pdo_pgsql`, `intl`, `bcmath`, `opcache`, `exif`, `pcntl`,
  and `gmp`.
- Sets up the GD extension for PHP.
- Cleans up temporary files and deletes PHP source files to reduce the size of the image.
- Creates a new user and group for running the application.
- Sets the working directory to `/var/www/html`.
- Switches to the newly created user.

This `Dockerfile` creates a Docker image that is ready to run a PHP application with all necessary extensions and configurations.

## Terraform Guide

### Quick start

To quickly start using Terraform, follow these steps:

**Copy Terraform Variables File**: Copy the `terraform/make/terraform.tfvars.example` file to `terraform/make/terraform.tfvars`:

```bash
$ cp  terraform/make/terraform.tfvars.example terraform/make/terraform.tfvars
```
**Set AWS Infrastructure Settings**: Set AWS Infrastructure Settings in `terraform/make/terraform.tfvars`.

**Create AWS Infrastructure**: Navigate to the `terraform/make` directory and initialize Terraform, then apply the configuration:

```bash
$ cd terraform/make
$ terraform init
$ terraform apply
```

This will create the necessary AWS infrastructure. Obtain the IP address and assign it to a domain name.

**Configure Project Deployment**: Configure Copy the `terraform/deploy/terraform.tfvars.example` file to `terraform/deploy/terraform.tfvars`:

```bash
$ cp  terraform/deploy/terraform.tfvars.example terraform/deploy/terraform.tfvars
```

Set project parameters in `terraform/deploy/terraform.tfvars` and deploy the project.

**Deploy the Project**: Navigate to the `terraform/deploy` directory, initialize Terraform, and apply the configuration:

```bash
$ cd terraform/deploy
$ terraform init
$ terraform apply
```

This will deploy the project using the configured AWS infrastructure.

### Repository

In the project deployment settings (`terraform/make/variables.tf`), specify a repository to clone the project. Ensure you have an SSH key for cloning.

### Prepare existing instance

This item should be skipped if you have completed the previous item ([Create AWS Infrastructure](#create-aws-infrastructure))

If you want to install the project on an existing instance, you need to open the necessary ports, and install Docker, docker-compose.

**Copy Terraform Variables File**: Copy the `terraform/make/terraform.tfvars.example` file to `terraform/make/terraform.tfvars`:

```bash
$ cp terraform/prepare/terraform.tfvars.example terraform/prepare/terraform.tfvars
```

**Set Project Parameters**: Set project parameters in `terraform/prepare/terraform.tfvars`. 

Navigate to the `terraform/prepare` directory:
```bash
$ cd terraform/prepare
```

Run the preparation script:
```bash
$ terraform prepare
```

### Domain assignment

After obtaining the IP address, assign it to the domain name.

### Project deployment

The project deployment details are specified in the `terraform/deploy/main.tf` file. This includes:

- **Variables**: Declare parameters, including SSH access, Node.js version, domain name, etc.
- **Module install_dependencies**: Installs required dependencies on the server (git, tmux, vim, etc.).
- **Module setup_app**: Sets up the application by cloning the repository, configuring environment variables, and running the application using Docker Compose.
- **Resource null_resource "ssl_certificates "**: Installs and configures SSL certificates on the server using Certbot, dependent on the setup_app module.


### Automatic deployment with GitHub Actions

For automatic deployment using GitHub Actions:

Use the `terraform/make/terraform.tfvars` file for automatic deployment.

Update the settings in the GitHub Actions workflow file to specify the modules to execute and the schema used in the application.

    Example settings:
    ```php
    scheme              = "http"
    stack_modules       = [ "app" ]
    ```

    Ensure to use escape characters for quotes.

    The `setup_app` module is responsible for setting up the application, installing dependencies, cloning the repository, configuring environment variables, and launching the application.

    Save the settings file as a secret (`TF_VARS`) for secure and automated deployments.

Utilize GitHub Actions with secrets (`AWS_ACCESS_KEY_ID`, `AWS_SECRET_ACCESS_KEY`, `SSH_KEY`, `SSH_REPO_KEY`, `TF_VARS`) for secure and automated deployments.

This project streamlines infrastructure setup and application deployment, providing a reliable and automated workflow for developers.

<!-- ### Appendix: Terraform details

The `terraform/make/main.tf` file is used to automatically create and configure AWS infrastructure:

1. `provider "aws"`: Defines AWS as the provider.
2. `resource "aws_key_pair" "deployer"`: Creates a key pair for EC2 instance access.
3. `resource "aws_instance" "ubuntu"`: Creates an EC2 instance with specified parameters.
4. Elastic IP and Security Group: Allocates an elastic IP and sets up a security group.
5. `output "public_ip"`: Outputs the public IP address of the EC2 instance.

All variables such as `var.aws_region`, `var.public_key_path`, `var.ami` and `var.instance_name` must be defined in
another Terraform file or passed as command line arguments when Terraform is started. In this case, `variables.tf` is
used.

Uses **user_data.sh**

```bash
resource "aws_instance" "example" {
    ...
    user_data = file("${path.module}/user_data.sh")
    ...
}
```

The `user_data.sh` file is a bash script that performs a series of operations to configure a new EC2 instance. Here's
what each part of this script does:

1. `sudo apt-get update`: Updates the apt package list.

2. Installing Docker dependencies: Installs the necessary packages for Docker to work.

3. Downloading and adding the official Docker public PGP key: This is necessary to authenticate Docker packages.

4. Verifying the key fingerprint: This is an additional security measure to verify the authenticity of the key.

5. Adding a stable Docker apt repository: This allows the system to install Docker from this repository.

6. `sudo apt-get update`: Updates the apt package list (for the new apt repository).

7. `sudo apt-get install -y docker-ce`: Installs Docker.

8. Gives the user access to the Docker CLI without requiring root access: This allows the user to use Docker without
   having to enter the root password.

9. Installing Docker Compose: Docker Compose is used to define and run multi-container Docker applications.

All of these operations are performed the first time a new EC2 instance is started, making it quick and easy to set up
the environment to work with Docker and Docker Compose.

When executed, the script will return the IP address of the instance

```bash
$ terraform apply
``` -->