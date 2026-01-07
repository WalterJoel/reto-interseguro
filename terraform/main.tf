# Permisos para ECR (se comparten para ambos servicios)
resource "aws_iam_role" "apprunner_ecr_role" {
  name = "AppRunnerECRAccessRoleAll"
  assume_role_policy = jsonencode({
    Version = "2012-10-17"
    Statement = [{
      Action = "sts:AssumeRole"
      Effect = "Allow"
      Principal = { Service = "build.apprunner.amazonaws.com" }
    }]
  })
}

resource "aws_iam_role_policy_attachment" "apprunner_ecr_policy" {
  role       = aws_iam_role.apprunner_ecr_role.name
  policy_arn = "arn:aws:iam::aws:policy/service-role/AWSAppRunnerServicePolicyForECRAccess"
}

# ===============================
# Go API (ECR) - Puerto 8081
# ===============================
resource "aws_apprunner_service" "go_api" {
  service_name = "go-api-final"

  source_configuration {
    image_repository {
      image_identifier      = "180294174325.dkr.ecr.us-east-1.amazonaws.com/go-api-repo:latest"
      image_repository_type = "ECR"
      image_configuration {
        port = "8081"
      }
    }
    authentication_configuration {
      access_role_arn = aws_iam_role.apprunner_ecr_role.arn
    }
  }
}

# ===============================
# Node API (ECR) - Puerto 4000
# ===============================
resource "aws_apprunner_service" "node_api" {
  service_name = "node-api-final"

  source_configuration {
    image_repository {
      image_identifier      = "180294174325.dkr.ecr.us-east-1.amazonaws.com/node-api-repo:latest"
      image_repository_type = "ECR"
      image_configuration {
        port = "4000"
        # Inyectamos la URL de Go aquí también
        runtime_environment_variables = {
          GO_API_URL = "https://${aws_apprunner_service.go_api.service_url}"
        }
      }
    }
    authentication_configuration {
      access_role_arn = aws_iam_role.apprunner_ecr_role.arn
    }
  }
  depends_on = [aws_apprunner_service.go_api]
}