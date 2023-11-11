import { productsModel } from "../mongo/products.model.js";


class ProductManager{
    constructor(){
        this.model = productsModel;
    };


    async getProducts(){
        try {

            const products = await this.model.find()
            return products;                
            
        } catch (error) {
            throw new Error(`Failed to get product list: ${error}`)
        }
    };

    async getPaginatedProducts(query, options){
        try {

            const products = await this.model.paginate(query,options)
            return products;                
            
        } catch (error) {
            throw new Error(`Failed to get product list: ${error}`)
        }
    };

 

    async getProductById(id){
        try {
            
            
            const product = await this.model.findById(id)

            if(!product){
                throw new Error("Product doesn't exist")
            }
            else{
                return product;
            };         

        } catch (error) {
            throw new Error(`Failed to get product: ${error}`)
        }
    };

    async createProduct(newProd){
        try {
            const result = await this.model.create(newProd)
            return result
    
        } catch (error) {
            throw new Error(`Failed to add product: ${error}`)
        }
        
    }

    async updateProduct(prodId, updatedProd){
        try {
           
            const result = await this.model.findByIdAndUpdate(prodId, updatedProd, {new: true})
            return result
         
        } catch (error) {
            throw new Error(`Failed to update product: ${error}`)
        }
    };

    async deleteProduct(prodId){
        try {
            
            const result = await this.model.findByIdAndDelete(prodId)
            return result
            
        } catch (error) {
            throw new Error(`Failed to eliminate product: ${error}`)
        }
    }
};

export {ProductManager}