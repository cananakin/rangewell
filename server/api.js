import express from "express";

const routerApi = express.Router();

//mongodb models
import * as db from "./data/models";

//routes
routerApi.get("/deals", async (req, res) => {
    let query = db.dealsCollection.find();
    if(req.query.title !== undefined && req.query.title !== null){
        query = db.dealsCollection.find({
            title: { "$regex": req.query.title, "$options": "i" }
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

// update
routerApi.post("/update-deal/:id", async (req, res) => {
    await db.dealsCollection.findOneAndUpdate(
        req.params.id, req.body
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
        console.log(result);
        res.send(result);
      });
});



export default routerApi;
