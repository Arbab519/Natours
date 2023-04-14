const express = require('express');
const fs = require('fs');
const app = express();

//MiddleWare
app.use(express.json())


const port = 3000;
app.listen(port,()=>{
    console.log(`App is running on port ${port}`);
});

 const tours = JSON.parse(fs.readFileSync(`${__dirname}/dev-data/data/tours-simple.json`,'utf-8'));


const getAllTours= (req,res)=>{
    res.status(200).json({
        status :"success",
        result : tours.length,
        data: {
            tours: tours
        }
    })
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

// app.post('/api/v1/tours',createTour);
// app.get('/api/v1/tours',getAllTours);
// app.get('/api/v1/tours/:id',getTour);
// app.patch('/api/v1/tours/:id',updateTour);
// app.delete('/api/v1/tours/:id',deleteTour);

//By chaining
app.route('/api/v1/tours').get(getAllTours).get(createTour);

app
    .route('/api/v1/tours/:id')
    .post(createTour)
    .get(getTour)
    .patch(updateTour)
    .delete(deleteTour);