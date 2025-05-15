const atendimentoHeader = document.querySelector(".atendimento-header");
const dropdownCta = document.querySelector(".dropdown-cta");
const iconAtendimento = atendimentoHeader.querySelector(".fa-chevron-down");
const arrCards = Array.from(document.getElementsByClassName("card"));
const faCartShopping = document.querySelector(".fa-cart-shopping");
const sectionCartDiv = document.querySelector(".sectionCart");
const sectionCartExit = document.querySelector(".btnExit");


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

faCartShopping.addEventListener("click", () => {
  console.log("cart");
  sectionCartDiv.classList.toggle("windowOutside");
  const windowBlack = document.querySelector(".window-black");
  windowBlack.classList.toggle("window-black-active");
  windowBlack.addEventListener("click", () => {
    sectionCartDiv.classList.add("windowOutside");
    windowBlack.classList.remove("window-black-active");
  })
});