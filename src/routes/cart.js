const express = require('express')
const router = express.Router()
const filePath = 'productsCartList.json'
const fs = require('fs')

let productsCart = [];
let idCurrent = 1;

//Obtener lista de productos
router.get('/products',(req,res)=>{
	//Crear archivo JSON
	const productsData = fs.writeFileSync(filePath, JSON.stringify(productsCart, null, 2))
	console.log(productsData)
	return res.status(200).json({
		msg:'lista de productos',
		productsCart
	})
})

//Agregar productos
router.post('/products', (req,res)=>{
	//Obtener datos
	const { products } = req.body;
	//Modelo de datos
	const productsList ={
            cid:idCurrent,
            	products
             
	}
	//Agregar producto
	if(!products){
		return res.status(400).json({
			status: 'error',
			msg: 'No hay productos en tu carrito'
		})
	}
	idCurrent++;
	productsCart.push(productsList);
	return res.status(200).json({
	 	status:'success',
	 	msg:'Agregaste nuevos productos a tu carrito',
	 	products
	})
})

module.exports = router;