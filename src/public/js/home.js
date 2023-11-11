const socketClient = io()

const productButtons = document.getElementsByClassName("productBtn")

for(let i = 0; i < productButtons.length; i++){
    let productBtn = productButtons[i]
    productBtn.addEventListener("click", ()=>{
        socketClient.emit("addProductToCart", productBtn.value)
    })
}
