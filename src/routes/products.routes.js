import { Router } from "express";
import { ProductManager } from "../persistence/classes/ProductManager.js";

const router = Router()

const productsService = new ProductManager()



router.get("/", async(req, res)=>{
    try {
        const {limit = 10, page = 1, sort, category, price} = req.query

        const query = {}

        const options = {
            limit,
            page,
            sort,
            lean: true
        }

        if(sort) options.sort = sort === "asc" ? {price: 1} : sort === "desc" ? {price: -1} : null
        if(category) query.category = category
        if(price) query.price = price

        const products = await productsService.getPaginatedProducts(query, options)

        const result = {
            status: "success",
            payload: products.docs,
            totalPages: products.totalPages,
            page: products.page,
            prevPage: products.prevPage,
            nextPage: products.nextPage,
            hasPrevPage: products.hasPrevPage,
            hasNextPage: products.hasNextPage,
        }
        res.json(result)
    } catch (error) {
        res.send(error)
    }
})

router.get("/:pid", async (req, res)=>{
    try {
        
        const idParam = req.params.pid
        console.log(idParam)
        const paramProduct = await productsService.getProductById(idParam)
        
        if(paramProduct){
            res.send(paramProduct)
        }
        else{
            res.send(idParam)
        }
    } catch (error) {
        res.send(error)
    }
})

router.post("/", async (req, res)=>{
    try {
        const newProduct = req.body
        let result = await productsService.createProduct(newProduct)
        res.json({operationStatus:"success", message:result})
    } catch (error) {
        res.json({operationStatus:"error", message:error.message})
    }
})

router.put("/:pid", async (req, res)=>{
    try {
        const idParam = req.params.pid
        const updProduct = req.body
        let result = await productsService.updateProduct(idParam, updProduct)
        res.send(result)
    } catch (error) {
        res.send(error)
    }
})

router.delete("/:pid", async (req, res)=>{
    try {
        const idParam = req.params.pid
        let result = await productsService.deleteProduct(idParam)
        res.send(result)
    } catch (error) {
        res.send(error)
    }
})

export {router as productsRouter}