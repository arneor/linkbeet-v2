# RDS Terraform configuration
variable "db_name" { default = "linkbeet" }
variable "db_username" { default = "postgres" }
variable "db_instance_class" { default = "db.t3.medium" }

resource "aws_db_instance" "main" {
  identifier        = "linkbeet-rds"
  engine            = "postgres"
  engine_version    = "16.3"
  instance_class    = var.db_instance_class
  db_name           = var.db_name
  username          = var.db_username
  password          = var.db_password
  storage_type      = "gp3"
  allocated_storage = 20
  multi_az          = true
  
  skip_final_snapshot = false
  final_snapshot_identifier = "linkbeet-final-snapshot"
}

variable "db_password" {
  sensitive = true
}
