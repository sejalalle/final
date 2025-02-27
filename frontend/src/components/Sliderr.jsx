import React from "react";
import "./Sliderr.css"; // Move the styles to a separate CSS file

function Slider() {
  return (
    <div className="relative">
      {/* Title Section */}
      <div className="relative">
        <div className="text-center relative z-10 mt-20 text-4xl font-bold text-gray-800">
          Our Special Partners
        </div>
      </div>

      {/* Slider Section */}
      <div className="mt-10 overflow-hidden bg-blue-50 py-6">
        <div className="flex items-center justify-center gap-6 animate-marquee">
          {[
            { src: "/images/image1.jpg", alt: "Logo 1" },
            { src: "/images/image2.jpg", alt: "Logo 2" },
            { src: "/images/image3.webp", alt: "Logo 3" },
            { src: "/images/image4.png", alt: "Logo 4" },
            { src: "/images/image5.jpg", alt: "Logo 5" },
            { src: "/images/image6.png", alt: "Logo 6" },
            { src: "/images/image7.jpg", alt: "Logo 7" },
            { src: "/images/image8.png", alt: "Logo 8" },
            { src: "/images/image9.jpg", alt: "Logo 9" },
            { src: "/images/image10.png", alt: "Logo 10" },
            { src: "/images/image11.jpg", alt: "Logo 11" },
            { src: "/images/image12.jpg", alt: "Logo 12" },
            { src: "/images/image13.png", alt: "Logo 13" },
            { src: "/images/image14.jpg", alt: "Logo 14" },
          ].map((image, index) => (
            <img
              key={index}
              src={image.src}
              alt={image.alt}
              className="h-20 sm:h-24 object-contain mx-4 transition-transform duration-500 hover:scale-110"
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default Slider;
