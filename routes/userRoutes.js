const express = require('express');
const {getUser,updateUser,deleteUser,getAllUsers,createUser,} = require('./../controllers/userControllers.js');

// !Mounting Routers 
const router = express.Router();

 //!Users Routes
 router.route('/')
 .get(getAllUsers)
 .get(createUser);
 router.route('/:id')
    .get(getUser)
    .patch(updateUser)
    .delete(deleteUser);

module.exports=router;