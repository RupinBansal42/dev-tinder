const validator = require("validator");

const validationEmailID = (emailID) => {
  if (!validator.isEmail(emailID)) {
    throw new Error("Email ID is not valid");
  }
};

module.exports = { validationEmailID };
