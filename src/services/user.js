import axios from "axios";
import { RestApiUrl } from "../constants";

export const getUser = (token, id) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  return axios.get(`${RestApiUrl}/api/users/${id}`, config);
};
