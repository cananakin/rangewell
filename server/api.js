import express from "express";
import mongoose from 'mongoose'

const routerApi = express.Router();

//mongodb models
import * as db from "./data/models";

//routes
routerApi.get("/deals", async (req, res) => {
    let query = db.dealsCollection.find();
    let ObjectId = mongoose.Types.ObjectId; 
    // get Id or search in title
    if(req.query.title !== undefined && req.query.title !== null){
        let objId = new ObjectId( (req.query.title.length < 12) ? "123456789012" : req.query.title ); 
        query = db.dealsCollection.find({
            $or:[ 
                { title : { $regex: req.query.title, $options : "i" }}, 
                {'_id':objId },
               
            ],
            //createdAt : {$eq:'2020-03-02'}
            //title: { "$regex": req.query.title, "$options": "i" }
        });
    }
    query.sort({createdAt: 'desc'}).exec(function(err, result) {
        res.send(result);
    });
});

// get single deal by id
routerApi.get("/deal/:id", async (req, res) => {
    db.dealsCollection.findById(req.params.id).exec(function(err, result) {
        res.send(result);
    });
});

// get single deal by id
routerApi.get("/deals/stats", async (req, res) => {
    db.dealsCollection.aggregate(
        [ 
            { 
              $group: {
                _id: null, 
                deals_count: {
                  $sum: 1
                },
                total_amounts: {
                    $sum: "$amountRequired"
                },
                avg_amount: {
                    $avg: "$amountRequired"
                },           
              }
            }
          ]
    ).exec(function(err, result) {
        res.send(result);
    });
});

// new add
routerApi.post("/add-deal", async (req, res) => {
    const newDeal = new db.dealsCollection();
    newDeal.title = req.body.title;
    newDeal.amountRequired = req.body.amountRequired;
    await newDeal.save(function(err, result){
        res.send(result);
      });
});

// update
routerApi.post("/update-deal/:id", async (req, res) => {
    req.body.updatedAt = new Date();
    await db.dealsCollection.findOneAndUpdate(
        {_id : req.params.id}, req.body, {useFindAndModify: false}
    ).exec(function(err, result) {
        res.send(result);
    });  
});

// delete
routerApi.post("/delete-deal/:id", async (req, res) => {
    await db.dealsCollection.findOneAndDelete(
        {_id : req.params.id}
    ).exec(function(err, result) {
        res.send(result);
    });  
});


export default routerApi;
