const jwt = require('jsonwebtoken');

exports.checkToken = (req, res, next) => {
    const header = req.headers['authorization'];

    if(typeof header !== 'undefined') {
        const bearer = header.split(' ');
        const token = bearer[1];

        req.token = token;
        next();
    } else {
        //If header is undefined return Forbidden (403)
        res.sendStatus(403)
    }
}

exports.getTokenCookie = (req, res, next) => {
    
    const token = req.cookies['token'];
    //if no token found, return response (without going to the next middelware)
    if (!token) return res.status(401).send("Access denied. No token provided.");
  
    try {
      //if can verify the token, set req.user and pass to next middleware
      const decoded = jwt.verify(token, process.env.JWT_KEY || "secretKey");
      req.user = decoded;
      next();
    } catch (ex) {
      //if invalid token
      res.status(400).send("Invalid token.");
    }
};
