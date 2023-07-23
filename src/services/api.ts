import axios from "axios";

export const localApi = axios.create({
  baseURL: "http://localhost:3050/aventura-api",
});
