import axios from "axios";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";

export default function ContentDetail() {
  const { id } = useParams();
  const [item, setItem] = useState(null);

  useEffect(() => {
    axios.get("http://localhost:5000/api/v1/posts/getpost/:id").then((res) => {
      setItem(res.data.find((i) => i._id === id));
    });
  }, [id]);

  if (!item) return null;

  return (
    <div>
      <h2>{item.title}</h2>
      <p>{item.body}</p>

      {item.adsEnabled && <div id="in-content-ad">[In-Content Google Ad]</div>}
    </div>
  );
}
