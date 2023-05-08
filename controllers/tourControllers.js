const Tour =require('./../models/toursModels');


exports.aliasTopTours = async(req,res,next) =>{
    req.query.limit = '5';
    req.query.sort="-ratingAverage,price";
    req.query.fields='name,price,ratingAverage,summary,difficulty';
    next();
}

class APIFeatures {
    constructor(query,queryString){
        this.query=query;
        this.queryString=queryString;
    }
    filter(){
     //! 1A) Filtering
     // create shallow copy
     const queryObj= {...this.queryString};
     // list of excludedFields might be in route
     const excludedFields= ['page','sort','limit','fields'];
     //delete these excludedfields from route 
     excludedFields.forEach(el=> delete queryObj[el]);  
  //! 1B) Advance filtering
       let querystr= JSON.stringify(queryObj);
       querystr= querystr.replace(/\b(gte|gt|lte|le)\b/g,match => `$${match}`);
        this.query= this.query.find(JSON.parse(querystr));
        return this;
    }
    sort(){
        if(this.queryString.sort){
            const sortBy= this.queryString.sort.split(',').join(' ');
            this.query = this.query.sort(sortBy)
        }else{
            this.query = this.query.sort('-createdAt');  
        }
        return this;
    }
    limitFields(){
        if(this.queryString.fields){
            const fields= this.queryString.fields.split(',').join(' ');
            this.query = this.query.select(fields)
        }else{
            this.query = this.query.select('-__v');  
        }
        return this;
    }
    paginate(){
        const page = this.queryString.page * 1 || 1;
        const limit = this.queryString.limit * 1|| 100;
        const skip = (page-1)*limit;
        this.query= this.query.skip(skip).limit(limit);     
        return this;
    }
}

exports.getAllTours= async(req,res)=>{
    try {
        console.log(req.query);

      //!EXECUTE QUERY
     let features = new APIFeatures(Tour.find(),req.query).filter().sort().limitFields().paginate();
     console.log(features.query);
          const tours = await features.query;

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
                message: `${err}`
            })
            console.log(err);
    }  
};


//! previous method
// const newTour= new Tour({});
// newTour.save().then().catch();

exports.createTour = async (req,res)=>{
 
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

exports.getToursStats= async (req,res)=>{
   try {
       const stats = await Tour.aggregate([
           {  
            $match : {ratingsAverage : { $gte: 4.5}},
           },
           {
            $group : {
                _id : {$toUpper:'$difficulty'},
                numTours :{$sum : 1},
                avgRating : {$avg : '$ratingsAverage'},
                avgPrice : {$avg : '$price'},
                minPrice :{$min:'$price'},
                maxPrice :{$max:'$price'},
                }    
            },
            {
                // here 1 is for sorting order (Ascending)
                $sort: { avgPrice: 1} 
            },
            // {
            //     $match : {_id : {$ne : 'EASY'}}
            // }
        ]);
       res.status(200).json({
        status :"success",
        data: {
            stats 
        }
    });
   } catch (error) {
    res.status(404).json({
        status: 'fail',
        message: `${error}`
    });
   }
}

exports.getMonthlyPlan= async (req,res)=>{
    try {
        const year = req.params.year;
        const plan = await Tour.aggregate([
            {
                $unwind : '$startDates'
            },
            {
                $match : {startDates : {
                    $gte: new Date(`${year}-01-01`),
                    $lte: new Date(`${year}-12-31`),
                }}
            },
            {
                $group :{
                    _id: {$month : '$startDates'},
                    numToursStart: {$sum : 1},
                    tours: {$push: '$name'}
                }
            },
            {
                $addFields :{month : '$_id'}
            },
            {
                $project: {_id : 0}
            },
            {
                $sort :{numToursStart : -1}
            }

        ]);
            res.status(200).json({
            status :"success",
            data: {
               plan 
            }
        });
    } catch (error) {
        res.status(404).json({
            status: 'fail',
            message: `${error}`
        });
    }
}