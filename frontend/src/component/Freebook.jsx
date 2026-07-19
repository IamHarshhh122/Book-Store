import React, { useState, useEffect } from "react";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import axios from "axios";
import Slider from "react-slick";
import Cards from "../Free/Card";

const Freebook = () => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getBooks = async () => {
      try {
        setLoading(true);
        
        const res = await axios.get("https://bobook-store-backend.onrender.com/book");
        
        const rawBooks = Array.isArray(res.data) ? res.data : (res.data.book || []);
        const freeBooks = rawBook.filter((data) => data.category === "Free");
        
        setBooks(freeBook);
        setLoading(false);
      } catch (error) {
        console.log("Error Fetching Free Books:", error);
        setLoading(false);
      }
    };
    getBooks();
  }, []);

  const settings = {
    dots: true,
    infinite: book.length > 3,
    speed: 800,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    pauseOnHover: true,
    cssEase: "linear",
    responsive: [
      {
        breakpoint: 1024,
        settings: { slidesToShow: 2, slidesToScroll: 1 },
      },
      {
        breakpoint: 640,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          arrows: false,
          centerMode: true,
          centerPadding: "20px",
        },
      },
    ],
  };

  return (
    <div className="relative z-20 bg-white dark:bg-slate-950 h-auto pt-10 pb-20 overflow-hidden mt-[-1px] transition-colors duration-500">
      <div
        className="absolute inset-0 opacity-20 dark:opacity-10 pointer-events-none"
        style={{
          backgroundImage: "radial-gradient(#94a3b8 1px, transparent 1px)",
          backgroundSize: "40px 40px",
        }}
      />

      <style>{`
        .slick-list { margin: 0 -12px; padding-bottom: 20px !important; }
        .slick-slide > div { padding: 0 12px; }
        .slick-dots { bottom: -15px !important; }
        .slick-prev:before, .slick-next:before {
          color: #db2777 !important;
          font-size: 24px;
        }
        .slick-dots li button:before {
          color: #db2777 !important;
        }
      `}</style>

      <div className="relative z-30 max-w-screen-2xl mx-auto px-6 md:px-20">
        <div className="space-y-2 mb-10">
          <h1 className="text-2xl md:text-4xl font-extrabold text-indigo-900 dark:text-pink-500">
            Knowledge is <span className="text-pink-600 font-black">Free Forever</span> 🎁
          </h1>
          <p className="text-slate-600 dark:text-slate-400 text-sm md:text-base italic font-medium">
            The best investment you'll ever make doesn't cost a rupee.
          </p>
        </div>

        {loading ? (
          <div className="flex justify-center items-center py-10">
            <span className="loading loading-spinner loading-lg text-pink-600"></span>
          </div>
        ) : (
          <div className="slider-container">
            {books.length > 0 ? (
              <Slider {...settings}>
                {books.map((item) => (
                  <Cards key={item._id || item.id} item={item} />
                ))}
              </Slider>
            ) : (
              <p className="text-center text-gray-500 py-10 italic font-bold">
                Something is wrong check ur backend or console
              </p>
            )}
          </div>
        )}
      </div>
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[80%] h-[150px] bg-pink-600/5 blur-[120px] pointer-events-none"></div>
    </div>
  );
};

export default Freebook;
