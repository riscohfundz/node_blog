
const express = require("express")

const rioter  = express.Router()

const postController = require("../controllers/postController")

const user = require("../../middleware/postStore") 
const auth = require("../../middleware/auth")


rioter.get("/create/post",auth, postController.create)
rioter.post("/store/post",auth,user, postController.store)


module.exports = rioter