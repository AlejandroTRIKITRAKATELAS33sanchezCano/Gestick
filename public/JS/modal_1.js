const openModal = document.querySelector('.profile__cta');
const modal = document.querySelector('.modal_1');
const closeModal = document.querySelector('.modal__close_1');

openModal.addEventListener('click', (e)=>{
    e.preventDefault();
    modal.classList.add('modal--show_1');
});

closeModal.addEventListener('click', (e)=>{
    e.preventDefault();
    modal.classList.remove('modal--show_1');
});

