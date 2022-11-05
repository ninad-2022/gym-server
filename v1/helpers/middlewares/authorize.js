const { verifyToken } = require("../token");
function authorize(roles = []) {
  return (req, res, next) => {
    const token = req.headers.authorization;

    // verify token
    const payload = verifyToken(token);

    if (payload?._id) {
      // token is valid
      const { role } = payload;
      if (roles.includes(role)) {
        next();
      } else {
        // no permission to access current route
        res.status(401).send({
          message: "You do not have permission to access the API",
          error: null,
        });
      }
    } else {
      res.status(420).send({ message: "Access token expired", error: null });
    }
  };
}

module.exports = authorize;
