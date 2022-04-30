import AppRouter from "./components/routes/AppRouter";
import { AuthContext } from "./components/auth/authContext";
import { authReducer } from "./components/auth/authReducer";
import { useEffect, useReducer } from "react";

const init = () => {
  return JSON.parse(localStorage.getItem("user")) || { logged: false };
};

export const App = () => {
  const [user, dispatch] = useReducer(authReducer, {}, init);

  useEffect(() => {
    if (!user) return;
    localStorage.setItem("user", JSON.stringify(user));
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        dispatch,
      }}
    >
      <AppRouter />
    </AuthContext.Provider>
  );
};

export default App;
