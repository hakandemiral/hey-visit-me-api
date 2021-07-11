import jwt from 'jsonwebtoken';

export default (req, res, next) => {
    const token = req.header('Authorization');
    if (!token) res.status(401).send('Authentication failed, no token provided!');

    const control = (error, decoded) => {
        if (error) return res.status(401).send('Authentication failed, invalid token!');

        req.decoded = decoded;
        next();
    };

    jwt.verify(token, process.env.JWT_SECRET_KEY, control);
};
