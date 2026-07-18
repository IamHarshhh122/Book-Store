import express from "express";
import axios from "axios";

const router = express.Router();

router.get("/search", async (req, res) => {
  try {
    const query = req.query.q;

    if (!query) {
      return res.status(400).json({
        success: false,
        message: "Query required",
      });
    }

    // -------------------------
    // GOOGLE BOOKS
    // -------------------------
    const googleRes = await axios.get(
      `https://www.googleapis.com/books/v1/volumes?q=${encodeURIComponent(
        query
      )}&maxResults=10`
    );

    const books = await Promise.all(
      (googleRes.data.items || []).map(async (book) => {
        const title = book.volumeInfo?.title || "Unknown Book";

        let pdfUrl = null;

        // -------------------------
        // OPEN LIBRARY SEARCH
        // -------------------------
        try {
          const openLibraryRes = await axios.get(
            `https://openlibrary.org/search.json?title=${encodeURIComponent(
              title
            )}&limit=1`
          );

          const doc = openLibraryRes.data?.docs?.[0];

          if (doc?.key) {
            pdfUrl = `https://openlibrary.org${doc.key}`;
          }
        } catch (err) {
          console.log("OpenLibrary Error:", err.message);
        }

        // -------------------------
        // INTERNET ARCHIVE SEARCH
        // -------------------------
        if (!pdfUrl) {
          try {
            const archiveRes = await axios.get(
              `https://archive.org/advancedsearch.php?q=${encodeURIComponent(
                title
              )}&fl[]=identifier&rows=1&page=1&output=json`
            );

            const identifier =
              archiveRes.data?.response?.docs?.[0]?.identifier;

            if (identifier) {
              pdfUrl = `https://archive.org/details/${identifier}`;
            }
          } catch (err) {
            console.log("Archive Error:", err.message);
          }
        }

        return {
          _id: book.id,

          name: title,

          image:
            book.volumeInfo?.imageLinks?.thumbnail ||
            "https://via.placeholder.com/300",

          pdfUrl,

          previewLink:
            book.volumeInfo?.previewLink || null,

          amazonUrl: `https://www.amazon.in/s?k=${encodeURIComponent(
            title
          )}`,

          authors:
            book.volumeInfo?.authors || [],

          description:
            book.volumeInfo?.description || "",

          source: "combined",
        };
      })
    );

    res.json({
      success: true,
      books,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Search failed",
    });
  }
});

export default router;