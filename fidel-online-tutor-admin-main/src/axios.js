import axios from "axios";
import { token } from "./utils/token";

const instance = axios.create({
  baseURL: "http://localhost:4000/api/v1",
  headers: {
    Authorization: `Bearer ${token}`,
    "Content-Type": "application/json",
  },
});

export default instance;
