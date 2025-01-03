import { Schema, model } from "mongoose";

const landingPageSchema = new Schema({
    headerText:{
        type:String,
        required: true,
    },
    paragraph:{
        type:String,
        required: true,
    },
    imageURL:{
        type:String,
        required: true,
    }
});

export const landingPage = model('LandingPage', landingPageSchema)