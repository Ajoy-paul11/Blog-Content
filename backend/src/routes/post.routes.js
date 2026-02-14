import { Router } from "express";
import {
    createPost,
    getAllPosts,
    getPostById,
    updatePostById,
    deletePostById,
} from "../controllers/post.controller.js";
import auth from "../middlewares/auth.middleware.js";
import isAdmin from "../middlewares/admin.middleware.js";

const router = Router();

router.get("/getallposts", getAllPosts);
router.get("/getpost/:id", getPostById);


router.post("/createpost", auth, isAdmin, createPost);
router.put("/updatepost/:id", auth, isAdmin, updatePostById);
router.delete("/deletepost/:id", auth, isAdmin, deletePostById);

export default router;
