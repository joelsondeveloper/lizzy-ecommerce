const sectionCart = document.querySelector(".sectionCart");
let cart = JSON.parse(localStorage.getItem("cart")) || [];

function renderCart() {
    const btnExit = document.createElement("div");
    btnExit.innerHTML = `<i class="fa-solid fa-xmark"></i>`

    if (!cart) {
        const imgEmptyCart = document.createElement("div");
        imgEmptyCart.classList.add("img-empty-cart");
        imgEmptyCart.innerHTML = `<img src="assets/img/empty-cart.png" alt="" />`;
        sectionCart.appendChild(imgEmptyCart);
    } else {
        // const cartProducts = JSON.parse(cart);
    }

    btnExit.classList.add("btnExit");

    sectionCart.appendChild(btnExit);

    btnExit.addEventListener("click", () => {
      console.log("exit");
      sectionCartDiv.classList.toggle("windowOutside");
    })
}


renderCart();