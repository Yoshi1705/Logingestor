const express = require('express');
const MongoClient = require('mongoose');
const app = express();
const port = process.env.PORT || 3000;
const mongoURI = 'mongodb://localhost:27017/'; 
const router = require('./router/main');
const cors = require('cors');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');

dotenv.config(); 

app.use(cors());
app.use(bodyParser.json());
app.get('/',(req,res)=>{
    res.send('hello world');
    res.end();
})
app.use('/api',router);

MongoClient.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
.then(()=>{
    console.log('connected to db successfull')
    app.listen(port,()=>{
        console.log('server started successfully');
    })
})
.catch((err)=>{
   console.log('connection to db failed');
   console.log(err);
})
