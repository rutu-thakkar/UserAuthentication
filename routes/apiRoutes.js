const express = require('express')
const route = express.Router();
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken');
const db = require('../models');
const userController = require('../controller/userController')


route.post('/signup', userController.signup)
route.post('/signin', userController.login)

// route.get('/', userController.tokenfunc)

module.exports = route;