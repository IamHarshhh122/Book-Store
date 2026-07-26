import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cors from "cors";
import reviewRoute from './route/review.route.js';
import userRoute from "./route/user.route.js";
import bookRoute from "./route/book.route.js"; 
import aiBookRoute from "./route/aiBook.route.js";

dotenv.config();
const app = express();

app.use(cors({
    origin: [
        "http://localhost:5173",
        "http://localhost:5174",
        "https://book-store-frontend-93kc.onrender.com"
    ],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true
}));

app.use(express.json());

const PORT = process.env.PORT || 4001;
const URI = process.env.MONGODB_URI;

app.get("/", (req, res) => {
    res.send("BookStore Backend Server is Running Smoothly!");
});

mongoose.connect(URI)
    .then(() => console.log("Connected to MongoDB Successfully"))
    .catch((error) => console.log("MongoDB Error: ", error));

app.use("/user", userRoute);
app.use("/books", bookRoute); 
app.use("/book", bookRoute); 
app.use("/review", reviewRoute);
app.use("/ai-books", aiBookRoute);

app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`);
});
