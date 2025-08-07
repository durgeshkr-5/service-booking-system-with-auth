const jwt = require("jsonwebtoken");
require("dotenv").config();

const secretkey =  process.env.JWT_SECRET_KEY;


function authMiddleware(req, res, next) {
  const token = req.headers.authorization?.split(" ")[1];

  if (!token) return res.status(401).json({ message: "No token" });

  try {
    const decoded = jwt.verify(token,secretkey);
    req.user = decoded;
    next();
  } catch (err) {
    res.status(401).json({ message: "Invalid token" });
  }
}


module.exports = authMiddleware;