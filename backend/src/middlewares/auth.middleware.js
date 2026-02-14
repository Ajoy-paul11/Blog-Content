import jwt from "jsonwebtoken";
const JWT_SECRET = process.env.JWT_SECRET || "dev_secret";

export default function auth(req, res, next) {
    const authHeader = req.headers.authorization || "";
    if (!authHeader.startsWith("Bearer ")) return res.status(401).json({ message: "Missing Authorization" });
    const token = authHeader.split(" ")[1];
    try {
        const payload = jwt.verify(token, JWT_SECRET);
        req.user = payload; // { id, email, role }
        return next();
    } catch (err) {
        return res.status(401).json({ message: "Invalid token" });
    }
}
