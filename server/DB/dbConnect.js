//external imports
const mongoose = require("mongoose");
require('dotenv').config({ path: './.env' });

async function dbConnect(){
    //use mongoose to connect this app
    //to our database on mongoDB using the DB_URL(connection string)
    // mongoose.connect(
    //     process.env.DB_URL,
    //     {
    //         //these are options to ensure that the connection
    //         //is done properly
    //         useNewUrlParser:true,
    //         useUnifiedTopology:true,
    //     }
    // )

    mongoose.connect(process.env.DB_URL,
        { useNewUrlParser: true, 
            useUnifiedTopology: true, 
            writeConcern: { w: 'majority', j: true, wtimeout: 1000 } 
        })
    .then(()=>{
        console.log("Successfully connected to MongoDB Atlas");
    })
    .catch((error) => {
        console.log("Unable to connect to the MongoDB Atlas!");
        console.error(error);
    })
}

module.exports = dbConnect;

