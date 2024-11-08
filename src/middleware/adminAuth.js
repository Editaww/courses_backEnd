// // import jwt from "jsonwebtoken";

// export const adminAuth = (req, res, next) => {
//   // Tikriname, ar vartotojas yra autentifikuotas
//   if (!req.user) {
//     return res.status(401).json({ message: "Auth failed" });
//   }

//   // Tikriname, ar vartotojas yra administratorius
//   if (req.user.role !== "admin") {
//     return res
//       .status(403)
//       .json({ message: "Access is not available. Admins only." });
//   }

//   next();
// };
// export default adminAuth;
