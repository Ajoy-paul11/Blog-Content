import { Post } from "../models/post.model.js";

export const createPost = async (req, res) => {
    try {
        const { title, content } = req.body;
        if (!title || !content) {
            return res.status(401).json({
                message: "Title and content are required"
            })
        }

        const post = await Post.create({ title, content });
        return res.status(201).json({
            message: "Post created successfully",
            post
        })
    } catch (error) {
        return res.status(500).json({ message: "Internal Server Error", error: error.message });
    }
}

export const getAllPosts = async (req, res) => {
    try {
        const allPost = await Post.find({});

        if (!allPost) {
            return res.status(509).json({ message: "No post found" });
        }

        return res.status(200).json({
            message: "Posts retrieved successfully",
            posts: allPost
        })
    } catch (error) {
        return res.status(500).json({ message: "Internal Server Error", error: error.message });
    }
};

export const getPostById = async (req, res) => {
    try {
        const { id } = req.params;
        const post = await Post.findById(id);
        if (!post) {
            return res.status(404).json({ message: "Post not found" });
        }

        return res.status(200).json({
            message: "Post retrieved successfully",
            post
        });
    } catch (error) {
        return res.status(500).json({ message: "Internal Server Error", error: error.message });
    }
}


export const updatePostById = async (req, res) => {
    try {
        const { id } = req.params;
        const { title, content } = req.body;

        if (!title || !content) {
            return res.status(401).json({
                message: "Title and content are required"
            })
        }

        const post = await Post.findByIdAndUpdate(id,
            { title, content },
            { new: true }
        )

        return res.status(200).json({
            message: "Post updated successfully",
            post
        });

    } catch (error) {
        return res.status(500).json({ message: "Internal Server Error", error: error.message });
    }
};
export const deletePostById = async (req, res) => {
    try {
        const { id } = req.params;
        const post = await Post.findByIdAndDelete(id);
        if (!post) {
            return res.status(404).json({ message: "Post not found" });
        }
        return res.status(200).json({ message: "Post deleted successfully" });
    } catch (error) {
        return res.status(500).json({ message: "Internal Server Error", error: error.message });
    }
};