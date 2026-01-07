package handlers

import (
	"github.com/gofiber/fiber/v2"
	"gonum.org/v1/gonum/mat"
)

// Request struct
type MatrixRequest struct {
	Matrices map[string][][]float64 `json:"matrices"`
}

// Response struct
type MatrixResponse struct {
	Matrices map[string][][]float64 `json:"matrices"`
}

// MatrixQR handler seguro
func MatrixQR(c *fiber.Ctx) error {
	req := new(MatrixRequest)
	if err := c.BodyParser(req); err != nil {
		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{
			"error": "Invalid request",
		})
	}

	resp := &MatrixResponse{
		Matrices: make(map[string][][]float64),
	}

	for name, data := range req.Matrices {
		if len(data) == 0 || len(data[0]) == 0 {
			// Saltar matrices vacías
			continue
		}

		cols := len(data[0])
		rows := len(data)

		// Validar que todas las filas tengan la misma longitud
		valid := true
		for _, row := range data {
			if len(row) != cols {
				valid = false
				break
			}
		}
		if !valid {
			return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{
				"error": name + " is not a valid rectangular matrix",
			})
		}

		a := mat.NewDense(rows, cols, flatten(data))
		var qr mat.QR
		qr.Factorize(a)
		r := mat.NewDense(rows, cols, nil)
		qr.RTo(r)

		resp.Matrices[name] = denseTo2DSlice(r)
	}

	return c.JSON(resp)
}

// flatten [][]float64 -> []float64
func flatten(matrix [][]float64) []float64 {
	flat := []float64{}
	for _, row := range matrix {
		flat = append(flat, row...)
	}
	return flat
}

// denseTo2DSlice convierte mat.Dense -> [][]float64
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
