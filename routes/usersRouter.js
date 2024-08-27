const { Router } = require("express");
const usersController = require("../controllers/usersController");
const usersRouter = Router();

//List of users
usersRouter.get("/", usersController.getUsernames);
//Create user form
usersRouter.get("/new", usersController.usersNewGet);
usersRouter.post("/new", usersController.usersNewPost);

module.exports = usersRouter;