---
sidebar_position: 1
---

# Introduction

> 👋 Welcome! This is technical documentation intended for developers and system administrators implementing Omni Analytics. For business features, pricing, and product overview, please visit our [product page](https://www.datomni.com/products/omni-analytics).

The event capture and ingestion engine is the heart of your customer data infrastructure. It processes events in real-time and directs them to specific consumers or warehouses. In the case of Omni CDI, this role is fulfilled by Omni Analytics. Omni Analytics converts unstructured or semi-structured raw data from various sources into enriched, well-structured payloads for downstream consumption. Operating as a Dockerized application, Omni Analytics can be easily deployed in your cloud environment.

## Key Features

- **Real-time data processing**: Instantly processes data from raw sources to downstream consumers.

- **Knowledge gain:** Prioritizes data quality and knowledge gain over mere data volume.

- **Noise reduction:** Minimizes noise in unstructured events before they impact your business processes.

A good way to visualize how it works is to see Omni Analytics functioning like a factory production line. Just like any other factory, it processes raw materials through steps of cleaning, refinement or enrichment, molding, packaging, and dispatch. The refined end product is then ready for further phases in the system. This is exactly what happens in your Omni Analytics instance with your event data.