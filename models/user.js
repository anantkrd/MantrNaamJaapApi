

//import mongoose from "mongoose";
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const userSchema = new mongoose.Schema(
  {
    id:ObjectId,
    userId:{type: Number, required: true,unique:true},
    firstName: {
      type: String,
      trim: true,
      required: true,
    },
    lastName: {
      type: String,
      trim: true,
      required: true,
    },    
    email: {
      type: String,
      trim: true,
      required: true,
      unique: true,
    },    
    mobile: {
      type: String,
      trim: true,
      required: true,
      unique: true,
    },
    userPassword: {
      type: String,
      required: true,
      min: 6,
      max: 64,
    },
    city: {
      type: String,
      default: "",
    },
    apiToken: {
      type: String,
      default: "",
    },    
    image: {
      type: String,
      url: "",
    },    
    appVersion: {
      type: String,
      default: "",
    },   
    deviceName: {
      type: String,
      default: "",
    },  
    deviceIp: {
      type: String,
      default: "",
    },      
    appOsVersion: {
      type: String,
      default: "",
    },    
    status:{
      type: String,
      default: "active",
    },
    isDeleted: {
      type: String,
      default: "N",
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model('User', userSchema);
//module.exports=mongoose.model("User", userSchema);
//export default mongoose.model("User", userSchema);