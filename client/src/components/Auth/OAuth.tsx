/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useAuth } from "../../context/AppContext";

const OAuth = () => {
  const navigate = useNavigate();
  const [params] = useSearchParams();
  const { loginContext } = useAuth();

  useEffect(() => {
    const token = params.get("token");

    if (token) {
      loginContext(token);
      navigate("/main");
    } else {
      navigate("/auth/login");
    }
  }, []);

  return (
    <div className="flex items-center justify-center h-screen">
      <div className="w-16 h-16 border-4 border-t-4 border-transparent border-solid rounded-full animate-spin from-yellow-400 via-orange-400 to-yellow-500 bg-gradient-to-r"></div>
    </div>
  );
};

export default OAuth;
