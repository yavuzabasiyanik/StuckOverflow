
document.addEventListener("DOMContentLoaded", async e => {
    // answer/:id(\\d+)/upVotes
    const answerId = e.target.id;
    const voteCount = document.querySelector('.vote-count');
    let sum=0;
    // console.log("=========================================== yayayay", answerId);
    try{
        const res = await fetch(`/questions/answer/${answerId}/upVotes`)
        const upVotes = await res.json();

        sum+=upVotes.length;
        // console.log("=========================================== yayayay", upVotes);

    }catch(e){
        console.log(e);
    }

    try{
        const res = await fetch(`/questions/answer/${answerId}/downVotes`)
        const downVotes = await res.json();

        sum-=downVotes.length;

        // console.log("=========================================== yayayay", downVotes);

    }catch(e){
        console.log(e);
    }

    voteCount.innerHTML= sum;

});
