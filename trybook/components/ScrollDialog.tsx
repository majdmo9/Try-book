import * as React from "react";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { Typography } from "@mui/material";
import styles from "../styles/ScrollDialog.module.css";
import { userInfo, commentType } from "./Posts";
import Image from "next/image";

type likesGenericType = (userInfo | commentType)[];
interface IProps {
  open: boolean;
  setOpen: (open: boolean) => void;
  likes: userInfo[];
  comments: commentType[];
}
const ScrollDialog: React.FunctionComponent<IProps> = ({
  open,
  setOpen,
  likes,
  comments,
}) => {
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
          {/* <DialogContentText
            id="scroll-dialog-description"
          
          > */}
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
                          width={40}
                          height={40}
                        />
                        <p>{comment?.user.name}</p>
                      </div>
                      <div>
                        <p className={styles.commentContent}>
                          {comment?.comment}
                        </p>
                      </div>
                    </div>
                  </li>
                ))}
          </ul>
          {/* </DialogContentText> */}
        </DialogContent>
      </Dialog>
    </div>
  );
};
export default ScrollDialog;
