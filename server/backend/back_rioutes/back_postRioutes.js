

const express = require("express")

const rioutes = express.Router()

const back_postController = require("../back_controller/back_postController")

rioutes.get("/backend/dashboard",back_postController.dash)

rioutes.get("/backend/backPost",back_postController.backPost)

module.exports = rioutes           