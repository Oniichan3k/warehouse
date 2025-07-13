

const roleMiddleware = (req, res, next) => {
  const allowedRoles = ["admin", "manager", "staff"]; 

  if (!allowedRoles.includes(req.user.role)) {
    return res.status(403).json({ message: "Forbidden" });
  }

  next();
};

export { roleMiddleware };