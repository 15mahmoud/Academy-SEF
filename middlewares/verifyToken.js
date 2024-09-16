const jwt = require("jsonwebtoken");

function verifyToken(req, res, next) {
  const token = req.headers.token;
  if (!token) {
    return res.status(401).json({ message: "No token provided" });
  }

  try {
    req.user = jwt.verify(token, process.env.JWT_SECRET_KEY);
    next();
  } catch (error) {
    return res.status(401).json({ message: "Invalid token" });
  }
}

function verifyTokenAndAuthorization(roles) {
  return (req, res, next) => {
    verifyToken(req, res, () => {
      if (req.user.id === req.params.id || roles.includes(req.user.role)) {
        return next();
      }
      return res.status(403).json({ message: `Access denied, only ${roles.join(', ')} allowed` });
    });
  };
}

module.exports = verifyTokenAndAuthorization

