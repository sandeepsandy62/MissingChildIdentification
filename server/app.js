const express = require("express");
const app = express();
const bodyParser = require('body-parser');
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const auth = require("./auth");

// body parser configuration
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
//require the database connection
const dbConnect = require("./DB/dbConnect");

//execute the database connection
dbConnect();

//Curb cores Error by adding a header here
app.use((req,res,next)=>{
    res.setHeader("Access-Control-Allow-Origin","*");
    res.setHeader(
        "Access-Control-Allow-Headers",
        "Origin,X-Requested-With,Content,Accept,Content-Type,Authorization"
    );
    res.setHeader(
        "Access-Control-Allow-Methods",
        "GET,POST,PUT,DELETE,PATCH,OPTIONS"
    );
    next();
    return true;
})

const User = require("./db/userModel");

//Routes

//Home Route
app.get("/", (request, response, next) => {
  response.json({ message: "Hey! This is your server response!" });
  next();
});


//authentication endpoint
app.get("/auth-endpoint",auth,(request,response)=>{
    response.json({message:"You are authorized to access me"});
});

//register endpoint
app.post("/signup",(request,response) => {
    //hash the password
    bcrypt.hash(request.body.password,10)
    .then((hashedPassword)=>{
        //create a new user instance and collect the data
        const user = new User({
            firstName : request.body.firstName,
            lastName : request.body.lastName,
            email : request.body.email,
            password:hashedPassword,
            mobileNumber:request.body.mobileNumber,
            aadharNumber : request.body.aadharNumber,
            address : request.body.aadharNumber,
            pincode : request.body.pincode,
            district : request.body.district,
            state : request.body.state
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

//login endpoint
app.post("/signin",(request,response)=>{
    //check if email exists
    User.findOne({email:request.body.email})

    //if email exists
    .then((user)=>{
        //compare the password entered and the hashed password found
        bcrypt.compare(request.body.password,user.password)
        //if the passwords match
        .then((passwordCheck)=>{
            //check if password matches
            if(!passwordCheck){
                return response.status(400).send({
                    message:"Passwords does not match",
                    error,
                });
            }

            //create JWT token
            const token = jwt.sign(
                {
                    userId:user._id,
                    userEmail:user.email,
                },
                "RANDOM-TOKEN",
                {expiresIn: "24h"}
            );

            //return success response
            response.status(200).send({
                message:"Login Successful",
                emial:user.email,
                token,
            })
        })
        //catch error if password does not match
        .catch((error)=>{
            response.status(400).send({
                message:"Passwords does not match",
                error,
            });
        })
    })
    //catch error if email does not exist
    .catch((e) => {
        response.status(404).send({
            message:"Email not found",
            e,
        });
    });
})

//free endpoint
app.get("/free-endpoint",(request,response)=>{
    response.json({message:"You are free to access me anytime"});
});

//authentication endpoint
app.get("/auth-endpoint",(request,response)=>{
    response.json({message:"You are authorized to access me"});
});



module.exports = app;