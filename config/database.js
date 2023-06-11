const mongoose = require("mongoose");
const { MongoClient } = require('mongodb');

mongoose.connect('mongodb://127.0.0.1:27017/test')
  .then(() => console.log('Connected!'));
/*let url="mongodb+srv://anantkrd:Z7HMEA67dM7OsdFY@cluster0.fnlmbie.mongodb.net/?retryWrites=true&w=majority"
const client = new MongoClient(url);
await client.connect();
console.log('Connected successfully to server');
let dbName="MantraNaamJaap";
const db = client.db(dbName);
module.exports=db;*/