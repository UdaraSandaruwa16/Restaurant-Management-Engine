import mongoose, { Schema } from "mongoose";

const MenuItemsSchema = new mongoose.Schema(
  {
    itemName: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    imgURL: {
        type: String,
        required: true,
    },
    category: {
      type: String,
      required: true,
    },
    basePrice: {
      type: Number,
      required: true,
    },
    sizes: [
      {
        sizeName: {
          type: Array,
          required: true,
        },
        percentage: {
          type: Array,
          required: true,
        },
      },
    ],
    extraIngredients: [
      {
        ingredientName: {
          type: Array,
          required: true,
        },
        ingredientPrice: {
          type: Array,
          required: true,
        }, 
      },
    ],
    itemAvailable:{
      type: Boolean,
      default: true,
  }
  },
  {
    Date: true,
  }
);

export const MenuItems = mongoose.model("menuItems", MenuItemsSchema);
