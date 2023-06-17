

//import mongoose from "mongoose";
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const jaapSchema = new mongoose.Schema(
  {
    id:ObjectId,
    jaapId:{type: Number, required: true,unique:true},
    title: {
      type: String,
      trim: true,
      required: true,
    },
    image: {
      type: String,
      url: "",
    },      
    bgimage: {
      type: String,
      url: "",
    },  
    startDate: {
      type: Date
    },
    endDate: {
      type: Date
    },    
    isChallenges: {
      type: String,
      default: "N",
    },
    counter: {
      type: Number,
      default: 0,
    },
    challengeTarget: {
      type: Number,
      default: 0,
    },
    challengeAmount: {
      type: Number,
      default: 0,
    },
    info: {
      type: String,
      default: '',
    },
    challengInfo: {
      type: String,
      default: '',
    },
    audio: {
      type: String,
      default: '',
    },
    isDeleted: {
      type: String,
      default: "N",
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model('mantraJaaps', jaapSchema);