import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

const getToken = async () => {
  try {
    const jsonValue = await AsyncStorage.getItem("@access_token");
    return jsonValue != null ? JSON.parse(jsonValue) : null;
  } catch (err) {
    console.log(err.message);
  }
};

axios.defaults.baseURL =
  process.env.REACT_APP_API_URL || "http://10.0.2.2:8800/api/v1";
axios.interceptors.request.use(async (config) => {
  if (!config?.headers) {
    config.headers = {};
  }
  const jwt = await getToken();
  if (jwt) {
    config.headers["authorization"] = `Bearer ${jwt}`;
  }
  return config;
});

const storeToken = async (value) => {
  try {
    await AsyncStorage.setItem("@access_token", JSON.stringify(value));
  } catch (err) {
    console.log(err.message);
  }
};

export const registerUser = async (username, password, settings) => {
  try {
    return await axios.post("/users", { username, password, settings });
  } catch (err) {
    console.log(err.message);
  }
};

export const loginUser = async (username, password) => {
  try {
    const res = await axios.post("/users/auth", { username, password });
    storeToken(res.data.token);
    return res;
  } catch (err) {
    console.log(err.message);
  }
};

export const getUser = async () => {
  try {
    return await axios.get("/users/me");
  } catch (err) {
    console.log(err.message);
  }
};

export const getVehicles = async () => {
  try {
    const jwt = await getToken();
    return await axios.get("/vehicles");
  } catch (err) {
    console.log(err.message);
  }
};
