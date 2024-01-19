const jwt = require('jsonwebtoken');

const authenticateToken = (req, res, next) => {
    const token = req.header('Authorization');
    if (!token) return res.status(401).json({message :'Access denied. No token provided.'});
    const mainToken = token.split(" ")
    if(mainToken[0] != "Bearer") return res.status(401).json({message :'Token format is wrong'})
    jwt.verify(mainToken[1], process.env.SECRET_KEY, (err, user) => {
        if (err) return res.status(403).json({message :'Invalid token.'});
        req.user = user;
        next();
    });
};

module.exports = authenticateToken