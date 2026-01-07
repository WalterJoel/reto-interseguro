package main

import (
	"go-api/internal/handlers"
	"log"

	"github.com/gofiber/fiber/v2"
)

func main() {
	app := fiber.New()

	// Rutas
	app.Post("/matrix-qr", handlers.MatrixQR)

	log.Println("Go API listening on :8081")

	// Levantar servidor y manejar errores
	if err := app.Listen(":8081"); err != nil {
		log.Fatalf("Error starting server: %v", err)
	}
}
