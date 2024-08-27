//Validation

const { body, validationResult } = require("express-validator");

const lengthErr = "must be between 1 and 20 characters.";

const validateUser = [
    body("username").trim()
    .isLength({ min: 1, max: 20 }).withMessage(`username ${lengthErr}`),
];

//Create user views

exports.usersListGet = (req, res) => {
    console.log("usernames will be logged here - wip");
};

exports.usersNewGet = (req, res) => {
    res.render("newUser", {
        title: "New user",
        formData: null,
    });
};

// We can pass an entire array of middleware validations to our controller.
exports.usersNewPost = [
    validateUser,
    (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).render("newUser", {
                title: "New user",
                errors: errors.array(),
                formData: req.body, //Pass the submitted data to be reused
            });
        }
        const { username } = req.body;
        console.log("username to be saved: ", req.body.username);
    }
];