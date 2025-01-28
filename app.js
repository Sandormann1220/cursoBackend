const express = require('express')
const app = express()

const port = 8080;
//Middleware para interpretar archivos json
app.use(express.json())

//Rutas
//Productos
const routes_products = require('./src/routes/products')
app.use('/api',routes_products)
//Carrito
const routes_cart = require('./src/routes/cart')
app.use('/api/cart', routes_cart)

app.listen(port, () => {
	console.log(`Puerto: ${port}`)
})