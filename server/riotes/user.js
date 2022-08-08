
const express = require ("express")

const rioute = express.Router()

const userController = require("../controllers/userController")

rioute.get("/auth/user",userController.register)

module.exports = rioute