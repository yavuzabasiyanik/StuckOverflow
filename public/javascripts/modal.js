document.addEventListener("DOMContentLoaded", e => {
    const btn = document.querySelector('.ask__question__button');
    const modal = document.querySelector('.question__login');
    const cancel = document.querySelector('.login__cancel__button');
    const body = document.querySelector('.question__list__body');

    btn.addEventListener('click', e => {
        modal.style.display = 'flex';
        body.style.opacity = 0.3;
    });

    cancel.addEventListener('click', e => {
        modal.style.display = 'none';
        body.style.opacity = 1;
    });

    body.addEventListener('click', e => {
        modal.style.display = "none";
        body.style.opacity = 1;
    });
});
