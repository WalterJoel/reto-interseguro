variable "github_connection_arn" {
  description = "ARN de la conexión de AWS con GitHub"
  type        = string
  default     = "arn:aws:apprunner:us-east-1:180294174325:connection/conexionrepo/5a130a3940284365a6b3b63a7f70e6fa" 
}
variable "github_repo_url" {
  description = "URL del repositorio de GitHub"
  type        = string
  default     = "https://github.com/WalterJoel/reto-talent-house.git" 
}

variable "github_branch" {
  description = "Branch del repositorio de GitHub"
  type        = string
  default     = "master"
}

variable "go_service_name" {
  description = "Nombre del servicio Go API"
  type        = string
  default     = "go-apiV6"
}


variable "node_service_name" {
  description = "Nombre del servicio Node API"
  type        = string
  default     = "node-apiV6"
}

