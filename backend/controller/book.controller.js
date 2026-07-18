import Book from "../model/book.js";

export const getBook = async (req, res) => {
    try {
        const book = await Book.find();
        res.status(200).json(book);
    } catch (error) {
        console.log("Error:", error);
        res.status(500).json({ error });
    }
};

export const addBook = async (req, res) => {
    try {
        const { name, price, category, image, pdfUrl } = req.body;
        
        const adminKey = req.headers['admin-secret-key'];
        
        const MY_SECRET_KEY = "Harsh@7217"; 

        if (adminKey !== MY_SECRET_KEY) {
            return res.status(403).json({ 
                message: "Access Denied: Chabi galat hai, upload nahi hoga!" 
            });
        }

        const newBook = new Book({
            name,
            price,
            category: category || "Paid",
            image,
            pdfUrl
        });

        await newBook.save();
        res.status(201).json({ message: "Bhai, Kitaab successfully save ho gayi! 🔥" });

    } catch (error) {
        console.log("Upload Error:", error);
        res.status(500).json({ message: "Backend error: Data save nahi ho paya." });
    }
};