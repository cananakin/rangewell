import mongoose from 'mongoose'
var Schema = mongoose.Schema;

//deal schema
export const dealSchema = new Schema({
    _id: {type : Schema.ObjectId, auto: true},
    title: String,
    amountRequired: Number,
},{ timestamps: true });
 
export const dealsCollection = mongoose.model('deals', dealSchema)