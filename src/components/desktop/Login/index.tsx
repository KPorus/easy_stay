"use client";

import styles from "./DLogin.module.scss";
import Button from "@/sheared/Desktop/Button";
import Input from "@/sheared/Desktop/Input/Input";
import { login } from "@/utils/API";
import { useRouter } from "next/navigation";
import { useState } from "react";
type LoginBody = {
  hotelName?: string;
  hotelContact?: string;
  email: string;
  pass: string;
};
const Login = () => {
  const [formState, setFormState] = useState(false);
  const toggleForm = () => {
    console.log(formState);
    setFormState(!formState);
  };

  const [loginBody, setLoginBody] = useState<LoginBody>({
    email: "",
    pass: "",
    hotelContact: "",
    hotelName: "",
  });

  const [data, setData] = useState<any>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    console.log(id, value);
    setLoginBody((prevState) => ({
      ...prevState,
      [id]: value,
    }));
  };

  const router = useRouter();
  const handleClick = async () => {
    console.log(loginBody);
    try {
      const response = await login(loginBody);
      setData(response);
      if (response.status && response) {
        router.push("/home");
      }
    } catch (error) {
      console.error("Login failed:", error);
    }
  };

  return (
    <div className={styles.formContainer}>
      {!formState ? (
        <div className={styles.loginTitle}>Create New Account</div>
      ) : (
        <div className={styles.loginTitle}>Login</div>
      )}
      <form className={styles.form}>
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
              id="hotelContact"
              name="hotelContact"
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
          <Button intent={"primary"} text="Create new account" />
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
