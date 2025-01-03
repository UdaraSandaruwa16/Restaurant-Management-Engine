export const landingPageValidationSchema = {
    headerText: {
      isLength: {
        options: {
          min: 1,
          max: 150,
        },
        errorMessage:
          "headerText must be at least 1 characters with a max of 150 characters",
      },
      notEmpty: {
        errorMessage: "headerText cannot be empty",
      },
      isString: {
        errorMessage: "headerText must be a string!",
      },
    },
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
      imageURL: {
        notEmpty: {
          errorMessage: "imageURL cannot be empty",
        }
      },
  };