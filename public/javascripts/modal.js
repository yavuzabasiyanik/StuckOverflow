
document.addEventListener("DOMContentLoaded", e => {
    const btn = document.querySelector('.ask-public');
    const modal = document.querySelector('.question-login');
    const cancel = document.querySelector('.close');
    const body = document.querySelector('.question-list-body');

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

