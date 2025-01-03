export const orderValidationSchema = {
    orderCode: {
      notEmpty: {
        errorMessage: "orderCode cannot be empty",
      },
    },
    userEmail: {
        notEmpty: {
          errorMessage: "userEmail cannot be empty",
        },
        isString: {
          errorMessage: "userEmail must be a string!",
        },
        isEmail: {
            errorMessage: "Invalid email format. Please enter a valid email address.",
          },
      },
      totalPrice: {
        notEmpty: {
          errorMessage: "totalPrice cannot be empty",
        },
        isNumeric: {
            errorMessage: "totalPrice must be a number!",
          },
      },
  };