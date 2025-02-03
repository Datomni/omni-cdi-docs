---
sidebar_position: 1
---

# GA4-BigQuery

## Overview

A dbt package that transforms raw GA4 event data into actionable analytics models. The package provides:

1. Event flattening - Extracts nested event parameters and user properties into columnar format
2. Session tracking - Groups events into sessions with enriched metadata
3. Traffic analysis - Standardized metrics for visitor behavior and sources
4. Conversion tracking - Customer conversion identification and session attribution

## Model Architecture

### Base Models

`ga4_metrics__events_flattened`
- Purpose: Flattens raw GA4 event data
- Key transformations: 
  - Extracts event parameters to columns
  - Normalizes user properties
  - Adds event metadata

`ga4_metrics__page_views`
- Purpose: Page view analysis
- Key fields:
  - Host URLs
  - Referrer data
  - View timestamps

### Session Models

`ga4_metrics__sessions_stitched`
- Purpose: Session consolidation
- Key features:
  - Source attribution
  - Session duration
  - Page sequence

`ga4_metrics__sessions`
- Purpose: Session-level metrics
- Includes:
  - Conversion status
  - Traffic source
  - Session properties

### Aggregation Models

#### Traffic Analysis
- `ga4_metrics__aggregate_day_tofu`: Daily visitor metrics by source
- `ga4_metrics__aggregate_month_to_avg_quarter_tofu`: Rolling averages
- `ga4_metrics__aggregate_month_tofu`: 30-day aggregates
- `ga4_metrics__aggregate_year_tofu`: 365-day aggregates
- `ga4_metrics__spot_month_tofu`: Point-in-time monthly snapshots
- `ga4_metrics__spot_year_tofu`: Point-in-time yearly snapshots

#### Conversion Analysis
- `ga4_metrics__aggregate_conversions`: Daily conversion rates
- `ga4_metrics__aggregate_month_to_avg_quarter_mofu`: Rolling conversion averages
- `ga4_metrics__aggregate_month_mofu`: 30-day conversion totals
- `ga4_metrics__aggregate_year_mofu`: 365-day conversion totals
- `ga4_metrics__spot_month_mofu`: Monthly conversion snapshots
- `ga4_metrics__spot_year_mofu`: Yearly conversion snapshots

## Setup Guide

### 1. Package Installation

Add to `packages.yml`:
```yaml
packages:
  - package: Datomni/ga4_metrics
    version: ">=0.1.0"
```

Run: `dbt deps`

### 2. Configuration Options

#### Database Settings
In `dbt_project.yml`:
```yaml
vars:
    ga4_schema: analytics      # Default schema
    ga4_database: your_db_name # Target database
```

#### Model Configuration
Customize table names and business logic:
```yaml
vars:
    # Source table
    ga4_events_tbl: "events_*"  # GA4 events table pattern

    # Time zone for daily aggregations
    timezone: "US/Pacific"      # Default: UTC

    # Conversion definition
    conversion_event: "free_trial_initiated"  # Default: "" (no conversion)

    # Traffic source mapping
    traffic_source_medium_types: {
        'organic': ['organic'],
        'paid': ['cpc', '(none)'],
        'offline': ['offline'],
        'referral': ['referral'],
        'email': ['email']
    }
```

#### Schema Management
Override default schema naming:
```yaml
models:
  ga4_metrics:
    +schema: ga4_metrics

seeds:
  +schema: ga4_metrics
```

### Technical Requirements

- **Supported Databases**: BigQuery
- **dbt Version**: Compatible with dbt Core
- **GA4 Data**: Requires raw GA4 event export tables