import axios from "axios";

const instance = axios.create({
  baseURL: process.env.REACT_APP_BASE_URL,
});

export default instance;

// instance.get('/hi').then((data) => console.log(data));

