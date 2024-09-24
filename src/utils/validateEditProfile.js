
const validateEditProfile = (req) => {
  const allowedEditFields = [
    "lastName",
    "emailID",
    "age",
    "gender",
    "skills",
    "photoURL",
    "about",
  ];

  const isEditAllowed = Object.keys(req).every(field => allowedEditFields.includes(field))
  return isEditAllowed

};

module.exports = { validateEditProfile };
