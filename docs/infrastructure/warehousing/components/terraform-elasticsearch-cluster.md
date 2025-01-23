---
sidebar_position: 1
---

# Terraform Elasticsearch cluster

This module creates a simple, single node ElasticSearch cluster on AWS.

## Usage

```
module "elasticsearch-cluster" {
  source = "Datomni/elasticsearch-cluster/aws"
  
  domain_name     = var.domain_name
  master_user     = var.master_user
  master_password = var.master_password
}
```

## Examples

For a complete implementation example, visit [Github](https://github.com/Datomni/terraform-aws-elasticsearch-cluster/tree/main/examples/complete). 
