---
sidebar_position: 1
---

# Omni Meta API Tag

A powerful server-side GTM tag template for sending data to Meta (Facebook) Conversion API with advanced identity resolution and conversion matching capabilities.

## Overview

One of the key challenges in Meta Conversion API is consistently reporting conversions along the customer lifecycle, especially through online to offline channels. What we see currently is that companies struggle with this, ending up with a number of key conversions that are completely invisible to the Meta ecosystem, and not being able to run ad optimization for them. A diagram illustrating this problem is shown below. 

<div align="center">

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
    A[User Clicks Ad - Tracked] --> B[Website Visit - Tracked]
    B --> C[Lead Generation - Tracked]
    C --> D[User Added to CRM - Not Tracked]
    
    D --> E[User Revisits Website - Tracked]
    E --> F[Downloads Whitepaper - Tracked]
    F --> G[Key CRM Activity Logged - Not Tracked]
    
    G --> H[Downloads Pricelist - Not Tracked]
    H --> I[Decision to Purchase Logged in CRM - Not Tracked]

    classDef tracked fill:#c9f8c9,stroke:#3b9e3b,stroke-width:2px;
    classDef notTracked fill:#fdd,stroke:#f00,stroke-width:2px;
    
    class A,B,C,E,F tracked;
    class D,G,H,I notTracked;
```

</div>

The Meta API Server-Side Tag enables direct server-to-server communication with Meta's Conversion API, maximizing conversion matching through Omni Identity resolution. This tag supports full-funnel conversion tracking and provides comprehensive payload enrichment capabilities. You can download the tag immediately from the [GitHub repo](https://github.com/Datomni/omni-activation-gtmss-meta-api), but be sure to read the documentation to understand how the tag works.

## Execution specifics

Below is a diagram showing how the Omni Meta API tag applies the general execution flow of our tags, including steps such as Omni Identity Resolution and data property processing. 

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
  D --> E[Assemble Payload with event_data & user_data]
  E --> F[Payload Validation - hash validity, property dependencies]
  
  %% Enrichment (Single Step)
  E -.->|Omni Identity| H[Enrichment: Omni Identity]
  H --> F
  
  %% Validation & Results
  F ==>|Success| O[Payload Validation Successful]
  F -.-x ERR1>Validation Error]
  ERR1 --> MON1[Omni Error Monitor]
  ERR1 --> CMON1[Omni Client Monitor]
  
  O --> P[Formatting Payload into Array for Dispatch]
  P ==>|Success| Q[Payload Formatting Complete]
  P -.-x ERR2>Formatting Error]
  ERR2 --> MON2[Omni Error Monitor]
  ERR2 --> CMON2[Omni Client Monitor]
  
  Q --> R[API Dispatch: Meta Conversion API]
  R --> T[API Request]
  
  %% Response Handling & Monitoring
  T ==>|200 OK| U[Request Successful]
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
  class H enrichment;
  class M1,M3,MON1,MON2,MON3,CMON1,CMON2,CMON3 monitoring;
  class ERR1,ERR2,ERR3 error;
  
  linkStyle default stroke:#333,stroke-width:2px;

```


## Key Features

### Conversion Tracking
- Complete customer journey tracking from awareness to purchase
- Real-time event validation and enrichment
- Support for all Meta standard and custom events
- Enhanced conversion matching through identity resolution
- Compatible with GA4 and Omni data clients

### Identity Resolution & Enrichment
- Real-time cross-channel identity resolution
- Automatic user ID generation via Omni Identity
- Payload enrichment for maximum Meta API match rates
- Cross-device and cross-channel identity stitching
- Smart fallback mechanisms for missing identifiers
- Customizable data cleaning and normalization

### Privacy & Security
- Automatic data hashing for PII fields
- LDU (Limited Data Use) compliance support
- Configurable data processing options
- Privacy-friendly identity resolution
- Secure server-side data handling

### Monitoring & Debugging
- Multi-level logging (DEBUG, INFO, ERROR)
- Integration with Datomni Central Error Monitor
- Advanced debugging with trace IDs
- Tag execution time tracking
- Detailed validation reporting

## Technical Architecture

### Data Processing Layers

1. **Payload Construction Layer**
   - Event data normalization
   - Basic payload assembly
   - Field validation and cleaning

2. **Identity Resolution Layer**
   - Cross-channel identity matching
   - User ID generation and enrichment
   - Identity graph integration

