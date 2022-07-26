
const express = require("express")

const riouter = express.Router()

const aboutController = require("../controllers/aboutController")

riouter.get("/about",aboutController.inputs)


module.exports = riouter
