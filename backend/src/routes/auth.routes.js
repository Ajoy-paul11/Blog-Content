import { Router } from "express";
import { adminSignup, adminLogin, verifyAdmin } from "../controllers/admin.controller.js";
import auth from "../middlewares/auth.middleware.js";

const router = Router();

router.post("/admin/signup", adminSignup);
router.post("/admin/login", adminLogin);
router.get("/verify", auth, verifyAdmin);

export default router;
