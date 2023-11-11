import fs from "fs";

class ProductManager{
    constructor(pathFile){
        this.path = pathFile
    };

    fileExist(){
        return fs.existsSync(this.path)
    }

    async getProducts(){
        try {
            if(this.fileExist()){
                const JsonProds = await fs.promises.readFile(this.path, "utf-8")
                const products = await JSON.parse(JsonProds)
                return await products;                
            }
        } catch (error) {
            throw new Error(`Failed to get product list: ${error}`)
        }
    };

    async addProduct(newProd){
        try {
            if(this.fileExist()){
                const products = await this.getProducts()
                let check = products.some((product) => product.code === newProd.code);
                if(!newProd.title || !newProd.description || !newProd.price || !newProd.thumbnail || !newProd.code || !newProd.stock || !newProd.category || !newProd.status ){
                    throw new Error("Product was incomplete.")
                }
                else if(check){
                    throw new Error("Product already exists.")
                }
                else{
                    let listLength = products.length;
                    if(listLength === 0){
                        newProd.id = 1
                    }
                    else{
                        newProd.id =products[listLength - 1].id + 1;
                    }
                    products.push(newProd);
                    await fs.promises.writeFile(this.path, JSON.stringify(products))
                    return products
                };    
            }
        } catch (error) {
            throw new Error(`Failed to add product: ${error}`)
        }
        
    }
        

    async getProductById(id){
        try {
            if(this.fileExist()){
                const productsList = await this.getProducts()
                let product = productsList.find((p) => p.id === id);
                if(!product){
                    throw new Error("Product doesn't exist")
                }
                else{
                    return product;
                };
            }
        } catch (error) {
            throw new Error(`Failed to get product: ${error}`)
        }
    };

    async updateProduct(prodId, updatedProd){
        try {
            if(this.fileExist()){
                const productsList = await this.getProducts();
                let oldProd = productsList.map(p => p.id).indexOf(prodId)
                productsList[oldProd] = {...productsList[oldProd], ...updatedProd};
                await fs.promises.writeFile(this.path, JSON.stringify(productsList));
                return productsList
            }
        } catch (error) {
            throw new Error(`Failed to update product: ${error}`)
        }
    };

    async deleteProduct(prodId){
        try {
            if(this.fileExist()){
                const productsList = await this.getProducts();
                let prod = productsList.map(p => p.id).indexOf(prodId);
                productsList.splice(prod, 1)
                await fs.promises.writeFile(this.path, JSON.stringify(productsList));
                return productsList
            }
        } catch (error) {
            throw new Error(`Failed to eliminate product: ${error}`)
        }
    }
};

export {ProductManager}