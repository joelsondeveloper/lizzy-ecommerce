const colecao = document.querySelector(".cards-colecoes");
const dimensoesColecao = colecao.getBoundingClientRect();
const prevBtnColecao = document.getElementById("prevBtnColecao");
const nextBtnColecao = document.getElementById("nextBtnColecao");

function verificarScroll() {
    console.log(colecao.scrollLeft);
    margenErro = 250;
    const maxScroll = colecao.scrollWidth - colecao.clientWidth;
    prevBtnColecao.style.display = colecao.scrollLeft > margenErro ? "block" : "none";
    nextBtnColecao.style.display = colecao.scrollLeft < ( maxScroll - margenErro) ? "block" : "none";
}

nextBtnColecao.addEventListener("click", () => {
    colecao.scrollLeft += dimensoesColecao.width;
    setTimeout(verificarScroll, 300);
});

prevBtnColecao.addEventListener("click", () => {
    colecao.scrollLeft -= dimensoesColecao.width;
    setTimeout(verificarScroll, 300);
});

verificarScroll();