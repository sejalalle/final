import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";

function Markets() {
  const location = useLocation();

  useEffect(() => {
    if (location.hash) {
      const element = document.getElementById(location.hash.substring(1));
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    }
  }, [location]);

  return (
    <div className="bg-gray-50 mt-20">
      {/* Main Header */}
      <section className="relative bg-gradient-to-r from-blue-500 to-pink-500 text-black py-12 sm:py-20">
        <div className="absolute top-0 left-0 w-full h-full bg-blue-400 skew-y-3 transform origin-top"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-20 flex flex-col md:flex-row items-center">
          {/* Text Section */}
          <div className="w-full md:w-1/2 pr-0 md:pr-8 mb-8 md:mb-0">
            <h1 className="text-4xl sm:text-5xl font-bold leading-tight mb-4">Our Markets & Products</h1>
            <p className="text-base sm:text-lg leading-relaxed">
              At Parksons Packaging, we craft innovative solutions for your packaging needs, combining creativity, sustainability, and quality to deliver excellence in every product.
            </p>
          </div>
          {/* Image Section */}
          <div className="w-full md:w-1/2">
            <img src="/images/market1.webp" alt="Markets" className="rounded-lg shadow-xl w-full h-auto" />
          </div>
        </div>
      </section>

      {/* Our Markets Section */}
      <section id="our-markets" className="relative py-12 sm:py-16 bg-white">
        <div className="absolute top-0 left-0 w-full h-full bg-blue-100 -skew-y-3 transform origin-top"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-20 text-center">
          <h2 className="text-2xl sm:text-3xl font-bold text-blue-900 mb-6 sm:mb-8">Our Markets</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 sm:gap-8">
            {[
              { name: "Consumer Goods", image: "https://parksonspackaging.com/wp-content/uploads/2023/10/Beauty-_-Personal-Care.jpg", description: "Innovative packaging solutions that elevate consumer products." },
              { name: "Healthcare", image: "https://parksonspackaging.com/wp-content/uploads/2023/10/Nutraceuticals-1024x627.jpg", description: "Safe, hygienic packaging for healthcare and pharmaceuticals." },
              { name: "Gable Top Packaging", image: "https://parksonspackaging.com/wp-content/uploads/2023/10/Liquid-products.jpg", description: "Sustainable packaging solutions for liquid products." },
              { name: "Food Service", image: "https://parksonspackaging.com/wp-content/uploads/2023/10/Meal-boxes.jpg", description: "Customized food service packaging solutions." },
            ].map((market, index) => (
              <div key={index} className="bg-white rounded-xl shadow-lg overflow-hidden hover:bg-orange-100 hover:shadow-2xl transition duration-300">
                <img src={market.image} alt={market.name} className="w-full h-48 sm:h-64 object-cover transform hover:scale-110 transition-transform duration-300" />
                <div className="p-4 sm:p-6">
                  <h3 className="text-lg sm:text-xl font-bold text-blue-900 mb-2">{market.name}</h3>
                  <p className="text-sm sm:text-base text-gray-600">{market.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Sustainability Section */}
      <section id="sustainability" className="relative py-12 sm:py-16 bg-gradient-to-r from-yellow-300 to-orange-400 text-black">
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-yellow-200 to-orange-300 skew-y-3 transform origin-bottom"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-20 text-center">
          <h2 className="text-2xl sm:text-3xl font-bold mb-4 sm:mb-6">Sustainability at the Core</h2>
          <p className="text-base sm:text-lg max-w-3xl mx-auto">
            At Parksons Packaging, our commitment to sustainability drives innovation. We create eco-friendly solutions that protect both your products and our planet, ensuring a better future for generations to come.
          </p>
        </div>
      </section>

      {/* Our Products Section */}
      <section id="our-products" className="relative py-12 sm:py-16 bg-white">
        <div className="absolute top-0 left-0 w-full h-full bg-blue-50 -skew-y-3 transform origin-top"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-20 text-center">
          <h2 className="text-2xl sm:text-3xl font-bold text-blue-900 mb-6 sm:mb-8">Our Products</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {[
              { name: "Corrugated Boxes", image: "https://parksonspackaging.com/wp-content/uploads/2023/10/Display-packs.jpg", description: "High-quality boxes for secure transportation." },
              { name: "Folding Cartons", image: "https://parksonspackaging.com/wp-content/uploads/2023/10/Festive-Pack-1.jpg", description: "Premium printed cartons for retail." },
              { name: "Gable Top Cartons", image: "https://parksonspackaging.com/wp-content/uploads/2023/10/Personal-Care-1.jpg", description: "Sustainable beverage packaging." },
              { name: "Rigid Boxes", image: "https://parksonspackaging.com/wp-content/uploads/2023/10/Cosmetics-_-Perfumes.jpg", description: "Luxury packaging solutions." },
              { name: "Canister", image: "https://parksonspackaging.com/wp-content/uploads/2023/10/Alcobev-1.jpg", description: "Innovative cylindrical packaging." },
              { name: "Paper Rod", image: "https://parksonspackaging.com/wp-content/uploads/2023/10/SKU-910-ml.jpg", description: "Sustainable paper solutions." },
            ].map((product, index) => (
              <div key={index} className="bg-white rounded-xl shadow-lg overflow-hidden hover:bg-orange-100 hover:shadow-2xl transition duration-300">
                <img src={product.image} alt={product.name} className="w-full h-40 sm:h-48 object-cover transform hover:scale-110 transition-transform duration-300" />
                <div className="p-4 sm:p-6">
                  <h3 className="text-lg sm:text-xl font-bold text-blue-900 mb-2">{product.name}</h3>
                  <p className="text-sm sm:text-base text-gray-600">{product.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

export default Markets;