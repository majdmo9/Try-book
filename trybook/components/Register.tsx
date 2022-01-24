import React, { FunctionComponent, useState } from "react";
import styles from "../styles/Login.module.css";
import { TextField, Button } from "@mui/material";
import AccountBoxIcon from "@mui/icons-material/AccountBox";
import { firebaseRegisterWithEmailAndPassword } from "../config/firebase";
interface IProps {
  setIsLoggedIn: () => void;
}
interface IUser {
  username: string;
  password: string;
  verify: string;
}
const Register: FunctionComponent<IProps> = ({ setIsLoggedIn }) => {
  const [user, setUser] = useState<IUser>({
    username: "",
    password: "",
    verify: "",
  });
  const handleChange = (e: any) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };
  return (
    <div className={styles.loginContainer}>
      <h1 className={styles.loginTitle}>Register</h1>
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
        name="password"
        value={user.password}
        onChange={handleChange}
        type="password"
      />
      <TextField
        type="password"
        className={styles.passwordInput}
        label="Verify"
        variant="outlined"
        name="verify"
        value={user.verify}
        onChange={handleChange}
      />
      <div className={styles.buttonsRegisterDiv}>
        <Button
          variant="contained"
          className={styles.loginBtn}
          onClick={() =>
            firebaseRegisterWithEmailAndPassword(setIsLoggedIn, user)
          }
        >
          Register
          <AccountBoxIcon />
        </Button>
      </div>
    </div>
  );
};

export default Register;
