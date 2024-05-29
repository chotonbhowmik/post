import PropTypes from "prop-types";
const Post = ({ title, body, username }) => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold mb-2">{title}</h2>
      <p className="text-gray-700">{body}</p>
      <p className="text-red-500">{username}</p>
    </div>
  );
};
Post.propTypes = {
  title: PropTypes.string.isRequired,
  body: PropTypes.string.isRequired,
  username: PropTypes.string.isRequired,
};
export default Post;
