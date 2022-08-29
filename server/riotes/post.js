
const express = require("express")

const rioter  = express.Router()

const postController = require("../controllers/postController")

const user = require("../../middleware/postStore") 
const auth = require("../../middleware/auth")


rioter.get("/create/post",auth, postController.create)
rioter.post("/store/post",auth,user, postController.store)

rioter.get("/edit/post/:id",auth, postController.edit)
rioter.post("/update/post/:id",auth, postController.update)



module.exports = rioter