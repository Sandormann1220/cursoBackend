const express = require('express')
const router = express.Router()

let products = [];
let idCurrent = 1;

//Obtener lista de productos
router.get('/products',(req,res)=>{
	return res.status(200).json({
		msg:'lista de productos',
		products
	})
})
//Buscar un producto
router.get('/product/:id', (req,res)=>{
	//Obtener id del producto
	const productId = parseInt(req.body.id)
	let research_product = products.findIndex(product => product.id === productId);
	
	if(research_product === -1){
		return res.status(400).json({
			status: 'error',
			msg: 'Producto no encotrado', 
			research_product
		})
	}

	return res.status(200).json({
		status:'sucess',
		msg: 'Producto encontrado',
		research_product
		})	

})
//Agregar un rpoducto
router.post('/product', (req,res)=>{
	//Obtener datos
	const {title, description, code, price, status, stock, category, thumbnails} = req.body;
	//Modelo de datos
	const product ={
            id:idCurrent,
            title,
            description,
            code,
            price,
            status,
            stock,
            category,
            thumbnails 
	}
	//Agregar producto
	if(!title || !description || !code){
		return res.status(400).json({
			status: 'error',
			msg: 'Ingresaste los datons incompletos'
		})
	}
	idCurrent++;
	products.push(product);
	return res.status(200).json({
	 	status:'success',
	 	msg:'Agregaste un nuevo producto',
	 	products
	})
})
router.delete('/product/:id',(req,res)=>{
	//Obtener el id de los paramétros de la url
	const listId = parseInt(req.body.id);
	//Buscar el id por el index
	const productIndex = products.findIndex(product => product.id === listId);
	
	//Borrar producto
	const deleteProduct = products.splice(productIndex,1)
	if(productIndex === -1){
		return res.status(200).json({
	 	status:'sucess',
	 	msg: 'Eliminaste un rpoducto',
	 	productIndex
		})
	}
	deleteProduct
	return res.status(400).json({
			status:'error',
			msg: 'Error al borrar el producto',
			productIndex
	 })
	 
})
module.exports = router;