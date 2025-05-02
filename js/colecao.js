const colecao = document.querySelector(".cards-colecoes");
const sugestãos = document.querySelector(".sugestoes-container");
const dimensoesColecao = colecao.getBoundingClientRect();
const dimensoesSugestoes = sugestãos.getBoundingClientRect();
const prevBtnColecao = Array.from(document.querySelectorAll(".prevBtn"));
const nextBtnColecao = Array.from(document.querySelectorAll(".nextBtn"));

function verificarScroll() {
    console.log(colecao.scrollLeft);
    margenErro = 250;
    const maxScroll = colecao.scrollWidth - colecao.clientWidth;
    prevBtn.style.display = colecao.scrollLeft > margenErro ? "block" : "none";
    nextBtn.style.display = colecao.scrollLeft < ( maxScroll - margenErro) ? "block" : "none";
}

nextBtnColecao.forEach(btn => {
    btn.addEventListener("click", () => {
        if (btn == nextBtnColecao[0]) {
            colecao.scrollLeft += dimensoesColecao.width;
        } else if (btn == nextBtnColecao[1]) {
            sugestãos.scrollLeft += dimensoesSugestoes.width;
        }
        setTimeout(verificarScroll, 300);
    });
})

prevBtnColecao.forEach(btn => {
    btn.addEventListener("click", () => {
        if (btn == prevBtnColecao[0]) {
            colecao.scrollLeft -= dimensoesColecao.width;
        } else if (btn == prevBtnColecao[1]) {
            sugestãos.scrollLeft -= dimensoesSugestoes.width;
        }
        setTimeout(verificarScroll, 300);
    });
})

verificarScroll();