---
sidebar_position: 1
---

# Introduction

Server-side Google Tag Manager (GTM) is a key component of Omni CDI's activation layer. It enables server-side tracking, enhanced data control, and improved website performance.

## Overview

Server-side GTM allows you to:
- Process tracking requests on your own infrastructure
- Reduce client-side code and improve page load times
- Maintain better control over data privacy and security
- Customize data collection and distribution

## Getting Started

1. Deploy the server-side GTM container
2. Configure your tracking endpoints
3. Set up custom tags and variables
4. Test and validate your implementation

For detailed setup instructions and best practices, continue reading through this section.

## Dependencies

The Omni Infrastructure/Warehousing pipeline powers the real-time version of the Omni Reporting pipeline, delivering rich, granular dashboards that track business growth in real time. In addition, it is designed to consume events dispatched from the collection and enrichment application, Omni Analytics, through the dedicated warehousing tags in the activation layer (GTM Server or AWS Lambda), via Omni Activation.

