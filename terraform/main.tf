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

resource "aws_apprunner_service" "go_api" {
  service_name = var.go_service_name # <--- Usando variable

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

resource "aws_apprunner_service" "node_api" {
  service_name = var.node_service_name # <--- Usando variable

  source_configuration {
    image_repository {
      image_identifier      = "180294174325.dkr.ecr.us-east-1.amazonaws.com/node-api-repo:latest" 
      image_repository_type = "ECR"
      image_configuration {
        port = "4000"
        runtime_environment_variables = {
          GO_API_URL = "https://${aws_apprunner_service.go_api.service_url}"
          JWT_SECRET = var.jwt_secret_key
          APP_USER     = var.app_user
          APP_PASSWORD = var.app_password
        }
      }
    }
    authentication_configuration {
      access_role_arn = aws_iam_role.apprunner_ecr_role.arn
    }
  }
  depends_on = [aws_apprunner_service.go_api]
}