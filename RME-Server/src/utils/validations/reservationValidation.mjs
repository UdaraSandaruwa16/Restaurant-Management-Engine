export const reservationValidationSchema = {
    date: {
      notEmpty: {
        errorMessage: "date cannot be empty",
      },
    },
    partySize: {
        notEmpty: {
          errorMessage: "partySize cannot be empty",
        },
        isNumeric: {
            errorMessage: "partySize must be a number!",
          },
      },
      guestInfo: {
        notEmpty: {
          errorMessage: "guestInfo cannot be empty",
        },
      },
      table: {
        notEmpty: {
          errorMessage: "table cannot be empty",
        },
      },
      event: {
        notEmpty: {
          errorMessage: "event cannot be empty",
        },
      },
      
  };