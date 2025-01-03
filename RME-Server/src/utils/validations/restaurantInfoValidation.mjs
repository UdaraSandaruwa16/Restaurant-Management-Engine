export const restaurantInfoValidationSchema = {
    location: {
      notEmpty: {
        errorMessage: "location cannot be empty",
      },
      isString: {
        errorMessage: "location must be a string!",
      },
    },
    companyEmail: {
        notEmpty: {
          errorMessage: "companyEmail cannot be empty",
        },
        isString: {
          errorMessage: "companyEmail must be a string!",
        },
        isEmail: {
            errorMessage: "Invalid email format. Please enter a valid email address.",
          },
      },
      phoneNumber: {
        notEmpty: {
          errorMessage: "phoneNumber cannot be empty",
        },
        isNumeric: {
            errorMessage: "phoneNumber must be a number!",
          },
      },
  };