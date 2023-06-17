const { json } = require('body-parser');

const moment = require('moment');
const User = require('../models/user');
const AppDetails=require('../models/appDetails');
var CryptoJS = require("crypto-js");
var jwt = require('jsonwebtoken');

var SHA256 = require("crypto-js/sha256");
module.exports = {

    login: async (req, res) => {
        try {
            let userName = req.query.userName;
            let userPass = req.query.userPass;
            
            let deviceName=req.body.deviceName;
            let appVersion=req.body.appVersion;
            let deviceIp=req.body.deviceIp;
            let deviceOs=req.body.deviceOs;
            console.log("SHA256:===" + SHA256(userPass));
            userPassDec=SHA256(userPass).toString();
            userObj=await User.findOne( { email: userName,userPassword:userPassDec} );
            console.log(userPass + "===process.env.chipher:=" +JSON.stringify(userObj));
            
            if(userObj){
                
                let userId=userObj.userId;
                userObj.deviceName=deviceName;
                userObj.appVersion=appVersion;
                userObj.deviceIp=deviceIp;
                userObj.appOsVersion=deviceOs;
                await userObj.save();
                var token = jwt.sign({ userId: userId }, process.env.chipher);
                responce = JSON.stringify({ code: '200', message: "success", data: userObj,token:token});
                console.log("responce:"+JSON.stringify(responce));
                res.status(200).send(responce);
            }else{
                responce = JSON.stringify({ code: '404', message: "Invalid User", data: '' });
                console.log("responce:"+JSON.stringify(responce));
                res.status(500).send(responce);
            }
        } catch (e) {
            console.log(e)
            responce = JSON.stringify({ code: '501', message: e.message || "Some error occurred while retrieving tutorials.", data: '' });
            res.status(500).send(responce);
        }
    },
    register: async (req, res) => {
        try {            
            let firstName=req.body.firstName;
            let lastName=req.body.lastName;
            let mobile=req.body.mobile;
            let email=req.body.email;
            let userPassword=req.body.userPassword;
            let city=req.body.city;
            let deviceName=req.body.deviceName;
            let appVersion=req.body.appVersion;
            let deviceIp=req.body.deviceIp;
            let deviceOs=req.body.deviceOs;
            
            findUserObj=await User.findOne().sort('-userId');
            userId=1;
            if(findUserObj==null){
                userId=1;
            }else{
                userId=findUserObj.userId+1;
            }
            let passwordEnc= SHA256(userPassword).toString();
            param={
                userId:userId,
                firstName:firstName,
                lastName:lastName,
                mobile:mobile,
                email:email,
                userPassword:passwordEnc,
                city:city,
                type:'user',
                status:'active',
                appVersion:appVersion,
                deviceName:deviceName,
                appOsVersion:deviceOs,
                deviceIp:deviceIp
            }
            
            let userObj=await User.create(param);
            
            if(userObj){                
                responce = JSON.stringify({ code: '200', message: "success", data: userObj});
                res.status(200).send(responce);
            }else{
                responce = JSON.stringify({ code: '404', message: "Invalid User", data: '' });
                res.status(500).send(responce);
            }
        }  catch (e) {
            console.log(e)
            responce = JSON.stringify({ code: '501', message:"User already exist with given mobile or email", data: '' });
            res.status(501).send(responce);
        }
    },
    getUser: async (req, res) => {
        try {
            let userId = req.query.userId;
            //const userData = await User.findOne({attributes: { exclude: ['userPassword'] } , where: { id: userId }} );
            userData=await User.findOne( { userId: userId} );
            if (userData === null) {                
                responce = JSON.stringify({ code: '404', message: 'User Not Found', data: '' });
                res.status(404).send(responce)
            } else {
                responce = JSON.stringify({ code: '200', message: '', data: userData });
                res.status(200).send(responce);
            }
        } catch (e) {
            console.log(e)
            responce = JSON.stringify({ code: '501', message: e.message || "Some error occurred while retrieving tutorials.", data: '' });
            res.status(500).send(responce);
        }
    },
    getApp:async(req,res)=>{
        try {
            //let userId = req.query.buildVersion;
            //const userData = await User.findOne({attributes: { exclude: ['userPassword'] } , where: { id: userId }} );
            appData=await AppDetails.findOne({isDeleted:'N',isLatest:true});
            //console.group("appData:"+appData)
            if (appData === null) {                
                responce = JSON.stringify({ code: '404', message: 'Not Found', data: '' });
                res.status(404).send(responce)
            } else {
                responce = JSON.stringify({ code: '200', message: '', data: appData });
                res.status(200).send(responce);
            }
        } catch (e) {
            console.log(e)
            responce = JSON.stringify({ code: '501', message: e.message || "Some error occurred while retrieving tutorials.", data: '' });
            res.status(500).send(responce);
        }
    },
    addAppData:async(req,res)=>{
        try{
            param = {
                appVersion: '1.0',
                buildVersion: 2,
                appType: 'android',
                type:'normal',
                versionDate: 17-06-2023,
                isLatest: true,
                isDeleted: 'N',
                appUrl:''
            }
            //console.log("param:" + JSON.stringify(param));

            let userObj = await AppDetails.create(param);
            if (userObj === null) {                
                responce = JSON.stringify({ code: '404', message: 'something went wrong', data: '' });
                res.status(404).send(responce)
            } else {
                responce = JSON.stringify({ code: '200', message: 'new record added', data: userObj });
                res.status(200).send(responce);
            }
        }catch (e) {
            console.log(e)
            responce = JSON.stringify({ code: '501', message: e.message || "Some error occurred while retrieving tutorials.", data: '' });
            res.status(500).send(responce);
        }
    }

}