const { json } = require('body-parser');
const moment = require('moment');
const User = require('../models/user');
const MantraJaaps = require('../models/mantraJaaps');
const UserJaaps = require('../models/userJaaps');
var CryptoJS = require("crypto-js");
var jwt = require('jsonwebtoken');

var SHA256 = require("crypto-js/sha256");
module.exports = {

    getJaaps: async (req, res) => {
        try {

            let jaapObj = await MantraJaaps.find({ isDeleted: 'N',isChallenges:'N' }).sort('-createdAt');
            if (jaapObj) {
                responce = JSON.stringify({ code: '200', message: "success", data: jaapObj });
                res.status(200).send(responce);
            } else {
                responce = JSON.stringify({ code: '404', message: "No task found please come after some time", data: '' });
                res.status(500).send(responce);
            }
        } catch (e) {
            console.log(e)
            responce = JSON.stringify({ code: '501', message: e.message || "Some error occurred while retrieving tutorials.", data: '' });
            res.status(500).send(responce);
        }
    },
    getChallenges: async (req, res) => {
        try {

            let jaapObj = await MantraJaaps.find({ isDeleted: 'N',isChallenges:'Y' });
            if (jaapObj) {
                responce = JSON.stringify({ code: '200', message: "success", data: jaapObj });
                res.status(200).send(responce);
            } else {
                responce = JSON.stringify({ code: '404', message: "No task found please come after some time", data: '' });
                res.status(500).send(responce);
            }
        } catch (e) {
            console.log(e)
            responce = JSON.stringify({ code: '501', message: e.message || "Some error occurred while retrieving tutorials.", data: '' });
            res.status(500).send(responce);
        }
    },
    
    getJaapById: async (req, res) => {
        try {
            let jaapId=req.query.jaapId;
            let userId=req.query.userId;
            let jaapObj = await MantraJaaps.findOne({ isDeleted: 'N',jaapId:jaapId });
            if (jaapObj) {
                let userJaapObj = await UserJaaps.findOne({ userId: userId, jaapId: jaapId },{jaaps:{$slice: -100}});
                responce = JSON.stringify({ code: '200', message: "success", data: jaapObj,userJaapData:userJaapObj });
                res.status(200).send(responce);
            } else {
                responce = JSON.stringify({ code: '404', message: "No task found please come after some time", data: '' });
                res.status(500).send(responce);
            }
        } catch (e) {
            console.log(e)
            responce = JSON.stringify({ code: '501', message: e.message || "Some error occurred while retrieving tutorials.", data: '' });
            res.status(500).send(responce);
        }
    },
    getJaapUserList: async (req, res) => {
        try {
            let jaapId=req.query.jaapId;
            let userId=req.query.userId;
            let jaapObj = await MantraJaaps.findOne({ isDeleted: 'N',jaapId:jaapId });
            if (jaapObj) {
                let userJaapObj = await UserJaaps.find({jaapId: jaapId },{jaaps:{$slice: -1}}).sort({"counter":-1});
                responce = JSON.stringify({ code: '200', message: "success", data: jaapObj,userJaapData:userJaapObj });
                res.status(200).send(responce);
            } else {
                responce = JSON.stringify({ code: '404', message: "No task found please come after some time", data: '' });
                res.status(500).send(responce);
            }
        } catch (e) {
            console.log(e)
            responce = JSON.stringify({ code: '501', message: e.message || "Some error occurred while retrieving tutorials.", data: '' });
            res.status(500).send(responce);
        }
    },
    addJaap: async (req, res) => {
        try {
            let title = req.query.title;
            let startDate = req.query.startDate;
            let endDate = req.query.endDate;
            let isChallenges = req.query.isChallenges;
            let cardImage = req.query.cardImage;
            let bgImage = req.query.bgImage;
            let challengeTarget = req.query.challengeTarget;
            let challengeAmount = req.query.challengeAmount;
            let info = req.query.info;
            let audio='';
            console.log("startDate:" + startDate + "   endDate:" + endDate)
            startDate = moment(startDate).format('YYYY-MM-DD[T00:00:00.000Z]');
            endDate = moment(endDate).format('YYYY-MM-DD[T00:00:00.000Z]');
            findUserObj = await MantraJaaps.findOne().sort('-jaapId');
            jaapId = 1;
            if (findUserObj == null) {
                jaapId = 1;
            } else {
                jaapId = findUserObj.jaapId + 1;
            }
            let bgImageUrl=process.env.Cloud_url+""+bgImage;
            let cardImageUrl=process.env.Cloud_url+""+cardImage;
            param = {
                jaapId: jaapId,
                title: title,
                startDate: startDate,
                endDate: endDate,
                isChallenges: isChallenges,
                image:cardImageUrl,
                bgimage:bgImageUrl,
                challengeTarget:challengeTarget,
                challengeAmount:challengeAmount,
                info:info,
                counter:0,
                isDeleted: 'N',
                audio:audio
            }
            console.log("param:" + JSON.stringify(param));

            let userObj = await MantraJaaps.create(param);

            if (userObj) {
                responce = JSON.stringify({ code: '200', message: "success", data: userObj });
                res.status(200).send(responce);
            } else {
                responce = JSON.stringify({ code: '404', message: "Invalid User", data: '' });
                res.status(500).send(responce);
            }
        } catch (e) {
            console.log(e)
            responce = JSON.stringify({ code: '501', message: "some internal error", data: '' });
            res.status(500).send(responce);
        }
    },
    addUserJaaps: async (req, res) => {
        try {
            let title = req.query.title;
            let userId = req.query.userId;
            let jaapId = req.query.jaapId;
            //console.log("jaapId="+jaapId);
            //console.log("title="+title);
            userData = await User.findOne({ userId: userId });
            userName = "";
            if (userData !== null) {
                userName = userData.firstName + " " + userData.lastName;;
            }
            jaapParam = [{ jaap: title }];
            userJaapData = await UserJaaps.findOne({ userId: userId, jaapId: jaapId });
            mantrJaapData = await MantraJaaps.findOne({  jaapId: jaapId });
            let jaapObj = null;
            if (userJaapData !== null) {
                jaapParam = { jaap: title };
                //console.log("userJaapData:" + JSON.stringify(userJaapData.jaaps)+"==="+userJaapData.jaaps.length)
                try {
                    let counter=userJaapData.jaaps.length+1;

                    
                    userJaapData.counter=counter;
                    userJaapData.jaaps.push(jaapParam);
                    userJaapData.challengeWinner="N";
                    if(mantrJaapData.isChallenges=='Y')
                    {
                        challengeTarget=mantrJaapData.challengeTarget;
                        if(challengeTarget>=counter){
                            userJaapData.challengeWinner="Y";
                        }
                    }
                    jaapObj = await userJaapData.save();
                    
                    mantrJaapData.counter=mantrJaapData.counter+1;
                    
                    mantraJaapObj = await mantrJaapData.save();
                    
                } catch (err) {
                    //err.message; // '#sadpanda'
                    console.log("errrrrr" + err);
                    responce = JSON.stringify({ code: '501', message: "some internal error", data: '' });
                    res.status(500).send(responce);
                }
                //jaapObj=await userJaapData.jaaps.push(jaapParam);
                //UserJaaps.findOneAndUpdate()
            } else {
                param = {
                    userId: userId,
                    jaapId: jaapId,
                    userName: userName,
                    counter: 1,
                    jaaps: jaapParam,
                    isDeleted: 'N'
                }
                userJaapData = await UserJaaps.create(param);
                
                mantrJaapData.counter=mantrJaapData.counter+1;
                
                mantraJaapObj = await mantrJaapData.save();

            }

            if (userJaapData) {
                responce = JSON.stringify({ code: '200', message: "success", data: userJaapData });
                res.status(200).send(responce);
            } else {
                responce = JSON.stringify({ code: '404', message: "Invalid jaap", data: '' });
                res.status(500).send(responce);
            }
        } catch (e) {
            console.log(e)
            responce = JSON.stringify({ code: '501', message: "some internal error", data: '' });
            res.status(500).send(responce);
        }
    },
    
    jaapCounter: async (req, res) => {
        try {
            let userId = req.body.userId;
            let counter = req.body.counter;
            let audio='';
            console.log("counter:" + counter)
            jaapDate = moment().format('YYYY-MM-DD');
            findUserObj = await MantraJaaps.findOne().sort('-jaapId');
            jaapId = 1;
            if (findUserObj == null) {
                jaapId = 1;
            } else {
                jaapId = findUserObj.jaapId + 1;
            }
            let bgImageUrl=process.env.Cloud_url+""+bgImage;
            let cardImageUrl=process.env.Cloud_url+""+cardImage;
            param = {
                jaapId: jaapId,
                title: title,
                startDate: startDate,
                endDate: endDate,
                isChallenges: isChallenges,
                image:cardImageUrl,
                bgimage:bgImageUrl,
                challengeTarget:challengeTarget,
                challengeAmount:challengeAmount,
                info:info,
                counter:0,
                isDeleted: 'N',
                audio:audio
            }
            console.log("param:" + JSON.stringify(param));

            let userObj = await MantraJaaps.create(param);

            if (userObj) {
                responce = JSON.stringify({ code: '200', message: "success", data: userObj });
                res.status(200).send(responce);
            } else {
                responce = JSON.stringify({ code: '404', message: "Invalid User", data: '' });
                res.status(500).send(responce);
            }
        } catch (e) {
            console.log(e)
            responce = JSON.stringify({ code: '501', message: "some internal error", data: '' });
            res.status(500).send(responce);
        }
    },

}