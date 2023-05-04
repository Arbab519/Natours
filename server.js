const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config({path: './config.env'});
const app =require('./app');

// replace the password placeholder with actual password
const DB = process.env.DATABASE.replace('<PASSWORD>' , process.env.DATABASE_PASSWORD);

// Database connection
mongoose.connect(DB, {
     useUnifiedTopology: true,
     useNewUrlParser:true,
     useCreateIndex:true,
     useFindAndModify:false
}) .then(()=>console.log('DB connection successful'));


// Server
const port = process.env.PORT || 3000;
app.listen(port,()=>{
console.log(`App is running on port ${port}`); 
});
