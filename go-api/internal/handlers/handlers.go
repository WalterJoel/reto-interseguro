package handlers

import (
	"github.com/gofiber/fiber/v2"
	"gonum.org/v1/gonum/mat"
)

type MatrixRequest struct {
	Matrices map[string][][]float64 `json:"matrices"`
}

type QRResult struct {
	Q [][]float64 `json:"q"`
	R [][]float64 `json:"r"`
}

type MatrixResponse struct {
	Matrices map[string]QRResult `json:"matrices"`
}

func MatrixQR(c *fiber.Ctx) error {
	req := new(MatrixRequest)
	if err := c.BodyParser(req); err != nil {
		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{"error": "Invalid request"})
	}

	resp := &MatrixResponse{
		Matrices: make(map[string]QRResult),
	}

	for name, data := range req.Matrices {
		if len(data) == 0 || len(data[0]) == 0 {
			continue
		}

		rows := len(data)
		cols := len(data[0])

		// Convertir a formato Gonum
		a := mat.NewDense(rows, cols, flatten(data))
		
		// Ejecutar Factorización QR
		var qr mat.QR
		qr.Factorize(a)

		// Extraer Q (Matriz Ortogonal)
		qMat := mat.NewDense(rows, rows, nil)
		qr.QTo(qMat)

		// Extraer R (Matriz Triangular Superior)
		rMat := mat.NewDense(rows, cols, nil)
		qr.RTo(rMat)

		resp.Matrices[name] = QRResult{
			Q: denseTo2DSlice(qMat),
			R: denseTo2DSlice(rMat),
		}
	}

	return c.JSON(resp)
}

func flatten(matrix [][]float64) []float64 {
	var flat []float64
	for _, row := range matrix {
		flat = append(flat, row...)
	}
	return flat
}

func denseTo2DSlice(d *mat.Dense) [][]float64 {
	r, c := d.Dims()
	out := make([][]float64, r)
	for i := 0; i < r; i++ {
		out[i] = make([]float64, c)
		for j := 0; j < c; j++ {
			out[i][j] = d.At(i, j)
		}
	}
	return out
}