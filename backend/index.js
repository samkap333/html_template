
const express = require('express');


const mongo = require('mongoose');
const Route = require ('./routes/route');
const cors = require ('cors');

const myapp=express();

myapp.use(cors())
mongo.connect('mongodb://localhost:27017/New_Project',{
    useUnifiedTopology: true,
    useNewUrlParser:true
}).then(()=>{
    console.log("Connected to MongoDB !!!");
}).catch((error)=>{
    console.log("Error connecting to MongoDB", error)
});


myapp.use(express.json());
myapp.use('/api',Route);
myapp.use(express.static('public'))

const port = process.env.port || 3000;
myapp.listen(port,() =>{
    console.log(`We started at port ${port}`);
});
