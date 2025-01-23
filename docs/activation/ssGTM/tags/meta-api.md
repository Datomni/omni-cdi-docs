---
sidebar_position: 1
---

# Meta API Server-Side Tag

A powerful server-side GTM tag template for sending data to Meta (Facebook) Conversion API with advanced identity resolution and conversion matching capabilities.

## Overview

The Meta API Server-Side Tag enables direct server-to-server communication with Meta's Conversion API while maximizing conversion matching through Omni Identity resolution. This tag supports full-funnel conversion tracking and provides comprehensive payload enrichment capabilities.

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

1. Download the Omni Meta API tag template from the Datomni Tag Gallery
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
Copyright © 2024 Datomni Inc.
All rights reserved.

## Examples

For a complete implementation example, visit [Github](https://github.com/Datomni/terraform-aws-elasticsearch-cluster/tree/main/examples/complete). 