3. **Validation Layer**
   - Field-level validation
   - Hash verification
   - Required field checks
   - LDU compliance validation

4. **Enrichment Layer**
   - Identity-based enrichment
   - Custom data addition
   - Value normalization

5. **Dispatch Layer**
   - API communication handling
   - Error management
   - Response processing

## Configuration

### Basic Setup

1. **Meta Configuration**
   - Meta Pixel ID
   - Access Token
   - Test Event Code (optional)

2. **Identity Resolution Settings**
   - Enable/Disable Omni Identity
   - Identity Resolution Endpoint
   - Access Token
   - Anonymous User Identifier

3. **Event Settings**
   - Event Name
   - Custom Event Name (if applicable)
   - Action Source
   - Event ID (optional)

### User Data Configuration

1. **Required Fields**
   - Client IP Address
   - User Agent
   - Event Source URL

2. **Optional Fields**
   - Email
   - Phone
   - First Name
   - Last Name
   - Gender
   - Date of Birth
   - City
   - State
   - ZIP
   - Country
   - External ID

### Custom Data Configuration

1. **E-commerce Data**
   - Currency
   - Value
   - Content Type
   - Content Name
   - Content Category
   - Content IDs
   - Contents Array
   - Delivery Category
   - Order ID

2. **Product Schema**
   - Schema Type (Omni/Custom)
   - Array Variable Name
   - ID Field Name
   - Quantity Field Name
   - Price Field Name

### Privacy Settings

1. **Limited Data Use (LDU)**
   - Enable/Disable LDU
   - Country Code
   - State Code

2. **Data Processing Options**
   - Processing Options Array
   - Processing Options Country
   - Processing Options State

## Implementation Guide

### 1. Tag Setup

1. Download the Omni Meta API tag template from [the GitHub repo](https://github.com/Datomni/omni-activation-gtmss-meta-api)
2. Import the template into your server-side GTM container
3. Create a new tag using the imported template
4. Configure the basic settings:
   - Tag name
   - Meta Pixel ID
   - Meta API Access Token
   - Action Source

### 2. Identity Resolution Setup

1. Enable Omni Identity Resolution in tag settings if needed
2. Configure the Identity Resolution parameters:
   - Endpoint URL
   - Access Token
   - Anonymous User Identifier settings
   - Enrichment preferences

### 3. Event Configuration

1. Select the event type:
   - Standard Meta event
   - Custom event
2. Configure event parameters based on your data layer
3. Map required user data fields
4. Set up custom data parameters as needed
5. Configure any additional event settings

## Validation & Testing

### Event Validation

1. Check Meta Events Manager for event receipt
2. Verify conversion matching in Meta Ads Manager
3. Monitor server-side GTM logs for validation messages
4. Review Omni Identity resolution status

### Debug Mode

Enable debug mode to access:
- Detailed logging
- Payload validation results
- Identity resolution details
- API response information

## Error Handling

### Common Error Types

1. **Validation Errors**
   - Missing required fields
   - Invalid hash formats
   - Malformed payloads

2. **API Errors**
   - Authentication failures
   - Rate limiting
   - Network timeouts

3. **Identity Resolution Errors**
   - Service unavailability
   - Token expiration
   - Invalid configurations

### Error Response Format

```javascript
{
  type: "Error",
  process: "Operation",
  scope: "Omni Tag",
  message: "Error details...",
  timestamp: "1234567890",
  traceId: "abc123..."
}
```

## Monitoring & Maintenance

### Performance Monitoring

- Tag execution time tracking
- API response times
- Identity resolution latency
- Error rates and types

### Health Checks

1. Regular validation of:
   - API tokens
   - Endpoint availability
   - Event receipt
   - Conversion matching rates

2. Monitoring dashboards for:
   - Event volume
   - Error rates
   - Performance metrics
   - Identity resolution success rates

## Support & Resources

### Version Information
- Current Version: 1.31
- Tag Name: Omni Meta Conversion API

### Support Contacts
- Technical Support: support@datomni.com
- Implementation Support: activation@datomni.com
- Documentation: docs@datomni.com

### Additional Resources
- [Meta Conversion API Documentation](https://developers.facebook.com/docs/marketing-api/conversions-api/)
- [Server-Side GTM Guide](https://developers.google.com/tag-platform/tag-manager/server-side)

## License
Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.

## Examples

For a complete implementation example, visit [Github](https://github.com/Datomni/terraform-aws-elasticsearch-cluster/tree/main/examples/complete). 
