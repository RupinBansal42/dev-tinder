const adminAuth = (req, res, next) => {
  const token = "abz";
  const isTokenAuthorized = token === "abz";
  if (!isTokenAuthorized) {
    res.status(404).send("Not authorized for the calls");
  } else {
    next();
  }
};

const userAuth = (req, res) => {
  const token = "abz";
  const isTokenAuthorized = token === "abz";
  if (!isTokenAuthorized) {
    res.status(404).send("Not authorized for the calls");
  } else {
    next();
  }
};

module.exports = { adminAuth, userAuth };
