# Omni CDI Documentation

This repository contains the documentation website for Omni Customer Data Infrastructure (CDI), built using [Docusaurus](https://docusaurus.io/).

## What is Omni CDI?

Omni CDI is a composable customer data infrastructure designed to run in private cloud environments. It provides:

- Real-time event capture and processing
- Data transformation and formatting
- ETL task management
- Full data ownership and control

Key components include:
- Data Ingestion & Processing
- Infrastructure & Warehousing
- Data Integration (ETL)
- Activation Layer
- Reporting

## Documentation Structure

The documentation is organized into several main sections:

- `/docs/intro` - Platform overview and getting started
- `/docs/data-ingestion-processing` - Event capture and processing
- `/docs/infrastructure` - Cloud infrastructure setup
- `/docs/data-integration-etl` - Data integration guides
- `/docs/activation` - Server-side GTM and activation
- `/docs/reporting` - Analytics and reporting

## Local Development

Basic commands for working with the documentation:

```bash
# Install dependencies
yarn

# Start local development server
yarn start

# Build static files
yarn build
```

The local development server will start at `http://localhost:3000` and most changes are reflected live without needing to restart the server.

## Building for Production

To build the static files for production deployment:

```bash
yarn build
```

This generates static content into the `build` directory which can be served using any static hosting service.

## Deployment

For deployment, you can use either SSH or standard authentication:

```bash
# Using SSH
USE_SSH=true yarn deploy

# Without SSH
GIT_USER=<Your GitHub username> yarn deploy
```

## Project Configuration

Key configuration files:
- `docusaurus.config.ts` - Main configuration file
- `sidebars.ts` - Documentation navigation structure
- `src/pages/` - Custom pages
- `src/components/` - React components
- `docs/` - Documentation content

## Contributing

For questions or assistance with Omni CDI implementation, please [schedule a consultation](https://calendly.com/datomni-consulting/).

## License

Copyright © Datomni LLC. All rights reserved.
