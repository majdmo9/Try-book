import "../styles/globals.css";
import type { AppProps } from "next/app";
import Layout from "../components/Layout";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useState, useEffect } from "react";
import Login from "../components/Login";
import axios from "axios";
import userImage from "../images/user-image.png";
const theme = createTheme({
  palette: {
    secondary: {
      main: "#79B4B7",
      light: "#F8F0DF",
    },
    primary: {
      main: "#F8F0DF",
      light: "#79B4B7",
    },
  },
});
const url = "http://localhost:4000/";

export interface IUser {
  name: string;
  picture: StaticImageData | string;
  email: string;
}
function MyApp({ Component, pageProps }: AppProps) {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [token, setToken] = useState<string | null>("");
  const [user, setUser] = useState<IUser>({
    name: "",
    picture: "",
    email: "",
  });
  const login = () => {
    setIsLoggedIn(true);
  };
  const logOut = () => {
    setIsLoggedIn(false);
  };
  //Get user data after verify with token
  const getUser = async (token: string | null) => {
    const result = await axios.get(url + "getuser", {
      headers: {
        authorization: "Bearer " + token,
      },
    });

    if (result) {
      let { name, picture, email } = result.data;
      if (picture === undefined) picture = userImage;
      if (name === undefined) name = email?.slice(0, email?.indexOf("@"));
      const User: IUser = { name, picture, email };
      setUser(User);
    }
  };
  useEffect(() => {
    setToken(localStorage.getItem("token"));
    if (token !== "") {
      getUser(token);
    }
  }, [token]);
  return isLoggedIn ? (
    <ThemeProvider theme={theme}>
      <Layout
        theme={theme}
        logOut={logOut}
        name={user.name}
        picture={user.picture}
        email={user.email}
      >
        <Component {...pageProps} />
      </Layout>
    </ThemeProvider>
  ) : (
    <ThemeProvider theme={theme}>
      <Login setIsLoggedIn={login} picture={user.picture} />
    </ThemeProvider>
  );
}

export default MyApp;
