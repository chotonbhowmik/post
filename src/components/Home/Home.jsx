import  { useState, useEffect } from "react";
import axios from "axios";
import Post from "./Post/Post";


const Home = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_BASE_URL}/posts`
        );
        setPosts(response.data);
      } catch (error) {
        console.error("Error fetching the posts:", error);
      }
    };

    fetchPosts();
  }, []);

  return (
    <div className="container mx-auto p-4">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {posts.map((post) => (
          <Post key={post.id} title={post.title} body={post.body} />
        ))}
      </div>
    </div>
  );
};

export default Home;
