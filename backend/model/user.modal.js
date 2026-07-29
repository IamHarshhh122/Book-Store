import mongoose from "mongoose";

const userSchema = mongoose.Schema({
    fullname: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
   
    role: { 
        type: String, 
        enum: ["user", "admin"], 
        default: "user" 
    },
    lastLogin: { type: Date },
    lastLogout: { type: Date },
    reviews: [
        {
            name: { type: String },
            message: { type: String }, 
            bookName: { type: String }, 
            rating: { type: Number },
            date: { type: Date, default: Date.now },
            lastLogin: { type: Date },
            lastLogout: { type: Date }
        }
    ],
    purchaseHistory: [
        {
            bookId: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Book" 
            },
            date: { type: Date, default: Date.now }
        }
    ]
}, { timestamps: true });

const User = mongoose.models.User || mongoose.model("User", userSchema);

export default User;
