import React, { FunctionComponent, useState, useEffect } from "react";
import Post from "./Post";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { IUser } from "../pages/_app";
import axios from "axios";
import styles from "../styles/Posts.module.css";
import CreatePost from "./CreatePost";
import userImage from "../images/user-image.png";
export interface userInfo {
  name: string;
  image: StaticImageData | string;
}
export interface commentType {
  comment: string;
  user: userInfo;
}
export interface postType {
  title: string;
  image: string | StaticImageData;
  author: string;
  authorImage: StaticImageData | string;
  comments: commentType[];
  likes: userInfo[];
  id: string;
}

const theme = createTheme({
  palette: {
    secondary: {
      main: "#F8F0DF",
      light: "#F8F0DF",
    },
    primary: {
      main: "#79B4B7",
      light: "#79B4B7",
    },
  },
});

const url = "http://localhost:4000/";
const Posts: FunctionComponent = () => {
  const [token, setToken] = useState<string | null>("");
  const [user, setUser] = useState<IUser>({
    name: "",
    email: "",
    picture: "",
  });

  const getUser = async (token: string | null) => {
    const result = await axios.get(url + "getuser", {
      headers: {
        authorization: "Bearer " + token,
      },
    });
    if (result) {
      let { name, picture, email } = result.data;
      if (picture === undefined) picture = userImage;
      if (name === undefined) name = email?.slice(0, email.indexOf("@"));
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

  const [posts, setPosts] = useState<postType[]>([]);

  const getAllPosts = async () => {
    const result = await axios.get(url + "getposts", {
      headers: {
        authorization: "Bearer " + token,
      },
    });
    if (result.data) {
      setPosts(result.data);
    }
  };
  useEffect(() => {
    if (user.picture !== "") {
      getAllPosts();
    }
  }, [user]);

  return (
    <div className={styles.postsContainer}>
      <ThemeProvider theme={theme}>
        {user.name !== "" && (
          <CreatePost
            name={user && user?.name}
            picture={user && user?.picture}
            email={user && user?.email}
            token={token}
          />
        )}
      </ThemeProvider>
      {posts.map((post, i) => (
        <Post
          key={i}
          post={post}
          name={user.name}
          picture={user.picture}
          token={token}
        />
      ))}
    </div>
  );
};

export default Posts;
