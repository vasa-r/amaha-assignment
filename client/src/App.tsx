import { Toaster } from "react-hot-toast";
import { Navigate, Route, Routes } from "react-router-dom";
import AuthPage from "./pages/AuthPage";
import MainPage from "./pages/MainPage";
import ProtectedRoute from "./components/ProtectedRoute";

const App = () => {
  return (
    <>
      <Toaster />
      <Routes>
        <Route path="/" element={<Navigate to={"/auth"} />} />
        <Route path="/auth/*" element={<AuthPage />} />
        <Route element={<ProtectedRoute />}>
          <Route path="/main/*" element={<MainPage />} />
        </Route>
      </Routes>
    </>
  );
};

export default App;
