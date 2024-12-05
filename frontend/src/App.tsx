import { Route, Routes } from "react-router-dom";
import Auth from "./components/Auth";
import Home from "./components/Home";
import ProtectedRoute from "./components/ProtectedRoute";
import RedirectRoute from "./components/RedirectRoute";

const App = () => {
  return (
    <div className="bg-black min-h-screen">
      <Routes>
        <Route
          path="/auth"
          element={
            <RedirectRoute>
              <Auth />
            </RedirectRoute>
          }
        />

        <Route
          path="/"
          element={
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
          }
        />
      </Routes>
    </div>
  );
};

export default App;
