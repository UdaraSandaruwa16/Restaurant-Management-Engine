export const userValidationSchema = {
  userName: {
    notEmpty: {
        errorMessage: "userName cannot be empty",
      },
      isString: {
        errorMessage: "userName must be a string!",
      },
    },
    email: {
        notEmpty: {
          errorMessage: "email cannot be empty",
        },
        isString: {
          errorMessage: "email must be a string!",
        },
        isEmail: {
            errorMessage: "Invalid email format. Please enter a valid email address.",
          },
      },
  };