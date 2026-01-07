#  Reto Matrix QR 


---

## 🚀 Probar la API en AWS (Producción)

1. **Swagger:** [https://nchtc3yhgw.us-east-1.awsapprunner.com/docs](https://nchtc3yhgw.us-east-1.awsapprunner.com/docs)
2. **🔐 Paso Obligatorio:** Login para obtener el token, luego clic en el botón **"Authorize"** (icono del candado) arriba a la derecha, ingresa el token. Caso contrario cualquier petición devolverá un error `401 Unauthorized`.
3. **Ejecuta:** Localiza el endpoint `POST /matrix/stats`, selecciona "Try it out" para obtener la descomposición y las estadísticas.

---

## Arquitectura del Sistema

Para este reto utilizamos Go y Node, luego decidimos usar ECR de AWS para subir las imagenes de docker para que sean leidas por APP RUNNER de AWS. Decidí utilizar app runner por cuestiones practicas en vez de Fargate.

* **NestJS (Orquestador):** Se encarga de la seguridad JWT, la validación de datos (DTOs) y el cálculo de estadísticas(mínimos, máximos y promedios).
* **Go (Cálculo):** Llega una solicitud de factorización QR, NestJS delega el cálculo a este microservicio para aprovechar su velocidad de ejecución.




---
### ☁️ Despliegue de Infraestructura (Terraform)

Para subir los cambios a AWS y actualizar los servicios de App Runner:

1. **Comandos:**  
   ```bash
   $ cd terraform   
   $ terraform init
   $ terraform plan
   $ terraform apply

## 💻 Ejecución Local

Desde la raíz del directorio
1. **Levantar GO:** 
   ```bash
    $ cd go-api/
    $ go mod tidy 
    $ go run cmd/main.go


2. **Levantar NEST:** 
   ```bash
   $ cd node-api/
   $ APP_USER=walter_admin APP_PASSWORD=Interseguro2026! JWT_SECRET=clave_local npm run start:dev
   

3. **Login para obtener token:** 
   ```bash
    http://localhost:4000/matrix-stats/login

4. **Procesar:** 
   ```bash
   # No olvidar enviar el bearer token en AUTH
    http://localhost:4000/matrix-stats

