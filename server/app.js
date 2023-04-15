const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const auth = require("./auth");
const multer = require("multer");

var fs = require("fs");
var path = require("path");
require("dotenv/config");

// body parser configuration
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.set("view engine", "ejs");
//require the database connection
const dbConnect = require("./DB/dbConnect");

//execute the database connection
dbConnect();

//Curb cores Error by adding a header here
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
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
});

const User = require("./DB/userModel");
const SightedChild = require("./DB/sightedChildModel");
const MissingChild = require("./DB/missingChildModel");

//Routes

//Home Route
app.get("/", (request, response, next) => {
  response.json({ message: "Hey! This is your server response!" });
  next();
});

//authentication endpoint
app.get("/auth-endpoint", auth, (request, response) => {
  response.json({ message: "You are authorized to access me" });
});

//register endpoint
app.post("/signup", (request, response) => {
  //hash the password
  bcrypt
    .hash(request.body.password, 10)
    .then((hashedPassword) => {
      //create a new user instance and collect the data
      const user = new User({
        firstName: request.body.firstName,
        lastName: request.body.lastName,
        email: request.body.email,
        password: hashedPassword,
        mobileNumber: request.body.mobileNumber,
        aadharNumber: request.body.aadharNumber,
        address: request.body.aadharNumber,
        pincode: request.body.pincode,
        district: request.body.district,
        state: request.body.state,
      });

      //save the new user
      user
        .save()
        //return success if the new user is added to the database successfully
        .then((result) => {
          response.status(201).send({
            message: "User Created Successfully",
            result,
          });
        })
        //catch the error if the new user wasn't added successfully to the database
        .catch((error) => {
          response.status(500).send({
            message: "Error creating the User",
            error,
          });
        });
    })
    //catch error if the password hash isn't successful
    .catch((e) => {
      response.status(500).send({
        message: "Password was not hashed successfully",
        e,
      });
    });
});

//login endpoint
app.post("/signin", (request, response) => {
  //check if email exists
  User.findOne({ email: request.body.email })

    //if email exists
    .then((user) => {
      //compare the password entered and the hashed password found
      bcrypt
        .compare(request.body.password, user.password)
        //if the passwords match
        .then((passwordCheck) => {
          //check if password matches
          if (!passwordCheck) {
            return response.status(400).send({
              message: "Passwords does not match",
              error,
            });
          }

          //create JWT token
          const token = jwt.sign(
            {
              userId: user._id,
              userEmail: user.email,
            },
            "RANDOM-TOKEN",
            { expiresIn: "24h" }
          );

          //return success response
          response.status(200).send({
            message: "Login Successful",
            email: user.email,
            token,
          });
        })
        //catch error if password does not match
        .catch((error) => {
          response.status(400).send({
            message: "Passwords does not match",
            error,
          });
        });
    })
    //catch error if email does not exist
    .catch((e) => {
      response.status(404).send({
        message: "Email not found",
        e,
      });
    });
});

//free endpoint
app.get("/free-endpoint", (request, response) => {
  response.json({ message: "You are free to access me anytime" });
});

//authentication endpoint
app.get("/auth-endpoint", (request, response) => {
  response.json({ message: "You are authorized to access me" });
});

//set the destination and filename for multer
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads");
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});

//configure multer
const upload = multer({ storage: storage });

//create the sightedChild API endpoint
app.post('/sightedchild', upload.single('testImage'), async (req, res) => {
  const newSightedChild = new SightedChild({
    name: req.body.name,
    dateOfSighting: req.body.dateOfSighting,
    description: req.body.description,
    gender: req.body.gender,
    reason: req.body.reason,
    sightedAddress: req.body.sightedAddress,
    sightedDistrict: req.body.sightedDistrict,
    sightedPincode: req.body.sightedPincode,
    sightedState: req.body.sightedState,
    img: {
      data: fs.readFileSync(path.join(__dirname, '/uploads/' + req.file.filename)),
      contentType: req.file.mimetype,
    },
  });

  newSightedChild.save()
  .then((savedSightedChild) => {
    console.log('Image is saved');
    res.status(200).send(`${savedSightedChild._id}`);
  })
    .catch((err) => {
      console.log(err, 'error has occurred');
      res.status(400).send('Error occurred while saving image');
    });
});

//create the missingChild API endpoint
app.post('/missingchild', upload.single('testImage'), async (req, res) => {
  const newMissingChild = new MissingChild({
    name: req.body.name,
    dateOfMissing: req.body.dateOfMissing,
    dateOfBirth: req.body.dateOfBirth,
    gender: req.body.gender,
    relationship: req.body.relationship,
    description: req.body.description,
    fatherName : req.body.fatherName,
    fatherEmail:req.body.fatherEmail,
    fatherMobileNumber:req.body.fatherMobileNumber,
    childAdhaarNumber:req.body.childAdhaarNumber,
    state: req.body.state,
    district: req.body.district,
    address: req.body.address,
    pincode: req.body.pincode,
    img: {
      data: fs.readFileSync(path.join(__dirname, '/uploads/' + req.file.filename)),
      contentType: req.file.mimetype,
    },
    height:req.body.height,
    identificationMarks:req.body.identificationMarks,
    mentallyIll:req.body.mentallyIll,
    bottomWear:req.body.bottomWear,
    topWear:req.body.topWear,
  });

  newMissingChild.save()
  .then((savedMissingChild) => {
    console.log('Image is saved');
    res.status(200).send(`${savedMissingChild._id}`);
  })
    .catch((err) => {
      console.log(err, 'error has occurred');
      res.status(400).send('Error occurred while saving image');
    });
});






module.exports = app;