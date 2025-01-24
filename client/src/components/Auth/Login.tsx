import Google from "../../assets/google.png";
import Logo from "../../assets/logo.svg";
import { ChangeEvent, FormEvent, useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-hot-toast";
import validateLogin from "../../validation/validateLogin";
import { useTheme } from "../../context/ThemeContext";
import { loginUser } from "../../api/auth";
import { useApp } from "../../context/AppContext";

interface Initialvalues {
  email: string;
  password: string;
}

const Login = () => {
  const initialValues: Initialvalues = {
    email: "",
    password: "",
  };
  const [credentials, setCredentials] = useState<Initialvalues>(initialValues);
  const [formErrors, setFormErrors] = useState<Partial<Initialvalues>>({});
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const { isDarkMode } = useTheme();

  const { loginContext, setToken } = useApp();

  const googleLogin = () => {
    window.open(
      `${import.meta.env.VITE_API_BASE_URL}/api/auth/google`,
      "_self"
    );
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setCredentials((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const errors = validateLogin(credentials);
    setFormErrors(errors);
    if (Object.keys(errors).length === 0) {
      setIsLoading(true);
      try {
        await login();
      } catch (error) {
        console.log(error);
        toast.error("Login failed, please try again.");
      } finally {
        setIsLoading(false);
      }
    } else {
      toast.error("Please ensure valid info is given");
    }
  };

  const login = async () => {
    try {
      const response = await loginUser(credentials.email, credentials.password);
      if (response.success || response.status === 202) {
        toast.success(response?.data?.message);
        localStorage.setItem("token", response?.data?.token);
        setToken(response?.data?.token);
        loginContext(response?.data?.token);
        setCredentials(initialValues);
      } else {
        toast.error(response?.data?.message || "Login failed");
      }
    } catch (error) {
      console.log(error);
      toast.error("An error occurred during login. Please try again later.");
    }
  };

  return (
    <div className="relative flex flex-col items-center justify-center w-full h-full gap-5">
      <Link
        to={"/"}
        className="absolute top-0 left-0 flex items-center gap-3 p-4"
      >
        <img src={Logo} alt="app-logo" className="size-8 animate-spin" />
        <h1 className="text-xl font-semibold gradient-txt">TaskFlow</h1>
      </Link>
      <div
        onClick={googleLogin}
        className="flex items-center justify-center h-10 gap-2 bg-black cursor-pointer w-96 btn-primary btn"
      >
        <img src={Google} alt="google logo" className="w-8" />
        <p className="text-lg">Continue with Google</p>
      </div>

      <div className="relative w-96">
        <div
          className={`absolute px-2 text-base font-semibold -translate-x-1/2 left-1/2 -top-3 ${
            isDarkMode ? "bg-black" : "bg-white"
          }`}
        >
          OR
        </div>
        <div className="border-t-2"></div>
      </div>
      <form className="flex flex-col gap-3 w-96" onSubmit={handleSubmit}>
        <div className="">
          <label htmlFor="email">Email address</label>
          <input
            type="text"
            id="email"
            name="email"
            value={credentials.email}
            onChange={handleChange}
            title="email address"
            placeholder="Enter your email"
          />
          <p className="error">{formErrors?.email && formErrors.email}</p>
        </div>
        <div className="">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            name="password"
            value={credentials.password}
            onChange={handleChange}
            title="password"
            placeholder="Enter your password"
          />
          <p className="error">{formErrors?.password && formErrors.password}</p>
        </div>
        <button className="btn btn-primary" type="submit" disabled={isLoading}>
          Login
        </button>
        <p className="text-sm text-center">
          New to TaskFlow?{" "}
          <Link to="/auth/signup" className="underline cursor-pointer">
            SignUp
          </Link>
        </p>
      </form>
    </div>
  );
};

export default Login;
