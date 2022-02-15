const { loginUser, logoutUser } = require("../../auth");
const db = require("../../db/models");

window.addEventListener("DOMContentLoaded", (event) => {
    const demo = document.querySelector('.demo');
    demo.addEventListener("click", async event => {
        const userName = 'demo';
        const hashedPassword = '123';
        const user = {
            userName,
            hashedPassword
        }

        loginUser(req, res, user);
        res.redirect('/questions');
    });

    const logout = document.querySelector('.logout');
    logout.addEventListener('click', event => {
        logoutUser();
    });
})
