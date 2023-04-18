const express = require("express");
const fs = require('fs');
const morgan = require("morgan");
const app = express();

//MiddleWare
app.use(morgan("dev"));
app.use(express.json());

app.use(((req ,res,next)=>{
    console.log("hello from middleware");
    next();
}));

app.use(((req ,res,next)=>{
    res.requestTime = new Date().toISOString;   
    next();
}))
 

const port = 3000;
app.listen(port,()=>{
    console.log(`App is running on port ${port}`);
});

 const tours = JSON.parse(fs.readFileSync(`${__dirname}/dev-data/data/tours-simple.json`,'utf-8'));


const getAllTours= (req,res)=>{
    const result= res.status(200).json({
        status :"success",
        result : tours.length,
        data: {
            tours: tours
        }
    });
};

const getTour=  (req,res)=>{
    //url variables store in req.params in object form
    const id = req.params.id;


    // find object from tours where id = url_id
    const tour = tours.find(ele => ele.id == id);


    // check if invalid id  or check if tour found or not
    // if(id > tours.length-1){
    if(! tour){
        res.status(404).json({
            status:'fail',
            message:"Invalid ID"
        });
    }
    res.status(200).json({
        status :"success",
        data: {
            tour: tour
        }
    })
};


const updateTour= (req,res)=>{
    //url variables store in req.params in object form
    const id = req.params.id;
 if(id > tours.length-1){
        res.status(404).json({
            status:'fail',
            message:"Invalid ID"
        });
    }
    res.status(200).json({
        status :"success",
        data: {
            tour: "<data updated>"
        }
    })
};


const deleteTour = (req,res)=>{
    //url variables store in req.params in object form
    const id = req.params.id;
 if(id > tours.length-1){
        res.status(404).json({
            status:'fail',
            message:"Invalid ID"
        });
    }
    res.status(204).json({})
};

const createTour =(req,res)=>{
    //req is in req.body
    //  console.log(req.body);
    //creating new id by adding 1 to last object id 
     const newId = tours[tours.length - 2].id++;
     //creat new tour  giving it a new id manully  object.assign(to combile in one object)
     const newTour = Object.assign({ id : newId },req.body);

     // adding in existing tours above 
     tours.push(newTour);

     //Updating the tour-simple.json
    //We have to JSON.sringify() the new tour to add in tours-simple.json
    fs.writeFile(`${__dirname}/dev-data/data/tours-simple.json`, JSON.stringify(tours), err=>{
    //  returning the response 
    res.status(201).json({
        status: "success",
        data: {
        tour: newTour
        }
    }) ;
    });
};

// ! User ROUTES     

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




// app.post('/api/v1/tours',createTour);
// app.get('/api/v1/tours',getAllTours);
// app.get('/api/v1/tours/:id',getTour);
// app.patch('/api/v1/tours/:id',updateTour);
// app.delete('/api/v1/tours/:id',deleteTour);

//By chaining

// !Tour Routes 

// !Mounting Routers step1
const tourRouter = express.Router();
const userRouter = express.Router();

// change (app) with routers name and remove common path 

tourRouter
.route('/')
.get(getAllTours)
.get(createTour);

tourRouter
    .route('/:id')
    .post(createTour)
    .get(getTour)
    .patch(updateTour)
    .delete(deleteTour);

 //!Users Routes
 userRouter
 .route('/')
 .get(getAllUsers)
 .get(createUser);
 userRouter
    .route('/:id')
    .post(createUser)
    .get(getUser)
    .patch(updateUser)
    .delete(deleteUser);

// !Mounting Routers final
//write common route and  add router in a middleware
app.use("/api/v1/tours", tourRouter);
app.use("/api/v1/users", userRouter);