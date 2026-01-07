variable "go_service_name" {
  description = "Nombre del servicio Go API"
  type        = string
  default     = "go-api-finalV1"
}

variable "node_service_name" {
  description = "Nombre del servicio Node API"
  type        = string
  default     = "node-api-finalV1"
}

variable "jwt_secret_key" {
  description = "Clave secreta para firmar los tokens JWT en Node.js"
  type        = string
  sensitive   = true
}