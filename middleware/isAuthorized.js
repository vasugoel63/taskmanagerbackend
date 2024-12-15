const jwt = require('jsonwebtoken');

const isAuthorized = (req,res,next)=>{
    const token = req.header('Authorization')?.split(' ')[1]; 
    if (!token) {
        return res.status(403).json({ message: 'Access denied, no token provided' });
      }
      try {
        const decoded = jwt.verify(token, process.env.SECRET_KEY);
        req.user = decoded; 
        next();
      } catch (err) {
        return res.status(400).json({ message: 'Invalid token' });
      }
}

module.exports = { isAuthorized };