import React from "react";
import { Link } from "react-router-dom";

function Article2() {
  return (
    <div className="p-10 max-w-3xl mx-auto bg-white shadow-lg rounded-lg mt-40 mb-20">
      <h1 className="text-3xl font-bold text-gray-800">
        Smart Solutions for Business Success
      </h1>
      <p className="mt-4 text-gray-600">
        In today’s rapidly evolving market, Parksons Packaging continues to drive innovation by leveraging smart technologies in packaging solutions. Our focus remains on sustainable, cost-effective, and efficient packaging methods.
      </p>
      <p className="mt-4 text-gray-600">
        Through automation, AI-driven quality control, and eco-friendly materials, we provide businesses with solutions that enhance product appeal while reducing environmental impact.
      </p>
      <Link to="/" className="text-green-500 mt-4 inline-block font-semibold hover:underline">
        ← Back to Home
      </Link>
    </div>
  );
}

export default Article2;