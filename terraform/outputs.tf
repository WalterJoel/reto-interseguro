output "go_api_url" {
  description = "URL pública del Go API"
  value       = aws_apprunner_service.go_api.service_url
}

output "node_api_url" {
  description = "URL pública del Node API"
  value       = aws_apprunner_service.node_api.service_url
}
