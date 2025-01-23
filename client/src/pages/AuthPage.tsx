import { Route, Routes } from "react-router-dom";
import Login from "../components/Auth/Login";
import SignUp from "../components/Auth/SignUp";
import OAuth from "../components/Auth/OAuth";

const AuthPage = () => {
  return (
    <div className="w-screen h-screen">
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/oauth" element={<OAuth />} />
        <Route path="*" element={<Login />} />
      </Routes>
    </div>
  );
};

export default AuthPage;
