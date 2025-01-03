export const categoryValidationSchema = {
  categoryName: {
    isLength: {
      options: {
        min: 1,
        max: 25,
      },
      errorMessage:
        "categoryName must be at least 5 characters with a max of 25 characters",
    },
    notEmpty: {
      errorMessage: "categoryName cannot be empty",
    },
    isString: {
      errorMessage: "categoryName must be a string!",
    },
  },
};
