const express = require('express');
const tourControllers = require('./../controllers/tourControllers.js');

// !Mounting Routers step1
const router = express.Router();


// change (app) with routers name and remove common path 
try {
    router.route('/api/v1/tours/')
.get(tourControllers.getAllTours)
.get(tourControllers.createTour);

router.route('/api/v1/tours/:id')
    .get(tourControllers.getTour)
    .patch(tourControllers.updateTour)
    .delete(tourControllers.deleteTour);


} catch (error) {
    console.log(error);
}
    //!Export tourRouter
module.exports = router;