"use strict";
const admin = require("firebase-admin");
const serviceAccount = require("../trybook-f2afd-firebase-adminsdk-rvtnj-b726e37e6b.json");
import {
  getAuth,
  signInWithPopup,
  GoogleAuthProvider,
  OAuthCredential,
} from "firebase/auth";
import "firebase/auth";
require("dotenv").config();

const app = admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

export default admin;
