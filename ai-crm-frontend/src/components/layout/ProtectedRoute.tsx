import {

  Navigate,

} from "react-router-dom";

import {

  TokenService,

} from "../../services/token.service";

export default function ProtectedRoute({

  children,

}: {

  children: React.ReactNode;

}) {

  const token =

    TokenService.getToken();

  if (!token) {

    return <Navigate to="/" replace />;

  }

  return <>{children}</>;

}