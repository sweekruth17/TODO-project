const asyncHandler = require("express-async-handler");
const jwt = require("jsonwebtoken");

const validateToken = asyncHandler(async (req, res, next) => {
  let token;
  console.log("hello");
  let authHeader = req.headers.Authorization || req.headers.authorization;
  if (authHeader && authHeader.startsWith("Bearer")) {
    token = authHeader.split(" ")[1];
    jwt.verify(token, process.env.ACCESS_TOKEN_SEC, (err, decode) => {
      if (err) {
        res.status(401);
        throw new Error("User is not authorized");
      }
      console.log(decode.user);
      req.user = decode.user;
      next();
    });
    if (!token) {
      throw new Error("Token is expired or user token is invalid");
    }
  }
});
module.exports = validateToken;
