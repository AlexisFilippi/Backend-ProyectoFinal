import { Router } from 'express';
import { productManager } from '../index.js';

const productsRouter = Router()


productsRouter.get('/', async (req, res) => {
    try {
        const {limit} = req.query
        const products = await productManager.getProducts()

        if (limit) {
            const limitedProducts = products.slice(0, limit)
            return res.json(limitedProducts)
        }

        return res.json(products)

    } catch (error) {
        console.log(error);
        res.send('Error al recibir productos')
    }
})

productsRouter.get('/:pid', async (req, res) => {
    const {pid} = req.params
    try {
        const products = await productManager.getProductById(pid)
        res.json(products)

    } catch {
        console.log(error);
        res.send(`Error al recibir producto con id ${pid}`)
    }
})

productsRouter.post('/', async (req, res) => {
    try {
       const { title, description, price, thumbnail, code, stock, status = true, category} = req.body

       const response = await productManager.addProduct({ title, description, price, thumbnail, code, stock, status, category})
       res.json(response)

    } catch ( error ){
        console.log(error);
        res.send(`Error al intentar agregar producto`)
    }
})

productsRouter.put('/:pid', async (req, res) => {
    const {pid} = req.params
    
    try {
        const { title, description, price, thumbnail, code, stock, status = true, category} = req.body
        const response = await productManager.updateProduct(pid, {title, description, price, thumbnail, code, stock, status, category})
        res.json(response)

    }
    catch(error){
        console.log(error);
        res.send(`Error al intentar editar producto con ${pid}`)
    }
})


productsRouter.delete('/:pid', async (req, res) => {
    const {pid} = req.params

    try{
        await productManager.deleteProduct(id)
        res.send('Producto eliminado exitosamente')
    }
    catch(error){
        console.log(error);
        res.send(`Error al intentar eliminar producto con ${pid}`)
    }
})

export { productsRouter }
