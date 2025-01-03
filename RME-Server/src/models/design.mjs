import mongoose from "mongoose";

const DesignSchema = new mongoose.Schema({
  logoURL: {
    type:String,
    required: true,
  },
  restaurantName: {
    type:String,
    required: true,
  },
  color1: {
    type:String,
    required: true,
  },
  color2: {
    type:String,
    required: true,
  },
});

export const Design = mongoose.model("design", DesignSchema);
