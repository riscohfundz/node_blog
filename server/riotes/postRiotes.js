
const express = require ("express")

const rioutes = express.Router()

const postsController = require("../controllers/postsController")

rioutes.get("/post",postsController.post)

module.exports = rioutes