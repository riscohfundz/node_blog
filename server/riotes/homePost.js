 
 
 const express = require("express")
 
 const riotes = express.Router()

const homeController = require("../controllers/homeController")

riotes.get('/',homeController.index);

riotes.get('/about',homeController.about);

riotes.get('/post/:id',homeController.post);

riotes.get('/contact',homeController.contact);

module.exports = riotes