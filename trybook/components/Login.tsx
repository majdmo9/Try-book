import React, { FunctionComponent, useEffect, useState } from "react";
import styles from "../styles/Login.module.css";
import { TextField, Button } from "@mui/material";
import LoginIcon from "@mui/icons-material/Login";
import GoogleIcon from "@mui/icons-material/Google";
import Register from "./Register";

import {
  loginWithPopup,
  firebaseLoginWithEmailAndPassword,
  getLoggedInUser,
} from "../config/firebase";

interface IProps {
  setIsLoggedIn: () => void;
  picture: string | StaticImageData;
}
interface IUser {
  username: string;
  password: string;
}

const Login: FunctionComponent<IProps> = ({ setIsLoggedIn, picture }) => {
  const [isRegister, setIsRegister] = useState<boolean>(false);
  const [user, setUser] = useState<IUser>({
    username: "",
    password: "",
  });

  const [token, setToken] = useState<string | null>("");
  const handleChange = (e: any) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    if (picture !== "") {
      getLoggedInUser(setIsLoggedIn);
      setToken(localStorage.getItem("token"));
    }
  }, [picture]);

  return !isRegister ? (
    <div className={styles.loginContainer}>
      <h1 className={styles.loginTitle}>Login</h1>
      <TextField
        className={styles.emailInput}
        label="Email"
        variant="outlined"
        name="username"
        value={user.username}
        onChange={handleChange}
      />
      <TextField
        className={styles.passwordInput}
        label="Password"
        variant="outlined"
        type="password"
        name="password"
        value={user.password}
        onChange={handleChange}
      />
      <div className={styles.buttonsDiv}>
        <Button
          onClick={() =>
            firebaseLoginWithEmailAndPassword(
              setIsLoggedIn,
              user.username,
              user.password
            )
          }
          variant="contained"
          className={styles.loginBtn}
        >
          Login
          <LoginIcon />
        </Button>
        <Button
          onClick={() => loginWithPopup(setIsLoggedIn)}
          variant="contained"
          className={styles.loginBtn}
        >
          Sign in with google
          <GoogleIcon />
        </Button>
        <Button
          onClick={() => {
            setIsRegister(true);
          }}
          variant="text"
          className={styles.loginBtn}
        >
          Dont have account?
        </Button>
      </div>
    </div>
  ) : (
    <Register setIsLoggedIn={setIsLoggedIn} />
  );
};

export default Login;
