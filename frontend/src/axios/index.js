import axios from "axios";

const baseUrl = import.meta.env.VITE_API_BASEURL;

export const axiosLuna = axios.create({
  baseURL: baseUrl,
});
