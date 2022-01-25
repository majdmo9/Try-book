import React, { useState } from "react";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import EditIcon from "@mui/icons-material/Edit";
import DoneIcon from "@mui/icons-material/Done";
import DeleteIcon from "@mui/icons-material/Delete";
import DialogTitle from "@mui/material/DialogTitle";
import { Button, TextField } from "@mui/material";
import styles from "../styles/ScrollDialog.module.css";
import { userInfo, commentType } from "./Posts";
import Image from "next/image";
import axios from "axios";

type likesGenericType = (userInfo | commentType)[];
interface IProps {
  open: boolean;
  setOpen: (open: boolean) => void;
  likes: userInfo[];
  comments: commentType[];
  token: string | null;
  postId: string;
  name: string;
  setPostComments: (comments: commentType[]) => void;
}
const url = "http://localhost:4000/";

const ScrollDialog: React.FunctionComponent<IProps> = ({
  open,
  setOpen,
  likes,
  comments,
  token,
  postId,
  name,
  setPostComments,
}) => {
  // const [postComments, setPostComments] = useState<commentType[]>(comments);
  const [edit, setEdit] = useState<boolean>(false);
  const [editedComment, setEditedComment] = useState<string>("");
  const handleClose = () => {
    setOpen(false);
  };

  const descriptionElementRef = React.useRef<HTMLElement>(null);
  React.useEffect(() => {
    if (open) {
      const { current: descriptionElement } = descriptionElementRef;
      if (descriptionElement !== null) {
        descriptionElement.focus();
      }
    }
  }, [open]);
  // Delete a specific comment
  const handleCommentDelete = (i: number) => {
    comments = comments.filter(
      (el: commentType) => el.comment.id !== comments[i].comment.id
    );
    setPostComments(comments);
    axios
      .put(
        url + "deletecomment",
        { comments, postId },
        {
          headers: {
            authorization: "Bearer " + token,
          },
        }
      )
      .then((res) => {
        console.log(res.data);
      });
  };
  const handleCommentEditChange = (e: any) => {
    setEditedComment(e.target.value);
  };
  const handleCommentEditDone = async (i: number) => {
    comments[i].comment.content = editedComment;

    await axios.put(
      url + "editcomment",
      { comments, postId },
      {
        headers: {
          authorization: "Bearer " + token,
        },
      }
    );
  };
  return (
    <div>
      <Dialog
        open={open}
        onClose={handleClose}
        scroll="paper"
        aria-labelledby="scroll-dialog-title"
        aria-describedby="scroll-dialog-description"
        className={styles.dialogContainer}
      >
        <DialogTitle className={styles.dialogTitle} id="scroll-dialog-title">
          {likes.length !== 0 ? "Likes" : "Comments"}
        </DialogTitle>
        <DialogContent
          dividers={true}
          ref={descriptionElementRef}
          tabIndex={-1}
        >
          <ul className={styles.likesList}>
            {likes.length !== 0
              ? likes.map((like, i) => (
                  <li key={i} className={styles.like}>
                    <div className={styles.imageDiv}>
                      <Image
                        className={styles.likeUserimage}
                        src={like?.image}
                        alt="user-image"
                        width={40}
                        height={40}
                      />
                    </div>

                    <p className={styles.likeUsername}>{like?.name}</p>
                  </li>
                ))
              : comments.map((comment, i) => (
                  <li key={i} className={styles.comment}>
                    <div className={styles.commentsContainer}>
                      <div className={styles.commentAuthor}>
                        <Image
                          src={comment?.user.image}
                          alt="user-image"
                          width={35}
                          height={35}
                        />
                        <p>
                          {comment.user.name.includes(" ")
                            ? comment?.user.name.slice(
                                0,
                                comment.user.name.indexOf(" ")
                              )
                            : comment.user.name}
                        </p>
                      </div>
                      <div>
                        {edit && name === comment.user.name ? (
                          <TextField
                            value={editedComment}
                            onChange={handleCommentEditChange}
                            variant="standard"
                          />
                        ) : (
                          <p className={styles.commentContent}>
                            {comment?.comment.content}
                          </p>
                        )}
                      </div>
                    </div>
                    {name === comment.user.name && (
                      <div className={styles.buttonsDiv}>
                        {!edit ? (
                          <Button
                            variant="contained"
                            onClick={() => {
                              setEdit(true);
                              setEditedComment(comment.comment.content);
                            }}
                          >
                            <EditIcon />
                          </Button>
                        ) : (
                          <Button
                            variant="contained"
                            onClick={() => {
                              handleCommentEditDone(i);
                              setEdit(false);
                            }}
                          >
                            <DoneIcon />
                          </Button>
                        )}
                        <Button
                          variant="contained"
                          onClick={() => handleCommentDelete(i)}
                        >
                          <DeleteIcon />
                        </Button>
                      </div>
                    )}
                  </li>
                ))}
          </ul>
        </DialogContent>
      </Dialog>
    </div>
  );
};
export default ScrollDialog;
