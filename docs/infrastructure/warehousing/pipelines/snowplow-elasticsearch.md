---
sidebar_position: 2
---

# Terraform Snowplow Elasticsearch

A Terraform module which deploys a pipeline to load Snowplow data into ElasticSearch using the Snowplow Open Source artefacts. This module builds the Collector application, the Enrich application and the ElasticSearch Loader.

For more details on the Snowplow Pipeline, please visit their [Official Documentation site](https://docs.snowplow.io/docs/understanding-your-pipeline/architecture-overview-aws/). ElasticSearch loader specific details and pre-requisites are documented [here](https://docs.snowplow.io/docs/destinations/forwarding-events/elasticsearch/#setup-guide). 

## Usage
Import the module and provide the required configuration variables.

```
module "snowplow-databricks-pipeline" {
  source = "Datomni/snowplow-elasticsearch-pipeline/aws"

  vpc_id             = var.vpc_id
  private_subnet_ids = var.private_subnet_ids
  public_subnet_ids  = var.public_subnet_ids

  s3_bucket_name = var.s3_bucket_name
  
  iglu_server_url      = var.iglu_server_url
  iglu_server_apikey   = var.iglu_server_apikey

  es_cluster_endpoint         = var.es_cluster_endpoint
  es_cluster_index            = var.es_cluster_index
  es_cluster_port             = var.es_cluster_port
  es_cluster_http_ssl_enabled = var.es_cluster_http_ssl_enabled
  aws_es_domain_name          = var.aws_es_domain_name
}
```

## Examples

For a complete implementation example, visit [Github](https://github.com/Datomni/terraform-aws-snowplow-elasticsearch-pipeline/tree/main/examples/complete). 


