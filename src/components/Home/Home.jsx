import { useState, useEffect } from "react";
import axios from "axios";
import Post from "./Post/Post";

const Home = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchPostsAndUsers = async () => {
      try {
        // Here i am Fetching posts data
        const postsResponse = await axios.get(
          `${import.meta.env.VITE_BASE_URL}/posts`
        );
        const fetchedPosts = postsResponse.data;

        // Here i am Fetching users data
        const usersResponse = await axios.get(
          `${import.meta.env.VITE_BASE_URL}/users`
        );
        const fetchedUsers = usersResponse.data;

        //Here i am Fetching comments data
        const postCommentResponse = await axios.get(
          `${import.meta.env.VITE_BASE_URL}/comments`
        );
        const fetchedComments = postCommentResponse.data;

        // Here i am Matching posts with users and comments
        const postsWithDetails = fetchedPosts.map((post) => {
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
      }
    };

    fetchPostsAndUsers();
  }, []);
  return (
    <div className="container mx-auto p-4">
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
    </div>
  );
};

export default Home;
