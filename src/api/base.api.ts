import axios from "axios";
import environment from "../environment/environment";
import { store } from './../redux/store';
import { cerrarSesion } from "../redux/slices/auth.slice"; 

const BASE_URL = environment.BASE_URL_DEVELOP;

export const instance = axios.create({
  baseURL: BASE_URL,
});

instance.interceptors.request.use(
  (config) => {
    const state = store.getState();
    const token = state.authReducer.token;
    // console.log(`tiene token : ${token}`)
    if (token) {
      config.headers["x-access-token"] = token;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// -- para validar que si el token expiro que me desloguee
instance.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response && error.response.status == 403) {
      console.log("Token expirado");
      cerrarSesion();
    }
    return Promise.reject(error);
  }
);
