import React, { FunctionComponent, useEffect } from "react";
import styles from "../styles/NavBar.module.css";
import PublicOutlinedIcon from "@mui/icons-material/PublicOutlined";
import { Box } from "@mui/material";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import { firebaseLogOut } from "../config/firebase";
import Image from "next/image";
import { IUser } from "../pages/_app";
interface IProps {
  theme: any;
  logOut: () => void;
}
const NavBar: FunctionComponent<IProps & IUser> = ({
  theme,
  logOut,
  name,
  picture,
  email,
}) => {
  return (
    <div>
      <Box
        sx={{
          top: "0",
          zIndex: "11",
          width: "100%",
          position: "fixed",
          display: "flex",
          color: theme.palette.primary.main,
          backgroundColor: theme.palette.secondary.main,
          justifyContent: "space-between",
          alignItems: "center",
          height: "10%",
        }}
      >
        <div className={styles.logo}>
          <PublicOutlinedIcon />
          Trybook
        </div>
        <div className={styles.listItems}>
          <ul>
            <li className={styles.searchLi}>
              <div>
                <TextField
                  id="outlined-basic"
                  label="Search"
                  variant="outlined"
                  autoComplete="off"
                  className={styles.searchBar}
                />
              </div>
            </li>
            <li className={styles.login}>
              <Button
                onClick={() => firebaseLogOut(logOut)}
                variant="outlined"
                className={styles.loginBtn}
              >
                Logout
              </Button>
            </li>
            <li className={styles.imageLi}>
              <p>{name?.split(" ")[0]}</p>
              <Image
                className={styles.profilePicture}
                src={picture}
                alt="user-image"
                width={50}
                height={50}
              />
            </li>
          </ul>
        </div>
      </Box>
    </div>
  );
};

export default NavBar;
