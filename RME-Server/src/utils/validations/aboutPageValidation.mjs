export const aboutPageValidationSchema = {
    paragraph: {
      isLength: {
        options: {
          min: 1,
          max: 1000,
        },
        errorMessage:
          "paragraph must be at least 1 characters with a max of 1000 characters",
      },
      notEmpty: {
        errorMessage: "paragraph cannot be empty",
      },
      isString: {
        errorMessage: "paragraph must be a string!",
      },
    },
    address: {
        isLength: {
          options: {
            min: 1,
            max: 60,
          },
          errorMessage:
            "address must be at least 1 characters with a max of 60 characters",
        },
        notEmpty: {
          errorMessage: "address cannot be empty",
        },
        isString: {
          errorMessage: "address must be a string!",
        },
      },
  };
  