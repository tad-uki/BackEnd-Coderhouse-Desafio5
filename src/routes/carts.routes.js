import { Router } from "express";
import { CartManager } from "../persistence/classes/CartManager.js";


const router = Router()

const cartsService = new CartManager()





router.get("/", async (req, res)=>{
    try {
        const carts = await cartsService.getCarts()
        res.send(carts)
    } catch (error) {
        res.send(error)
    }
})

router.get("/:cid", async (req, res)=>{
    try {
        const idParam = req.params.cid
        const paramCart = await cartsService.getCartById(idParam)
        if(paramCart){
            res.send(paramCart)
        }
        else{
            res.send(new Error("Cart doesn't exist."))
        }
    } catch (error) {
        res.send(error)
    }
})

router.post("/", async (req, res) =>{
    try {
        let result = await cartsService.createCart()
        res.send(result)
    } catch (error) {
        res.send(error)
    }
})

router.post("/:cid/products/:pid", async (req, res)=>{
    try {
        const cartId = req.params.cid
        const productId = req.params.pid
        
        let result = await cartsService.addProductToCart(cartId, productId)
        res.json(result)
    } catch (error) {
        res.send(error)
    }
})

router.put("/:cid", async (req, res)=>{
    try {
        const cartId = req.params.cid
        const newCart = req.body

        let result = await cartsService.updateCart(cartId, newCart)
        res.json(result)
    } catch (error) {
        res.send(error)
    }
})

router.put("/:cid/products/:pid", async (req, res)=>{
    try {
        const cartId = req.params.cid
        const productId = req.params.pid
        const prodQuantity = req.body.quantity

        let result = await cartsService.updateProductQuantity(cartId, productId, prodQuantity)
        res.json(result)
    } catch (error) {
        res.send(error)
    }
})

router.delete("/:cid/", async (req, res)=>{
    try {
        const cartId = req.params.cid

        let result = await cartsService.emptyCart(cartId)
        res.json(result)
    } catch (error) {
        res.send(error)
    }
})

router.delete("/:cid/products/:pid", async (req, res)=>{
    try {
        const cartId = req.params.cid
        const productId = req.params.pid

        let result = await cartsService.deleteProductFromCart(cartId, productId)
        res.json(result)
    } catch (error) {
        res.send(error)
    }
})

router.delete("/", async (req, res)=>{
    try {
        let result = await cartsService.deleteCarts()
        res.json(result)
    } catch (error) {
        res.send(error)
    }
})

export {router as cartsRouter}