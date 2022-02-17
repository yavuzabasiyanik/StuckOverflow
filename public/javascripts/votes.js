
// document.addEventListener("DOMContentLoaded", async e => {
//     // answer/:id(\\d+)/upVotes

//     const url = document.URL;
//     console.log(url.split('/')[4]+"==============================================================");


//     const questionId = url.split('/')[4];



//     const res = await fetch(`/questions/api/${questionId}`)
//     const answers = await res.json();

//     // console.log(json.data+"bajshdbja");


//     let totalVote = 0
//     answers.forEach(async(answer)=>{

//         // const voteCount = document.querySelector(`${answer.id}`);

//         //upvotes api
//         const resUpvotes = await fetch(`/questions/api/answers/${answer.id}/upVotes`)
//         const upVotes = await resUpvotes.json();
//         //downVotes api
//         const resDownVotes = await fetch(`/questions/api/answers/${answer.id}/downVotes`)
//         const downVotes = await resDownVotes.json();


//         const totalUpVotes = upVotes.length;
//         const totalDownVotes = downVotes.length;

//         console.log(upVotes);
//         // if(totalUpVotes===null){
//         //     totalUpVotes=0;
//         // }
//         // if(totalDownVotes===null){
//         //     totalDownVotes=0;
//         // }
//         // console.log(totalUpVotes=totalDownVotes);

//         // totalVote+= totalUpVotes
//         // totalVote-= totalDownVotes

//         // voteCount.innerHTML = totalVote;


//     })


//     // url.split('/')[url.length-1];

//     // const votesClass = document.querySelectorAll('.votesClass');



//     // votesClass.forEach((each)=>{

//     //     each.addEventListener('click', e=>{

//     //         console.log("asdkjnasdkjaskasjndkqnwkldnlqwnjdkqnweihbfikquf");

//     //     })
//     //     try{
//     //             const res = await fetch(`/questions/answer/${answerId}/upVotes`)
//     //             const upVotes = await res.json();

//     //             sum+=upVotes.length;


//     //         }catch(e){
//     //             console.log(e);
//     //         }
//     //     try{
//     //         const res = await fetch(`/questions/answer/${answerId}/downVotes`)
//     //         const downVotes = await res.json();

//     //         sum-=downVotes.length;


//     //     }catch(e){
//     //         console.log(e);
//     //     }

//     //     voteCount.innerHTML= sum;

//     // })



//     // const voteCount = document.querySelectorAll('.vote-count');
//     // const answerId = e.target.id;

//     // voteCount.forEach((each)=>{
//     //     each.innerHTML="whateverre"


//     //     const voteCount = document.querySelector('.vote-count');
//     //     let sum=0;
//     //     try{
//     //         const res = await fetch(`/questions/answer/${answerId}/upVotes`)
//     //         const upVotes = await res.json();

//     //         sum+=upVotes.length;

//     //     }catch(e){
//     //         console.log(e);
//     //     }

//     //     try{
//     //         const res = await fetch(`/questions/answer/${answerId}/downVotes`)
//     //         const downVotes = await res.json();

//     //         sum-=downVotes.length;


//     //     }catch(e){
//     //         console.log(e);
//     //     }
//     // })



//     // voteCount.innerHTML= sum;

// });
