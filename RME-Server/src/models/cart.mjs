import mongoose from "mongoose";

const CartSchema = new mongoose.Schema({
    userEmail:{
        type:String,
        required: true,
    },
    cartProduct:[
        {
            itemName:{
                type:String,
                required: true,
            },
            qty:{
                type:String,
                required: true,
            },
            sizes: [
                {
                  sizeName: {
                    type: String,
                    required: true,
                  },
                  percentage: {
                    type: Number,
                    required: true,
                  },
                },
              ],
            extraIngredients:[
                {
                  ingredientName: {
                    type: String,
                    required: true,
                  },
                  ingredientPrice: {
                    type: Number,
                    required: true,
                  },
                },
              ],
            price:{
                type:Number,
                required: true,
            }
        }
    ]
}
);
export const Cart = mongoose.model("cart", CartSchema);