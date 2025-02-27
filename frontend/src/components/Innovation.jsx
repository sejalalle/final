import React from 'react';

function Innovation() {
  return (
    <div className="bg-gray-50 mt-10 sm:mt-20">
      {/* Header Section */}
      <section className="relative bg-gradient-to-r from-blue-600 to-purple-500 text-white py-12 sm:py-24">
        <div className="absolute inset-0 bg-blue-500 opacity-30"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 md:px-12 lg:px-20 flex flex-col md:flex-row items-center">
          {/* Text Section */}
          <div className="w-full md:w-1/2 md:pr-8 mb-8 md:mb-0 animate-fadeIn">
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold leading-tight mb-4 sm:mb-6">Innovation in Packaging</h1>
            <p className="text-base sm:text-lg leading-relaxed opacity-90">
              We push the boundaries of packaging with cutting-edge printing and finishing technologies to deliver excellence and sustainability.
            </p>
          </div>
          {/* Image Section */}
          <div className="w-full md:w-1/2">
            <img
              src="https://parksonspackaging.com/wp-content/uploads/2023/12/Innovation-scaled.jpg"
              alt="Innovation"
              className="rounded-lg shadow-2xl transform hover:scale-105 transition duration-500 w-full"
            />
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section id="printing-tech" className="relative py-12 sm:py-20 bg-white">
        <div className="absolute inset-0 bg-blue-100 -skew-y-3 transform origin-top opacity-50"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 md:px-12 lg:px-20 text-center">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-blue-900 mb-6 sm:mb-10">Advanced Printing & Finishing Technologies</h2>
          <p className="text-base sm:text-lg text-gray-700 max-w-3xl mx-auto leading-relaxed">
            At Parksons, innovation drives us to craft packaging that is both visually appealing and environmentally responsible.
          </p>
        </div>
      </section>

      {/* Technology Features */}
      <section className="py-12 sm:py-20 bg-gradient-to-r from-yellow-100 to-orange-300 text-black">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-center mb-8 sm:mb-12">Our Cutting-Edge Technologies</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 md:gap-8">
            {[
              { title: "Offset Printing", description: "Precision & vibrant color reproduction for premium packaging." },
              { title: "Digital Printing", description: "Customization & short-run efficiency for tailored solutions." },
              { title: "UV Coating", description: "Enhanced durability with glossy or matte finish." },
              { title: "Foil Stamping", description: "Elegant metallic effects for a luxurious touch." },
              { title: "Embossing/Debossing", description: "Tactile elements for a distinctive feel." },
              { title: "Eco-friendly Inks", description: "Sustainable & environmentally safe options." }
            ].map((tech, index) => (
              <div
                key={index}
                className="bg-white rounded-xl shadow-xl transform hover:scale-105 transition-transform duration-300 p-4 sm:p-6 text-center border border-gray-300"
              >
                <h3 className="text-xl sm:text-2xl font-semibold text-blue-900 mb-2">{tech.title}</h3>
                <p className="text-sm sm:text-base text-gray-600">{tech.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Structural Design */}
      <section id="structural-des" className="py-12 sm:py-20 bg-white text-black">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-12 lg:px-20 text-center">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-blue-900 mb-6 sm:mb-10">Structural Design</h2>
          <p className="text-base sm:text-lg text-gray-700 max-w-3xl mx-auto leading-relaxed">
            Our team of experts provides industry-leading solutions including:
          </p>
          <ul className="text-left mt-4 sm:mt-6 space-y-2 sm:space-y-4 max-w-2xl mx-auto px-4 sm:px-0">
            {[
              "Construction designs",
              "Customer test and development samples",
              "Key line drawings",
              "Proofing services",
              "Optimization of layouts"
            ].map((item, index) => (
              <li key={index} className="text-base sm:text-lg text-gray-700 flex items-center">
                <span className="w-2 h-2 bg-blue-500 rounded-full inline-block mr-2"></span> {item}
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Future Innovation Section */}
      <section className="relative py-12 sm:py-20 bg-gradient-to-r from-blue-500 to-purple-600 text-white">
        <div className="absolute inset-0 bg-blue-900 opacity-30"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 md:px-12 lg:px-20 text-center">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4 sm:mb-6">Future of Packaging Innovation</h2>
          <p className="text-base sm:text-lg max-w-3xl mx-auto">
            We continuously explore advanced technologies and materials to create sustainable, high-performance packaging solutions.
          </p>
        </div>
      </section>

      {/* Customer Experience Centre */}
      <section id="exp-center" className="relative py-12 sm:py-20 bg-white">
        <div className="absolute inset-0 bg-gray-200 opacity-50"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 md:px-12 lg:px-20 text-center">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4 sm:mb-8 text-blue-900">Customer Experience Centre</h2>
          <p className="text-base sm:text-lg text-gray-700 max-w-3xl mx-auto">
            Our dedicated team of packaging developers, technicians, and graphic designers work from our Mumbai office, leveraging cutting-edge facilities to transform creative concepts into reality.
          </p>
          <div className="mt-6 sm:mt-8">
            <img
              src="https://parksonspackaging.com/wp-content/uploads/2023/12/Design-scaled.jpg"
              alt="Customer Experience Centre"
              className="rounded-lg shadow-xl mx-auto max-w-full hover:scale-105 transition duration-500"
            />
          </div>
        </div>
      </section>
    </div>
  );
}

export default Innovation;