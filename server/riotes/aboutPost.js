
const express = require("express")

const riouter = express.Router()

const aboutController = require("../controllers/aboutController")


riouter.get("/",aboutController.index)
riouter.get("/about",aboutController.inputs)
riouter.get("/post",aboutController.post)
riouter.get("/contact",aboutController.contact)


module.exports = riouter
