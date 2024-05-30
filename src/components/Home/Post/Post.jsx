import  { useState } from "react";
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
      <p className="text-gray-500 mt-4">
        Posted by: <b className="text-black">{username}</b>
      </p>
      <a
        className="mt-6  text-black underline cursor-pointer py-2 px-4 "
        onClick={toggleComments}
      >
        {showComments ? "Show Less" : "Show More"}
      </a>
      {showComments && (
        <div className="mt-4">
          <h3 className="text-xl font-bold">Comments:</h3>
          {comments.length > 0 ? (
            comments.map((comment) => (
              <div key={comment.id} className="mt-2">
                <p className="font-semibold text-justify capitalize">
                  {comment.name}
                </p>
                <p className="text-gray-600 text-justify capitalize mt-3">
                  {comment.body}
                </p>
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
