---
sidebar_position: 1
---

# Full-funnel fusion pattern

FunnelFusion is the first of our presented customer data architecture patterns. In essence, the name conveys the idea of combining various tracking techniques (client-side, server-side, CRM webhook) to provide a comprehensive, unified view of the customer journey and ensure accurate, enriched conversion tagging. It implies that all stages of the funnel are connected and work in harmony, optimizing the tracking and activation process from start to finish.

```mermaid
%%{init: {
  'theme': 'base',
  'themeVariables': {
    'labelBackground': '#ffffff00',
    'labelBackgroundOpacity': '0',
    'fontFamily': 'Poppins, sans-serif'
  }
}}%%

graph TD
  %% PHASE 1: DATA TRACKING
  subgraph "PHASE 1: DATA TRACKING"
    A1["Client-side Tracking (Landing Page)"] -->|Event Data| B1["Omni Activation"]
    A2["Server-side Tracking (Backend)"] -->|Event Data| C1["Omni Analytics"]
    A3["Webhook Tracking (CRM System)"] -->|Event Data| C1
  end

  %% PHASE 2: DATA PROCESSING
  subgraph "PHASE 2: DATA PROCESSING"
    C1 -->|Processed Data| P1["Omni Analytics Data Processing"]
    P1 -->|Validated Data| B1
  end

  %% PHASE 3: DATA ACTIVATION & ENRICHMENT
  subgraph "PHASE 3: DATA ACTIVATION & ENRICHMENT"
    B1 -->|Event Data| D1["Omni Activation Engine"]
    D1 -.->|Identity Resolution| X1["Omni Identity Enrichment"]
    X1 -->|Enriched Data| E1["Advertising & Tag Dispatch"]
    E1 -->|Conversion Events| F1["Ad Tracking Platforms"]
  end

  %% ERROR HANDLING & MONITORING
  subgraph "ERROR HANDLING & MONITORING"
    D1 -.->|Validation Error| ERR1["Error Log"]
    E1 -.->|API Error| ERR2["API Error Log"]
  end

  %% STYLING
  classDef tracking fill:#f9f,stroke:#333,stroke-width:3px;
  classDef processing fill:#dfd,stroke:#333,stroke-width:3px;
  classDef activation fill:#ff0,stroke:#333,stroke-width:3px;
  classDef enrichment fill:#bbf,stroke:#333,stroke-width:3px;
  classDef error stroke:#f66,stroke-width:3px;

  class A1,A2,A3 tracking;
  class C1,P1 processing;
  class B1,D1,E1 activation;
  class X1 enrichment;
  class ERR1,ERR2 error;

  linkStyle default stroke:#333,stroke-width:3px;
  ```

## Pattern Overview

This pattern is particularly valuable for organizations seeking to:

1. Minimize client-side tracking while maintaining data quality
2. Implement robust server-side conversion tracking
3. Enrich conversion data with CRM information
4. Ensure accurate cross-channel attribution

### Key Components

#### Data Tracking Layer
- Basic tracking on your website using Omni Tracking or GA4
- Captures important events directly from your servers (like when users sign up or submit forms)
- Gets customer data and updates from your CRM system

#### Data Processing Layer
- All data from your servers and CRM flows through Omni Analytics for checking and processing
- Website events can go straight to marketing platforms when speed is important
- Makes sure your data is accurate and complete at every step

#### Activation Layer
- Uses Omni Activation to manage and send data to marketing platforms
- Adds customer profile data to your events before sending them to ad platforms
- Brings together all your tracking data from different sources into one complete view

### Benefits

1. **Enhanced data quality**: Server-side tracking reduces client-side dependencies and improves reliability
2. **Improved privacy compliance**: Minimized client-side tracking aligns with privacy-first approaches
3. **Rich identity context**: Integration with CRM data provides deeper customer insights
4. **Flexible architecture**: Supports various tracking methods while maintaining data consistency
5. **Optimized performance**: Reduces client-side overhead while maintaining tracking accuracy

### Use Cases

This pattern is ideal for:
- E-commerce platforms with complex conversion funnels
- B2B companies with long sales cycles
- Organizations with strict privacy requirements
- Businesses requiring accurate cross-channel attribution