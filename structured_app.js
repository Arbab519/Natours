const express = require("express");
const fs = require('fs');
const morgan = require("morgan");
const app = express();

// !import routes 
const userRoutes = require('./routes/userRoutes');
const tourRoutes = require('./routes/tourRoutes');




//!MiddleWare
if (process.env.NODE_ENV === 'development') {
    app.use(morgan("dev"));
}


app.use(express.json());

app.use(((req ,res,next)=>{
    console.log("hello from middleware");
    next();
}));

app.use(((req ,res,next)=>{
    res.requestTime = new Date().toISOString;   
    next();
}))
 

// !Mounting Routers 
//write common route and  add router in a middleware
app.use("/api/v1/tours", tourRoutes);
app.use("/api/v1/users", userRoutes);

//Exports for server.js
module.exports=app;