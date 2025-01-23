---
sidebar_position: 2
---

# Motivation

Here are the requirements we have established for the real-time reporting system.

- **Data freshness**: For a dashboard to be truly real-time, it must rely on a real-time data streaming pipeline that captures and stores data immediately as it is generated.
- **Handling complex queries and concurrency**: A good reporting layer should be able to handle complex queries quickly and support some level of concurrency to ensure a smooth user experience. Marketing queries can become complicated, involving multiple data sources, filters, and aggregations, and they need to deliver results instantly. Caching is essential to keep frequently accessed data in memory, which significantly improves query performance.
- **Access to historical data**: Access to historical data is crucial for building comparison-based metrics and reports, as well as for enrichment. This differs from streaming or log analytics, which are also based on real-time pipelines but mainly focus on immediate data feed health and typically do not store much historical data.


