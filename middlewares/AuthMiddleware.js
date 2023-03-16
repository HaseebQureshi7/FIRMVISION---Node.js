const jwt = require("jsonwebtoken");

const AuthMiddleware = (req, res, next) => {
  try {
    const token = req.header("Authorization").replace("Bearer ", "").replaceAll('"', "");
    try {
      const decoded = jwt.verify(token, process.env.JWT_SK);
      req.user = decoded;
      next();
    } catch (ex) {
      res.status(400).send("Invalid or Expired Token!");
    }
  } catch (err) {
    res.status(401).send("Authorization Token Not Provided!");
  }
};

module.exports = AuthMiddleware;
