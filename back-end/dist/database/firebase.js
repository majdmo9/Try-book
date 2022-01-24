"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const admin = require("firebase-admin");
const serviceAccount = require("../trybook-f2afd-firebase-adminsdk-rvtnj-b726e37e6b.json");
require("dotenv").config();
const firebase = require("firebase");
admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
});
const firebaseConfig = {
    apiKey: process.env.APIKEY,
    authDomain: process.env.AUTHDOMAIN,
    projectId: process.env.PROJECTID,
    storageBucket: process.env.STORAGEBUCKET,
    messagingSenderId: process.env.MESSAGINGSENDERID,
    appId: process.env.APPID,
    measurementId: process.env.MEASUREMENTID,
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
const db = admin.firestore();
const posts = db.collection("Posts");
module.exports = posts;
