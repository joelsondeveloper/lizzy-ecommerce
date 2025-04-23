const caroussel = document.querySelectorAll(".card_caroussel");
const prevBtn = document.getElementById("prevBtn");
const nextBtn = document.getElementById("nextBtn");

let currentIndex = 0;
showSlide(currentIndex);

function showSlide(index) {
    caroussel.forEach((slide, i) => {
        caroussel[i].classList.remove("caroussel_ativo");
    });

    console.log(caroussel[index]);
    caroussel[index].classList.add("caroussel_ativo");
}

prevBtn.addEventListener("click", () => {
    currentIndex = (currentIndex - 1 + caroussel.length) % caroussel.length;
    showSlide(currentIndex);
    resetAutoSlide();
});

nextBtn.addEventListener("click", () => {
    currentIndex = (currentIndex + 1) % caroussel.length;
    showSlide(currentIndex);
    resetAutoSlide();
})

let autoSlide = setInterval(() => {
    currentIndex = (currentIndex + 1) % caroussel.length;
    showSlide(currentIndex);
}, 5000);

function resetAutoSlide() {
    clearInterval(autoSlide);
    autoSlide = setInterval(() => {
        currentIndex = (currentIndex + 1) % caroussel.length;
        showSlide(currentIndex);
    }, 5000);
}