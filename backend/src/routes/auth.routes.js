import { Router } from "express";
import jwt from "jsonwebtoken";

const router = Router();

router.post("/login", (req, res) => {
    const { email, password } = req.body;

    // prototype only
    if (email === "admin@test.com" && password === "admin") {
        const token = jwt.sign({ role: "admin" }, "secret", { expiresIn: "1h" });
        return res.json({ token });
    }

    res.status(401).json({ message: "Invalid credentials" });
});

export default router;
