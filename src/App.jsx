import { useEffect, useState } from "react";
import axios from "axios";
import Header from "./components/Header";
import Banner from "./components/Banner";
import PostCard from "./components/PostCard";
import Pagination from "./components/Pagination";
import "./App.css";

// GUNAKAN ENV VARIABLE
const API_URL = `${import.meta.env.VITE_API_URL}/ideas`;

function App() {
  const [ideas, setIdeas] = useState([]);
  const [page, setPage] = useState(1);
  const [size, setSize] = useState(10);
  const [sort, setSort] = useState("-published_at");
  const [totalPages, setTotalPages] = useState(1);

  const fetchIdeas = async () => {
    try {
      const res = await axios.get(API_URL, {
        params: {
          "page[number]": page,
          "page[size]": size,
          append: ["small_image", "medium_image"],
          sort: sort,
        },
      });

      setIdeas(res.data.data);
      const total = res.data.meta?.total || 0;
      setTotalPages(Math.ceil(total / size));
    } catch (error) {
      console.error("Gagal ambil data dari API:", error);
      setIdeas([]);
    }
  };

  useEffect(() => {
    fetchIdeas();
  }, [page, size, sort])

  return (
    <>
      <Header />
      <Banner />

      <main className="container">
        <div className="control-bar">
          <div className="showing-info">
            <span>
              Showing {(page - 1) * size + 1} - {Math.min(page * size, ideas.length)} of {ideas.length}
            </span>
          </div>

          <div className="control-group">
            <div className="control-item">
              <label>Show per page:</label>
              <select
                value={size}
                onChange={(e) => {
                  setSize(Number(e.target.value));
                  setPage(1); // Reset ke halaman pertama saat mengubah size
                }}
                className="control-select"
              >
                {[10, 20, 50].map((s) => (
                  <option key={s} value={s}>
                    {s}
                  </option>
                ))}
              </select>
            </div>

            <div className="control-item">
              <label>Sort by:</label>
              <select
                value={sort}
                onChange={(e) => setSort(e.target.value)}
                className="control-select"
              >
                <option value="-published_at">Newest</option>
                <option value="published_at">Oldest</option>
              </select>
            </div>
          </div>
        </div>

        <div className="grid">
          {Array.isArray(ideas) &&
            ideas.map((item) => <PostCard key={item.id} item={item} />)}
        </div>

        <Pagination
          currentPage={page}
          totalPages={totalPages}
          onPageChange={setPage}
        />
      </main>
    </>
  );
}

export default App;
