import axios from "axios";
import { RestApiUrl } from "../constants";

export const createComment = (token, comment, id) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  return axios.post(
    `${RestApiUrl}/api/comment/${id}`,
    { Comment: comment },
    config
  );
};

export const getCommentPost = (id) => {
  return axios.get(`${RestApiUrl}/api/comment/${id}`);
};
