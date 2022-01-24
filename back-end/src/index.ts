import express, { Request, Response } from "express";
import middleware from "../middleware/index";
import db from "../database/firebase";
const cors = require("cors");

const app = express();
app.use(express.json());
app.use(cors());
app.use(middleware.decodeToken);
const PORT = process.env.PORT || 4000;
const firestore = db.firestore();

interface userInfo {
  name: string;
  image: string;
}
interface commentType {
  comment: string;
  user: userInfo;
}
interface postType {
  title: string;
  image: string;
  author: string;
  authorImage: string;
  comments: commentType[];
  likes: userInfo[];
}

app.get("/getuser", (req: any, res) => {
  res.send(req.user);
});
// On create post request
app.post("/createpost", (req: Request, res: Response) => {
  const { id } = req.body;
  firestore.collection("Posts").doc(id).set(req.body);
  res.send("post created successfully");
});
// Get all posts
app.get("/getposts", (req: Request, res: Response) => {
  firestore
    .collection("Posts")
    .get()
    .then((querySnapshot: any) => {
      let docsArray: postType[] = [];
      querySnapshot.forEach((doc: any) => {
        docsArray.push(doc.data());
      });
      res.send(docsArray);
    });
});
// On post like
app.post("/likepost", (req: Request, res: Response) => {
  const { name, id, postLikes } = req.body;

  firestore
    .collection("Posts")
    .doc(id)
    .get()
    .then((doc: any) => {
      if (doc.exists) {
        if (
          doc.data().likes.find((el: userInfo) => el.name === name) ===
          undefined
        ) {
          firestore
            .collection("Posts")
            .doc(id)
            .update({
              likes: [...postLikes],
            });
        }
      }
    });
});
// On unlike post
app.post("/unlikepost", (req: Request, res: Response) => {
  const { id, postLikes } = req.body;

  firestore
    .collection("Posts")
    .doc(id)
    .get()
    .then((doc: any) => {
      if (doc.exists) {
        firestore
          .collection("Posts")
          .doc(id)
          .update({
            likes: [...postLikes],
          });
      }
    });
});
// On adding comment on post
app.post("/commentpost", (req: Request, res: Response) => {
  const { id, postComments } = req.body;
  firestore
    .collection("Posts")
    .doc(id)
    .update({
      comments: [...postComments],
    })
    .then(() => {
      res.send("comment added");
    });
});
// Get answer if the post is liked
app.get("/ispostliked", (req: Request, res: Response) => {
  const { name, id } = req.query;
  firestore
    .collection("Posts")
    .doc(id)
    .get()
    .then((doc: any) => {
      if (doc.exists) {
        if (
          doc.data().likes.find((el: userInfo) => el.name === name) !==
          undefined
        ) {
          res.send(true);
        } else res.send(false);
      }
    });
});
app.listen(PORT, () => console.log(`App is up and running on port ${PORT}`));
