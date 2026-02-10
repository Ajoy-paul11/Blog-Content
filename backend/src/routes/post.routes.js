import { Router } from "express";
import {
    createPost,
    getAllPosts,
    getPostById,
    updatePostById,
    deletePostById

} from "../controllers/post.controller.js";

const router = Router();

router.post("/createpost", createPost);
router.get("/getallposts", getAllPosts);
router.get("/getpost/:id", getPostById);
router.put("/updatepost/:id", updatePostById);
router.delete("/deletepost/:id", deletePostById);

export default router;