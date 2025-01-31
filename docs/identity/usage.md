---
sidebar_position: 4
---

# API Usage Guide

## Overview

The Omni Identity API provides two approaches to identity resolution:
1. **Deterministic Identity Resolution** - Based on exact matching of identifiers (currently available)
2. **Probabilistic Identity Resolution** - Based on statistical analysis and machine learning (in development)

## Deterministic Identity Resolution

### Introduction

Deterministic identity resolution uses exact matching of identifiers like email, phone, or anonymous IDs to link user identities across platforms. This method provides high-confidence identity matching when explicit identifiers are available.

The Omni Identity API enables identity resolution and enrichment within your private infrastructure. It provides capabilities for:

- User identity resolution across platforms
- Anonymous user tracking and linking
- Event data correlation
- Identity enrichment with user properties

## Authentication

All API requests require authentication using a Bearer token in the Authorization header:

```bash
Authorization: Bearer <your-access-token>
```

## Base URL

The API endpoint is specific to your deployment. After installation, your domain will typically follow this pattern:

```
https://identity.<your-domain>.com/api/v1
```

For example: `https://identity.clientname.com/api/v1`

## API Endpoints

### Create or Update Identifier

Creates or updates a user identifier with associated event data and properties.

**Endpoint:** `POST /identifier`

**Request Headers:**
```bash
Content-Type: application/json
Authorization: Bearer <your-access-token>
```

**Request Body Parameters:**

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| platform | string | Yes | Platform identifier for the event source |
| count_prev_visits | boolean | Yes | Whether to track visit count |
| anonymous_id | string | Yes* | Unique identifier for anonymous user |
| email | string | Yes* | User's email address |
| phone | string | No | User's phone number |
| fbclid | string | No | Facebook click identifier for attribution |
| gaclid | string | No | Google Ads client ID for attribution |
| valuation_properties | object | No | Event-specific data (see below) |

\* Either `anonymous_id` OR `email` must be provided.

**Note:** While only one identifier (`anonymous_id` or `email`) is required, providing multiple identifiers when available improves identity resolution accuracy.

**Valuation Properties Structure:**

The `valuation_properties` object is flexible and can contain any key-value pairs that are relevant to your analytics strategy. While it has a standard structure, the properties themselves can be customized:

```json
{
  "action": string,    // Event action type (e.g., "purchase", "signup", "pageview")
  "properties": {      // Flexible key-value pairs based on your analytics needs
    // Standard e-commerce examples:
    "value": number,   
    "currency": string,
    "transaction_id": string,
    
    // Custom engagement metrics:
    "time_on_page": number,
    "scroll_depth": number,
    "user_segment": string,
    
    // Content interaction:
    "content_category": string,
    "interaction_type": string,
    "engagement_score": number,
    
    // Form interactions:
    "form_name": string,
    "completion_rate": number,
    
    // Custom business metrics:
    "lead_score": number,
    "customer_lifetime_value": number,
    "acquisition_channel": string
  }
}
```

**Planning Valuation Properties:**

When designing your valuation properties, consider:

1. **Business Goals:**
   - Revenue metrics (purchases, subscriptions)
   - Lead generation metrics (form submissions, downloads)
   - Engagement metrics (time on site, interaction depth)

2. **User Journey Mapping:**
   - Entry point tracking
   - Conversion funnel stages
   - Drop-off points
   - Re-engagement signals

3. **Analytics Requirements:**
   - Required dimensions for reporting
   - KPIs and success metrics
   - Segmentation criteria
   - Attribution modeling needs

4. **Data Granularity:**
   - Session-level metrics
   - User-level aggregates
   - Time-based patterns
   - Cross-platform behaviors

Example use cases:

```json
// E-commerce purchase
{
  "action": "purchase",
  "properties": {
    "value": 99.99,
    "currency": "USD",
    "transaction_id": "12345ABC",
    "product_categories": ["electronics", "accessories"],
    "is_first_purchase": true,
    "cart_abandonment_recovery": false
  }
}

// Content engagement
{
  "action": "article_read",
  "properties": {
    "category": "technology",
    "read_time": 180,
    "scroll_percentage": 85,
    "social_shares": 2,
    "subscription_status": "premium"
  }
}

// Lead scoring
{
  "action": "form_submission",
  "properties": {
    "form_type": "whitepaper_download",
    "industry": "healthcare",
    "company_size": "50-200",
    "lead_score": 85,
    "marketing_qualified": true
  }
}
```

**Best Practices for Valuation Properties:**
1. Define a consistent naming convention (start with a robust tracking plan!)
2. Document all custom properties and their purposes
3. Align properties with your analytics and reporting requirements
4. Consider future analysis needs when designing property structure
5. Balance granularity with data volume
6. Include both quantitative and qualitative metrics when relevant

