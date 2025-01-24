import { Toaster } from "react-hot-toast";
import { Route, Routes } from "react-router-dom";
import AuthPage from "./pages/AuthPage";
import MainPage from "./pages/MainPage";

const App = () => {
  return (
    <>
      <Toaster />
      <Routes>
        <Route path="/auth/*" element={<AuthPage />} />
        <Route path="/main/*" element={<MainPage />} />
      </Routes>
    </>
  );
};

export default App;
