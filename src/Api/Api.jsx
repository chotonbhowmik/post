
import axios from "axios";

const BASE_URL = import.meta.env.VITE_BASE_URL;

export const fetchPosts = async () => {
  const response = await axios.get(`${BASE_URL}/posts`);
  return response.data;
};

export const fetchUsers = async () => {
  const response = await axios.get(`${BASE_URL}/users`);
  return response.data;
};

export const fetchComments = async () => {
  const response = await axios.get(`${BASE_URL}/comments`);
  return response.data;
};
