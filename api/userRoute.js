const express = require('express');

const jwt = require('jsonwebtoken');

const router = express.Router();
const moment = require('moment');
//const authenticate = require("../auth/index");
const userController = require("./user.controller");

router.get('/login', userController.login);
router.post('/register', userController.register);
router.get('/getUseById', userController.getUser);
router.get('/getApp', userController.getApp);
router.get('/addAppData', userController.addAppData);


module.exports = router;