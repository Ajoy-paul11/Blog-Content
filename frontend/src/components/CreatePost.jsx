import React, { useState } from "react";

function CreatePost() {
  const [post, setPost] = useState({
    title: "",
    content: "",
  });

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setPost({
      ...post,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      console.log("Send the post");

      const response = await axios.post(
        "http://localhost:5000/api/v1/posts/createpost",
        post,
      );

      if (response.status === 201) {
        setPost({
          title: "",
          content: "",
        });
      } else {
        setError("Post creation failed");
      }
    } catch (error) {
      setError(error.response?.data?.message || "Post creation failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className=" w-full min-h-screen flex flex-col items-center justify-center gap-5">
      <h1 className=" text-4xl font-semibold ">Create Post Page</h1>
      <form onSubmit={handleSubmit}>
        <div className=" w-full min-h-150 flex flex-col items-center justify-center gap-10 ">
          <div>
            <label htmlFor="title">Title:</label>
            <input
              className=" bg-gray-200 text-black px-5 py-3 rounded-md text-sm"
              type="text"
              id="title"
              name="title"
              value={post.title}
              onChange={handleInputChange}
            />
          </div>
          <div>
            <label htmlFor="content">Content:</label>
            <textarea
              className=" bg-gray-200 text-black px-5 py-3 rounded-md text-sm"
              id="content"
              name="content"
              value={post.content}
              onChange={handleInputChange}
            ></textarea>
          </div>
          <button
            className=" px-5 py-3 rounded-md text-sm text-white bg-green-400"
            type="submit"
          >
            Create Post
          </button>
        </div>
      </form>
    </div>
  );
}

export default CreatePost;
