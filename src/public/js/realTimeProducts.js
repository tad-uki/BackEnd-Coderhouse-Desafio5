const socketClient = io()

const productsDisplay = document.getElementById("productsDisplay")
const createProductForm = document.getElementById("createProductForm")
const statusBox = document.getElementById("statusBox")


createProductForm.addEventListener("submit", (e)=>{
    e.preventDefault()
    const formData = new FormData(createProductForm)
    const productData = {}

    for(let [key, value] of formData.entries()){
        productData[key] = value
    }

    productData.price = parseInt(productData.price)
    productData.stock = parseInt(productData.stock)
    productData.status = (statusBox.value === "available" ? true : false)

    socketClient.emit("addProduct", productData)
    createProductForm.reset()
})

socketClient.on("productList", (productData)=>{
    let productTags = []
    productData.forEach(product => {
        productTags += `<p> Nombre: ${product.title} </p>`
    });
    productsDisplay.innerHTML = productTags
})