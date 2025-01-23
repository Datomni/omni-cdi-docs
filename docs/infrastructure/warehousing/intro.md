---
sidebar_position: 1
---

# Introduction

Our warehousing infrastructure is based on the open-source Snowplow framework. We offer two types of Terraform modules: end-to-end pipelines, which handle the full warehousing lifecycle, including schema validation, and dedicated warehouse components for lighter setups.

## Dependencies

The Omni Infrastructure/Warehousing pipeline powers the real-time version of the Omni Reporting pipeline, delivering rich, granular dashboards that track business growth in real time. In addition, it is designed to consume events dispatched from the collection and enrichment application, Omni Analytics, through the dedicated warehousing tags in the activation layer (GTM Server or AWS Lambda), via Omni Activation.

