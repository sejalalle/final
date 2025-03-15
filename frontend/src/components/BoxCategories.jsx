import React from "react";

function BoxCategories() {
  return (
    <section className="py-20 mt-0 bg-gray-0 relative">
      {/* Wavy Background */}
      <div className="relative">
        <svg
          className="absolute top-0 left-0 w-full"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 1440 320"
        >
          <path
            fill="#fce4ec"
            fillOpacity="1"
            d="M0,96L80,112C160,128,320,160,480,181.3C640,203,800,213,960,208C1120,203,1280,181,1360,170.7L1440,160L1440,320L1360,320C1280,320,1120,320,960,320C800,320,640,320,480,320C320,320,160,320,80,320L0,320Z"
          ></path>
        </svg>
      </div>

      {/* Title */}
      <h2 className="text-center relative z-10 mt-20 text-4xl font-bold text-gray-800">
        YOUR CUSTOM PACKAGING PARTNER
      </h2>
      <p className="text-center mt-4 relative z-10 text-gray-600 text-lg">
        We provide the best packaging solutions...
      </p>

      {/* Categories Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-16 px-4 relative z-10">
        {/* Cards */}
        {[
          {
            src: "/images/categories/Folding_cartons.jpeg",
            label: "Folding Cartons",
          },
          { src: "/images/categories/Gable_top.jpeg", label: "Gable Top" },
          { src: "/images/categories/specialty.jpeg", label: "Specialty" },
          { src: "/images/categories/Litholam.jpeg", label: "Litholam" },
          { src: "/images/categories/rigid.jpeg", label: "Rigid" },
          { src: "/images/categories/box6.webp", label: "Canister" },
          { src: "/images/categories/box7.webp", label: "Paper Rod" },
          {
            src: "https://parksonspackaging.com/wp-content/uploads/2023/10/Single_multi-unit-packs.jpg",
            label: "Single/Multi packs",
          },
          {
            src: "https://parksonspackaging.com/wp-content/uploads/2023/12/Paper-Pod-scaled.jpg",
            label: "Eco Packaging",
          },
        ].map((item, index) => (
          <div
            key={index}
            className="relative flex flex-col items-center group transform transition-all duration-500 hover:scale-105"
          >
            <div className="w-64 h-64 bg-gradient-to-br from-purple-200 to-purple-400 rounded-full flex items-center justify-center shadow-lg group-hover:shadow-2xl group-hover:rotate-3 transition-all duration-500">
              <img
                src={item.src}
                alt={item.label}
                className="w-56 h-56 object-cover rounded-full group-hover:opacity-90 group-hover:scale-110 transition-all duration-500"
              />
            </div>
            <h3 className="text-center mt-4 font-semibold text-gray-800 group-hover:text-pink-600 transition-all duration-300">
              {item.label}
            </h3>
          </div>
        ))}
      </div>

      {/* Diagonal Divider Section */}
      <div className="relative mt-20">
        <svg
          className="absolute top-0 left-0 w-full"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 1440 320"
        >
          <path
            fill="#e1f5fe"
            fillOpacity="1"
            d="M0,128L80,144C160,160,320,192,480,186.7C640,181,800,139,960,128C1120,117,1280,139,1360,150.7L1440,160L1440,320L1360,320C1280,320,1120,320,960,320C800,320,640,320,480,320C320,320,160,320,80,320L0,320Z"
          ></path>
        </svg>

        <div className="relative py-20 bg-blue-50">
          <h2 className="text-center text-3xl font-bold text-gray-700">
            UNIQUE SOLUTIONS, TAILORED FOR YOU
          </h2>
          <p className="text-center mt-4 text-lg text-gray-600">
            We specialize in innovative designs that set you apart.
          </p>
          <div className="mt-8 flex justify-center">
            <button className="px-8 py-3 bg-pink-500 text-white font-semibold rounded-lg shadow-lg hover:bg-pink-600 transition">
              Learn More
            </button>
          </div>
        </div>
      </div>
      {/* Enhanced Statistics Section with Advanced Design */}
<div className="bg-gradient-to-br from-blue-50 via-indigo-50 to-pink-50 py-24 mt-16 relative overflow-hidden">
  {/* Animated Decorative Background Elements */}
  <div className="absolute top-0 left-0 w-96 h-96 bg-pink-100 opacity-40 rounded-full blur-2xl transform -translate-x-1/3 -translate-y-1/3 animate-pulse"></div>
  <div className="absolute bottom-0 right-0 w-96 h-96 bg-blue-100 opacity-40 rounded-full blur-2xl transform translate-x-1/3 translate-y-1/3 animate-pulse" style={{ animationDelay: "2s" }}></div>
  <div className="absolute top-1/2 right-1/4 w-64 h-64 bg-purple-100 opacity-30 rounded-full blur-xl transform -translate-y-1/2 animate-pulse" style={{ animationDelay: "1s" }}></div>
  
  {/* Subtle Pattern Overlay */}
  <div className="absolute inset-0 opacity-10" style={{
    backgroundImage: "radial-gradient(circle, #6366f1 1px, transparent 1px)",
    backgroundSize: "30px 30px"
  }}></div>

  <div className="relative z-10 max-w-7xl mx-auto px-6">
    {/* Enhanced Title Section */}
    <div className="text-center mb-16">
      <h2 className="text-5xl font-bold text-center text-gray-800 relative inline-block">
        Why Choose Us?
        <span className="absolute -bottom-3 left-0 w-full h-1 bg-gradient-to-r from-pink-400 to-indigo-500 rounded-full"></span>
      </h2>
      <p className="text-center mt-6 text-gray-600 text-xl max-w-3xl mx-auto leading-relaxed">
        Trusted by businesses worldwide, we deliver excellence and innovation in every solution.
      </p>
    </div>

    {/* Statistics Cards with Enhanced Design */}
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 mt-12 text-center">
      {[
        { 
          number: "30+", 
          label: "Years of Experience",
          icon: "⏳"
        },
        { 
          number: "500+", 
          label: "Clients Served",
          icon: "🤝"
        },
        { 
          number: "10M+", 
          label: "Eco-Friendly Products Delivered",
          icon: "🌱"
        },
        { 
          number: "100%", 
          label: "Sustainable Packaging Solutions",
          icon: "♻️"
        },
      ].map((stat, index) => (
        <div
          key={index}
          className="relative group bg-white bg-opacity-80 backdrop-filter backdrop-blur-sm rounded-2xl shadow-lg p-10 hover:shadow-2xl transform transition-all duration-500 hover:-translate-y-2 border border-gray-100"
        >
          {/* Top Accent Bar */}
          <div className="absolute top-0 left-0 right-0 h-2 bg-gradient-to-r from-indigo-500 to-pink-500 rounded-t-2xl transform origin-left transition-all duration-500 group-hover:scale-x-100"></div>
          
          {/* Circular Icon Element */}
          <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 flex items-center justify-center w-16 h-16 bg-gradient-to-br from-indigo-500 to-pink-400 rounded-full shadow-lg group-hover:rotate-12 transition-all duration-500">
            <span className="text-white text-2xl">{stat.icon}</span>
          </div>

          {/* Number with Animation */}
          <h3 className="text-5xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-indigo-500 to-pink-400 transition duration-300 mt-6 group-hover:scale-110 transform">
            {stat.number}
          </h3>

          {/* Label with Enhanced Typography */}
          <p className="text-lg font-medium text-gray-700 mt-3 group-hover:text-gray-900 transition duration-300">
            {stat.label}
          </p>
        </div>
      ))}
    </div>

    {/* Enhanced Call-to-Action */}
    <div className="mt-16 flex justify-center">
      <button className="px-10 py-4 bg-gradient-to-r from-indigo-500 to-pink-400 text-white font-semibold text-lg rounded-full shadow-xl hover:shadow-2xl transform transition-all duration-300 hover:-translate-y-1 focus:outline-none focus:ring-2 focus:ring-pink-400 focus:ring-opacity-50">
        Explore Our Solutions
        <span className="ml-2">→</span>
      </button>
    </div>
  </div>
</div>
 {/* Mission, Vision, and Values Section */}
<div className="max-w-7xl mx-auto px-6">
  <h2 className="text-center text-4xl font-bold text-gray-800 mb-12 mt-40">
    Our Mission, Vision, and Values
  </h2>
  
  {/* Grid Container */}
  <div className="grid grid-cols-1 md:grid-cols-3 gap-10 max-w-7xl">
    {[
      {
        title: "MISSION",
        backgroundImage: "url('https://t4.ftcdn.net/jpg/05/12/63/47/360_F_512634787_zQMiBUWKSwbG6wFeXjQSGVfXSRtT4CwQ.jpg')",
        content:
          "Our mission is to provide high-quality, sustainable, and innovative packaging solutions tailored to our customers' needs.",
        icon: "\u{1F4AC}", // 💬 Speech Balloon
      },
      {
        title: "VISION",
        backgroundImage: "url('https://www.creativefabrica.com/wp-content/uploads/2021/11/27/Pure-Red-Watercolor-Background-Graphics-20858011-1-1-580x387.jpg')",
        content:
          "Our vision is to become the global leader in eco-friendly packaging, setting industry standards for innovation and sustainability.",
        icon: "\u{1F50D}", // 🔍 Magnifying Glass
      },
      {
        title: "VALUES",
        backgroundImage: "url('https://t4.ftcdn.net/jpg/05/41/22/89/360_F_541228984_HZuJBpSlGDvgEixl4lINXRb1uuJWdh6G.jpg')",
        content:
          "We value integrity, customer satisfaction, and environmental responsibility in every step of our production and service.",
        icon: "\u{1F48E}", // 💎 Diamond
      },
    ].map((item, index) => (
      <div
        key={index}
        className="relative bg-white shadow-lg rounded-lg overflow-hidden transition-transform duration-300 ease-in-out hover:shadow-2xl hover:-translate-y-2"
      >
        {/* Top Section with Background Image - No Shadow Overlay */}
        <div 
          className="h-52 flex justify-center items-center relative" 
          style={{
            backgroundImage: item.backgroundImage,
            backgroundSize: 'cover',
            backgroundPosition: 'center'
          }}
        >
          {/* Title with text shadow for readability without background overlay */}
          <h3 className="text-white text-2xl font-bold relative z-10 text-shadow"
              style={{ textShadow: "1px 1px 3px rgba(0,0,0,0.7)" }}>
            {item.title}
          </h3>
          
          {/* Hexagon with Icon */}
          <div
            className="absolute -bottom-10 flex items-center justify-center text-4xl font-bold text-gray-800 shadow-lg"
            style={{
              width: "90px",
              height: "78px",
              clipPath: "polygon(25% 0%, 75% 0%, 100% 50%, 75% 100%, 25% 100%, 0% 50%)",
              backgroundColor: "white",
            }}
          >
            <span>{item.icon}</span>
          </div>
        </div>

        {/* Content Section */}
        <div className="px-6 py-12 pt-16">
          <p className="text-gray-700 text-center">{item.content}</p>
        </div>
      </div>
    ))}
  </div>
</div>
    </section>
  );
}

export default BoxCategories;