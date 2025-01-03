import mongoose from "mongoose";

const OrderSchema = new mongoose.Schema({
    orderCode:{
        type:String,
        required: true,
    },
    userEmail:{
        type:String,
        required: true,
    },
    phone:{
        type:Number,
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
                  },
                  ingredientPrice: {
                    type: Number,
                  },
                },
              ],
            price:{
                type:Number,
                required: true,
            }
        }
    ],
    totalPrice:{
        type:Number,
        required: true,
    },
    orderStatus: {
        type: String,
        enum: ['Placed','Ready','Pickup','Cancelled'],
        default: 'Placed',
      },
    paymentStatus:{
        type: String,
        enum: ['Pending', 'Paid'],
        default: 'Paid',
    },
    orderType:{
        type:String,
        enum:["take Away", "dining"],
        default:"take Away"
    }
},

{Date:true}
);
export const Order = mongoose.model("orders", OrderSchema);