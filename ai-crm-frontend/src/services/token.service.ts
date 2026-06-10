const TOKEN_KEY = "token";

export const TokenService = {

  getToken: () => {

    return localStorage.getItem(
      TOKEN_KEY
    );

  },

  setToken: (
    token: string
  ) => {

    localStorage.setItem(
      TOKEN_KEY,
      token
    );

  },

  removeToken: () => {

    localStorage.removeItem(
      TOKEN_KEY
    );

  },

};