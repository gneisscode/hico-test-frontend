import axios from 'axios'

const baseURL = "http://localhost:4000/api";



export const axiosWithoutToken = axios.create({
  baseURL,
  headers: {
    "Content-type": "application/json",
  },
});
