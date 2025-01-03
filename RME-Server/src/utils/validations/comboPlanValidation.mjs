export const comboPlanValidationSchema = {
    comboPlanName: {
        isLength: {
          options: {
            min: 1,
            max: 35,
          },
          errorMessage:
            "comboName must be at least 5 characters with a max of 35 characters",
        },
        notEmpty: {
          errorMessage: "comboName cannot be empty",
        },
        isString: {
          errorMessage: "comboName must be a string!",
        },
      },
      description: {
        isLength: {
          options: {
            min: 1,
            max: 500,
          },
          errorMessage:
            "description must be at least 5 characters with a max of 150 characters",
        },
        notEmpty: {
          errorMessage: "description cannot be empty",
        },
        isString: {
          errorMessage: "description must be a string!",
        },
      },
}