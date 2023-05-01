const mongoose = require('mongoose');
//!mongoose model/schema
// creating Schema
const tourSchema = new mongoose.Schema({
    name : {
         type: String,
         required: [true ,'A tour must have a name'],
         unique: true,
         trim: true
    },
    duration: {
     type:Number,
     required:[true,'A tour must have a Duration']
    },
    difficulty:{
     type:String,
     required:[true,'A tour must have a difficulty level']
    },
    maxGroupSize: {
     type:Number,
     required:[true,'A tour must have a Group Size']
    },
    rating: {
         type : Number,
         default:0,
    },
    price: {
         type: Number,
         required: [true ,'A tour must have a price'],
    },
    priceDiscount: Number,
    summary: {
     type:String,
     required: [true ,'A tour must have a Summary'],
     trim:true
    },
    description: {
     type:String,
     trim:true
    },
    imageCover: {
     type:String,
     required: [true ,'A tour must have a image cover'],
     },
     images: [String],
    createdAt: {
     type :Date,
     default:Date.now()
    },
    startDates:[Date]

});

//model of schema

const Tour = mongoose.model('Tour', tourSchema); 

module.exports = Tour;