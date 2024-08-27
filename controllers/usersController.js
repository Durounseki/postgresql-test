//Database
const db = require('../db/queries');

//Validation

const { body, validationResult } = require("express-validator");

const lengthErr = "must be between 1 and 20 characters.";

const validateUser = [
    body("username").trim()
    .isLength({ min: 1, max: 20 }).withMessage(`username ${lengthErr}`),
];

//Create user views

async function getUsernames(req, res){
    const usernames = await db.getAllUsernames();
    console.log("Usernames: ", usernames);
    res.send("Usernames: " + usernames.map(user => user.username).join(", "));
};

async function usersNewGet(req, res){
    res.render("newUser", {
        title: "New user",
        formData: null,
    });
};

// We can pass an entire array of middleware validations to our controller.
const usersNewPost = [
    validateUser,
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).render("newUser", {
                title: "New user",
                errors: errors.array(),
                formData: req.body, //Pass the submitted data to be reused
            });
        }
        const { username } = req.body;
        await db.insertUsername(username);
        res.redirect("/");
    }
];

module.exports = {
    getUsernames,
    usersNewGet,
    usersNewPost
}