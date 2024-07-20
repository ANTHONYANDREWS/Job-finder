import jwt from 'jsonwebtoken';
const secretKey = 'rdggvrdgfrdgfdf';

const verifyToken = (req, res, next) => {
    let authHeader = req.headers?.authorization;

    if(!authHeader) {
        return res.status(401).json({ error: "Authorization header is missing" });
    }

    const token = authHeader.split(" ")[1];

    if (!token) {
        return res.status(401).json({ error: "Token is required" });
    }

    try {
        const decoded = jwt.verify(token, secretKey);
        req.user = decoded;
        next();
    } catch (err) {
        if (err.name === "TokenExpiredError") {
            return res.status(401).json({ error: "Token expired" });
        } else if (err.name === "JsonWebTokenError") {
            return res.status(401).json({ error: "Invalid token" });
        } else {
            return res.status(500).json({ error: "Token verification failed" });
        }
    }
}

export default verifyToken;