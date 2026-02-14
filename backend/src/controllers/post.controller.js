import { Post } from "../models/post.model.js"; // keep model minimal

export const createPost = async (req, res) => {
    try {
        const { title, content } = req.body;
        if (!title || !content) return res.status(400).json({ message: "title & content required" });
        const post = await Post.create({ title, content });
        return res.status(201).json(post);
    } catch (err) {
        return res.status(500).json({ message: err.message });
    }
};

export const getAllPosts = async (req, res) => {
    try {
        const posts = await Post.find().sort({ createdAt: -1 }).select("title content createdAt");
        return res.json(posts);
    } catch (err) {
        return res.status(500).json({ message: err.message });
    }
};

export const getPostById = async (req, res) => {
    try {
        const post = await Post.findById(req.params.id);
        if (!post) return res.status(404).json({ message: "Not found" });
        return res.json(post);
    } catch (err) {
        return res.status(500).json({ message: err.message });
    }
};

export const updatePostById = async (req, res) => {
    try {
        const updated = await Post.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updated) return res.status(404).json({ message: "Not found" });
        return res.json(updated);
    } catch (err) {
        return res.status(500).json({ message: err.message });
    }
};

export const deletePostById = async (req, res) => {
    try {
        const deleted = await Post.findByIdAndDelete(req.params.id);
        if (!deleted) return res.status(404).json({ message: "Not found" });
        return res.json({ message: "Deleted" });
    } catch (err) {
        return res.status(500).json({ message: err.message });
    }
};
