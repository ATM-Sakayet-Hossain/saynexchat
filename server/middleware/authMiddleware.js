const { verifyToken } = require("../helpers/utils");

const authMiddleWare = async (req, res, next) => {
  const token = req.cookies;
  console.log(token);    
  try {
    if (!token["acc_tkn"]) {
      return res.status(401).send({ error: "Invalid Request" });
    }
    const decoded = verifyToken(token["acc_tkn"]);
    console.log(decoded);
    
    if (!decoded) {
      return res.status(401).send({ error: "Invalid Request" });
    }
    req.user = decoded;
    next();
  } catch (error) {
    console.log(error);
    
    return res.status(401).send({ error: "Invalid Request" });
  }
};

module.exports = authMiddleWare;
