const Posts = ({ posts, loading, onSort, sortType }) => {
  if (loading) {
    return <h2>Loading...</h2>;
  }
  return (
    <table class="table table-bordered">
      <thead>
        <tr>
          <th>UserId</th>
          <th>
            Post Title
            <button onClick={onSort}>
              <i
                className={`fas fa-${
                  sortType === "asc" ? "sort-up" : "sort-down"
                }`}
              />
            </button>
          </th>
        </tr>
      </thead>
      <tbody>
        {posts.map((post) => (
          <tr key={post.id}>
            <td>{post.userId}</td>
            <td>{post.title}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default Posts;
