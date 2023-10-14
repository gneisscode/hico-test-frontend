import axios from 'axios'

// const baseURL = "http://localhost:4000/api";
const baseURL = "https://hico-test-api.onrender.com/api";



export const axiosWithoutToken = axios.create({
  baseURL,
  headers: {
    "Content-type": "application/json",
  },
});
