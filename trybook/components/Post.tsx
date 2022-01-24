import React, { FunctionComponent, useState, useEffect } from "react";
import { postType } from "./Posts";
import Image from "next/image";
import styles from "../styles/Post.module.css";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import AddCommentIcon from "@mui/icons-material/AddComment";
import ScrollDialog from "./ScrollDialog";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import axios from "axios";
interface IProps {
  post: postType;
  name: string;
  picture: string | StaticImageData;
  token: string | null;
}
const theme = createTheme({
  palette: {
    secondary: {
      main: "#F8F0DF",
      light: "#F8F0DF",
      dark: "#F8F0DF",
      contrastText: "#F8F0DF",
    },
    primary: {
      main: "#79B4B7",
      light: "#F8F0DF",
      dark: "#F8F0DF",
      contrastText: "#F8F0DF",
    },
  },
});

const Post: FunctionComponent<IProps> = ({ post, name, picture, token }) => {
  const [postTitle, setPostTitle] = useState<string>("");
  const [isReadmore, setIsReadmore] = useState<boolean>(false);
  const [isLikesOpened, setIsLikesOpened] = useState<boolean>(false);
  const [isCommentsOpened, setIsCommentsOpened] = useState<boolean>(false);
  const [comment, setComment] = useState<string>("");
  const [IsPostLiked, setIsPostLiked] = useState<boolean>(false);
  const url = "http://localhost:4000/";

  const isPostLiked = async () => {
    await axios
      .get(url + "ispostliked", {
        headers: {
          authorization: "Bearer " + token,
        },
        params: {
          name,
          id: post.id,
        },
      })
      .then((result) => {
        setIsPostLiked(result.data);
      });
  };
  useEffect(() => {
    if (post.title.length > 160) {
      setPostTitle(post.title.slice(0, 160));
      setIsReadmore(true);
    } else setPostTitle(post.title);
    isPostLiked();
  }, []);
  const handleReadmoreClick = () => {
    setPostTitle(post.title);
    setIsReadmore(false);
  };
  const handleLikeButtonClick = () => {
    setIsLikesOpened(true);
  };
  const handleLikeClick = () => {
    post.likes.push({ name, image: picture });
    axios.post(
      url + "likepost",
      { name, id: post.id, postLikes: post.likes },
      {
        headers: {
          authorization: "Bearer " + token,
        },
      }
    );
    setIsPostLiked(true);
  };
  const handleUnlikeClick = () => {
    const tempArr = post.likes.filter((el: any) => el.name !== name);
    post.likes = [...tempArr];
    axios.post(
      url + "unlikepost",
      { id: post.id, postLikes: tempArr },
      {
        headers: {
          authorization: "Bearer " + token,
        },
      }
    );
    setIsPostLiked(false);
  };
  const handleCommentChange = (e: any) => {
    setComment(e.target.value);
  };
  const handleAddComment = () => {
    post.comments.push({ comment, user: { name, image: picture } });
    axios
      .post(
        url + "commentpost",
        {
          id: post.id,
          postComments: post.comments,
        },
        {
          headers: {
            authorization: "Bearer " + token,
          },
        }
      )
      .then(() => {
        setComment("");
      });
  };
  return (
    <ThemeProvider theme={theme}>
      <div className={styles.postDiv}>
        <div className={styles.authorDiv}>
          <Image
            src={post.authorImage}
            alt="author-image"
            width={50}
            height={50}
            className={styles.authorImage}
          />
          <h3 className={styles.postAuthor}>{post.author}</h3>
        </div>
        <p className={styles.postTitle}>
          {postTitle}
          {isReadmore && (
            <Button variant="text" onClick={handleReadmoreClick}>
              Readmore...
            </Button>
          )}
        </p>

        <Image
          className={styles.postImage}
          src={
            post?.image
              ? post.image
              : "https://cdn.pixabay.com/photo/2017/11/10/05/24/add-2935429_1280.png"
          }
          alt="post-image"
          width="450vw"
          height={post?.image ? "400vh" : "0"}
        />
        <div className={styles.howManyLikesAndCommentsDiv}>
          <Button variant="text" onClick={handleLikeButtonClick}>
            {post.likes.length} likes
          </Button>
          {isLikesOpened && post.likes.length !== 0 && (
            <ScrollDialog
              open={isLikesOpened}
              setOpen={setIsLikesOpened}
              likes={post.likes}
              comments={[]}
            />
          )}
          <Button
            variant="text"
            onClick={() => {
              setIsCommentsOpened(true);
            }}
          >
            {post.comments.length} comments
          </Button>
          {isCommentsOpened && post.comments.length !== 0 && (
            <ScrollDialog
              open={isCommentsOpened}
              setOpen={setIsCommentsOpened}
              likes={[]}
              comments={post.comments}
            />
          )}
        </div>
        <div className={styles.likesAndCommentsDiv}>
          {!IsPostLiked ? (
            <Button
              variant="outlined"
              className={styles.likeBtn}
              onClick={handleLikeClick}
            >
              <ThumbUpIcon />
            </Button>
          ) : (
            <Button
              variant="contained"
              className={styles.likeBtn}
              onClick={handleUnlikeClick}
            >
              <ThumbUpIcon />
            </Button>
          )}
          <div className={styles.commentDiv}>
            <TextField
              id="outlined-basic"
              label="Comment..."
              variant="outlined"
              value={comment}
              autoComplete="off"
              className={styles.commentInput}
              onChange={handleCommentChange}
            />
            <Button variant="outlined" onClick={handleAddComment}>
              <AddCommentIcon />
            </Button>
          </div>
        </div>
      </div>
    </ThemeProvider>
  );
};

export default Post;
