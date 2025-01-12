const { User } = require("../db/index");
const jwt = require("jsonwebtoken");
const SECRET = "This is Secret";

const userValidation = async (req, res, next) => {
  
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    res.send("invaild token");
    return;
  }

  const token = authHeader.split(" ")[1];

  try {
    const {userId} =  jwt.verify(token, SECRET);


    if (userId) {
      req.userId =userId
      next();
    }
  } catch (error) {
    res.send("invaild token");
    console.log(error);
  }
};

module.exports = userValidation;
