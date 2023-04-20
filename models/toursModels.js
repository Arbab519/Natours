const mongoose = require('mongoose');
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

module.exports = Tour;