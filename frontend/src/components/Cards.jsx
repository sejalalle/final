import React from "react";
import { Link } from "react-router-dom";

function Cards() {
  return (
    <div className="py-20 bg-gray-50">
      <h2 className="text-center text-4xl font-bold text-gray-800 mb-12">Latest Updates</h2>
      <div className="flex flex-wrap justify-center gap-8 px-6">
        {/* Card 1 */}
        <div className="relative bg-white rounded-lg shadow-xl hover:shadow-2xl transition-shadow duration-300 max-w-md w-full overflow-hidden">
          <div className="absolute inset-0 w-full h-2 bg-gradient-to-r from-blue-500 to-pink-500"></div>
          <div className="p-6">
            <h3 className="text-sm font-semibold text-blue-600 uppercase tracking-wide">
              News and Events
            </h3>
            <h2 className="text-2xl font-bold text-gray-800 mt-2">
              Parksons-MK Printpack Announcement
            </h2>
            <p className="mt-4 text-gray-600">
              Warburg Pincus backed Parksons Packaging, a leading paper packaging company in India, today announced that…
            </p>
            <Link
              to="/articles/parksons-mk-printpack-announcement"
              className="text-blue-500 mt-4 inline-block font-semibold hover:underline"
            >
              Read more →
            </Link>
          </div>
        </div>

        {/* Card 2 */}
        <div className="relative bg-white rounded-lg shadow-xl hover:shadow-2xl transition-shadow duration-300 max-w-md w-full overflow-hidden">
          <div className="absolute inset-0 w-full h-2 bg-gradient-to-r from-green-400 to-teal-500"></div>
          <div className="p-6">
            <h3 className="text-sm font-semibold text-green-600 uppercase tracking-wide">
              Innovation and Technology
            </h3>
            <h2 className="text-2xl font-bold text-gray-800 mt-2">
              Smart Solutions for Business Success
            </h2>
            <p className="mt-4 text-gray-600">
              Leveraging our deep technical expertise, we provide innovative packaging solutions that help our customers' brands advance.
            </p>
            <Link
              to="/articles/smart-solutions-for-business"
              className="text-green-500 mt-4 inline-block font-semibold hover:underline"
            >
              Read more →
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Cards;