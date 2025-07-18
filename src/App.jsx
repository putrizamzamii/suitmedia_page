import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import axios from "axios";
import Header from "./components/Header";
import Banner from "./components/Banner";
import PostCard from "./components/PostCard";
import Pagination from "./components/Pagination";
import "./App.css";

const API_URL = `${import.meta.env.VITE_API_URL}/ideas`;

function App() {
  const [ideas, setIdeas] = useState([]);
  const [totalPages, setTotalPages] = useState(1);

  const [searchParams, setSearchParams] = useSearchParams();

  // Ambil dari URL query
  const page = parseInt(searchParams.get("page")) || 1;
  const size = parseInt(searchParams.get("size")) || 10;
  const sort = searchParams.get("sort") || "-published_at";

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

  const updateParams = (newParams) => {
    setSearchParams({
      page,
      size,
      sort,
      ...newParams,
    });
  };

  useEffect(() => {
    fetchIdeas();
  }, [page, size, sort]);

  return (
    <>
      <Header />
      <Banner />

      <main className="container">
        <div className="control-bar">
          <div className="showing-info">
            <span>
              Showing {(page - 1) * size + 1} -{" "}
              {Math.min(page * size, ideas.length)} of {ideas.length}
            </span>
          </div>

          <div className="control-group">
            <div className="control-item">
              <label>Show per page:</label>
              <select
                value={size}
                onChange={(e) => updateParams({ size: Number(e.target.value), page: 1 })}
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
                onChange={(e) => updateParams({ sort: e.target.value })}
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
          onPageChange={(newPage) => updateParams({ page: newPage })}
        />
      </main>
    </>
  );
}

export default App;
