
const express = require ("express")

const rioute = express.Router()

const userController = require("../controllers/userController")

const redirectedIfAuthenticated = require("../../middleware/redirectIfAuthenticated")

rioute.get("/auth/user",redirectedIfAuthenticated,userController.register)

rioute.post("/post/user",redirectedIfAuthenticated,userController.stores)


rioute.get("/auth/login",redirectedIfAuthenticated,userController.loginForm)

rioute.post("/login/user",redirectedIfAuthenticated,userController.login)

rioute.get("/auth/logout",userController.logout)

module.exports = rioute