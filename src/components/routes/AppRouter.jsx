import { Routes, Route, BrowserRouter } from "react-router-dom";

import HomeRoutes from "./HomeRoutes";
import PrivateRoute from "./PrivateRoute";

import Registro from "../Registro/Registro";
import LandingPage from "../LandingPage/LandingPage";


const AppRouter = () => {
  return (
    <BrowserRouter>
      <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/registro" element={<Registro />} />

        <Route
          path="/*"
          element={
            <PrivateRoute>
              <HomeRoutes />
            </PrivateRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
};

export default AppRouter;
