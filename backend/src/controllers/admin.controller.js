import jwt from "jsonwebtoken";
import { Admin } from "../models/admin.model.js";

const JWT_SECRET = process.env.JWT_SECRET || "dev_secret";
const JWT_EXPIRES = process.env.JWT_EXPIRES || "8h";

export const adminSignup = async (req, res) => {
    try {
        const { email, password, name } = req.body;
        if (!email || !password) return res.status(400).json({ message: "email & password required" });

        const exists = await Admin.findOne({ email });
        if (exists) return res.status(409).json({ message: "Admin already exists" });

        const admin = await Admin.create({ email, password, name });
        const token = jwt.sign({ id: admin._id, email: admin.email, role: admin.role }, JWT_SECRET, { expiresIn: JWT_EXPIRES });
        return res.status(201).json({ token, admin: { id: admin._id, email: admin.email, name: admin.name } });
    } catch (err) {
        return res.status(500).json({ message: err.message });
    }
};

export const adminLogin = async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) return res.status(400).json({ message: "email & password required" });

        const admin = await Admin.findOne({ email });
        if (!admin) return res.status(401).json({ message: "Invalid credentials" });

        const ok = await admin.comparePassword(password);
        if (!ok) return res.status(401).json({ message: "Invalid credentials" });

        const token = jwt.sign({ id: admin._id, email: admin.email, role: admin.role }, JWT_SECRET, { expiresIn: JWT_EXPIRES });
        return res.json({ token, admin: { id: admin._id, email: admin.email, name: admin.name } });
    } catch (err) {
        return res.status(500).json({ message: err.message });
    }
};


export const verifyAdmin = async (req, res) => {
    try {
        const user = req.user;

        const admin = await Admin.findById(user.id).select("-password");
        if (!admin) return res.status(401).json({ message: "Invalid token" });
        return res.json({ valid: true, admin });
    } catch (err) {
        return res.status(500).json({ message: err.message });
    }
};