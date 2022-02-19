var express = require('express');
var router = express.Router();
const db = require('../db/models');
const { check, validationResult } = require('express-validator');
const { asyncHandler, csrfProtection } = require('./utils');
const bcrypt = require('bcryptjs');
const { loginUser, logoutUser, requireAuth } = require('../auth');

//validators
const questionValidator = [
    check('title')
        .exists({ checkFalsy: true })
        .withMessage('Please enter a Title'),
    check('message')
        .exists({ checkFalsy: true })
        .withMessage('Please enter a Message'),
];

const answerValidator = [
    check('message')
        .exists({ checkFalsy: true })
        .withMessage('Please enter a Message'),
];

//routes

//questions lists
router.get('/', csrfProtection, asyncHandler(async (req, res) => {
    const questions = await db.Question.findAll({
        include: [db.Answer, db.User],
        order: [['updatedAt', 'DESC']]
    });

    res.render('questions', {
        questions,
        title: 'questions',
        csrfToken: req.csrfToken()
    });
}));


//ask questions
router.get('/ask', requireAuth, csrfProtection, asyncHandler(async (req, res) => {
    res.render('create-question', {
        title: 'Ask a Question',
        csrfToken: req.csrfToken()
    });
}));

router.post('/ask', questionValidator, csrfProtection, asyncHandler(async (req, res) => {
    const {
        title,
        questionImg1,
        questionImg2,
        questionImg3,
        message,
    } = req.body;

    const userId = req.session.auth.userId;

    const question = await db.Question.build({
        title,
        questionImg1,
        questionImg2,
        questionImg3,
        message,
        userId
    });

    const validationErr = validationResult(req);

    if (validationErr.isEmpty()) {
        await question.save();
        res.redirect('/questions')
    } else {
        const errors = validationErr.array().map(err => err.msg);
        res.render('create-question', {
            title: 'Ask a Question',
            errors,
            question,
            csrfToken: req.csrfToken()
        });
    }
}));

//individual questions
router.get('/:id(\\d+)', asyncHandler(async (req, res) => {
    const id = parseInt(req.params.id);

    const question = await db.Question.findByPk(id, {
        include: [
            db.User,
            {
                model: db.Answer,
                include: [db.Upvote, db.Downvote]
            },
        ]
    });

    const answers = await db.Answer.findAll({
        where: {
            questionId: question.id
        },
        order: [['updatedAt', 'DESC']],
        include: db.User
    });

    let userId;

    if (req.session.auth) {
        userId = req.session.auth.userId;
    }
    // const returnVote = voteCount()

    res.render('individual-question', {
        title: question.title,
        question,
        userId,
        // returnVote,
        answers,
    });
}));

//edit question
router.get('/:id(\\d+)/edit', csrfProtection, asyncHandler(async (req, res) => {
    const id = req.params.id;
    const question = await db.Question.findByPk(id);

    res.render('question-edit', {
        title: 'Edit Question',
        csrfToken: req.csrfToken(),
        question
    });
}));

//sending json
router.get('/answer/:id(\\d+)/upVotes', csrfProtection, asyncHandler(async (req, res) => {
    const id = req.params.id;
    // const question = await db.Question.findByPk(id);


    const upVotes = await db.Upvote.findAll({
        where: {
            answerId: id
        }
    });


    res.json({ upVotes })


}));

router.get('/answer/:id(\\d+)/downVotes', csrfProtection, asyncHandler(async (req, res) => {
    const id = req.params.id;
    // const question = await db.Question.findByPk(id);


    const downVotes = await db.Downvote.findAll({
        where: {
            answerId: id
        }
    });

    console.log(downVotes);

    res.json({ downVotes })


}));


router.post('/:id(\\d+)/edit', questionValidator, csrfProtection, asyncHandler(async (req, res) => {
    const id = req.params.id;
    const question = await db.Question.findByPk(id);

    const {
        title,
        questionImg1,
        questionImg2,
        questionImg3,
        message,
    } = req.body;

    const validationErr = validationResult(req);

    if (validationErr.isEmpty()) {
        await question.update({
            title,
            questionImg1,
            questionImg2,
            questionImg3,
            message,
        });

        await question.save();
        res.redirect(`/questions/${question.id}`);
    } else {
        const errors = validationErr.array().map(err => err.msg);
        res.render('question-edit', {
            title: 'Edit Question',
            errors,
            question,
            csrfToken: req.csrfToken()
        });
    }
}));

router.get(`/:id(\\d+)/delete`, asyncHandler(async (req, res) => {
    const id = req.params.id;
    const question = await db.Question.findByPk(id);

    res.render('question-delete', {
        title: 'Delete Question',
        question,
    });
}));

router.post(`/:id(\\d+)/delete`, asyncHandler(async (req, res) => {
    const id = req.params.id;
    const question = await db.Question.findByPk(id);

    await question.destroy();

    res.redirect('/questions');
}));

