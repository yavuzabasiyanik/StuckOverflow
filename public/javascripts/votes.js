document.addEventListener("DOMContentLoaded", e => {
    const upButtons = document.querySelectorAll('.active__upvotes')
    const downButtons = document.querySelectorAll('.active__downvotes')


    upButtons.forEach((upButton) => {

        upButton.addEventListener('click', async (e) => {
            e.preventDefault();


            const id = e.target.id.split('-')[1];

            // console.log(id)
            try {

                const res = await fetch(`/questions/answer/${id}/upVotes`, {
                    method: 'POST'
                });
                const json = await res.json();


                // let totalVotes = json.upVotes- json.downVotes;

                console.log(json.totalVotes);

                const pId = document.getElementById(`count-${id}`);


                pId.innerText = json.totalVotes

            } catch (e) {
                console.log(e);
            }
        })
    })

    downButtons.forEach((downButton) => {

        downButton.addEventListener('click', async (e) => {
            e.preventDefault();


            const id = e.target.id.split('-')[1];

            // console.log(id)
            try {

                const res = await fetch(`/questions/answer/${id}/downVotes`, {
                    method: 'POST'
                });
                const json = await res.json();


                // let totalVotes = json.upVotes- json.downVotes;

                console.log(json.totalVotes);

                const pId = document.getElementById(`count-${id}`);


                pId.innerText = json.totalVotes

            } catch (e) {
                console.log(e);
            }
        })
    });
});
