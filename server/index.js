const MongoClient = require("mongodb").MongoClient;
const uri = "mongodb+srv://sandeepgogarla:missingchildidentification@cluster0.ub16ezd.mongodb.net/?retryWrites=true&w=majority"
const client = new MongoClient(uri,{useNewUrlParser:true});
client.connect(err=>{
    
});