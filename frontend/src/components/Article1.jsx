import React from "react";
import { Link } from "react-router-dom";

function Article1() {
  return (
    <div className="p-10 max-w-3xl mx-auto bg-white shadow-lg rounded-lg mt-40 mb-20">
      <h1 className="text-3xl font-bold text-gray-800">
        Parksons-MK Printpack Announcement
      </h1>
      <p className="mt-4 text-gray-600">
      Warburg Pincus backed Parksons Packaging, a leading paper packaging company in India, today announced that it has completed the acquisition of MK Printpack Private Limited. Founded in 1982, MK Printpack Private Limited is one of the top producers of folding cartons, catering to Pharmaceutical, Food &amp; Beverages, Home &amp; Personal Care, Toys and Electrical industry through its 3 state-of-the-art manufacturing facilities in Gujarat, Daman, and Haridwar.
      </p>
      <p className="mt-4 text-gray-600">
      The acquisition of MK Printpack will further strengthen Parksons Packaging’s leadership position in the folding cartons market in India. MK Printpack’s innovative packaging solutions and technical expertise in “fluted packaging” will augment Parksons’ product portfolio and MK’s strategically located manufacturing facilities will help Parksons expand its geographic footprint. Existing founders of MK Printpack, Mr Anil Kumar, and Mr. Sanjeev Kumar along with the senior leadership will continue to be a part of the future growth journey.
      </p>
      <p className="mt-4 text-gray-600">
      This is Parksons Packaging’s second acquisition in the last 18 months. In November 2021, Parksons acquired Manohar Packaging, a leading producer of folding cartons in the Alcoholic Beverages segment, which has helped increase domain expertise and depth of services in this segment. Parksons Packaging (including its subsidiaries) now has eleven manufacturing facilities across Daman, Chakan, Pantnagar, Guwahati, Sri City, Goa, Punjab, Haridwar, and Gujarat.
      </p>
      <p className="mt-4 text-gray-600">
      Mr. Siddharth Kejriwal MD, Parksons Packaging said, “We are thrilled to welcome MK Printpack to the Parksons family. We look forward to leveraging MK Printpack’s expertise in manufacturing “high quality micro flute cartons” by using its large format printing capability and strategically located manufacturing facilities in Haridwar and Gujarat along with the pharma packaging focused facility in Daman. This acquisition will provide more value to our customers and enhance our ability to serve clients efficiently across the country, giving us access to new growth opportunities.”
      </p>
      <p className="mt-4 text-gray-600">
      Mr. Anil Kumar and Mr. Sanjeev Kumar of MK Printpack said, “This is an excellent opportunity for us to accelerate our growth journey as part of Parksons Packaging which is backed by Warburg Pincus. This association will allow us to serve our customers better with a wider range of products and pan-India presence. We look forward to a long-term association with Parksons.
      </p>
      
      <Link to="/" className="text-blue-500 mt-4 inline-block font-semibold hover:underline">
        ← Back to Home
      </Link>
    </div>
  );
}

export default Article1;