const Tour =require('../models/toursModels');

exports.createTour = async (req,res)=>{
try {
    //! previous method
    // const newTour= new Tour({});
    // newTour.save().then().catch();
    //!easy method
    const newTour = await Tour.create(req.body);
    res.status(201).json({
        status: "success",
        data: {
        tour: newTour   
        }
    });
} catch (error) {
    res.status(400).json({
        status: "fail",
        message: {
        tour: newTour
        }
    }) ;
}



};
exports.getAllTours= (req,res)=>{  
    const result= res.status(200).json({
        status :"success",
        // result : tours.length,
        // data: {
        //     tours: tours
        // }
    });
};

exports.getTour=  (req,res)=>{
    res.status(200).json({
        status :"success",
        // data: {
        //     tour: tour
        // }
    })
};

exports.updateTour= (req,res)=>{
    res.status(200).json({
        status :"success",
        data: {
            tour: "<data updated>"
        }
    })
};

exports.deleteTour = (req,res)=>{
        res.status(404).json({
            status:'fail',
            message:"Invalid ID" 
       });
};