**Example Request with All Available Parameters:**

```bash
curl -X POST https://identity.clientname.com/api/v1/identifier \
  -H "Authorization: Bearer <your-access-token>" \
  -H "Content-Type: application/json" \
  -d '{
    "platform": "omniIdentityLoggingKey",
    "count_prev_visits": true,
    "anonymous_id": "anonUser1234567",
    "email": "user@example.com",
    "phone": "+1234567890",
    "fbclid": "IwAR2Kr8vH1J2P9g9L5X8T_7qg_zq26-hLdg3lz-BVcqZdbMzYb60ZMEqF-Vk",
    "gaclid": "EAIaIQobChMIg7n5p7W",
    "valuation_properties": {
      "action": "purchase",
      "properties": {
        "value": 99.99,
        "currency": "USD",
        "transaction_id": "12345ABC"
      }
    }
  }'
```

**Success Response:**

```json
{
  "success": true,
  "data": {
    "uuid": "2bdb5eba-a84e-473b-9f83-e7cb0d4236af",
    "email": "",
    "count_prev_visits": 1
  }
}
```

### Retrieve Identifier Journal

To retrieve the journal (history of events and actions), use the same endpoint as create/update but omit the `count_prev_visits` parameter. All other parameters remain valid and can be included as needed.

**Example Request:**

```bash
curl -X POST https://identity.clientname.com/api/v1/identifier \
  -H "Authorization: Bearer <your-access-token>" \
  -H "Content-Type: application/json" \
  -d '{
    "platform": "omni-cdi-activation-gtmss",
    "anonymous_id": "anonUser1234567",
    "valuation_properties": {
      "action": "omniIdentityLoggingKey_TAG_NAME_1.0_pageview",
      "properties": {
        "page_url": "https://example.com/products",
        "referrer": "https://google.com"
      }
    }
  }'
```

**Example Journal Response:**

```json
{
  "success": true,
  "data": {
    "uuid": "2bdb5eba-a84e-473b-9f83-e7cb0d4236af",
    "journal": [
      {
        "anonymous_id": "anonUser1234567",
        "platform": "omni-cdi-activation-gtmss",
        "valuation_properties": {
          "action": "omniIdentityLoggingKey_TAG_NAME_1.0_pageview",
          "properties": {
            "page_url": "https://example.com/products",
            "referrer": "https://google.com"
          }
        },
        "created_at": "2025-01-30T10:01:57.000000Z"
      },
      {
        "anonymous_id": "anonUser1234567",
        "platform": "omni-cdi-activation-gtmss",
        "email": "user@example.com",
        "valuation_properties": {
          "action": "omniIdentityLoggingKey_TAG_NAME_1.0_form_submit",
          "properties": {
            "form_id": "newsletter_signup",
            "page_url": "https://example.com/products"
          }
        },
        "created_at": "2025-01-30T10:02:15.000000Z"
      }
    ]
  }
}
```

**Key Points:**
- Journal entries are ordered chronologically with the most recent events first
- Each entry preserves the exact payload that was sent in the original request
- The journal shows how identity evolves over time (e.g., when email was added)
- The action field includes version and event type information
- Platform information helps track the source of each interaction

## Error Handling

The API uses standard HTTP response codes:

- 200: Success
- 400: Bad Request - Invalid parameters
- 401: Unauthorized - Invalid or missing authentication
- 403: Forbidden - Insufficient permissions
- 500: Internal Server Error

Error responses include a message describing the issue:

```json
{
  "success": false,
  "error": {
    "message": "Description of the error",
    "code": "ERROR_CODE"
  }
}
```

## Rate Limiting

The API implements rate limiting to ensure stable service. Limits are specified in the response headers:

```
X-RateLimit-Limit: 1000
X-RateLimit-Remaining: 999
X-RateLimit-Reset: 1640995200
```

## Best Practices

1. Always store and reuse the anonymous_id for consistent user tracking
2. Include `fbclid`, `gclid`, `gaclid`, `phone`, and `email` when available for accurate attribution 
3. Implement proper error handling for API responses
4. Cache responses when appropriate to minimize API calls
5. Use HTTPS for all API communications

## Implementation Examples

### Basic Implementation

#### 1. Simple Identity Resolution

```javascript
async function resolveIdentity(userId, email) {
  const response = await fetch('https://identity.clientname.com/api/v1/identifier', {
    method: 'POST',
    headers: {
      'Authorization': 'Bearer <your-access-token>',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      platform: 'web',
      anonymous_id: userId,
      email: email,
      count_prev_visits: true
    })
  });

  return await response.json();
}
```

#### 2. Basic Event Tracking

