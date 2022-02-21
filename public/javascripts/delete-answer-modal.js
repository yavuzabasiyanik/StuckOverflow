document.addEventListener("DOMContentLoaded", e => {
  const btn = document.querySelector('.delete__answer');
  const modal = document.querySelector('.delete__modal');
  const cancel = document.querySelector('.delete__answer__cancel');
  const body = document.querySelector('.individual__question__container');

  const id = btn.id.split('-')[1];
  const deleteIt = document.querySelector('.delete__answer__confirm');

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

  deleteIt.addEventListener('click', async e => {
    e.preventDefault();

    const res = await fetch(`/questions/answers/${id}/delete`, {
      method: "DELETE"
    });

    const json = await res.json();

    if (json.message) {
      modal.style.display = "none";
      body.style.opacity = 1;

      const answerContainer = document.querySelector(`#answer-container-${id}`);
      answerContainer.remove();
    }

  });

});
