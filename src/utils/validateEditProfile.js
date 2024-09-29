
const validateEditProfile = (req) => {
  const allowedEditFields = [
    "lastName",
    "firstName",
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