```javascript
async function trackEvent(userId, eventName, properties) {
  return await fetch('https://identity.clientname.com/api/v1/identifier', {
    method: 'POST',
    headers: {
      'Authorization': 'Bearer <your-access-token>',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      platform: 'web',
      anonymous_id: userId,
      valuation_properties: {
        action: eventName,
        properties: properties
      }
    })
  });
}

// Usage example
trackEvent('user123', 'page_view', {
  page_url: window.location.href,
  referrer: document.referrer
});
```

### Intermediate Integration Examples

#### 1. Segment Integration

This example shows how to use Omni Identity to minimize MTUs across all your Segment sources:

```javascript
class SegmentIdentityConnector {
  constructor(apiKey) {
    this.apiKey = apiKey;
    this.cache = new Map();
  }

  async initialize() {
    // Add middleware to Segment
    analytics.addSourceMiddleware(async ({ payload, next }) => {
      const enrichedPayload = await this.enrichSegmentEvent(payload);
      next(enrichedPayload);
    });
  }

  async enrichSegmentEvent(event) {
    const identity = await this.resolveIdentity(event);
    
    return {
      ...event,
      userId: identity.data.uuid, // Use unified ID as Segment userId
      context: {
        ...event.context,
        traits: {
          ...event.context?.traits,
          unifiedId: identity.data.uuid,
          visitCount: identity.data.count_prev_visits
        }
      }
    };
  }

  async resolveIdentity(event) {
    const cacheKey = event.userId || event.anonymousId;
    
    if (this.cache.has(cacheKey)) {
      return this.cache.get(cacheKey);
    }

    const response = await fetch('https://identity.clientname.com/api/v1/identifier', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${this.apiKey}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        platform: 'segment',
        anonymous_id: event.anonymousId,
        email: event.context?.traits?.email,
        count_prev_visits: true,
        valuation_properties: {
          action: event.event,
          properties: event.properties
        }
      })
    });

    const identity = await response.json();
    this.cache.set(cacheKey, identity);
    
    return identity;
  }
}

// Usage
const connector = new SegmentIdentityConnector('your-api-key');
connector.initialize();

// Your regular Segment calls will now be enriched
analytics.track('Product Viewed', {
  product_id: 'P123',
  product_name: 'Running Shoes'
});
```

### Advanced Integration Examples

#### 1. Dagster ETL Pipeline for Customer Scoring

This example demonstrates a sophisticated integration using Dagster to build a customer scoring system:

```python
from dagster import job, op, Out, In, graph
import requests
import pandas as pd
from datetime import datetime, timedelta
from typing import List, Dict

@op
def fetch_identity_journal(context, user_ids: List[str]) -> List[Dict]:
    """Fetches complete interaction history for users from Omni Identity."""
    journals = []
    
    for user_id in user_ids:
        response = requests.post(
            "https://identity.clientname.com/api/v1/identifier",
            headers={
                "Authorization": "Bearer <your-access-token>",
                "Content-Type": "application/json"
            },
            json={
                "platform": "dagster-analytics",
                "anonymous_id": user_id
                # Note: count_prev_visits omitted to get full journal
            }
        )
        
        if response.ok:
            journals.append(response.json()['data'])
    
    return journals

@op
def calculate_customer_metrics(context, journals: List[Dict]) -> pd.DataFrame:
    """Calculates key customer metrics from journal data."""
    customer_metrics = []
    
    for journal_data in journals:
        user_metrics = {
            'uuid': journal_data['uuid'],
            'total_purchases': 0,
            'total_spend': 0,
            'avg_order_value': 0,
            'first_purchase_date': None,
            'last_purchase_date': None,
            'purchase_frequency': 0,
            'engagement_score': 0
        }
        
        purchase_amounts = []
        engagement_events = 0
        
        # Analyze journal entries
        for entry in journal_data['journal']:
            props = entry['valuation_properties']
            
            # Track purchases
            if props['action'] == 'purchase':
                amount = props['properties'].get('value', 0)
                purchase_amounts.append(amount)
                user_metrics['total_spend'] += amount
                
                purchase_date = datetime.fromisoformat(
                    entry['created_at'].replace('Z', '+00:00')
                )
                if not user_metrics['first_purchase_date']:
                    user_metrics['first_purchase_date'] = purchase_date
                user_metrics['last_purchase_date'] = purchase_date
            
            # Track engagement
            if props['action'] in ['page_view', 'product_view', 'add_to_cart']:
                engagement_events += 1
        
        # Calculate derived metrics
        if purchase_amounts:
            user_metrics.update({
                'total_purchases': len(purchase_amounts),
                'avg_order_value': sum(purchase_amounts) / len(purchase_amounts)
            })
        
        if user_metrics['first_purchase_date'] and user_metrics['last_purchase_date']:
            days_active = (
                user_metrics['last_purchase_date'] - 
                user_metrics['first_purchase_date']
            ).days
            if days_active > 0:
                user_metrics['purchase_frequency'] = (
                    user_metrics['total_purchases'] / days_active
                )
        
        # Calculate engagement score
        user_metrics['engagement_score'] = (
            (engagement_events * 0.3) + 
            (user_metrics['total_purchases'] * 0.7)
        )
        
        customer_metrics.append(user_metrics)
    
    return pd.DataFrame(customer_metrics)

@op
def predict_customer_value(context, customer_metrics: pd.DataFrame) -> pd.DataFrame:
    """Predicts future customer value using calculated metrics."""
    customer_metrics['predicted_90d_value'] = (
        customer_metrics['avg_order_value'] * 
        customer_metrics['purchase_frequency'] * 90 *
        (1 + (customer_metrics['engagement_score'] * 0.1))
    )
    
    return customer_metrics

@op
def update_customer_segments(context, predictions: pd.DataFrame):
    """Updates customer segments in activation platforms."""
    high_value_customers = predictions[
        predictions['predicted_90d_value'] > 1000
    ]['uuid'].tolist()
    
    # Push segments back to Omni Identity for activation
    for uuid in high_value_customers:
        requests.post(
            "https://identity.clientname.com/api/v1/identifier",
            headers={
                "Authorization": "Bearer <your-access-token>",
                "Content-Type": "application/json"
            },
            json={
                "platform": "dagster-analytics",
                "anonymous_id": uuid,
                "count_prev_visits": True,
                "valuation_properties": {
                    "action": "segment_update",
                    "properties": {
                        "segment": "high_value_predicted",
                        "predicted_value": "1000+"
                    }
                }
            }
        )

@graph
def customer_value_prediction():
    """Defines the customer value prediction pipeline."""
    users = fetch_identity_journal()
    metrics = calculate_customer_metrics(users)
    predictions = predict_customer_value(metrics)
    update_customer_segments(predictions)

# Schedule the pipeline
@job(schedule_interval="@daily")
def daily_customer_prediction():
    customer_value_prediction()
```

