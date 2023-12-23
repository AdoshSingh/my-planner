const jwt = require('jsonwebtoken');

const userAuth = async (req, res, next) => {
    try {
        const authHeader = req.headers.authorization;

        if (!authHeader) {
            return res.status(401).json({ message: 'Unauthorized user access! Authorization header missing.' });
        }

        const token = authHeader.split(' ')[1];
        const decodedToken = jwt.verify(token, process.env.SECRET_KEY);

        req.decodedToken = decodedToken;

        next();
    } catch (err) {
        console.log(err);

        if (err.name === 'TokenExpiredError') {
            return res.status(401).json({ message: 'Token has expired.' });
        }

        res.status(401).json({message: 'Unauthorized user access!'});
    }
}

module.exports = {
    userAuth,
}