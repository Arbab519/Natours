/* eslint-disable no-console */
const mongoose = require('mongoose');
const slugify = require('slugify');
//!mongoose model/schema
// creating Schema
const tourSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'A tour must have a name'],
      unique: true,
      trim: true
    },
    slug: {
      type: String
    },
    duration: {
      type: Number,
      required: [true, 'A tour must have a Duration']
    },
    difficulty: {
      type: String,
      required: [true, 'A tour must have a difficulty level']
    },
    maxGroupSize: {
      type: Number,
      required: [true, 'A tour must have a Group Size']
    },
    rating: {
      type: Number,
      default: 0
    },
    ratingsAverage: {
      type: Number,
      default: 0
    },
    ratingsQuantity: {
      type: Number,
      default: 0
    },
    price: {
      type: Number,
      required: [true, 'A tour must have a price']
    },
    priceDiscount: Number,
    summary: {
      type: String,
      required: [true, 'A tour must have a Summary'],
      trim: true
    },
    description: {
      type: String,
      trim: true
    },
    imageCover: {
      type: String,
      required: [true, 'A tour must have a image cover']
    },
    images: [String],
    createdAt: {
      type: Date,
      default: Date.now(),
      select: false
    },
    startDates: [Date],
    secretTour: { type: Boolean, default: false }
  },
  // in schema first parameter is for dchema defination and 2nd is for schema option
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
  }
);
//model of schema
//!Virtual Function
tourSchema.virtual('durationWeeks').get(function() {
  return this.duration / 7;
});
//! Document middleware
// tourSchema.pre('save', function(next) {
//   this.slug = slugify(this.name, { lower: true });
//   next();
// });
// tourSchema.post('save', function(doc, next) {
//   console.log(doc);
//   next();
// });
//! Query MiddleWare this will execute before mongo qurey executed so we use "find"
tourSchema.pre(/^find/, function(next) {
  this.find({ selectTour: { $ne: true } });
  this.start = Date.now();
  next();
});
tourSchema.post(/^find/, function(docs, next) {
  console.log(`Query took ${Date.now() - this.start} miliseconds`);
  console.log(docs);
  next();
});
//! Aggregation MIDDLEWARE
tourSchema.pre('aggregate', function(next) {
  this.pipeline().unshift({ $match: { secretTour: { $ne: true } } });
  next();
});
const Tour = mongoose.model('Tour', tourSchema);

module.exports = Tour;
