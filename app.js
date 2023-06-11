const express = require('express')
const app = express()
var bodyParser = require('body-parser');
require('dotenv').config()
var cors = require('cors')
var path = require('path');
const helmet = require("helmet");
const port = 3000
app.use(cors());
//app.use(helmet());
// view engine setup
var indexRouter = require('./api/userRoute');
var jaapRoute = require('./api/jaapRoute');

const mongoose = require("mongoose");
app.use(bodyParser.json());

app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);
//app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
//app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/v1/user', indexRouter);
app.use('/v1/jaap', jaapRoute);
app.get('/', (req, res) => {
  
  res.send('Hello World!')
})
mongoose.connect('mongodb+srv://anantkrd:Z7HMEA67dM7OsdFY@cluster0.fnlmbie.mongodb.net/MantraNaamJaap?retryWrites=true&w=majority')
  .then((result) =>{
    console.log('Connected!');
    app.listen(port, () => {
      console.log(`Example app listening on port ${port}`)
    });
  } );
//app.use('/', indexRouter);
