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
exports.getAllTours= async(req,res)=>{
    try {
        const tours = await Tour.find();
            res.status(200).json({
              status :"success",
              result : tours.length,
              data: {
                  tours: tours
              }
            });
        
    } catch (err) {
        res.status(404).json({
            status: 'fail',
            message: err
        })
    }  
};

exports.getTour= async (req,res)=>{
    try {
        // Tour.findOne({_id : req.params.id}); previous method
        const tour = await Tour.findById(req.params.id);
        // findbyid() mongoose provided function alternate of findOne()
        res.status(200).json({
            status :"success",
            data: {
                tour
            }
        });
    } catch (err) {
        res.status(404).json({
            status: 'fail',
            message: err
        })
    }
};

exports.updateTour= async(req,res)=>{
    try {
    const updatedtour = await Tour.findByIdAndUpdate(req.params.id , req.body ,{ new: true, runValidators:true });
    // {new:true} Return the Updated value instead of old value
    res.status(200).json({
        status :"success",
        data: {
            tour:updatedtour
        }
    });
} catch (error) { 
    res.status(404).json({
        status: 'fail',
        message: error
    });
}
};

exports.deleteTour = async (req,res)=>{
    try {
        const updatedtour = await Tour.findByIdAndDelete(req.params.id , req.body);
            res.status(204).json({
                status:'Deleted',
                message:null 
           });
    } catch (error) {
        res.status(404).json({
            status: 'fail',
            message: error
        });
    }
};