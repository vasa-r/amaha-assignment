interface LoginType {
  email: string;
  password: string;
}

const validateLogin = (values: LoginType) => {
  const errors: Partial<LoginType> = {};
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;

  if (!values.email) {
    errors.email = "Email is required";
  } else if (!emailRegex.test(values.email)) {
    errors.email = "Invalid Email";
  }

  if (!values.password) {
    errors.password = "Password is required";
  } else if (values.password.length < 6) {
    errors.password = "Weak password";
  }

  return errors;
};

export default validateLogin;
