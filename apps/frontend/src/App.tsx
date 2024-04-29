import React from "react";
import Router from "./Router.tsx";
import { AuthProvider } from "./context/AuthContext.tsx";

const App = () => {
  return (
    <AuthProvider>
      <Router />
    </AuthProvider>
  );
}

export default App;