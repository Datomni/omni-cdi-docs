---
sidebar_position: 2
---

# Installation

We recommend self-hosting the server-side GTM container. This approach provides complete control over data collection and processing, and infrastructure, while maintaining independence from third-party services. It is consistently used across the entire Omni customer data infrastructure. Along with Dockerized Omni Analytics collectors and Omni Identity, it provides a chance to build a fully independent customer data infrastructure.

This guide provides step-by-step instructions for deploying server-side GTM on AWS infrastructure. Only the first step is AWS-specific, and the remaining steps are applicable to most cloud providers.

:::important
Make sure to complete the preview server setup and verify it's working before proceeding with the main server installation.
:::

## Launch EC2 Instances

You'll need to launch two EC2 instances: one for the main activation server and another for the preview server.

### Main Activation Server
- Instance Type: t2.small
- AMI: Ubuntu Server 24.04 LTS (HVM)
- Storage: General Purpose SSD (gp2)

### Preview Server
- Instance Type: t2.micro
- AMI: Ubuntu Server 24.04 LTS (HVM)
- Storage: General Purpose SSD (gp2)

### Configuration Steps
1. Create a key pair for SSH access
2. Configure security groups with the following rules:
   - SSH (Port 22) - Source: Your office IP range(s) or VPN IP
   - HTTPS (Port 443) - Source: 0.0.0.0/0
   - HTTP (Port 80) - Source: 0.0.0.0/0 
   - Custom TCP (Port 8080) - Source: Internal VPC CIDR or localhost only
3. Additional security recommendations:
   - Enable AWS VPC flow logs for network monitoring
   - Use AWS Security Groups as the firewall
   - Enable AWS CloudTrail for API and resource monitoring
4. Allocate and associate Elastic IPs to both instances
5. Configure AWS Network ACLs as an additional security layer:
   - Allow inbound traffic only on ports 80, 443 (from anywhere)
   - Allow inbound SSH only from trusted IP ranges
   - Deny all other inbound traffic by default

## Server Preparation

First, update the permissions for both server private keys:

```bash
chmod 400 your-preview-server-private-key.pem
chmod 400 your-main-server-private-key.pem
```

## Server Configuration

SSH into each server instance:

```bash
ssh -i /path/to/private-key.pem ubuntu@your-server-ip
```

Follow these steps on both preview and main servers:

1. Update the system packages:
```bash
sudo apt update && sudo apt upgrade -y
```

2. Install and configure Docker:
```bash
sudo apt-get install docker.io -y
sudo systemctl start docker
sudo systemctl enable docker
sudo usermod -aG docker ${USER}
newgrp docker
```

3. Pull the GTM cloud image:
```bash
docker pull gcr.io/cloud-tagging-10302018/gtm-cloud-image:stable
```

### Preview Server Setup
```bash
docker run -p 8080:8080 \
  -e CONTAINER_CONFIG='your_container_config_here' \
  -e RUN_AS_PREVIEW_SERVER=true \
  gcr.io/cloud-tagging-10302018/gtm-cloud-image:stable
```

### Main Server Setup
```bash
docker run -p 8080:8080 \
  -e CONTAINER_CONFIG='your_container_config_here' \
  -e PREVIEW_SERVER_URL='your_preview_server_url_here' \
  gcr.io/cloud-tagging-10302018/gtm-cloud-image:stable
```

Verify the server health status:
```
http://your-public-elastic-ip:8080/healthz
```

## Domain and NGINX Configuration

1. Install NGINX and Certbot:
```bash
sudo apt-get install nginx -y
sudo apt-get update
sudo apt-get install certbot python3-certbot-nginx -y
```

2. Configure your domain DNS to point to the server IP

3. Set up SSL certificates:
```bash
sudo certbot --nginx -d your-server-subdomain.your-domain.com
```

4. Configure NGINX reverse proxy:
```bash
sudo nano /etc/nginx/sites-available/default
```

Add this configuration within the server block (port 443):
```nginx
location / {
    proxy_pass http://localhost:8080;
    proxy_set_header Host $host;
    proxy_set_header X-Real-IP $remote_addr;
    proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
    proxy_set_header X-Forwarded-Proto $scheme;
}
```

5. Test and apply NGINX configuration:
```bash
sudo nginx -t
sudo systemctl restart nginx
```

6. Verify the final setup:
```
https://your-server-subdomain.your-domain.com/healthz
```

:::tip
The server should respond with 'ok' if everything is configured correctly.
:::


