import { Schema, model } from "mongoose";

const aboutPageSchema = new Schema({
    paragraph:{
        type:String,
        required: true,
    },
    address:{
        type:String,
        required: true,
    }
});

export const aboutPage = model('AboutPage', aboutPageSchema)