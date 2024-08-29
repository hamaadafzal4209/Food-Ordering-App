import jwt from 'jsonwebtoken';

const authMiddleware = async (req, res, next) => {
  const token = req.headers.token;
  if (!token) {
    return res.status(401).json({ success: false, message: "Unauthorized. Login again" });
  }
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    console.log('Decoded Token:', decoded);
    next();
  } catch (error) {
    console.error('Token verification failed:', error);
    return res.status(401).json({ success: false, message: "Unauthorized. Login again" });
  }
};

export default authMiddleware;