const express = require('express');
const tourControllers = require('./../controllers/tourControllers.js');

// !Mounting Routers step1
const router = express.Router();


router.route('/top-5-cheap').get(tourControllers.aliasTopTours, tourControllers.getAllTours)



// change (app) with (router)  and remove common path 

router.route('/')
.get(tourControllers.getAllTours)
.post(tourControllers.createTour);

router.route('/:id')
    .get(tourControllers.getTour)
    .patch(tourControllers.updateTour)
    .delete(tourControllers.deleteTour);

 
    //!Export tourRouter
module.exports = router;