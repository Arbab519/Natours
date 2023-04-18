const express = require('express');


// ! User handlers    

const getAllUsers  =(req,res)=>{
    res.status(201).json({
        status: "fail",
        message: "this route is not defined yet"
    }) 
};

const createUser  =(req,res)=>{
    res.status(201).json({
        status: "fail",
        message: "this route is not defined yet"
    }) 
};

const deleteUser  =(req,res)=>{
    res.status(201).json({
        status: "fail",
        message: "this route is not defined yet"
    }) 
};

const updateUser  =(req,res)=>{
    res.status(201).json({
        status: "fail",
        message: "this route is not defined yet"
    }) 
};

const getUser  =(req,res)=>{
    res.status(201).json({
        status: "fail",
        message: "this route is not defined yet"
    }) 
};

// !Mounting Routers 
const router = express.Router();

 //!Users Routes
 router.route('/')
 .get(getAllUsers)
 .get(createUser);
 router.route('/:id')
    .post(createUser)
    .get(getUser)
    .patch(updateUser)
    .delete(deleteUser);

module.exports=router;