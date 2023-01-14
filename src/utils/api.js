import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

const getToken = async () => {
  try {
    const jsonValue = await AsyncStorage.getItem("@access_token");
    return jsonValue != null ? JSON.parse(jsonValue) : null;
  } catch (err) {
    console.log("getToken", err.message);
  }
};

axios.defaults.baseURL = API_URL;
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
    console.log("storeToken", err.message);
  }
};

export const registerUser = async (username, password, settings) => {
  try {
    return await axios.post("/users", { username, password, settings });
  } catch (err) {
    console.log("registerUser", err.message);
  }
};

export const loginUser = async (username, password) => {
  try {
    const res = await axios.post("/users/auth", { username, password });
    if (res.data?.token) {
      storeToken(res.data.token);
    }
    return res;
  } catch (err) {
    console.log("loginUser", err.message);
  }
};

export const getUser = async () => {
  return await axios.get("/users/me");
};

export const updateUser = async (settings) => {
  return await axios.put("/users/me", settings);
};

export const getVehicles = async () => {
  try {
    return await axios.get("/vehicles");
  } catch (err) {
    console.log("getVehicles", err.message);
  }
};

export const createVehicle = async (formData) => {
  try {
    return await axios.post("/vehicles", formData);
  } catch (err) {
    console.log("createVehicle", err.message);
  }
};

export const updateVehicle = (id, formData) => {
  return axios.put(`/vehicles/${id}`, formData);
};

export const createNote = async (note) => {
  return await axios.post(`/notes`, note);
};

export const getVehicleNotes = async (id) => {
  return await axios.get(`/notes/vehicle/${id}`);
};

export const updateNote = async (id, note) => {
  return await axios.put(`/notes/${id}`, note);
};

export const deleteNote = async (id) => {
  return await axios.delete(`/notes/${id}`);
};
