
import { useState, useEffect } from "react";
import { fetchPosts, fetchUsers, fetchComments } from "../../Api/Api"; 
import Post from "./Post/Post";
import Pagination from "./Pagination/Pagination";

const Home = () => {
  const [posts, setPosts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(true);
  const postsPerPage = 9;

  useEffect(() => {
    const fetchPostsAndUsers = async () => {
      setLoading(true);
      try {
        // Here Fetching all posts data
        let fetchedPosts = await fetchPosts();

        // Sort posts in descending order
        fetchedPosts.sort((a, b) => b.id - a.id);

        // Here Fetching users data
        const fetchedUsers = await fetchUsers();

        // Here Fetching comments data
        const fetchedComments = await fetchComments();

        // Pagination calculation
        setTotalPages(Math.ceil(fetchedPosts.length / postsPerPage));

        const startIndex = (currentPage - 1) * postsPerPage;
        const endIndex = startIndex + postsPerPage;
        const paginatedPosts = fetchedPosts.slice(startIndex, endIndex);

        // Here Match posts with users and comments
        const postsWithDetails = paginatedPosts.map((post) => {
          const user = fetchedUsers.find((user) => user.id === post.userId);
          const postComments = fetchedComments.filter(
            (comment) => comment.postId === post.id
          );
          return {
            ...post,
            username: user ? user.username : "No Name",
            comments: postComments,
          };
        });

        setPosts(postsWithDetails);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPostsAndUsers();
  }, [currentPage]);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  return (
    <div className="container mx-auto p-4">
      {loading ? (
        <div className="loader">Loading...</div>
      ) : (
        <>
          <div className="grid grid-cols-1 lg:grid-cols-1 gap-4">
            {posts.map((post) => (
              <Post
                key={post.id}
                title={post.title}
                body={post.body}
                username={post.username}
                comments={post.comments}
              />
            ))}
          </div>
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={handlePageChange}
          />
        </>
      )}
    </div>
  );
};

export default Home;
