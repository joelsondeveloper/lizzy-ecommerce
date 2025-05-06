const atendimentoHeader = document.querySelector('.atendimento-header');
const dropdownCta = document.querySelector('.dropdown-cta');
const iconAtendimento = atendimentoHeader.querySelector('.fa-chevron-down');
const arrCards = document.getElementsByClassName('card');



atendimentoHeader.addEventListener('click', () => {
    dropdownCta.classList.toggle('hide');
    iconAtendimento.classList.toggle('fa-chevron-down');
    iconAtendimento.classList.toggle('fa-chevron-up');
})