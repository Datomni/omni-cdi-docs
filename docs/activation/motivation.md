---
sidebar_position: 2
head:
  - - link
    - rel: stylesheet
    - href: https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600&display=swap
---

# Motivation

Traditional client-side tag management slows page loads, raises privacy risks, and limits data control. Omni CDI addresses these issues with a server-side activation layer through Omni Activation.

Omni Activation processes and activates data collected through our open-source, private infrastructure, which is deployed on the customer's servers. Activation occurs via Omni CDI tags deployed on these servers across dev, test, and prod environments. We integrate with server-side GTM, Segment (via custom functions), and are currently developing AWS Lambda tags.

## Key Benefits

- **Performance**: Cut client-side JavaScript to speed up page loads
- **Privacy**: Filter sensitive data before it leaves your infrastructure
- **Control**: Full visibility and control over data flow
- **Flexibility**: Custom integrations with any platform
- **Compliance**: Simplify GDPR and CCPA management

## Execution Flow

All Omni CDI tags follow a unified execution flow, offering complete visibility into data processing and tag execution. While slight variations may occur based on the environment, the core flow remains consistent. The diagram below shows this standard flow.

```mermaid
%% Direction and theme
%%{init: {
  'theme': 'base',
  'themeVariables': {
    'labelBackground': '#ffffff00',
    'labelBackgroundOpacity': '0',
    'fontFamily': 'Poppins, sans-serif'
  }
}}%%

graph TD
  %% Main Execution Path
  A[Tag Execution Initialized] --> B[Tag Init Timestamp]
  B --> D[Data Properties Processing]
  D --> E[Assemble Payload per Mapping]
  E --> F[Payload Validation]
  
  %% Enrichment (Optional, Sequential)
  E -.->|Optional| G{Enrichment Available?}
  G -->|Yes| H[Enrichment Step 1]
  H --> I[Enrichment Step 2]
  I --> J[... Nth Enrichment Step]
  J ==>|Success| K[Enriched Payload]
  %% Enrichment Failure handling
  J -.-x ERR0>Enrichment Error]
  ERR0 --> MON0[Omni Error Monitor]
  ERR0 --> CMON0[Omni Client Monitor]
  ERR0 -.-> F
  K --> F
  
  %% Validation & Results
  F ==>|Success| O[Payload Validation Successful]
  F -.-x ERR1>Validation Error]
  ERR1 --> MON1[Omni Error Monitor]
  ERR1 --> CMON1[Omni Client Monitor]

  O --> P[Formatting Payload for Dispatch]
  %% Formatting Failure handling
  P ==>|Success| Q[Payload Formatting Complete]
  P -.-x ERR2>Formatting Error]
  ERR2 --> MON2[Omni Error Monitor]
  ERR2 --> CMON2[Omni Client Monitor]

  Q --> R[API Dispatch]
  R --> T[API Request]

  %% Response Handling & Monitoring
  T ==>|Success| U[Request Successful]
  T -.-x ERR3>API Error]
  ERR3 --> MON3[Omni Error Monitor]
  ERR3 --> CMON3[Omni Client Monitor]

  U ==> W[Tag Execution End Timestamp]

  %% Success Monitoring
  W -->|Log| M1[Omni Monitor: Success]
  R -->|Log| M3[Omni Monitor: Response]

  %% Styling
  classDef main fill:#f9f,stroke:#333,stroke-width:2px;
  classDef step fill:#dfd,stroke:#333,stroke-width:2px;
  classDef enrichment fill:#ff0,stroke:#333,stroke-width:2px;
  classDef monitoring fill:#bbf,stroke:#333,stroke-width:2px;
  classDef error stroke:#f66,stroke-width:2px;

  class A,B,D,E,F,O,P,Q,R,T,U,W main;
  class G,H,I,J,K enrichment;
  class M1,M3,MON0,MON1,MON2,MON3,CMON0,CMON1,CMON2,CMON3 monitoring;
  class ERR0,ERR1,ERR2,ERR3 error;

  linkStyle default stroke:#333,stroke-width:2px;
```

The execution flow of Omni CDI tags starts with the tag initialization and timestamp recording. Next, the data properties are processed, and the payload is assembled based on the defined mapping. The payload is then validated to ensure it meets the required standards.

If enrichment is available, the flow proceeds with optional enrichment steps. These steps are sequential and can include multiple stages. For example, the Omni Identity integration, already implemented in the [open-source full customer journey Meta API tag](/docs/activation/ssGTM/tags/meta-api), enriches the payload with additional customer data. If enrichment is successful, the payload is enhanced; if any enrichment step fails, the tag continues with the standard execution flow, and the error is logged with monitoring triggered.

Once the payload is validated, it's formatted for dispatch. If formatting fails, an error is logged, and monitoring is triggered. If successful, the payload is dispatched via an API request.

Finally, the request's success or failure is tracked. If successful, the tag execution ends, and success is logged. If an error occurs at any point, the appropriate error handling and monitoring steps are activated.

This diagram illustrates the standard execution flow for Omni CDI tags, highlighting each step and its corresponding error handling. For a detailed implementation example, check our [Meta Conversion API tag documentation](/docs/activation/ssGTM/tags/meta-api).