const express = require("express");
const mongoose = require("mongoose");
const bodyparser = require("body-parser");
const dotenv = require("dotenv");

const app = express();
dotenv.config();

const port = process.env.PORT|| 3000;

const username= process.env.MONGODB_USERNAME;
const password = process.env.MONGODB_PASSWORD;

mongoose.connect(`mongodb+srv://$(username):$(password)@cluster0.oe8fn.mongodb.net/sakshidb`,
{
    useNewUrlParser : true,
    useUnifiedTopology : true,
});

//registrstion scheme 
const registrationScheme = new mongoose.Schema({
    name : String,
    email:String,
    password:String,
})

const registrstion = mongoose.model("Registration",registrationScheme);

app.use(bodyparser.urlencoded({extended: true}))
app.use(bodyparser.json())


app.get("/",(req,res) =>{
   res.sendFile(__dirname +"\pages\index.html");
})

app.post("/register" ,(req, res) => {
    try{
const {name, email , password } = req.body;
    
   const registrstionData = new registration({
    name,
    email,
    password
   });
        registrstionData.save();
       res.redirect("/success");
    }
    catch(error){
        console.log(error);
        res.redirect("/error");
    }
})
   
app.get("/success",(req, res) => {
res.sendFile(__dirname+"/page/success.html");
})

app.get("/error",(req, res) => {
    res.sendFile(__dirname+"/page/error.html");
    })

app.listen(port, ()=>{
    console.log('server is running on port ${port}');
})

 