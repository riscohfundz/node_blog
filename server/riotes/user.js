
const express = require ("express")

const rioute = express.Router()

const userController = require("../controllers/userController")

rioute.get("/auth/user",userController.register)

rioute.post("/post/user",userController.stores)


rioute.get("/auth/login",userController.loginForm)

rioute.post("/login/user",userController.login)

module.exports = rioute