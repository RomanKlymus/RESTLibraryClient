import axios from "axios";
import jwt_decode from "jwt-decode";

const LOGIN_URL = "/signin";
const REG_URL = "/signup";

const register = (name, email, password, birthday) => {
  return axios.post(REG_URL, {
    name,
    email,
    password,
    birthday,
  });
};

const login = (email, password) => {
  return axios.post(LOGIN_URL, { email, password }).then((response) => {
    console.log(response);
    if (response.data.token) {
      localStorage.setItem("user", JSON.stringify(response.data)); 
    }
    return response.data;
  });
};

const logout = () => {
  localStorage.removeItem("user");
};

const getCurrentUser = () => {
  if(localStorage.getItem("user")) {
    return jwt_decode(localStorage.getItem("user"));
  }
  return null;
};

export default { register, login, logout, getCurrentUser };
