
const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config({path: './config.env'});
const app =require('./structured_app');

// replace the password placeholder with actual password
const DB = process.env.DATABASE.replace('<PASSWORD>' , process.env.DATABASE_PASSWORD);

// Database connection
mongoose.connect(DB, {
     useNewUrlParser:true,
     useCreateIndex:true,
     useFindAndModify:false
}) .then(()=>console.log('DB connection successful'));

//!mongoose model/schema

// creating Schema
const tourSchema = new mongoose.Schema({
     name : {
          type: String,
          required: [true ,'A tour must have a name'],
          unique: true
     },
     rating:{
          type : Number,
          default:4.0,
     },
     price:{
          type: Number,
          required: [true ,'A tour must have a price'],
     }
});

//model of schema

const Tour = new mongoose.model('Tour', tourSchema); 

const testTour = new Tour({
      name: "The  Sky Diving",
      rating: 5.5,
      price:500
});

testTour
.save()
.then(doc=>console.log(doc)).catch(err=> console.log('Error !!!', err));



const port = process.env.PORT || 3000;
app.listen(port,()=>{
console.log(`App is running on port ${port}`);
});
