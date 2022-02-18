document.addEventListener("DOMContentLoaded", e => {
  const btn = document.querySelector('.delete-answer');
  const modal = document.querySelector('.delete-modal');
  const cancel = document.querySelector('.delete-answer-cancel');
  const body = document.querySelector('.question-container');

  const id = btn.id.split('-')[1];
  const deleteIt = document.querySelector('.delete-answer-confirm');

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
    console.log("avengars, assembleeeeeeeeeeeeeee", id)
    e.preventDefault();

    const res = await fetch(`/questions/answers/${id}/delete`, {
      method: "DELETE"
    });

    const json = await res.json();
    console.log(json.message)

    if (json.message) {
      modal.style.display = "none";
      body.style.opacity = 1;
    }

  });

});
