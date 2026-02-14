import { Link } from "react-router-dom";

const PostCard = ({ post }) => {
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  return (
    <Link to={`/post/${post._id}`}>
      <div className="bg-white rounded-lg shadow-md hover:shadow-xl transition p-6 cursor-pointer border border-gray-200">
        <h2 className="text-2xl font-bold text-gray-800 mb-2">{post.title}</h2>
        <p className="text-gray-600 text-sm mb-3">
          {formatDate(post.createdAt)}
        </p>
        <p className="text-gray-700 line-clamp-2">{post.content}</p>
      </div>
    </Link>
  );
};

export default PostCard;
