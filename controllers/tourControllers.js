const Tour =require('./../models/toursModels');




exports.getAllTours= async(req,res)=>{
    try {
        console.log(req.query);
    //!BUILT QUERY
     //? 1) Filtering
     
     // create shallow copy
        const queryObj= {...req.query};
        // list of excludedFields might be in route
        const excludedFields= ['page','sort','limit','fields'];
        //delete these excludedfields from route 
        excludedFields.forEach(el=> delete queryObj[el]);  

     //? 2) Advance filtering
          const querystr= JSON.stringify(queryObj);
          querystr.replace(/\b(gte|gt|lte|le)\b/g,match => `$ ${match}`);
          console.log(JSON.parse(querystr));   
        
     const query =  Tour.find(queryObj);

        // {difficulty : 'easy', duration: {$gte : 5} }

        // const tours = await Tour.find()
        // .where('difficulty')
        // .equals('easy')
        // .where('duration')
        // .equals(5);
    
    //!EXECUTE QUERY
        const tours = await Tour.find(query);
            res.status(200).json({
              status :"success",
              result : tours.length,
              data: {
                  tours: tours
              }
            });
            console.log(tours);
            
        } catch (err) {
            res.status(404).json({
                status: 'fail',
                message: err
            })
            console.log(err);
    }  
};


//! previous method
// const newTour= new Tour({});
// newTour.save().then().catch();

exports.createTour = async (req,res)=>{
    console.log(req);
try {
    //!easy method
    const newTour = await Tour.create(req.body);
    res.status(200).json({
        status: "success",
        data: {
        tour: newTour   
        }
    });
} catch (err) {
    console.log(err);
    res.status(400).json({
        status: "fail",
        message: err
    }) ;
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