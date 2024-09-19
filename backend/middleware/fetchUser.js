const jwt = require('jsonwebtoken');
const JWT_Secret = "MaaKiChutBKL"; // Make sure to use a secure key in production

const fetchUser = (req, res, next) => {
    // Get the token from the header
    const token = req.header('auth-token');
    if (!token) {
        return res.status(401).json({ error: "Please authenticate using a valid token" });
    }
    try {
        // Verify the token
        const data = jwt.verify(token, JWT_Secret);
        req.user = data; // Attach the token data to req.user
        next();
    } catch (err) {
        res.status(401).json({ error: "Invalid or expired token" });
    }
};

module.exports = fetchUser;
