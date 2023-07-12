import axios from "axios";

const baseUrl = import.meta.env.VITE_API_BASEURL;

export const axiosDayventure = axios.create({
  baseURL: baseUrl,
});
