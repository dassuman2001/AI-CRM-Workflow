import axios from "axios";

import { TokenService } from "../services/token.service";

const client = axios.create({

    baseURL:

        import.meta.env.VITE_API_URL,

});

client.interceptors.request.use(

  (config) => {

    const token = TokenService.getToken();

    if (

      token

    ) {

      config.headers.Authorization =

        `Bearer ${token}`;

    }

    return config;

  }

);

client.interceptors.response.use(

  (response) => response,

  (error) => {

    if (

      error.response?.status === 401

    ) {

      localStorage.removeItem(

        "token"

      );

      localStorage.removeItem(

        "user"

      );

      window.location.href = "/";

    }

    return Promise.reject(

      error

    );

  }

);

export default client;