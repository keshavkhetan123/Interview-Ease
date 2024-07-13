const express = require('express');
const {Application,Feedback} = require('../../controllers/application.js'); 


const route = express.Router();

route.post('/form',Application);
route.post('/feedback',Feedback);

module.exports = route;