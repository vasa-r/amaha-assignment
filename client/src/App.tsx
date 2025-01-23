import { Toaster } from "react-hot-toast";
import { Route, Routes } from "react-router-dom";
import AuthPage from "./pages/AuthPage";

const App = () => {
  return (
    <>
      <Toaster />
      <Routes>
        <Route path="/auth/*" element={<AuthPage />} />
      </Routes>
    </>
  );
};

export default App;
