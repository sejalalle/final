import React from "react";
import "./Sliderr.css";

function Slider() {
  return (
    <div className="relative slider-container py-16">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-gradient-to-b from-indigo-50 to-blue-100 overflow-hidden">
        {/* Animated background circles */}
        <div className="floating-circle" style={{ 
          top: '15%', 
          left: '10%', 
          width: '300px', 
          height: '300px', 
          background: 'radial-gradient(circle, rgba(99, 102, 241, 0.15) 0%, rgba(99, 102, 241, 0) 70%)'
        }}></div>
        <div className="floating-circle" style={{ 
          top: '60%', 
          right: '15%', 
          width: '250px', 
          height: '250px', 
          background: 'radial-gradient(circle, rgba(96, 165, 250, 0.2) 0%, rgba(96, 165, 250, 0) 70%)'
        }}></div>
        <div className="floating-circle delay" style={{ 
          top: '40%', 
          right: '30%', 
          width: '200px', 
          height: '200px', 
          background: 'radial-gradient(circle, rgba(139, 92, 246, 0.15) 0%, rgba(139, 92, 246, 0) 70%)'
        }}></div>
        
        {/* Background dot pattern */}
        <div className="absolute inset-0 opacity-10" style={{
          backgroundImage: "radial-gradient(circle, #4338ca 1px, transparent 1px)",
          backgroundSize: "20px 20px"
        }}></div>
      </div>

      {/* Content Container */}
      <div className="relative z-10 max-w-7xl mx-auto px-4">
        {/* Title Section with enhanced styling */}
        <div className="mb-16">
          <div className="text-center text-4xl font-bold text-indigo-900">
            Our Special Partners
          </div>
          <div className="w-24 h-1 bg-indigo-500 mx-auto mt-4 rounded-full"></div>
        </div>

        {/* Slider Section */}
        <div className="overflow-hidden py-10 px-4 bg-white bg-opacity-70 rounded-xl shadow-lg">
          {/* First Marquee (original) */}
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
    </div>
  );
}

export default Slider;
