import express from "express";
import { postReview } from "../controller/review.controller.js";

const router = express.Router();
router.post("/contact", postReview); 
export default router;