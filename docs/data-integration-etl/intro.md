---
sidebar_position: 1
---

# Introduction

An essential part of any customer data setup is shaping the data schema and enriching the customer data with third-party sources. While real-time enrichment is vital for certain datapoints like email quality, for less urgent or aggregate data, using an ETL process—comprising of extraction, transformation, and load steps—works just as well.

## ETL in Omni CDI

Omni CDI comes with ETL components that enrich your customer data using third-party sources. These tools are packaged as Dockerized micro-apps, and are easy to deploy in your cloud setup. They come with a simple front-end interface and Python/Celery backend. As a result, you can customize data sync schedules and securely store authorization credentials, while having full control over your data.