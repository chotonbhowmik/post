import { useState, useEffect } from "react";
import axios from "axios";
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
        // Fetch all posts data
        const postsResponse = await axios.get(
          `${import.meta.env.VITE_BASE_URL}/posts`
        );
        let fetchedPosts = postsResponse.data;

        // Sort posts in descending order
        fetchedPosts.sort((a, b) => b.id - a.id);

        // Fetch users data
        const usersResponse = await axios.get(
          `${import.meta.env.VITE_BASE_URL}/users`
        );
        const fetchedUsers = usersResponse.data;

        // Fetch comments data
        const postCommentResponse = await axios.get(
          `${import.meta.env.VITE_BASE_URL}/comments`
        );
        const fetchedComments = postCommentResponse.data;

        // Pagination calculation
        setTotalPages(Math.ceil(fetchedPosts.length / postsPerPage));

        const startIndex = (currentPage - 1) * postsPerPage;
        const endIndex = startIndex + postsPerPage;
        const paginatedPosts = fetchedPosts.slice(startIndex, endIndex);

        // Match posts with users and comments
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
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
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
