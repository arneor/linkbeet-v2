# ElastiCache (Redis) Terraform configuration
resource "aws_elasticache_subnet_group" "main" {
  name       = "linkbeet-cache-subnet"
  subnet_ids = var.subnet_ids
}

resource "aws_elasticache_cluster" "redis" {
  cluster_id           = "linkbeet-redis"
  engine               = "redis"
  node_type            = "cache.t3.micro"
  num_cache_nodes      = 1
  parameter_group_name = "default.redis7"
  engine_version       = "7.1"
  port                 = 6379
  subnet_group_name    = aws_elasticache_subnet_group.main.name
}

variable "subnet_ids" {
  type = list(string)
}
