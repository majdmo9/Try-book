"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
const express = require("express");
const cors = require("cors");
const db = require("../database/firebase");
const app = express();
app.use(express.json());
app.use(cors);
const PORT = process.env.PORT || 4000;
app.post("/login", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const data = { name: "majd" };
    //   const posts = db.collection("Posts");
    yield db.add({ data });
    res.send({ msg: "User added successfully." });
}));
app.listen(PORT, () => console.log(`App is up and running on port ${PORT}`));
