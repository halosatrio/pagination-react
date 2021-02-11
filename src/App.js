import { useEffect, useState } from "react";
import axios from "axios";

import Posts from "./components/Posts";
import Pagination from "./components/Pagination";
import "./App.css";

function App() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(7);
  const [sortType, setSortType] = useState("desc");

  useEffect(() => {
    const fetchPosts = async () => {
      setLoading(true);
      const res = await axios.get("https://jsonplaceholder.typicode.com/posts");
      setPosts(res.data);
      setLoading(false);
    };

    fetchPosts();
  }, []);

  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  // sorted
  const sorted = posts.sort((a, b) => {
    const isReversed = sortType === "asc" ? 1 : -1;
    return isReversed * a.title.localeCompare(b.title);
  });
  const onSort = () => {
    sortType === "asc" ? setSortType("desc") : setSortType("asc");
  };

  // Get current posts
  const indexLastPost = currentPage * postsPerPage;
  const indexFirstPost = indexLastPost - postsPerPage;
  const currentPosts = sorted.slice(indexFirstPost, indexLastPost);

  return (
    <div className="container mt-5">
      <h1 className="text-primary mb-3">Blog Posts</h1>
      <Posts
        posts={currentPosts}
        loading={loading}
        onSort={onSort}
        sortType={sortType}
      />
      <Pagination
        postsPerPage={postsPerPage}
        totalPosts={posts.length}
        paginate={paginate}
      />
    </div>
  );
}

export default App;
