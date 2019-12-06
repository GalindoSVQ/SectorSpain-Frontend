import axios from "axios";

const http = axios.create({
  baseURL: "http://127.0.0.1:8002/",
  // baseURL: "http://192.168.1.61:8002/",
  // baseURL: "http://192.168.1.2:8002/",
  timeout: 1000
});

export function setAuthToken(token) {
  if (!token) {
    delete http.defaults.headers["Authorization"];
  } else {
    http.defaults.headers["Authorization"] = `Bearer ${token}`;
  }
}

export default http;
