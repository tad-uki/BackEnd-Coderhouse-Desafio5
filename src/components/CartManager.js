import fs from "fs";

class CartManager{
    constructor(pathFile){
        this.path = pathFile
    };

    fileExist(){
        if(fs.existsSync(this.path)){
            return fs.existsSync(this.path)
        }
        else{
            throw new Error("Failed to locate file.")
        }
    }

    async getCarts(){
        try {
            if(this.fileExist()){
                const JsonCarts = await fs.promises.readFile(this.path, "utf-8")
                const carts = await JSON.parse(JsonCarts)
                return await carts;                
            }
        } catch (error) {
            throw new Error(`Failed to get cart list: ${error}`)
        }
    };

    async addCart(){
        try {
            if(this.fileExist()){
                const carts = await this.getCarts()
                const addedCart = {products: []}

                let listLength = carts.length;
                if(listLength === 0){
                    addedCart.idCart = 1
                }
                else{
                    addedCart.idCart =carts[listLength - 1].idCart + 1;
                }
                carts.push(addedCart);
                await fs.promises.writeFile(this.path, JSON.stringify(carts))
                return carts
            }
        } catch (error) {
            throw new Error(`Failed to add cart: ${error}`)
        }
        
    }
        

    async getCartById(id){
        try {
            if(this.fileExist()){
                const cartsList = await this.getCarts()
                let cart = cartsList.find((p) => p.idCart === id);
                if(!cart){
                    throw new Error("Cart doesn't exist")
                }
                else{
                    return cart.products;
                };
            }
        } catch (error) {
            throw new Error(`Failed to get cart: ${error}`)
        }
    };

    async addCartProduct(cartId, prodId){
        try {
            if(this.fileExist()){
                const carts = await this.getCarts()
                const cartIndex = carts.map(p => p.idCart).indexOf(cartId);
                if(cartIndex != -1){
                    const productsList = carts[cartIndex].products

                    if(productsList.some((p)=>p.id === prodId)){
                        const prodIndex = productsList.map(p => p.id).indexOf(prodId);
                        productsList[prodIndex].quantity++
                    }
                    else{
                        let newProd = {
                            quantity: 1,
                            id: prodId
                        }
                        productsList.push(newProd)
                    }

                    carts[cartIndex].products = productsList
                    await fs.promises.writeFile(this.path, JSON.stringify(carts))
                    return carts
                }
                else{
                    throw new Error("Cart doesn't exist.")
                }
            }
        } catch (error) {
            throw new Error(`Failed to add product: ${error}`)
        }
        
    }
};

export {CartManager}