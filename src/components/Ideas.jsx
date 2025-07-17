import axios from "axios";
import { useEffect, useState } from "react";
import PostCard from "./PostCard";
import Pagination from "./Pagination";
import Banner from "./Banner";

const API_URL = "/api/ideas";

export default function Ideas() {
  const [posts, setPosts] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {

    axios
      .get(API_URL, {
        params: {
          "page[number]": page,
          "page[size]": 8,
          append: ["small_image"],
          sort: "-published_at",
        },
      })
      .then((res) => {
        setPosts(res.data.data);
        setTotalPages(res.data.meta.last_page); 
      })
      .catch((err) => console.error(err));
  }, [page]);

  return (
    <>
      <Banner />
      <div className="card-container">
        {posts.map((post) => (
          <PostCard key={post.id} data={post} />
        ))}
      </div>
      <Pagination currentPage={page} totalPages={totalPages} onPageChange={setPage} />
    </>
  );
}
