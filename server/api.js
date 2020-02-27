import express from "express";

const routerApi = express.Router();

//mongodb models
import * as db from "./data/models";

//routes
routerApi.get("/deals", async (req, res) => {
    if(req.query.title !== undefined && req.query.title !== null){
        db.dealsCollection.find({
            title: { $eq : req.query.title}
        }).exec(function(err, result) {
            res.send(result);
        });
    }else {
        db.dealsCollection.find().exec(function(err, result) {
            res.send(result);
        });
    }
    
});

routerApi.get("/deal/:id", async (req, res) => {
    console.log(req.params.id)
    await db.dealsCollection.updateOne(
        { _id: req.params.id }, { $set: { title: "Hi Canan" } 
    }).exec(function(err, result) {
        res.send(result);
    });
    
});



export default routerApi;
