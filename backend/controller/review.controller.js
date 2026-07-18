import User from "../model/user.modal.js"; 

export const postReview = async (req, res) => {
    try {
        const { name, message, rating, email,bookname } = req.body;

        if (!email || !message || rating === undefined) {
            return res.status(400).json({ message: "Bhai, details adhuri hain!" });
        }

        const updatedUser = await User.findOneAndUpdate(
            { email: email }, 
            { 
                $push: { 
                    reviews: { 
                        name: name || "Anonymous", 
                        bookName:message,
                        message: message, 
                        rating: Number(rating), 
                        date: new Date() 
                    } 
                } 
            },
            { new: true }
        );

        if (!updatedUser) {
            return res.status(404).json({ message: "User nahi mila!" });
        }

        return res.status(201).json({ 
            message: "Review saved successfully!", 
            reviews: updatedUser.reviews 
        });

    } catch (error) {
        console.log("Backend Error: " + error.message);
        return res.status(500).json({ message: "Server Error" });
    }
};