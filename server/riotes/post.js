
const express = require("express")

const rioter  = express.Router()

const postController = require("../controllers/postController")

rioter.get("/create/post", postController.create)
rioter.post("/store/post", postController.store)


module.exports = rioter