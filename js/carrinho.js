const sectionCart = document.querySelector(".sectionCart");
let cart = JSON.parse(localStorage.getItem("cart")) || [];

function renderCart() {
  sectionCart.innerHTML = "";
  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  const btnExit = document.createElement("div");
  btnExit.innerHTML = `<i class="fa-solid fa-xmark"></i>`;

  if (!cart) {
    const imgEmptyCart = document.createElement("div");
    imgEmptyCart.classList.add("img-empty-cart");
    imgEmptyCart.innerHTML = `<img src="assets/img/empty-cart.png" alt="" />`;
    sectionCart.appendChild(imgEmptyCart);
  } else {
    const containerCart = document.createElement("div");

    containerCart.classList.add("containerCart");

    sectionCart.appendChild(containerCart);

    cart.forEach((item) => {
      const cartItem = document.createElement("div");

      cartItem.innerHTML = `
            <div class="cartSection1">
            <div class="cart-item-img">
              <img src="${item.imagem}" alt="${item.nome}" />
            </div>
            <div class="cart-item-content">
              <h3 class="cart-item-title">${item.nome}</h3>
              <span class="cart-item-price">R$ ${item.preco.toFixed(2)}</span>
              <span class="cart-item-price-parcela">
                <span class="price">R$ ${item.preco.toFixed(2)}</span> em 3x de
                <span class="price">R$ ${(item.preco / 3).toFixed(2)}</span>
              </span>
            </div>
          </div>
          <div class="cartSection2">
            <div class="container-information">
              <div class="cart-information">
                <span class="cart-item-color">Cor: ${item.cor}</span>
                <span class="cart-item-size">Tamanho: ${item.tamanho}</span>
              </div>
              <div class="cart-item-quantity">
                <button class="cart-item-quantity-button-minus">-</button>
                <span class="cart-item-quantity-value">1</span>
                <button class="cart-item-quantity-button-plus">+</button>
              </div>
            </div>
          </div>
          <div class="cartSection3">
            <div class="cart-item-sell">
              <p>
                Vendido e entregue por:
                <span class="cart-item-seller">E-commerce</span>
              </p>
            </div>
            <div class="cart-item-remove" data-id="${item.id}">
              <i class="fa-solid fa-trash"></i>
            </div>
          </div>
            `;

      cartItem.classList.add("cart-item");

      containerCart.appendChild(cartItem);

      if (cart.length > 0) {
        listenerTrash();
      }
    });
  }

  btnExit.classList.add("btnExit");

  sectionCart.appendChild(btnExit);

  btnExit.addEventListener("click", () => {
    console.log("exit");
    sectionCartDiv.classList.toggle("windowOutside");
  });
}

function listenerTrash() {
  const cartItemRemove = document.querySelectorAll(".cart-item-remove");

  cartItemRemove.forEach((item) => {
    item.addEventListener("click", () => {
      cart = cart.filter((item) => item.id != item.dataset.id);
      localStorage.setItem("cart", JSON.stringify(cart));
      renderCart();
    });
  });
}

renderCart();
