import React from 'react';
import { FaFacebookF, FaTwitter, FaLinkedinIn, FaInstagram } from 'react-icons/fa';

function Footer() {
  return (
    <footer className="bg-gradient-to-r from-blue-300 to-blue-900 text-white py-8">
      {/* Footer Content */}
      <div className="container mx-auto text-center">
        <h2 className="text-xl font-semibold mb-4">Connect With Us</h2>
        
        {/* Social Media Icons */}
        <div className="flex justify-center space-x-6 mb-6">
        <a
            href="https://www.facebook.com/parksonspackaging"
            target="_blank"
            rel="noopener noreferrer"
            className="p-2 bg-orange-700 hover:bg-orange-600 rounded-full transition duration-300"
            aria-label="Facebook"
          >
            <FaFacebookF />
          </a>
          <a
            href="https://twitter.com/ParksonsP"
            target="_blank"
            rel="noopener noreferrer"
            className="p-2 bg-orange-700 hover:bg-orange-600 rounded-full transition duration-300"
            aria-label="Twitter"
          >
            <FaTwitter />
          </a>
          <a
           href="https://www.linkedin.com/company/parksons-packaging-ltd/"
           target="_blank"
           rel="noopener noreferrer"
           className="p-2 bg-orange-700 hover:bg-orange-600 rounded-full transition duration-300"
           aria-label="LinkedIn"
          >
            <FaLinkedinIn />
          </a>
          <a
            href="https://www.instagram.com/parksonspackagingltd/"
            target="_blank"
            rel="noopener noreferrer"
            className="p-2 bg-orange-700 hover:bg-orange-600 rounded-full transition duration-300"
            aria-label="Instagram"
          >
            <FaInstagram />
          </a>
        </div>

        {/* Footer Text */}
        <p className="text-sm">
          © Parksons Packaging LTD 2023. All Rights Reserved.
        </p>
        <p className="text-xs mt-2">
          Designed with ❤️ by Parksons Packaging Team
        </p>
      </div>
    </footer>
  );
}

export default Footer;