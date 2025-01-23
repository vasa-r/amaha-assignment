import Google from "../../assets/google.png";
import Logo from "../../assets/logo.svg";
import { ChangeEvent, FormEvent, useState } from "react";
import { Link } from "react-router-dom";
import validateRegister from "../../validation/validateRegister";
import { toast } from "react-hot-toast";

interface Initialvalues {
  userName: string;
  email: string;
  password: string;
  confirmPassword: string;
}

const SignUp = () => {
  const initialValues: Initialvalues = {
    userName: "",
    email: "",
    password: "",
    confirmPassword: "",
  };

  const [credentials, setCredentials] = useState<Initialvalues>(initialValues);
  const [formErrors, setFormErrors] = useState<Partial<Initialvalues>>({});
  const [isLoading, setIsLoading] = useState<boolean>(false);

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

    const errors = validateRegister(credentials);
    setFormErrors(errors);
    if (Object.keys(errors).length === 0) {
      setIsLoading(true);
      try {
        // await register();
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoading(false);
        setCredentials(initialValues);
      }
    } else {
      toast.error("Please ensure valid info is given");
    }
  };

  return (
    <div className="relative flex flex-col items-center justify-center w-full h-full gap-4 overflow-auto">
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
        <div className="absolute px-2 text-base font-semibold -translate-x-1/2 bg-black left-1/2 -top-3">
          OR
        </div>
        <div className="border-t-2"></div>
      </div>

      <form className="flex flex-col gap-3 w-96" onSubmit={handleSubmit}>
        <div className="">
          <label htmlFor="userName">User Name</label>
          <input
            type="text"
            id="userName"
            name="userName"
            value={credentials.userName}
            onChange={handleChange}
            title="user name"
            placeholder="Enter your name"
            autoComplete="off"
          />
          <p className="error">{formErrors?.userName && formErrors.userName}</p>
        </div>
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
            type="text"
            id="password"
            name="password"
            value={credentials.password}
            onChange={handleChange}
            title="password"
            placeholder="Enter your password"
          />
          <p className="error">{formErrors?.password && formErrors.password}</p>
        </div>
        <div className="">
          <label htmlFor="confirmPassword">Confirm Password</label>
          <input
            type="text"
            id="confirmPassword"
            name="confirmPassword"
            value={credentials.confirmPassword}
            onChange={handleChange}
            title="confirm password"
            placeholder="Confirm your password"
          />
          <p className="error">
            {formErrors?.confirmPassword && formErrors.confirmPassword}
          </p>
        </div>
        <button disabled={isLoading} className="btn btn-primary" type="submit">
          {isLoading ? "Signing... Wait" : "Sign Up"}
        </button>
        <p className="text-sm text-center">
          Already have an acoount?{" "}
          <Link to="/auth/login" className="underline cursor-pointer">
            Login
          </Link>
        </p>
      </form>
    </div>
  );
};

export default SignUp;
