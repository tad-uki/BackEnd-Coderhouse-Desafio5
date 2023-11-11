import { cartsModel } from "../mongo/carts.model.js";

class CartManager{
    constructor(){
        this.model = cartsModel
    };


    async getCarts(){
        try {
            const carts = await this.model.find()
            return carts;          

        } catch (error) {
            throw new Error(`Failed to get cart list: ${error}`)
        }
    };

    async getCartById(id){
        try {
            const cart = this.model.findById(id).populate("products.productId")
            if(!cart){
                throw new Error("Cart doesn't exist")
            }
            else{
                return cart;
            };
        } catch (error) {
            throw new Error(`Failed to get cart: ${error}`)
        }
    };

    async createCart(){
        try {
            const addedCart = {}
            const result = this.model.create(addedCart)
            return result
        } catch (error) {
            throw new Error(`Failed to add cart: ${error}`)
        }
        
    }
        
    async addProductToCart(cartId, prodId){
        try {
            
            const cart = await this.getCartById(cartId)
            
            if(cart.products.some((p)=>p.productId == prodId)){
                const prodIndex = cart.products.findIndex(p => p.productId == prodId);
                cart.products[prodIndex].quantity++
            }else{
                const newProduct = {productId: prodId, quantity: 1}
                cart.products.push(newProduct)

            }
            const result = this.model.findByIdAndUpdate(cartId, cart, {new:true})
            return result
            
             
        } catch (error) {
            throw new Error(`Failed to add product: ${error}`)
        }
        
    }

    async updateCart(cartId, newCart){
        const cart = await this.getCartById(cartId)
        cart.products = newCart

        const result = this.model.findByIdAndUpdate(cartId, cart, {new:true})
        return result
    }

    async updateProductQuantity(cartId, prodId, newQuant){
        const cart = await this.getCartById(cartId)
        const prodIndex = cart.products.findIndex(p => p.productId == prodId);

        cart.products[prodIndex].quantity = newQuant

        const result = this.model.findByIdAndUpdate(cartId, cart, {new:true})
        return result
    }

    async emptyCart(cartId){
        const cart = await this.getCartById(cartId)
        cart.products = []

        const result = this.model.findByIdAndUpdate(cartId, cart, {new:true})
        return result
    }

    async deleteProductFromCart(cartId, prodId){
        const cart = await this.getCartById(cartId)
        const prodIndex = cart.products.findIndex(p => p.productId == prodId);

        cart.products.splice(prodIndex, 1)

        const result = this.model.findByIdAndUpdate(cartId, cart, {new:true})
        return result
    }

    async deleteCarts(){
        const result = this.model.deleteMany({})
        return result
    }
};

export {CartManager}