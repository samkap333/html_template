const jwt = require('jsonwebtoken');

const authMiddleware = async (req, res, next) => {

    try {

  
      const token = req.headers.authorization.split('Bearer ')[1];
      const decodedToken = jwt.verify(token, "abcd");
      
      const userId = decodedToken.userId;
      req.userId = userId;
      req.token = token;
     
  
    
  
      next();
    }
    catch (error) {
     
      return res.status(401).json({ message: 'Invalid or missing token' })
    }
  }
  

  module.exports = {authMiddleware};