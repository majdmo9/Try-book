import firebase from "firebase/app";
import "firebase/auth";
import "firebase/storage";

require("dotenv").config();
//? actual values of firebaseConfig object in the .env file.
const firebaseConfig = {
  apiKey: process.env.API_KEY,
  authDomain: process.env.AUTH_DOMAIN,
  projectId: process.env.PROJECTID,
  storageBucket: process.env.STORAGE_BUCKET,
  messagingSenderId: process.env.MESSAGING_SENDER_ID,
  appId: process.env.APP_ID,
  measurementId: process.env.MEASUREMENT_ID,
};
// Initialize Firebase
if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}
const storage = firebase.storage();

export { storage, firebase as default };

// Login or sign up with google account
export const loginWithPopup = (setIsLoggedIn: () => void) => {
  const provider = new firebase.auth.GoogleAuthProvider();
  firebase
    .auth()
    .signInWithPopup(provider)
    .then(() => {
      setIsLoggedIn();
      window.localStorage.setItem("auth", "false");
    })
    .catch((error) => {
      alert(error.message);
      throw error;
    });
};
// Logout from our site
export const firebaseLogOut = (logOut: () => void) => {
  firebase
    .auth()
    .signOut()
    .then(() => {
      logOut();
      window.localStorage.setItem("auth", "false");
    })
    .catch((err: any) => console.log(err.message));
};
// Login with email and password
export const firebaseLoginWithEmailAndPassword = (
  setIsLoggedIn: () => void,
  userName: string,
  password: string
) => {
  firebase
    .auth()
    .signInWithEmailAndPassword(userName, password)
    .then(() => {
      setIsLoggedIn();
      window.localStorage.setItem("auth", "true");
    })
    .catch((err: any) => {
      alert("User name or password might be wrong!" + "\n" + err.message);
      throw err;
    });
};
interface IUser {
  username: string;
  password: string;
  verify: string;
}
// Register with email and password
export const firebaseRegisterWithEmailAndPassword = (
  setLoggedIn: () => void,
  user: IUser
) => {
  const { username, password, verify } = user;
  if (password === verify) {
    firebase
      .auth()
      .createUserWithEmailAndPassword(username, password)
      .then(() => {
        window.localStorage.setItem("auth", "true");
        setLoggedIn();
      })
      .catch((err: any) => {
        alert(err.message);
        throw err;
      });
  }
};
// Get logged in user
export const getLoggedInUser = (setIsLoggedIn: () => void) => {
  firebase.auth().onAuthStateChanged((user) => {
    if (user) {
      setIsLoggedIn();
      window.localStorage.setItem("auth", "true");
      user.getIdToken().then((token) => {
        window.localStorage.setItem("token", token);
      });
    }
  });
};