// Create New Answer
router.get('/:id(\\d+)/answer', requireAuth, csrfProtection, asyncHandler(async (req, res) => {
        const userId = req.session.auth.userId;
        const questionId = parseInt(req.params.id);

        const answer = await db.Answer.findOne({
            where: {
                userId,
                questionId
            }
        });

        console.log(answer);
        // const question = await db.Question.findByPk(questionId);

        if (answer) {
            const message = 'You have already answered this question';
            res.render('error', {
                message,
                title: 'NO',
                questionId: answer.questionId
            });
        } else {
            res.render('answer-form', {
                title: 'Answer a Question',
                csrfToken: req.csrfToken(),
                questionId
            });
        }
}));

router.post('/:id(\\d+)/answer', answerValidator, csrfProtection, asyncHandler(async (req, res) => {
    const {
        message,
        answerImg1,
        answerImg2,
        answerImg3,
    } = req.body;

    const userId = req.session.auth.userId;
    const questionId = parseInt(req.params.id);

    const answer = await db.Answer.build({
        message,
        answerImg1,
        answerImg2,
        answerImg3,
        userId,
        questionId
    });

    const validationErr = validationResult(req);

    if (validationErr.isEmpty()) {
        await answer.save();
        res.redirect(`/questions/${questionId}`);
    } else {
        const errors = validationErr.array().map(err => err.msg);
        res.render('create-answer', {
            title: 'Answer question',
            errors,
            answer,
            csrfToken: req.csrfToken()
        });
    }
}));

//  Edit Answers
router.get(`/answers/:id(\\d+)/edit`, csrfProtection, asyncHandler(async (req, res) => {

    const id = parseInt(req.params.id);

    const answer = await db.Answer.findByPk(id);

    res.render('answers-edit', {
        title: 'Edit Answer',
        csrfToken: req.csrfToken(),
        answer,
    });
}));


router.post(`/answers/:id(\\d+)/edit`, answerValidator, csrfProtection, asyncHandler(async (req, res) => {
    const id = req.params.id;
    const answer = await db.Answer.findByPk(id);

    const {
        message,
        answerImg1,
        answerImg2,
        answerImg3,
    } = req.body;

    const validationErr = validationResult(req);

    if (validationErr.isEmpty()) {
        await answer.update({
            message,
            answerImg1,
            answerImg2,
            answerImg3,
        });

        await answer.save();
        res.redirect(`/questions/${answer.questionId}`);
    } else {
        const errors = validationErr.array().map(err => err.msg);
        res.render('answers-edit', {
            title: 'Edit Answer',
            errors,
            answer,
            csrfToken: req.csrfToken()
        });
    }
}));

// router.get(`/answers/:id(\\d+)/delete`, asyncHandler(async (req, res) => {
//     const id = req.params.id;
//     const answer = await db.Answer.findByPk(id);

//     res.render('answer-delete', {
//         title: 'Delete answer',
//         answer,
//     });
// }));

router.delete(`/answers/:id(\\d+)/delete`, asyncHandler(async (req, res) => {
    const id = req.params.id;
    const answer = await db.Answer.findByPk(id);

    console.log("avengars? avengars!", answer)
    await answer.destroy();

    res.json({ message: 'Answer Deleted' });
}));


// votes

router.post('/answer/:id(\\d+)/upVotes', asyncHandler(async (req, res) => {
    const id = req.params.id;

    let userId;

    if (req.session.auth) {
        userId = req.session.auth.userId;
    }

    const answer = await db.Answer.findByPk(id,{
        include: [db.Upvote, db.Downvote]
    });

    const upvote = await db.Upvote.findOne({
        where: {
            answerId: id,
            userId
        }
    });

    const downvote = await db.Downvote.findOne({
        where: {
            answerId: id,
            userId
        }
    });

    if (!downvote) {
        if (upvote) {
            await upvote.destroy();
        } else {
            await db.Upvote.create({
                answerId: id,
                userId
            });
        }
    } else {
        await downvote.destroy();

        await db.Upvote.create({
            answerId: id,
            userId
        });

    }

    const upVotes = await db.Upvote.findAll({
        where: {
            answerId: id
        }
    });
    const downVotes = await db.Downvote.findAll({
        where: {
            answerId: id
        }
    });

    let totalVotes = upVotes.length - downVotes.length;

    res.json({totalVotes});
}));

router.post('/answer/:id(\\d+)/downVotes', asyncHandler(async (req, res) => {
    const id = req.params.id;

    let userId;

    if (req.session.auth) {
        userId = req.session.auth.userId;
    }

    const answer = await db.Answer.findByPk(id);

    const upvote = await db.Upvote.findOne({
        where: {
            answerId: id,
            userId
        }
    });

    const downvote = await db.Downvote.findOne({
        where: {
            answerId: id,
            userId
        }
    });

    if (!upvote) {
        if (downvote) {
            await downvote.destroy();
        } else {
            await db.Downvote.create({
                answerId: id,
                userId
            });
        }
    } else {
        await upvote.destroy();

        await db.Downvote.create({
            answerId: id,
            userId
        });

    }

    const upVotes = await db.Upvote.findAll({
        where: {
            answerId: id
        }
    });
    const downVotes = await db.Downvote.findAll({
        where: {
            answerId: id
        }
    });

    let totalVotes = upVotes.length - downVotes.length;

    res.json({totalVotes});

    // res.redirect(`/questions/${answer.questionId}`);

}));




module.exports = router;
