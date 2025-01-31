---
sidebar_position: 2
---

# Motivation

The core motivation behind Omni Identity is to offer complete control over identity resolution and data enrichment, while ensuring performance, security, and scalability. Here's why Omni Identity was built:

- **Independent and flexible architecture**: Unlike traditional CDP systems where identity services are tightly coupled with fixed schemas, Omni Identity operates as a dedicated system with fully customizable identity schemas. This independence allows for greater flexibility and easier integration with other systems in your stack.

- **Open identity ecosystem**: Rather than keeping unified IDs locked within a closed system, Omni Identity liberates this valuable data to inform and enhance other elements of your technology stack. This open approach enables better cross-system coordination and more comprehensive user tracking.

- **Active data improvement**: Beyond simple identity resolution, Omni Identity enables you to actively improve your data quality based on resolved identities. This means you can continuously enhance your user profiles and make better use of the information across your entire data ecosystem.

- **Full control over data**: Omni Identity is a Dockerized application, meaning you have full control over where and how it's deployed. It can easily be integrated into your private infrastructure, giving you complete ownership and flexibility over your data.

- **Unified identity**: Omni Identity creates a unified ID that can be connected to any data source, ensuring fast integration with your existing tech stack. This makes it easier to manage and enrich user profiles, regardless of the data source or channel.

- **Scalable and efficient handling of identity transactions**: The application is designed to handle massive amounts of identity transactions, without burdening your other production databases. It isolates this process in a dedicated system, ensuring smooth operation without impacting your existing infrastructure.

- **Comprehensive user profiles**: Omni Identity is capable of building detailed user profiles, including lifecycle-based metrics and real-time reports. This data can be returned to clients through integration with activation tags, advertising systems, and other marketing tools to enable real-time activation.

- **Consent management**: The tool also captures information about user consent, ensuring compliance with privacy regulations and giving you full visibility into how user data is being managed.

- **Security and fast deployment**: Omni Identity is built with security in mind and can be deployed quickly, ensuring that you can start leveraging its benefits without delays or security concerns.

This combination of flexibility, performance, and compliance makes Omni Identity the ideal solution for companies that need powerful identity resolution and enrichment without compromising on control, security, or speed.

## Example Implementation: Meta Conversion API Tag

Omni Identity is integrated with the [Omni Meta Conversion API tag](/docs/activation/ssGTM/tags/meta-api), enhancing the way you track and enrich events. You can see and play with it yourself, as the tag is open source and available on GitHub. The way it works fully illustrates the benefits of Omni Identity.

- **Unified ID generation**: Omni Identity generates and stores a unique UUID (e.g., 123e4567-e89b-12d3-a456-426614174000), which is used to enrich incoming events. This unified ID is consistent across all channels and provides a reliable way to track users regardless of the data source. It is sent as the external_id property in the Meta Conversion API, ensuring proper matching of events to user profiles.

- **Enriching Meta events**: Omni Identity also enriches Meta events with additional identifiers such as email addresses or phone numbers associated with the user. This enhances the accuracy of matching and provides stronger user profiles, leading to better targeting and tracking for your campaigns.

- **Consent management**: The tool also captures information about user consent, ensuring compliance with privacy regulations and giving you full visibility into how user data is being managed.

- **Real-time enrichment**: The enrichment process happens quickly, ensuring that the data is processed during the standard Google Tag Manager (GTM) server tag execution, as outlined in the GTM Server execution flow diagram. This minimizes delays and ensures that the enriched data is available in real-time, keeping your reporting and targeting up-to-date.

- **Smooth processing**: Omni Identity processes identity data seamlessly without introducing any issues, allowing your system to scale and handle high volumes of events without compromising performance.

With Omni Identity, your [Meta Conversion API tag](/docs/activation/ssGTM/tags/meta-api) implementation is not only faster and more efficient, but also more accurate, enabling stronger user identification and better reporting.















