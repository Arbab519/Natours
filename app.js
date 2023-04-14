const express = require('express');
const fs = require('fs');
const app = express();

//MiddleWare
app.use(express.json())


const port = 3000;
app.listen(port,()=>{
    console.log(`App is running on port ${port}`);
});

// app.get("/",(req ,res)=>{
    //     res.status(200).json({message:'Hello from server side',app:"Natours"});
    // })
// app.post("/",(req ,res)=>{
    //     res.status(200).json({message:'this is Send method',app:"Natours"});
    // })
    
    const tours = JSON.parse(fs.readFileSync(`${__dirname}/dev-data/data/tours-simple.json`,'utf-8'));

app.get('/api/v1/tours',(req,res)=>{
        res.status(200).json({
            status :"success",
            result : tours.length,
            data: {
                tours: tours
            }
        })
});

app.get('/api/v1/tours/:id',(req,res)=>{
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
});

// Patch  
app.patch('/api/v1/tours/:id',(req,res)=>{
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
});
app.delete('/api/v1/tours/:id',(req,res)=>{
    //url variables store in req.params in object form
    const id = req.params.id;
 if(id > tours.length-1){
        res.status(404).json({
            status:'fail',
            message:"Invalid ID"
        });
    }
    res.status(204).json({})
});

app.post('/api/v1/tours',(req,res)=>{
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
});

// console.log(tours);
