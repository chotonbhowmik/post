import { useState } from "react";
import PropTypes from "prop-types";

const Post = ({ title, body, username, comments }) => {
  const [showComments, setShowComments] = useState(false);

  const toggleComments = () => {
    setShowComments(!showComments);
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-lg">
      <h2 className="text-xl font-bold mb-2 text-justify capitalize">
        {title}
      </h2>
      <p className="text-gray-700 text-justify capitalize">{body}</p>
      <p className="text-gray-500 m-4">
        Posted by: <b className="text-black">{username}</b>
      </p>
      <a
        className="text-black underline cursor-pointer"
        onClick={toggleComments}
      >
        {showComments ? "Show Less" : "Show Comments"}
      </a>
      {showComments && (
        <div className="mt-4">
          {comments.length > 0 ? (
            comments.map((comment) => (
              <div key={comment.id} className="relative mt-2 pl-4">
                <div className="flex items-center">
                  <p className="font-semibold text-justify capitalize">
                    {comment.name}
                  </p>
                 
                </div>
                <div className="relative pl-4">
                  <div className="absolute left-0 top-0 h-full flex items-center">
                    <div className="h-full border-l border-dotted border-black"></div>
                    
                  </div>
                  <p className="text-gray-600 text-justify capitalize mt-3 ml-4">
                    {comment.body}
                  </p>
                </div>
              </div>
            ))
          ) : (
            <p>No comments</p>
          )}
        </div>
      )}
    </div>
  );
};

Post.propTypes = {
  title: PropTypes.string.isRequired,
  body: PropTypes.string.isRequired,
  username: PropTypes.string.isRequired,
  comments: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
      body: PropTypes.string.isRequired,
    })
  ).isRequired,
};

export default Post;
