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
      let indexAntigo = Array.from(imgs).findIndex((img) => img.classList.contains("imgAlvo"));
    if (e.target.nodeName === "IMG") {
      console.log(indexAntigo);
      imgs.forEach((img, i) => {
        img.classList.remove("imgAlvo");
        if (index === i) {
          img.classList.add("imgAlvo");
        }
      });
      updateCarrousel(indexAntigo,index);
    }
  });

  function renderPage(produto) {
    const productImg = document.querySelector(".product-img");

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
  }

function updateCarrousel(indexAntigo, index) {
  const largura = containImg.getBoundingClientRect().width + 10;
  const distancia = index - indexAntigo;
  containImg.style.transform += `translateX(${(-largura * distancia)}px)`; 
  console.log(distancia);
}