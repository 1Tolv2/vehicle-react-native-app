import axios from "axios";

axios.defaults.baseURL =
  process.env.REACT_APP_API_URL || "http://10.0.2.2:8800/api/v1";

export const registerUser = async (username, password, settings) => {
  return await axios.post("/users", { username, password, settings });
};

export const loginUser = async (username, password) => {
  return await axios.post("/users/auth", { username, password });
};
