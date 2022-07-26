
const express = require ("express")

const rioutes = express.Router()

const contactController = require("../controllers/contactController")

rioutes.get("/contact",contactController.contact)

module.exports = rioutes