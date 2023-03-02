const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
    firstName:{
        type:String,
        required:[true,"Please provide an FirstName"],
        unique:false
    },
    lastName:{
        type:String,
        unique:false
    },
    email:{
        type:String,
        required:[true,"Please provide an Email"],
        unique:[true,"Email Exist"],
    },
    password:{
        type:String,
        required:[true,"Please provide a password"],
        unique:false,
    },
    mobileNumber:{
        type:String,
        required:[true,"Please provide mobile number"],
        unique:true,
    },
    aadharNumber:{
        type:String,
        required:[true,"Please provide aadhar number"],
        unique:true,
    },
    address:{
        type:String,
        required:[true,"Please provide address"],
        unique:false,
    },
    pincode:{
        type:String,
        required:[true,"Please provide pincode"],
        unique:false,
    },
    district:{
        type:String,
        required:[true,"Please provide district"],
        unique:false,
    },
    state:{
        type:String,
        required:[true,"Please provide state"],
        unique:false,
    }

})

module.exports = mongoose.model.Users || mongoose.model("Users", UserSchema);

