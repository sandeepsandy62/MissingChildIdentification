const express = require('express');
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser')
const multer = require('multer');
const upload = multer();

app.use(cors())
app.use(bodyParser.json())
Link = "http://localhost:8000/";

app.get("/",(req,res)=>{
    res.send('<h1>Hi Moronnnnnn!!</h1>')
})

app.post("/signin",(req,res)=>{
    const {email,password} = req.body;
    console.log("email : " , email);
    console.log("password : " , password);
})

app.post("/signup", upload.single("image"), (req, res) => {
    const {
      firstName,
      lastName,
      mobileNumber,
      aadharNumber,
      address,
      state,
      email,
      password,
      pincode,
      district,
    } = req.body;
  
    const image = req.file;
  
    console.log("First Name : ", firstName);
    console.log("Last Name : ", lastName);
    console.log("Mobile Number : ", mobileNumber);
    console.log("Aadhar Number : ", aadharNumber);
    console.log("Image : ", image);
    console.log("State : ", state);
    console.log("Address : ", address);
    console.log("Email : ", email);
    console.log("Password : ", password);
    console.log("Pincode : ", pincode);
    console.log("District : ", district);
  });

app.listen(8000,()=>{
    console.log(`Port listening on ${Link}`);
})