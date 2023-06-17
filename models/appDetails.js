

//import mongoose from "mongoose";
const mongoose = require('mongoose');
const { BOOLEAN } = require('sequelize');
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const appSchema = new mongoose.Schema(
  {
    id:ObjectId,
    appVersion: {
      type: String,
      trim: true,
      required: true,
    },
    buildVersion: {
      type: String,
      url: "",
    },      
    appType: {
      type: String,
      url: "",
    },  
    versionDate: {
      type: Date
    },
    isLatest: {
      type: Boolean,
      default: 'true',
    },
    type: {
      type: String,
      default: 'normal',
    },
    appUrl: {
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

module.exports = mongoose.model('appData', appSchema);