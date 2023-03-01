const express = require("express");
const app = express();
const bodyParser = require('body-parser');
const bcrypt = require("bcrypt");

// body parser configuration
app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (request, response, next) => {
  response.json({ message: "Hey! This is your server response!" });
  next();
});

//require the database connection
const dbConnect = require("./DB/dbConnect");

//execute the database connection
dbConnect();

const User = require("./db/userModel");

//register endpoint
app.post("/register",(request,response) => {
    //hash the password
    bcrypt.hash(request.body.password,10)
    .then((hashedPassword)=>{
        //create a new user instance and collect the data
        const user = new User({
            email : request.body.email,
            password:hashedPassword,
        });

        //save the new user
        user.save()
        //return success if the new user is added to the database successfully
        .then((result)=>{
            response.status(201).send({
                message:"User Created Successfully",
                result,
            });
        })
        //catch the error if the new user wasn't added successfully to the database
        .catch((error)=>{
            response.status(500).send({
                message:"Error creating the User",
                error,
            });
        });
    })
    //catch error if the password hash isn't successful
    .catch((e)=>{
        response.status(500).send({
            message:"Password was not hashed successfully",
            e,
        });
    });
});

module.exports = app;