

//import mongoose from "mongoose";
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const jaapSchema = new mongoose.Schema(
    {
        id: ObjectId,
        userId: { type: Number, required: true },
        jaapId: { type: Number, required: true},
        userName: { type: String, required: true},
        counter: { type: Number},
        jaaps: [new mongoose.Schema(
            {
                id: ObjectId,
                jaap:String
            },{ timestamps: true })],
        isDeleted: {
            type: String,
            default: "N",
        },
        challengeWinner: {
            type: String,
            default: "N",
        }
        
    },
    { timestamps: true }
);

module.exports = mongoose.model('userJaaps', jaapSchema);