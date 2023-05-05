const Tour =require('./../models/toursModels');


exports.aliasTopTours = async(req,res,next) =>{
    req.query.limit = '5';
    req.query.sort="-ratingAverage,price";
    req.query.fields='name,price,ratingAverage,summary,difficulty';
    next();
}



exports.getAllTours= async(req,res)=>{
    try {
        console.log(req.query);
    //!BUILT QUERY
     //! 1A) Filtering
     
     // create shallow copy
        const queryObj= {...req.query};
        // list of excludedFields might be in route
        const excludedFields= ['page','sort','limit','fields'];
        //delete these excludedfields from route 
        excludedFields.forEach(el=> delete queryObj[el]);  

     //! 1B) Advance filtering
          let querystr= JSON.stringify(queryObj);
          querystr= querystr.replace(/\b(gte|gt|lte|le)\b/g,match => `$${match}`);
        //   console.log(JSON.parse(querystr));   
        
     let query =  Tour.find(JSON.parse(querystr));


     //! 2) Sorting
     if(req.query.sort){
        const sortBy= req.query.sort.split(',').join(' ');
        query = query.sort(sortBy)
     }else{
        query = query.sort('-createdAt');  
     }

     //! 3) Field limiting
        if(req.query.fields){
            const fields= req.query.fields.split(',').join(' ');
            query = query.select(fields)
         }else{
            query = query.select('-__v');  
         }

     //! 4) pagination
     // *1 to covert in to number || is used to assign default value 
      const page = req.query.page * 1 || 1;
      const limit = req.query.limit * 1|| 100;
      const skip = (page-1)*limit;
      query= query.skip(skip).limit(limit);

      if(req.query.page){
        const numTours= await Tour.countDocuments();
        if(skip > numTours) throw new Error('This page does not exist');
      }

      //!EXECUTE QUERY
          const tours = await Tour.find(query);

          
      // {difficulty : 'easy', duration: {$gte : 5} }
      
        // const tours = await Tour.find()
        // .where('difficulty')
        // .equals('easy')
        // .where('duration')
        // .equals(5);
    
            res.status(200).json({
              status :"success",
              result : tours.length,
              data: {
                  tours: tours
              }
            });
            // console.log(tours);
            
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