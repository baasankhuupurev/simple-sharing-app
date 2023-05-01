import axios from "axios";
import { RestApiUrl } from "../constants";

export const getCategory = () => {
  return axios.get(`${RestApiUrl}/api/category`);
};
