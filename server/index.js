const express = require('express');
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser')
const multer = require('multer');
const upload = multer();
const mongoose = require('mongoose');
const User = require('./schemas/userschema');

// Set up database connection
const { MongoClient } = require('mongodb');

const insertUser = async (user) => {
  const uri = process.env.MONGO_URI;
  const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

  try {
    // Connect to the MongoDB cluster
    await client.connect();

    // Access the UsersDatabase database
    const db = client.db('UsersDatabase');

    // Insert the user data into the Users collection
    const result = await db.collection('Users').insertOne(user);

    console.log(`Inserted user with id ${result.insertedId}`);
  } catch (e) {
    console.error(e);
  } finally {
    // Close the connection to the MongoDB cluster
    await client.close();
  }
};



app.use(cors())
app.use(bodyParser.json())

const Link = "http://localhost:8000/";


//Home Route
app.get("/", (req, res) => {
  res.send('<h1>Hi!!</h1>');
});

//Sign In Route
app.post("/signin", (req, res) => {
  const { email, password } = req.body;
  console.log("email: ", email);
  console.log("password: ", password);
});


//Sign Up Route
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
  
    const newUser = {
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
      image: { data: image.buffer, contentType: image.mimetype }
    };
  
    const insertUser = async (user) => {
        try {
          const newUser = new User(user);
          const result = await newUser.save();
          console.log(`Inserted user with id ${result._id}`);
        } catch (err) {
          console.error(err);
          throw err; // re-throw the error to the caller
        }
      };
      
  });
  

app.listen(8000, () => {
  console.log(`Port listening on ${Link}`);
});
