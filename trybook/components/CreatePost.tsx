import React, { FunctionComponent, useEffect, useState } from "react";
import styles from "../styles/CreatePost.module.css";
import TextField from "@mui/material/TextField";
import AddIcon from "@mui/icons-material/Add";
import AddAPhotoIcon from "@mui/icons-material/AddAPhoto";
import Button from "@mui/material/Button";
import axios from "axios";
import { IUser } from "../pages/_app";
import { storage } from "../config/firebase";
import Image from "next/image";
import { LinearProgress, Typography } from "@mui/material";
import { v4 as uuidv4 } from "uuid";
import { postType } from "./Posts";

interface IProps {
  token: string | null;
}
const firestoreUrl = "http://localhost:4000/createpost";
const CreatePost: FunctionComponent<IUser & IProps> = ({
  name,
  email,
  picture,
  token,
}) => {
  const [postTitle, setPostTitle] = useState<string>("");
  const [url, setUrl] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [post, setPost] = useState<postType>({
    title: postTitle,
    image: "",
    author: name,
    authorImage: picture,
    comments: [],
    likes: [],
    id: uuidv4(),
  });

  // On input title change
  const handlePostTitleChange = (e: any) => {
    setPostTitle(e.target.value);
    setPost({ ...post, title: e.target.value });
  };
  // On image input change
  const handleImageChange = (e: any) => {
    if (e.target.files[0]) {
      const image = e.target.files[0];
      const uploadTask = storage.ref(`images/${image?.name}`).put(image);
      setLoading(true);
      uploadTask.on(
        "state_changed",
        (snapshot: any) => {},
        (error) => {
          alert(error);
        },
        () => {
          storage
            .ref("images")
            .child(image.name)
            .getDownloadURL()
            .then((url) => {
              setUrl(url);
              setPost({ ...post, image: url });
            });
        }
      );
    }
  };
  const handleCreatePostClick = async () => {
    if (postTitle) {
      await axios.post(firestoreUrl, post, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setPostTitle("");
      setUrl("");
    } else alert("Write something...");
  };
  useEffect(() => {
    if (url) setLoading(false);
  }, [url]);
  return (
    <div className={styles.createPostContainer}>
      <Typography variant="h4" className={styles.createPostTitle}>
        Create Post
      </Typography>
      <TextField
        id="outlined-basic"
        label="What's in your mind..."
        variant="outlined"
        className={styles.createPostInput}
        value={postTitle}
        autoComplete="off"
        onChange={handlePostTitleChange}
      />
      <div className={styles.buttonsDiv}>
        <input
          accept="image/*"
          className={styles.input}
          style={{ display: "none" }}
          id="raised-button-file"
          multiple
          type="file"
          onChange={handleImageChange}
        />
        <label htmlFor="raised-button-file" className={styles.inputLabel}>
          <Button
            variant="contained"
            component="span"
            className={styles.imageUploadButton}
          >
            <AddAPhotoIcon />
            <p>Upload</p>
          </Button>
        </label>
        <Button
          className={styles.createPostButton}
          variant="contained"
          onClick={handleCreatePostClick}
        >
          <AddIcon /> Create post
        </Button>
      </div>
      {!loading ? (
        <div className={styles.postImageDiv}>
          <Image
            src={
              url
                ? url
                : "https://cdn.pixabay.com/photo/2017/11/10/05/24/add-2935429_1280.png"
            }
            alt="post-image"
            width="450vw"
            height={url ? "400vh" : "100vh"}
            className={styles.postImage}
          />
        </div>
      ) : (
        <div className={styles.loadingDiv}>
          <LinearProgress className={styles.loadingBar} />
        </div>
      )}
    </div>
  );
};

export default CreatePost;
