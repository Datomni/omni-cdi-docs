---
sidebar_position: 2
---

# Terraform Snowplow Databricks

A Terraform module which deploys a pipeline to load Snowplow data into Databricks using the Snowplow Open Source artefacts. This module builds the Collector application, the Enrich application and the Databricks Loader.

For more details on the Snowplow Pipeline, please visit their [Official Documentation site](https://docs.snowplow.io/docs/understanding-your-pipeline/architecture-overview-aws/). Databricks loader specific details and pre-requisites are documented here:
 [here](https://docs.snowplow.io/docs/destinations/warehouses-and-lakes/rdb/loading-transformed-data/databricks-loader/#setting-up-databricks). 

## Usage
Import the module and provide the required configuration variables.

```
module "snowplow-databricks-pipeline" {
  source = "Datomni/snowplow-databricks-pipeline/aws"

  vpc_id             = var.vpc_id
  private_subnet_ids = var.private_subnet_ids
  public_subnet_ids  = var.public_subnet_ids

  s3_bucket_name = var.s3_bucket_name

  databricks_host      = var.databricks_host
  databricks_password  = var.databricks_password
  databricks_schema    = var.databricks_schema
  databricks_port      = var.databricks_port
  databricks_http_path = var.databricks_http_path
  iglu_server_url      = var.iglu_server_url
  iglu_server_apikey   = var.iglu_server_apikey
}
```

## Examples

For a complete implementation example, visit [Github](https://github.com/Datomni/terraform-aws-snowplow-databricks-pipeline/tree/main/examples/complete). 


