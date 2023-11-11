import { Router } from "express";
import { ProductManager } from "../persistence/classes/ProductManager.js";
import { CartManager } from "../persistence/classes/CartManager.js";

const router = Router()

const productsService = new ProductManager()
const cartsService =  new CartManager()

router.get("/", async(req, res)=>{
    try {
        const userData = req.session
        console.log(userData)
        if(!userData.email){
            res.redirect("/login")
        }
        else{
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
        
            const productList = await productsService.getPaginatedProducts(query, options)
        
            res.render("home", {products: productList.docs, userData:userData})
        }
        
    } catch (error) {
        res.render("home", {error: error.message})
    }
})

router.get("/api/carts/:cid", async (req, res)=>{
    try {
        const idParam = req.params.cid
        const paramCart = await cartsService.getCartById(idParam)
        const cartData = paramCart.products
        const productList = []

        cartData.forEach(obj =>{
            let newProduct = {
                title: obj.productId.title,
                price: obj.productId.price,
            }
            productList.push(newProduct)
        })

        if(paramCart){
            res.render("cartId", {products: productList})
        }
        else{
            res.send(new Error("Cart doesn't exist."))
        }
    } catch (error) {
        res.send(error)
    }
})

router.get("/signup", (req, res)=>{
    res.render("signup")
})

router.get("/login", (req, res)=>{
    res.render("login")
})


router.get("/realtimeproducts", (req, res)=>{
    res.render("realTimeProducts")
})


export {router as viewsRouter}