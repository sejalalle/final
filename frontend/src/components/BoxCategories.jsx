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
      {/* Enhanced Statistics Section */}
<div className="bg-gradient-to-r from-blue-50 to-pink-50 py-20 mt-16 relative overflow-hidden">
  {/* Decorative Background Elements */}
  <div className="absolute top-0 left-0 w-80 h-80 bg-pink-100 opacity-30 rounded-full transform -translate-x-1/3 -translate-y-1/3"></div>
  <div className="absolute bottom-0 right-0 w-80 h-80 bg-blue-100 opacity-30 rounded-full transform translate-x-1/3 translate-y-1/3"></div>

  <div className="relative z-10 max-w-7xl mx-auto px-6">
    {/* Title */}
    <h2 className="text-4xl font-bold text-center text-gray-800">
      Why Choose Us?
    </h2>
    <p className="text-center mt-4 text-gray-600 text-lg">
      Trusted by businesses worldwide, we deliver excellence and innovation in every solution.
    </p>

    {/* Statistics Cards */}
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mt-12 text-center">
      {[
        { number: "30+", label: "Years of Experience" },
        { number: "500+", label: "Clients Served" },
        { number: "10M+", label: "Eco-Friendly Products Delivered" },
        { number: "100%", label: "Sustainable Packaging Solutions" },
      ].map((stat, index) => (
        <div
          key={index}
          className="relative group bg-white rounded-2xl shadow-md p-8 hover:shadow-xl transform transition-all duration-500 hover:scale-105"
        >
          {/* Circular Accent Element */}
          <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 flex items-center justify-center w-16 h-16 bg-gradient-to-r from-purple-600 to-pink-400 rounded-full shadow-md">
            <span className="text-white text-2xl font-bold">{index + 1}</span>
          </div>

          {/* Number */}
          <h3 className="text-5xl font-extrabold text-indigo-600 group-hover:text-pink-600 transition duration-300 mt-6">
            {stat.number}
          </h3>

          {/* Label */}
          <p className="text-lg font-medium text-gray-700 mt-3 group-hover:text-gray-900 transition duration-300">
            {stat.label}
          </p>
        </div>
      ))}
    </div>

    {/* Call-to-Action */}
    <div className="mt-12 flex justify-center">
      <button className="px-8 py-3 bg-pink-500 text-white font-semibold rounded-lg shadow-lg hover:bg-pink-600 transition">
        Explore Our Solutions
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
          color: "bg-blue-300",
          content:
            "Our mission is to provide high-quality, sustainable, and innovative packaging solutions tailored to our customers' needs.",
          icon: "\u{1F4AC}", // 💬 Speech Balloon
        },
        {
          title: "VISION",
          color: "bg-red-300",
          content:
            "Our vision is to become the global leader in eco-friendly packaging, setting industry standards for innovation and sustainability.",
          icon: "\u{1F50D}", // 🔍 Magnifying Glass
        },
        {
          title: "VALUES",
          color: "bg-orange-300",
          content:
            "We value integrity, customer satisfaction, and environmental responsibility in every step of our production and service.",
          icon: "\u{1F48E}", // 💎 Diamond
        },
    ].map((item, index) => (
      <div 
        key={index} 
        className="relative bg-white shadow-lg rounded-lg overflow-hidden transition-transform duration-300 ease-in-out hover:shadow-2xl hover:-translate-y-2"
      >
       {/* Top Section with Color */}
       <div className={`${item.color} h-52 flex justify-center items-center relative`}>
              {/* Hexagon with Icon */}
              <div
                className="absolute -bottom-10 flex items-center justify-center text-4xl font-bold text-gray-800"
                style={{
                  width: "90px",
                  height: "78px",
                  clipPath: "polygon(25% 0%, 75% 0%, 100% 50%, 75% 100%, 25% 100%, 0% 50%)",
                  backgroundColor: "white",
                }}
              >
                <span>{item.icon}</span> {/* Ensures correct rendering */}
              </div>
            </div>

        {/* Text Content */}
        <div className="pt-12 pb-10 px-6 text-center">
          <h3 className="text-2xl font-bold text-gray-800">{item.title}</h3>
          <p className="mt-4 text-gray-600">{item.content}</p>
        </div>
      </div>
    ))}
  </div>
</div>

    </section>
  );
}

export default BoxCategories;