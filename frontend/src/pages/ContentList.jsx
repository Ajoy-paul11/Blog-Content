import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function ContentList() {
  const [data, setData] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/v1/posts/getallposts")
      .then((res) => setData(res.data));
  }, []);

  return (
    <div>
      <h1>Content</h1>

      {/* Google Ad */}
      <div id="ad-banner">[Google Ad Banner]</div>

      {data.map((item) => (
        <div key={item._id}>
          <Link to={`/content/${item._id}`}>{item.title}</Link>
        </div>
      ))}
    </div>
  );
}
