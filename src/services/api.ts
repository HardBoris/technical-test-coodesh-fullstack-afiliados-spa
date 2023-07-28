import axios from "axios";

export const localApi = axios.create({
  baseURL: "http://localhost:3050/coodesh-api",
});

export const api = axios.create({
  baseURL: "https://fullstack-afiliados-api.onrender.com/coodesh-api",
});
