const openModal2 = document.querySelector('.profile__cta_2');
const modal2 = document.querySelector('.modal_2');
const closeModal2 = document.querySelector('.modal__close_2');

openModal2.addEventListener('click', (e)=>{
    e.preventDefault();
    modal2.classList.add('modal--show_2');
});

closeModal2.addEventListener('click', (e)=>{
    e.preventDefault();
    modal2.classList.remove('modal--show_2');
});