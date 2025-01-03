import mongoose from "mongoose";

const RestaurantInfoSchema = new mongoose.Schema({
  companyEmail: {
    type:String,
    required: true,
  },
  phoneNumber: {
    type:Number,
    required: true,
  },
  location: {
    type:String,
    required: true,
  }
});

export const RestaurantInfo = mongoose.model("restaurantInfo", RestaurantInfoSchema);
