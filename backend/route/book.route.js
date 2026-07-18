import express from "express";
import {getBook,addBook} from "../controller/book.controller.js";
import e from "express";

const router = express.Router();    
router.get("/", getBook);
router.post("/add", addBook);
export default router;