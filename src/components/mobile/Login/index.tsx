"use client";
import styles from "./MLogin.module.scss";
import Button from "@/sheared/Mobile/Button";
import Input from "@/sheared/Mobile/Input/Input";
import { login, register } from "@/utils/API";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
// import toast from "react-hot-toast";

type reqBody = {
  hotelName: string;
  phoneNo: string;
  email: string;
  pass: string;
};

type errorBody = {
  email: string;
  pass: string;
  server: string;
};

const Login = () => {
  const [isModified, setIsModified] = useState(false);
  const [formState, setFormState] = useState(false);
  const [errorMessage, setErrorMessage] = useState<errorBody>({
    email: "",
    pass: "",
    server: "",
  });
  const toggleForm = () => {
    setFormState(!formState);
  };

  const [reqBody, setreqBody] = useState<reqBody>({
    hotelName: "",
    email: "",
    pass: "",
    phoneNo: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setreqBody((prevState) => ({
      ...prevState,
      [id]: value,
    }));

    if (id === "email") {
      const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
      if (!emailPattern.test(value)) {
        setErrorMessage((prevState) => ({
          ...prevState,
          email: "Invalid email address",
        }));
      } else {
        setErrorMessage((prevState) => ({
          ...prevState,
          email: "",
        }));
      }
    }

    if (id === "pass") {
      const hasUpperCase = /[A-Z]/.test(value);
      const hasLowerCase = /[a-z]/.test(value);
      const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(value);

      if (value.length < 8) {
        setErrorMessage((prevState) => ({
          ...prevState,
          pass: "Password must be at least 8 characters long",
        }));
      } else if (!hasUpperCase) {
        setErrorMessage((prevState) => ({
          ...prevState,
          pass: "Password must contain at least one uppercase letter",
        }));
      } else if (!hasLowerCase) {
        setErrorMessage((prevState) => ({
          ...prevState,
          pass: "Password must contain at least one lowercase letter",
        }));
      } else if (!hasSpecialChar) {
        setErrorMessage((prevState) => ({
          ...prevState,
          pass: "Password must contain at least one special character",
        }));
      } else {
        setErrorMessage((prevState) => ({
          ...prevState,
          pass: "",
        }));
      }
    }
  };

  const router = useRouter();

  useEffect(() => {
    const { email, pass } = reqBody;
    const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    const isValidEmail = emailPattern.test(email);
    const isValidPassword =
      pass.length >= 8 &&
      /[A-Z]/.test(pass) &&
      /[a-z]/.test(pass) &&
      /[!@#$%^&*(),.?":{}|<>]/.test(pass);
    if (isValidEmail && isValidPassword) {
      setIsModified(true);
    } else {
      setIsModified(false);
    }
  }, [reqBody]);

  const handleClick = async (
    e: React.MouseEvent<HTMLSpanElement, MouseEvent>
  ) => {
    e.preventDefault();
    try {
      const response = await login({
        email: reqBody.email,
        pass: reqBody.pass,
      });
      if (response.statusCode === 200) {
        alert(`${response.message}`);
        localStorage.setItem("id", response.data);
        router.push("/home");
        setErrorMessage((prevState) => ({
          ...prevState,
          server: "",
        }));
      } else {
        alert(`${response.message}`);
        setErrorMessage((prevState) => ({
          ...prevState,
          server: response.message,
        }));
      }
    } catch (error: any) {
      console.error("Login failed:", error);
      setErrorMessage((prevState) => ({
        ...prevState,
        server: error.message,
      }));
    }
  };

  const handleRegisterClick = async (
    e: React.MouseEvent<HTMLSpanElement, MouseEvent>
  ) => {
    e.preventDefault();
    try {
      const response = await register(reqBody);
      if (response.statusCode === 200) {
        alert(`${response.message}`);
        setFormState(!formState);
        setErrorMessage((prevState) => ({
          ...prevState,
          server: "",
        }));
      } else {
        setErrorMessage((prevState) => ({
          ...prevState,
          server: response.message,
        }));
      }
    } catch (error: any) {
      console.error("Registration failed:", error);
      setErrorMessage((prevState) => ({
        ...prevState,
        server: error.message,
      }));
    }
  };

  return (
    <div className={styles.formContainer}>
      {!formState ? (
        <div className={styles.loginTitle}>Create New Account</div>
      ) : (
        <div className={styles.loginTitle}>Login</div>
      )}
      <form className={styles.form} onSubmit={(e) => e.preventDefault()}>
        {!formState ? (
          <>
            <Input
              labelIntent="primary"
              type="text"
              id="hotelName"
              name="hotelName"
              placeholder=""
              isRequired
              labelTitle="Enter Hotel Name"
              handleChange={handleChange}
            />
            <Input
              labelIntent="primary"
              type="email"
              id="email"
              name="email"
              placeholder=""
              isRequired
              labelTitle="Enter Hotel Email"
              handleChange={handleChange}
            />
            {errorMessage.email && (
              <div className={styles.error}>{errorMessage.email}</div>
            )}
            <Input
              labelIntent="primary"
              type="password"
              id="pass"
              name="pass"
              placeholder=""
              isRequired
              labelTitle="Enter Password"
              handleChange={handleChange}
            />
            {errorMessage.pass && (
              <div className={styles.error}>{errorMessage.pass}</div>
            )}
            <Input
              labelIntent="primary"
              type="text"
              id="phoneNo"
              name="phoneNo"
              isRequired
              placeholder=""
              labelTitle="Enter Hotel Contact number"
              handleChange={handleChange}
            />
          </>
        ) : (
          <>
            <Input
              labelIntent="primary"
              type="email"
              id="email"
              name="email"
              placeholder=""
              isRequired
              labelTitle="Enter Hotel Email"
              handleChange={handleChange}
            />
            {errorMessage.email && (
              <div className={styles.error}>{errorMessage.email}</div>
            )}
            <Input
              labelIntent="primary"
              type="password"
              id="pass"
              name="pass"
              placeholder=""
              isRequired
              labelTitle="Enter Password"
              handleChange={handleChange}
            />
            {errorMessage.pass && (
              <div className={styles.error}>{errorMessage.pass}</div>
            )}
          </>
        )}
        <span onClick={toggleForm}>
          {!formState ? (
            <Button
              intent={"primary"}
              text="Already have an account! Login"
            />
          ) : (
            <Button intent={"primary"} text="Create new account" />
          )}
        </span>
        {errorMessage.server && (
              <div className={styles.error}>{errorMessage.server}</div>
            )}
        {!formState ? (
          <span onClick={handleRegisterClick}>
            <Button
              intent={"primary"}
              text="Create new account"
              disabled={!isModified}
            />
          </span>
        ) : (
          <span onClick={handleClick}>
            <Button intent={"primary"} text="Login" disabled={!isModified} />
          </span>
        )}
      </form>
    </div>
  );
};

export default Login;
