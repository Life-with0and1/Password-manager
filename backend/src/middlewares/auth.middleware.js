import jwt from 'jsonwebtoken';




export const authMiddleware = (req, res, next) => {
    try {
        const { token } = req.headers;

        if (!token) {
            return res.status(404).json({ success: false, message: "Not authorized" });
        }

        const decoded = jwt.decode(token)

        if (!decoded._id) return res.status(404).json({ success: false, message: "Not authorized" });

        req.userId = decoded._id;

        next();

    } catch (error) {
        console.log(error);
        return res.status(500).json({ success: false });
    }
}