This integration demonstrates how Omni Identity can serve as both a data source for advanced analytics and a destination for activating insights, creating a complete closed loop for customer data operations. All of this can be achieved within your private data infrastructure.

#### 2. Real-time Personalization Engine

This example shows how to use Omni Identity for real-time content personalization:

```typescript
class PersonalizationEngine {
  constructor(private apiKey: string) {}

  async getPersonalizedContent(userId: string): Promise<ContentRecommendation[]> {
    // First, get unified identity and history
    const identity = await this.resolveIdentity(userId);
    
    // Analyze user behavior patterns
    const patterns = this.analyzePatterns(identity.data.journal);
    
    // Generate personalized recommendations
    return this.generateRecommendations(patterns);
  }

  private async resolveIdentity(userId: string) {
    const response = await fetch('https://identity.clientname.com/api/v1/identifier', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${this.apiKey}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        platform: 'personalization',
        anonymous_id: userId
      })
    });

    return await response.json();
  }

  private analyzePatterns(journal: any[]): UserPatterns {
    const patterns = {
      categories: new Map<string, number>(),
      timeOfDay: new Map<string, number>(),
      engagementLevel: 0
    };

    journal.forEach(entry => {
      const props = entry.valuation_properties.properties;
      
      // Track category preferences
      if (props.category) {
        patterns.categories.set(
          props.category,
          (patterns.categories.get(props.category) || 0) + 1
        );
      }

      // Track time of day preferences
      const hour = new Date(entry.created_at).getHours();
      patterns.timeOfDay.set(
        hour.toString(),
        (patterns.timeOfDay.get(hour.toString()) || 0) + 1
      );

      // Calculate engagement level
      if (props.time_spent) {
        patterns.engagementLevel += props.time_spent;
      }
    });

    return patterns;
  }

  private async generateRecommendations(
    patterns: UserPatterns
  ): Promise<ContentRecommendation[]> {
    // Implementation of recommendation logic based on patterns
    // ...
  }
}

// Usage
const personalization = new PersonalizationEngine('your-api-key');
const recommendations = await personalization.getPersonalizedContent('user123');
```

## Probabilistic Identity Resolution

:::note Development Status
The probabilistic identity resolution feature is currently under development. This advanced capability will use machine learning and statistical analysis to identify likely matches between user identities based on behavioral patterns, device information, and other signals when explicit identifiers are not available.

Key features in development:
- Machine learning-based identity matching
- Behavioral pattern analysis
- Device fingerprinting
- Confidence scoring for identity matches
- Cross-device tracking capabilities

Documentation for probabilistic identity resolution will be available once the feature is released.
:::


