import express from "express";
import { 
    signup, 
    login, 
    logout, 
    purchaseBook, 
    getMyBooks, 
    getAllAdminsData, 
    submitReview,
    deleteUser
} from "../controller/user.controller.js"; 

const router = express.Router();    

router.post("/signup", signup);
router.post("/login", login);
router.post("/logout", logout);

router.post("/purchase", purchaseBook);
router.get("/mybooks/:userId", getMyBooks);

router.post("/submit-review", submitReview); 
router.get("/admin-all-users", getAllAdminsData);
router.delete("/delete-user/:id", deleteUser);

export default router;
