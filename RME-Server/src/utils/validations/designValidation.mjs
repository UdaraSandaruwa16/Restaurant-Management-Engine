export const designvalidationSchema = {
    restaurantName: {
        isLength: {
          options: {
            min: 1,
            max: 35,
          },
          errorMessage:
            "restaurantName must be at least 5 characters with a max of 35 characters",
        },
        notEmpty: {
          errorMessage: "restaurantName cannot be empty",
        },
        isString: {
          errorMessage: "restaurantName must be a string!",
        },
      },
      color1: {
        notEmpty: {
          errorMessage: "color1 cannot be empty",
        },
        isString: {
          errorMessage: "color1 must be a string!",
        },
      },
      color2: {
        notEmpty: {
          errorMessage: "color2 cannot be empty",
        },
        isString: {
          errorMessage: "color2 must be a string!",
        },
      }
}