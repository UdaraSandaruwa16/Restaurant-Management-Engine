export const menuItemValidationSchema = {
    itemName: {
        isLength: {
			options: {
				min: 1,
				max: 20,
			},
			errorMessage:
				"itemName must be at least 1 characters with a max of 50 characters",
		},
        notEmpty: {
			errorMessage: "itemName cannot be empty",
		},
		isString: {
			errorMessage: "itemName must be a string!",
		},

    },
    description:{
        isLength: {
			options: {
				min: 1,
				max: 500,
			},
			errorMessage:
				"description must be at least 10 characters with a max of 100 characters",
		},
        notEmpty: {
			errorMessage: "description cannot be empty",
		},
		isString: {
			errorMessage: "description must be a string!",
		},
    },
    category:{
        notEmpty: {
			errorMessage: "category cannot be empty",
		},
		isString: {
			errorMessage: "category must be a string!",
		},
    },
    basePrice:{
        notEmpty: {
			errorMessage: "basePrice cannot be empty",
		}
    },
    // extraIngredients: [
    //     {
    //         ingredientName:{
    //             notEmpty: {
    //                 errorMessage: "IngredientName cannot be empty",
    //             },
    //             isString: {
    //                 errorMessage: "IngredientName must be a string!",
    //             },
    //         },
    //         ingredientPrice: {
    //             notEmpty: {
    //                 errorMessage: "ingredientPrice cannot be empty",
    //             },
    //         }
    //     }
    // ]
}