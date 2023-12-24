import axios from "axios";

export function setAxiosUrl(url: string) {
  axios.defaults.baseURL = url;
}

export async function setToken(token: string | null) {
  if (!token) {
    localStorage.removeItem("token");
    delete axios.defaults.headers.authorization;
  } else {
    axios.defaults.headers["authorization"] = token;
    localStorage.setItem("token", token);
  }
}
