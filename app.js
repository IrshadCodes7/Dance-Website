const express = require("express");
const path = require("path");
const fs = require("fs");
const app = express();
const mongoose = require('mongoose');
const bodyparser=require("body-parser");

main().catch(err => console.log(err));

async function main() {
  await mongoose.connect('mongodb+srv://Irshad:7865991655@mongoyoutube.lrdzpgm.mongodb.net/');}
const port = 80;
//Define mongoose schema
const ContactSchema = new mongoose.Schema({
    name: String,
    phone:String,
    email: String,
    address: String,

  });
  var contact = mongoose.model('contact', ContactSchema);

//EXPRESS SPECIFIC STUFF
app.use('/static',express.static('static'));//for serving static files
app.use(express.urlencoded());

//PUG SPECIFIC STUFF
app.set('view engine','pug');//set the template engine as pug
app.set('views',path.join(__dirname,'views'));//set the view directory
//ENDPOINTS
app.get('/',(req,res)=>{
    res.status(200).render('home.pug')
});
app.get('/contact',(req,res)=>{
    res.status(200).render('contact.pug')
});
app.post('/contact',(req,res)=>{
  var myData= new contact(req.body);
  myData.save().then(()=>{
    res.send("This item has been saved to the database")
  }).catch(()=>{
    res.status(400).send("Item was not saved to the data base")
  })
 // res.status(200).render('contact.pug');
});
//START THE SERVER
app.listen(port,()=>{
console.log(`The application started at port ${port}`)
});
