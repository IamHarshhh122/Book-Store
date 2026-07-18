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

app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 4001;
const URI = process.env.MONGODB_URI;

mongoose.connect(URI)
    .then(() => console.log("Connected to MongoDB"))
    .catch((error) => console.log("MongoDB Error: ", error));

app.use("/user", userRoute);
app.use("/books", bookRoute); 
app.use("/book", bookRoute); 
app.use("/review", reviewRoute);
app.use("/ai-books", aiBookRoute);

app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`);
});