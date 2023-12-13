import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import { DarkModeContextProvider } from "./context/darkModeContext.jsx";
import { UserContextProvider } from "./context/userContext.jsx";
import { GoogleOAuthProvider } from "@react-oauth/google";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <GoogleOAuthProvider clientId='941201399432-qtmucn89n26sln6rvvrup1da0ne3opdi.apps.googleusercontent.com'>
      <DarkModeContextProvider>
        <UserContextProvider>
          <App />
        </UserContextProvider>
      </DarkModeContextProvider>
    </GoogleOAuthProvider>
  </React.StrictMode>
);
