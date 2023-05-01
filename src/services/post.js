import axios from "axios";
import { RestApiUrl } from "../constants";
export const getPosts = () => {
  return axios.get(`${RestApiUrl}/api/posts`);
};
export const getPost = (id) => {
  return axios.get(`${RestApiUrl}/api/posts/${id}`);
};
export const getAuthPost = (id) => {
  return axios.get(`${RestApiUrl}/api/posts/auth/${id}`);
};
export const createPost = (token, post) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  return axios.post(`${RestApiUrl}/api/posts/`, post, config);
};
export const updatePost = (post, id) => {
  return axios.post(`${RestApiUrl}/api/posts/${id}`, post);
};
