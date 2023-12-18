const express = require('express');

const jwt = require('jsonwebtoken');

const router = express.Router();
const moment = require('moment');
//const authenticate = require("../auth/index");
const jaapController = require("./jaapController");

router.get('/getJaapById', jaapController.getJaapById);
router.get('/getJaaps', jaapController.getJaaps);
router.get('/getChallenges', jaapController.getChallenges);

router.get('/addJaap', jaapController.addJaap);
router.get('/addUserJaaps', jaapController.addUserJaaps);

router.get('/getJaapUserList', jaapController.getJaapUserList);

router.get('/jaapCounter', jaapController.jaapCounter);

module.exports = router;