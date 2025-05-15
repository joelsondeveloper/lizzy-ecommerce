const sectionCart = document.querySelector(".sectionCart");
let cart = JSON.parse(localStorage.getItem("cart")) || [];
const cartCount = document.querySelector(".cart-count");

function renderCart() {
  sectionCart.innerHTML = "";
  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  console.log(cart);
  const btnExit = document.createElement("div");
  btnExit.innerHTML = `<i class="fa-solid fa-xmark"></i>`;

  if (!cart || cart.length == 0) {
    const imgEmptyCart = document.createElement("div");
    imgEmptyCart.classList.add("img-empty-cart");
    imgEmptyCart.innerHTML = `<img src="assets/img/empty-cart.png" alt="" />`;
    sectionCart.appendChild(imgEmptyCart);
  } else {
    const containerCart = document.createElement("div");
    const cartTotalItens = document.createElement("div");
    const cartResume = document.createElement("div");

    containerCart.classList.add("containerCart");
    cartTotalItens.classList.add("cart-total-itens");
    cartResume.classList.add("cart-resume");

    cartTotalItens.innerHTML = `
    <h2>Seu carrinho</h2>
    <p>seu carrinho tem ${quantityItens(cart)} itens</p>`;

    cartResume.innerHTML = `
    <h2>Resumo do pedido</h2>
    <div class="cart-resume-itens">
      <div class="cart-resume-item">
        <span>Subtotal</span>
        <span class="price">R$ ${(totalItens(cart)).toFixed(2)}</span>
      </div>
      <div class="cart-resume-item">
        <span>Descontos</span>
        <span class="price">-R$ ${(totalDescontos(cart)).toFixed(2)}</span>
      </div>
    </div>
    <div class="cart-resume-total">
      <span>Total</span>
      <span class="price">R$ ${(totalItens(cart) - totalDescontos(cart)).toFixed(2)}</span>
    </div>`;


    sectionCart.appendChild(cartTotalItens);
    sectionCart.appendChild(containerCart);
    

    cart.forEach((item) => {
      const cartItem = document.createElement("div");
      let cartItemQuantity;

      if (item.quantidade < 10) {
        cartItemQuantity = `
<select class="cart-item-quantity-value" data-id="${item.id}">
  <option value="1" ${item.quantidade == 1 ? "selected" : ""}>1</option>
  <option value="2" ${item.quantidade == 2 ? "selected" : ""}>2</option>
  <option value="3" ${item.quantidade == 3 ? "selected" : ""}>3</option>
  <option value="4" ${item.quantidade == 4 ? "selected" : ""}>4</option>
  <option value="5" ${item.quantidade == 5 ? "selected" : ""}>5</option>
  <option value="6" ${item.quantidade == 6 ? "selected" : ""}>6</option>
  <option value="7" ${item.quantidade == 7 ? "selected" : ""}>7</option>
  <option value="8" ${item.quantidade == 8 ? "selected" : ""}>8</option>
  <option value="9" ${item.quantidade == 9 ? "selected" : ""}>9</option>
  <option value="10" ${item.quantidade >= 10 ? "selected" : ""}>10+</option>
</select>
`;
      } else {
        cartItemQuantity = `
        <input type="number" class="cart-item-quantity-value" value="${item.quantidade}" />`;
      }

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
                ${cartItemQuantity}
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
            <div class="cart-item-remove" data-id="${item.id} data-cor="${item.cor}" data-tamanho="${item.tamanho}">
              <i class="fa-solid fa-trash"></i>
            </div>
          </div>
            `;

      cartItem.classList.add("cart-item");

      containerCart.appendChild(cartItem);
      containerCart.appendChild(cartResume);

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
    const windowBlack = document.querySelector(".window-black");
    windowBlack.classList.toggle("window-black-active");
  });

  const cartItemQuantityValue = document.querySelectorAll(
    ".cart-item-quantity-value"
  );

  cartItemQuantityValue.forEach((input, index) => {
    input.addEventListener("change", () => {
      cart[index].quantidade = Number(input.value);
      localStorage.setItem("cart", JSON.stringify(cart));
      renderCart();
    });
  });

  cartCount.innerText = `${quantityItens(cart)}`;
}

function listenerTrash() {
  const cartItemRemove = document.querySelectorAll(".cart-item-remove");

  cartItemRemove.forEach((button) => {
    button.addEventListener("click", () => {
      console.log(button.id);
      cart = cart.filter((item) => (item.id != button.dataset.id) && (item.cor != button.dataset.cor && item.tamanho != button.dataset.tamanho));
      localStorage.setItem("cart", JSON.stringify(cart));
      renderCart();
    });
  });
}

function quantityItens(cart) {
  return cart.reduce((acc, item) => acc + item.quantidade, 0);
}

function totalItens(cart) {
  return cart.reduce((acc, item) => acc + item.preco * item.quantidade, 0);
}

function totalDescontos(cart) {
  return cart.reduce((acc, item) => acc + (item.preco * (item.desconto / 100)) * item.quantidade, 0);
}

renderCart();
