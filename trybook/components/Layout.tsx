import React, { FunctionComponent } from "react";
import NavBar from "./NavBar";
import SideBar from "./SideBar";
import styles from "../styles/Layout.module.css";
import { IUser } from "../pages/_app";
interface IProps {
  theme: any;
  children: any;
  logOut: () => void;
  token: string | null;
}
const Layout: FunctionComponent<IProps & IUser> = ({
  theme,
  children,
  logOut,
  name,
  picture,
  email,
  token,
}) => {
  return (
    <div className={styles.container}>
      <NavBar
        theme={theme}
        logOut={logOut}
        name={name}
        email={email}
        picture={picture}
      ></NavBar>
      <SideBar theme={theme} token={token} />

      <div className={styles.childrenDiv}>{children}</div>
    </div>
  );
};

export default Layout;
