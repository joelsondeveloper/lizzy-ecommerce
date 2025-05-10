const atendimentoHeader = document.querySelector(".atendimento-header");
const dropdownCta = document.querySelector(".dropdown-cta");
const iconAtendimento = atendimentoHeader.querySelector(".fa-chevron-down");
const arrCards = Array.from(document.getElementsByClassName("card"));

arrCards.forEach(element => {
  const dataId = element.getAttribute("data-id");
  element.addEventListener("click", () => {
    window.location.href = `product.html?id=${dataId}`
  })
});

atendimentoHeader.addEventListener("click", () => {
  dropdownCta.classList.toggle("hide");
  iconAtendimento.classList.toggle("fa-chevron-down");
  iconAtendimento.classList.toggle("fa-chevron-up");
});
