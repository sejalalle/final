import React, { useEffect, useState } from "react";
import Slider from "react-slick";
import { motion } from "framer-motion";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

function VideoSection() {
  const imagesSlider1 = [
    "https://ph-prod.imgix.net/wp-content/uploads/2024/04/17085426/hp_5.png",
    "https://ph-prod.imgix.net/wp-content/uploads/2024/04/17085528/hp_8.png",
    "https://ph-prod.imgix.net/wp-content/uploads/2024/04/17085345/hp_2.png",
    "https://ph-prod.imgix.net/wp-content/uploads/2024/04/17085112/hp_12.png",
    "https://i.pinimg.com/736x/3f/e8/86/3fe88642efeac21b5633fdf6960283cc.jpg",
    "https://i.pinimg.com/736x/a2/b3/46/a2b346f62a1dc0c9171f1d7072a3121c.jpg",
  ];

  const imagesSlider2 = [
    "https://i.pinimg.com/736x/54/67/b3/5467b3a62ffdd143b2ca1e1c8a6f8892.jpg",
    "https://i.pinimg.com/736x/8f/b9/a8/8fb9a8ec17d5b1f45f64675892005446.jpg",
    "https://i.pinimg.com/736x/db/e0/83/dbe083186cc2d6964c4b42c23be6c181.jpg",
    "https://i.pinimg.com/736x/08/70/32/0870329b2fd8049779f9394e98ca7733.jpg",
    "https://i.pinimg.com/736x/db/e0/83/dbe083186cc2d6964c4b42c23be6c181.jpg",
    "https://i.pinimg.com/736x/92/65/c5/9265c5afc9bfc2cace2798260ad370c1.jpg",
  ];

  const sliderSettings = {
    dots: false,
    infinite: true,
    speed: 3000,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
    vertical: true,
    verticalSwiping: true,
    autoplay: true,
    autoplaySpeed: 0,
    cssEase: "linear",
  };

  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.5 }
    );

    const element = document.getElementById("fade-in-text");
    if (element) {
      observer.observe(element);
    }

    return () => observer.disconnect();
  }, []);

  const words = ["Innovative", "and", "Sustainable", "Packaging", "Solutions"];

  return (
    <div className="h-screen bg-white flex flex-col md:flex-row overflow-hidden">
      <style>{`
        .slick-list {
          height: 100% !important;
        }
        .slick-track {
          height: 100% !important;
        }
        .slick-slide {
          display: flex !important;
          align-items: center;
          height: 100%;
        }
        .slick-slider {
          z-index: 10;
        }
        @media (max-width: 768px) {
          .mobile-slider-container {
            height: 70vh !important;
          }
          .mobile-text-container {
            height: 30vh !important;
          }
        }
      `}</style>

      {/* Left Side - Animated Text */}
      <div
        id="fade-in-text"
        className={`mobile-text-container w-full md:w-1/3 flex flex-col justify-center pl-10 pr-10 transition-opacity ${
          isVisible ? "opacity-100" : "opacity-0"
        }`}
      >
        <h1 className="text-4xl md:text-6xl font-extrabold text-gray-900 leading-tight">
          {words.map((word, index) => (
            <motion.span
              key={index}
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.5, duration: 0.6, ease: "easeOut" }}
              className="inline-block mr-2"
            >
              {word}
            </motion.span>
          ))}
        </h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: words.length * 0.5, duration: 0.6 }}
          className="text-lg md:text-2xl text-gray-700 leading-relaxed mt-4"
        >
          As India's foremost Packaging Solutions provider, we innovate for a
          more sustainable future.
        </motion.p>
      </div>

      {/* Right Side - Two Vertical Sliders */}
      <div className="mobile-slider-container w-full md:w-2/3 flex flex-row px-4 md:px-10">
        {/* First Slider */}
        <div className="w-1/2 h-full">
          <Slider {...sliderSettings}>
            {imagesSlider1.map((image, index) => (
              <div key={index} className="h-full">
                <img
                  src={image}
                  alt={`Image Slider 1 - ${index + 1}`}
                  className="w-full h-full object-cover"
                />
              </div>
            ))}
          </Slider>
        </div>

        {/* Second Slider */}
        <div className="w-1/2 h-full">
          <Slider {...sliderSettings}>
            {imagesSlider2.map((image, index) => (
              <div key={index} className="h-full">
                <img
                  src={image}
                  alt={`Image Slider 2 - ${index + 1}`}
                  className="w-full h-full object-cover"
                />
              </div>
            ))}
          </Slider>
        </div>
      </div>
    </div>
  );
}

export default VideoSection;
