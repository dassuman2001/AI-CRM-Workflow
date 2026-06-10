import {

 createContext,

 useContext,

 useState,

 type ReactNode,

} from "react";

import { loginApi }

from "../api/auth.api";

import {

 TokenService,

} from "../services/token.service";

interface AuthContextType {

  login: (

    email: string,

    password: string,

  ) => Promise<void>;

  logout: () => void;

  isAuthenticated: boolean;

}

const AuthContext =

 createContext<AuthContextType>(

  {} as AuthContextType

 );

export const AuthProvider = (

 {

  children,

 }: {

  children: ReactNode;

 }

) => {

 const [

  isAuthenticated,

  setAuthenticated,

 ] = useState(

  !!TokenService.getToken()

 );

 const login = async (

  email: string,

  password: string,

 ) => {

  const data =

   await loginApi(

    email,

    password,

   );

  TokenService.setToken(

   data.access_token

  );

  setAuthenticated(true);

 };

 const logout = () => {

  TokenService.removeToken();

  setAuthenticated(false);

 };

 return (

  <AuthContext.Provider

   value={{

    login,

    logout,

    isAuthenticated,

   }}

  >

   {children}

  </AuthContext.Provider>

 );

};

export const useAuth = () =>

 useContext(AuthContext);