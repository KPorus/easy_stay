"use client"
import styles from "./DLogin.module.scss";
import Button from "@/sheared/Desktop/Button";
import Input from "@/sheared/Desktop/Input/Input";
import { login, register } from "@/utils/API";
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";

type reqBody = {
  hotelName: string;
  phoneNo: string;
  email: string;
  pass: string;
};

const Login = () => {
  const [formState, setFormState] = useState(false);
  const toggleForm = () => {
    console.log(formState);
    setFormState(!formState);
  };

  const [reqBody, setreqBody] = useState<reqBody>({
    hotelName: "",
    email: "",
    pass: "",
    phoneNo: "",
  });

  const [data, setData] = useState<any>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    console.log(id, value);
    setreqBody((prevState) => ({
      ...prevState,
      [id]: value,
    }));
  };

  const router = useRouter();

  const handleClick = async (e: React.MouseEvent<HTMLSpanElement, MouseEvent>) => {
    e.preventDefault();
    console.log(reqBody.email, reqBody.pass);
    try {
      const response = await login({
        email: reqBody.email,
        pass: reqBody.pass,
      });
      console.log(response);
      if (response.statusCode === 200) {
        toast.success(`${response.message}`);
        localStorage.setItem('id', response.data);
        router.push("/home");
      } else {
        toast.error(`${response.message}`);
      }
    } catch (error) {
      console.error("Login failed:", error);
    }
  };

  const handleRegisterClick = async (e: React.MouseEvent<HTMLSpanElement, MouseEvent>) => {
    e.preventDefault();
    console.log(reqBody);
    try {
      const response = await register(reqBody);
      if (response.statusCode === 200) {
        toast.success(`${response.message}`);
        setFormState(!formState);
      } else {
        toast.error(`${response.message}`);
      }
    } catch (error) {
      console.error("Registration failed:", error);
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
            <Input
              labelIntent="primary"
              type="text"
              id="phoneNo"
              name="phoneNo"
              placeholder=""
              isRequired
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
          </>
        )}
        <span onClick={toggleForm}>
          {!formState ? (
            <Button
              intent={"secondary"}
              text="Already have an account! Login"
            />
          ) : (
            <Button intent={"secondary"} text="Create new account" />
          )}
        </span>
        {!formState ? (
          <span onClick={handleRegisterClick}>
            <Button intent={"primary"} text="Create new account" />
          </span>
        ) : (
          <span onClick={handleClick}>
            <Button intent={"primary"} text="Login" />
          </span>
        )}
      </form>
    </div>
  );
};

export default Login;
