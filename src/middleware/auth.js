import jwt from "jsonwebtoken";

export const auth = (req, res, next) => {
  const token = req.headers.authorization;

  if (!token) {
    return res.status(401).json({ message: "Auth failed" });
  }
  try {
    const decryptedInfo = jwt.verify(token, process.env.JWT_SECRET);

    if (!decryptedInfo) {
      return res.status(401).json({ message: "Auth failed" });
    }
    req.body.userId = decryptedInfo.userId;
    req.body.role = decryptedInfo.role;
    return next();
  } catch (error) {
    return res.status(401).json({ message: "Invalid or expired token" });
  }
};

export const adminAuth = (req, res, next) => {
  if (req.body.role !== "admin") {
    return res
      .status(403)
      .json({ message: "Access is not available. Admins only." });
  }
  next();
};

export default auth;
