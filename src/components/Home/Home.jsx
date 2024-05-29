import  { useState, useEffect } from "react";
import axios from "axios";
import Post from "./Post/Post";

const Home = () => {
  const [posts, setPosts] = useState([]);
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchPostsAndUsers = async () => {
      try {
        // Here i am Fetching posts Data
        const postsResponse = await axios.get(
          `${import.meta.env.VITE_BASE_URL}/posts`
        );
        const fetchedPosts = postsResponse.data;

        // Here i am Fetching users Data
        const usersResponse = await axios.get(
          `${import.meta.env.VITE_BASE_URL}/users`
        );
        const fetchedUsers = usersResponse.data;

        // Here i am Matching posts with users based on user ID
        const postsWithUsername = fetchedPosts.map((post) => {
          const user = fetchedUsers.find((user) => user.id === post.userId);
          return {
            ...post,
            username: user ? user.username : "No Name",
          };
        });

        setPosts(postsWithUsername);
        setUsers(fetchedUsers);
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
          />
        ))}
      </div>
    </div>
  );
};

export default Home;
