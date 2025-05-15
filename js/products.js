const params = new URLSearchParams(window.location.search);
const id = params.get("id");
const carrouselIndice = document.querySelector(".carrousel-indice");
const containImg = document.querySelector(".contain-img");

fetch("produtos/produtos.json")
  .then((res) => res.json())
  .then((produtos) => {
    const produto = produtos.filter((produto) => produto.id === id);
    if (produto.length > 0) {
      renderPage(produto[0]);
      // console.log(produto);
    } else {
      console.error("Produto não encontrado");
    }
  })
  .catch((erro) => {
    console.error("Erro ao carregar o JSON:", erro);
  });

carrouselIndice.addEventListener("click", (e) => {
  const imgs = document.querySelectorAll(".product-img-item");
  const arrCarrouselIndice = Array.from(
    carrouselIndice.querySelectorAll("img")
  );
  let index = arrCarrouselIndice.indexOf(e.target);
  if (e.target.nodeName === "IMG") {
    imgs.forEach((img, i) => {
      img.classList.remove("imgAlvo");
      if (index === i) {
        img.classList.add("imgAlvo");
      }
    });
    updateCarrousel(index);
  }
});

function renderPage(produto) {
  const productImg = document.querySelector(".product-img");
  const productContent = document.querySelector(".product-content");

  for (let i = 0; i < produto.imagem.length; i++) {
    const divIndice = document.createElement("div");
    divIndice.innerHTML = `<img src="${produto.imagem[i]}" alt="${produto.nome}">`;
    carrouselIndice.appendChild(divIndice);
  }

  for (let i = 0; i < produto.imagem.length; i++) {
    const img = document.createElement("img");
    img.src = produto.imagem[i];
    img.alt = produto.nome;
    if (i === 0) {
      img.classList.add("product-img-item", "imgAlvo");
    } else {
      img.classList.add("product-img-item");
    }
    containImg.appendChild(img);
  }
  const arrCarrouselIndice = carrouselIndice.querySelectorAll("div");

  const h1 = document.createElement("h1");
  const description = document.createElement("p");
  const productPrice = document.createElement("div");
  const productColor = document.createElement("div");
  const productColorVariants = document.createElement("div");
  const productSize = document.createElement("div");
  const productSizeVariants = document.createElement("div");
  const productCta = document.createElement("div");

  productPrice.classList.add("product-price");
  productColor.classList.add("product-color");
  productColorVariants.classList.add("product-color-variants");
  productSize.classList.add("product-size");
  productSizeVariants.classList.add("product-size-variants");
  productCta.classList.add("product-cta");

  h1.textContent = produto.nome;
  description.textContent = produto.descricao;
  productPrice.innerHTML = `
      <p class="product-price-vista">
        <span class="price">R$ ${produto.preco.toFixed(2)}</span>
        <span>à vista</span> 
      </p>
      <p class="product-price-parcela">ou <span class="price">R$ ${
        produto.preco.toFixed(2)
      }</span> em 3x de <span class="price">R$ ${(produto.preco / 3).toFixed(
    2
  )}</span></p>
    `;
  productColor.innerHTML = `
      <h2>Escolha a cor:</h2>
    `;
  produto.coresDisponiveis.forEach((cor, i) => {
    productColorVariants.innerHTML += `
        <input type="radio" name="color" id="${cor}" />
            <label for="${cor}" class="color-variant" style="background-color: ${produto.coresHexHtml[i]};"></label>
      `;
  });
  productSize.innerHTML = `
      <h2>Escolha o tamanho:</h2>
    `;
  produto.tamanhosDisponiveis.forEach((tamanho) => {
    productSizeVariants.innerHTML += `
        <input type="radio" name="size" id="${tamanho}" />
            <label for="${tamanho}" class="size-variant">${tamanho}</label>
      `;
  });
  productCta.innerHTML = `
      <button class="btn">Adicionar ao carrinho</button>
    `;

  productContent.appendChild(h1);
  productContent.appendChild(description);
  productContent.appendChild(productPrice);
  productContent.appendChild(productColor);
  productColor.appendChild(productColorVariants);
  productContent.appendChild(productSize);
  productSize.appendChild(productSizeVariants);
  productContent.appendChild(productCta);
  const btnAddCart = document.querySelector(".btn");
  btnAddCart.addEventListener("click", () => {
    addCart(produto)
  });
}


function updateCarrousel(index) {
  const largura = containImg.getBoundingClientRect().width + 10;
  containImg.style.transform = `translateX(${-largura * index}px)`;
}

function addCart(produto) {
  event.preventDefault();

  const productColorVariant = document.querySelector(
    'input[name="color"]:checked'
  );
  const productSizeVariant = document.querySelector(
    'input[name="size"]:checked'
  );

  if (!productColorVariant || !productSizeVariant) {
    console.error("Produto não selecionado");
    return;
  }

  const productColor = productColorVariant.id || 0;
  const productSize = productSizeVariant.id || 0;

  const product = {
    id: produto.id,
    nome: produto.nome,
    imagem: produto.imagem[0],
    preco: produto.preco,
    quantidade: 3,
    coresDisponiveis: produto.coresDisponiveis,
    coresHexHtml: produto.coresHexHtml,
    tamanhosDisponiveis: produto.tamanhosDisponiveis,
    cor: productColor,
    tamanho: productSize,
  };

  if (productColor !== 0 && productSize !== 0) {
    cart.push(product);
    localStorage.setItem("cart", JSON.stringify(cart));
    renderCart();
  } else {
    console.error("Produto não selecionado");
  }
}