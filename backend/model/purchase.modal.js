import mongoose from "mongoose";

const purchaseSchema = mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User", 
        required: true,
    },
    bookId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Book",
        required: true,
    },
    purchaseDate: {
        type: Date,
        default: Date.now,
    },
});

const Purchase = mongoose.model("Purchase", purchaseSchema);
export default Purchase;