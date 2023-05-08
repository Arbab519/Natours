const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Tour = require('./../../models/toursModels');
const fs = require('fs');
dotenv.config({path: './config.env'});



// replace the password placeholder with actual password
const DB = process.env.DATABASE.replace('<PASSWORD>' , process.env.DATABASE_PASSWORD);

// Database connection
mongoose.connect(DB, {
     useUnifiedTopology: true,
     useNewUrlParser:true,
     useCreateIndex:true,
     useFindAndModify:false
}) .then(()=>console.log('DB connection successful'));

// read json file
const tours = JSON.parse(fs.readFileSync(`${__dirname}/tours-simple.json`,'utf-8'));
//Import data into DB

const importData=async()=>{
    try {
        await Tour.create(tours)
        console.log("Data Successfully loaded ");
    } catch (error) {
        console.log(error);
    }
    process.exit();
}

// delete previus data
const deleteData=async()=>{
    try {
        await Tour.deleteMany();
        console.log("Data Deleted");
    } catch (error) {
        console.log(error);
    }
    process.exit();
}

if (process.argv[2] == "--import") {
    importData();
} else if(process.argv[2] == "--delete"){
    deleteData();
}