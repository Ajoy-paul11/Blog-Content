import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import api from "../config/api";

const PostDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchPost();
  }, [id]);

  const fetchPost = async () => {
    try {
      const response = await api.get(`/posts/getpost/${id}`);
      setPost(response.data);
    } catch (err) {
      setError("Failed to load post");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="container mx-auto px-4 py-8">
        <button
          onClick={() => navigate("/")}
          className="mb-6 text-blue-600 hover:text-blue-800 flex items-center"
        >
          ← Back to all posts
        </button>

        {loading && <div className="text-center text-xl">Loading post...</div>}

        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
            {error}
          </div>
        )}

        {post && (
          <article className="bg-white rounded-lg shadow-lg p-8 max-w-4xl mx-auto">
            <h1 className="text-4xl font-bold text-gray-800 mb-4">
              {post.title}
            </h1>
            <p className="text-gray-600 mb-6">{formatDate(post.createdAt)}</p>
            <div className="prose prose-lg max-w-none">
              <p className="text-gray-700 whitespace-pre-wrap leading-relaxed">
                {post.content}
              </p>
            </div>
          </article>
        )}
      </div>
    </div>
  );
};

export default PostDetail;
