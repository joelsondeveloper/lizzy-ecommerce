const params = new URLSearchParams(window.location.search);
const id = params.get("id");
const carrouselIndice = document.querySelector(".carrousel-indice");
const containImg = document.querySelector(".contain-img");

fetch("produtos/produtos.json")
  .then((res) => res.json())
  .then((produtos) => {
    const produto = produtos.filter((produto) => produto.id === id);
    if (produto.length > 0) {
      renderPage(produto);
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
      const arrCarrouselIndice = Array.from(carrouselIndice.querySelectorAll("img"));
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

    for (let i = 0; i < produto[0].imagem.length; i++) {
      const divIndice = document.createElement("div");
    divIndice.innerHTML = `<img src="${produto[0].imagem[i]}" alt="${produto[0].nome}">`;
    carrouselIndice.appendChild(divIndice);
    }

    for (let i = 0; i < produto[0].imagem.length; i++) {
      const img = document.createElement("img");
      img.src = produto[0].imagem[i];
      img.alt = produto[0].nome;
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
    const productSize = document.createElement("div");
    const productCta = document.createElement("div");

    
    productPrice.classList.add("product-price");
    productColor.classList.add("product-color");
    productSize.classList.add("product-size");
    productCta.classList.add("product-cta");
    
    h1.textContent = produto[0].nome;
    description.textContent = produto[0].descricao;
    productPrice.innerHTML = `
      <p class="product-price-vista">
        <span class="price">R$ ${produto[0].preco}</span>
        <span>à vista</span> 
      </p>
      <p class="product-price-parcela">ou <span class="price">R$ ${produto[0].preco}</span> em 3x de <span class="price">R$ ${(produto[0].preco / 3).toFixed(2)}</span></p>
    `;
    productColor.innerHTML = `
      <h2>Escolha a cor:</h2>
      <div class="product-color-variants">
        <div class="color-variant"></div>
        <div class="color-variant"></div>
        <div class="color-variant"></div>
        <div class="color-variant"></div>
      </div>
    `;
    productSize.innerHTML = `
      <h2>Escolha o tamanho:</h2>
      <div class="product-size-variants">
        <label for="pp" class="size-variant">PP</label>
        <label for="p" class="size-variant">P</label>
        <label for="m" class="size-variant">M</label>
        <label for="G" class="size-variant">G</label>
        <label for="gg" class="size-variant">GG</label>
      </div>
    `;
    productCta.innerHTML = `
      <button>Adicionar ao carrinho</button>
    `;
    
    productContent.appendChild(h1);
    productContent.appendChild(description);
    productContent.appendChild(productPrice);
    productContent.appendChild(productColor);
    productContent.appendChild(productSize);
    productContent.appendChild(productCta);
  }

function updateCarrousel(index) {
  const largura = containImg.getBoundingClientRect().width + 10;
  containImg.style.transform = `translateX(${-largura * index}px)`;
}