import ReactDOM from "react-dom/client";

import "./index.css";

import {

 BrowserRouter,

} from "react-router-dom";

import {

 AuthProvider,

} from "./contexts/AuthContext";

import AppRoutes

from "./routes/AppRoutes";

ReactDOM.createRoot(

 document.getElementById(

  "root"

 )!

).render(

 <BrowserRouter>

  <AuthProvider>

   <AppRoutes />

  </AuthProvider>

 </BrowserRouter>

);
