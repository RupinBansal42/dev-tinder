const validator = require("validator");

const validateSignUpData = (req) => {
  const { firstName, lastName, emailID, password } = req.body;
  if (!firstName || !lastName) {
    throw new Error("Please enter name");
  } else if (!validator.isEmail(emailID)) {
    throw new Error ("Email is not valid")
  } else if(!validator.isStrongPassword(password)) {
    throw new Error ("Password new strong")
  }
};


module.exports ={validateSignUpData}