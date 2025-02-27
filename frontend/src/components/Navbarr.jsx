import React, { useState, useEffect } from "react";
import { FaUserCircle, FaShoppingCart, FaBars, FaSearch, FaTimes } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

function Navbar() {
  const [isSticky, setIsSticky] = useState(false);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [dropdownOpen, setDropdownOpen] = useState(null);
  const [hoverTimeout, setHoverTimeout] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredResults, setFilteredResults] = useState([]);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [mobileSearchOpen, setMobileSearchOpen] = useState(false);
  const navigate = useNavigate();

  const handleScroll = () => {
    const currentScrollY = window.scrollY;
    setIsSticky(currentScrollY < lastScrollY || currentScrollY <= 100);
    setLastScrollY(currentScrollY);
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  // 📌 Handles scrolling for all sections across different pages (About, Markets, Innovation)
  const handleNavigation = (path, sectionId) => {
    navigate(path);
    setMobileMenuOpen(false);
    setTimeout(() => {
      const section = document.getElementById(sectionId);
      if (section) {
        section.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    }, 100);
  };

  const navLinks = [
    { title: "Home", path: "/" },
    {
      title: "About",
      path: "/about",
      dropdown: [
        { label: "Company Background", id: "company-background" },
        { label: "Our Journey", id: "our-journey" },
        { label: "Management Team", id: "management-team" },
        { label: "Awards and Recognitions", id: "awards" },
        { label: "Our Clients", id: "client" }
      ]
    },
    {
      title: "Markets and Products",
      path: "/markets",
      dropdown: [
        { label: "Our Products", id: "our-products" },
        { label: "Sustainability", id: "sustainability" },
        { label: "Our Markets", id: "our-markets" }
      ]
    },
    {
      title: "Innovation",
      path: "/innovation",
      dropdown: [
        { label: "Printing Technology", id: "printing-tech" },
        { label: "Finishing Technology", id: "finishing-tech" }
      ]
    },
    { title: "Locations", path: "/location" },
    {
      title: "Mockup",
      path: "/mockup",
    },
  ];

  const allSearchOptions = [
    { label: "About Us", path: "/about", id: "company-background" },
    { label: "Company Background", path: "/about", id: "company-background" },
    { label: "Management Team", path: "/about", id: "management-team" },
    { label: "Our Journey", path: "/about", id: "our-journey" },
    { label: "Awards & Recognitions", path: "/about", id: "awards" },
    { label: "Our Markets", path: "/markets", id: "our-markets" },
    { label: "Our Products", path: "/markets", id: "our-products" },
    { label: "Innovation", path: "/innovation", id: "printing-tech" },
    { label: "Printing Technology", path: "/innovation", id: "printing-tech" },
    { label: "Finishing Technology", path: "/innovation", id: "finishing-tech" },
    { label: "Locations", path: "/location", id: "location" },
    { label: "Mockup", path: "/mockup", id: "mockup" }
  ];
  
  useEffect(() => {
    if (searchQuery.trim() === "") {
      setFilteredResults([]);
    } else {
      setFilteredResults(
        allSearchOptions.filter(option =>
          option.label.toLowerCase().includes(searchQuery.toLowerCase())
        )
      );
    }
  }, [searchQuery]);

  const handleSearchSelection = (option) => {
    setSearchQuery(option.label);
    setFilteredResults([]);
    setMobileSearchOpen(false);
    handleNavigation(option.path, option.id);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && filteredResults.length > 0) {
      handleSearchSelection(filteredResults[0]);
    }
  };

  const toggleMobileDropdown = (index) => {
    setDropdownOpen(dropdownOpen === index ? null : index);
  };

  return (
    <div className="w-full">
      <div className="bg-green-300 h-2"></div>
      <div className="bg-red-500 text-white p-4">Tailwind is Working</div>

      <nav
        className={`${
          isSticky ? "fixed" : "absolute"
        } top-0 left-0 w-full z-20 bg-white shadow-md transition-all duration-300`}
      >
        {/* Top navbar section */}
        <div className="max-w-7xl mx-auto flex items-center justify-between px-4 sm:px-6 py-4">
          <div className="flex items-center">
            <img
              src="/images/parksons.png"
              alt="Parksons Packaging Logo"
              className="h-8 sm:h-12 object-contain"
            />
          </div>
          
          {/* Desktop Search Bar */}
          <div className="hidden md:block relative flex-grow mx-8">
            <input
              type="text"
              placeholder="Search..."
              className="w-full px-4 py-2 border border-gray-300 rounded-full focus:outline-none focus:ring-2"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyDown={handleKeyDown}
            />
            
            {/* Dropdown for Search Recommendations */}
            {filteredResults.length > 0 && (
              <ul className="absolute w-full bg-white shadow-md mt-2 rounded-lg border border-gray-200 max-h-60 overflow-auto z-30">
                {filteredResults.map((option, index) => (
                  <li
                    key={index}
                    className="px-4 py-2 cursor-pointer hover:bg-gray-100"
                    onClick={() => handleSearchSelection(option)}
                  >
                    {option.label}
                  </li>
                ))}
              </ul>
            )}
          </div>
          
          {/* Mobile buttons */}
          <div className="flex items-center space-x-4 md:space-x-6">
            <button 
              className="md:hidden text-gray-700" 
              onClick={() => setMobileSearchOpen(!mobileSearchOpen)}
            >
              <FaSearch className="text-xl" />
            </button>
            
            <div className="hidden md:flex items-center space-x-6 text-2xl text-black">
              <a href="/login" className="flex items-center space-x-2 text-gray-700">
                <FaUserCircle />
                <span className="text-sm font-medium">Login</span>
              </a>
              <a href="/cart" className="text-gray-700">
                <FaShoppingCart />
              </a>
            </div>
            
            <div className="md:hidden flex items-center space-x-4 text-xl text-black">
              <a href="/login" className="text-gray-700">
                <FaUserCircle />
              </a>
              <a href="/cart" className="text-gray-700">
                <FaShoppingCart />
              </a>
            </div>
            
            <button 
              className="md:hidden text-gray-700" 
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <FaTimes className="text-xl" /> : <FaBars className="text-xl" />}
            </button>
          </div>
        </div>
        
        {/* Mobile Search Bar */}
        {mobileSearchOpen && (
          <div className="md:hidden px-4 pb-4">
            <div className="relative">
              <input
                type="text"
                placeholder="Search..."
                className="w-full px-4 py-2 border border-gray-300 rounded-full focus:outline-none focus:ring-2"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyDown={handleKeyDown}
              />
              
              {filteredResults.length > 0 && (
                <ul className="absolute w-full bg-white shadow-md mt-2 rounded-lg border border-gray-200 max-h-60 overflow-auto z-30">
                  {filteredResults.map((option, index) => (
                    <li
                      key={index}
                      className="px-4 py-2 cursor-pointer hover:bg-gray-100"
                      onClick={() => handleSearchSelection(option)}
                    >
                      {option.label}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>
        )}
        
        {/* Desktop Navigation Menu */}
        <div className="bg-pink-900 hidden md:block !important">
          <ul className="flex items-center justify-center space-x-6 py-3">
            {navLinks.map((link, index) => (
              <li
                key={index}
                className="relative group"
              >
                <a href={link.path} className="text-white hover:text-green-300 font-medium">
                  {link.title}
                </a>
                {link.dropdown && (
                  <ul className="absolute left-0 mt-2 bg-white shadow-lg rounded-md w-48 opacity-0 transform scale-95 transition-all duration-300 ease-out group-hover:opacity-100 group-hover:scale-100 z-30">
                    {link.dropdown.map((item, subIndex) => (
                      <li
                        key={subIndex}
                        className="px-4 py-2 hover:bg-green-100 text-gray-800 cursor-pointer border-b last:border-none transition-all duration-200"
                        onClick={() => handleNavigation(link.path, item.id)}
                      >
                        {item.label}
                      </li>
                    ))}
                  </ul>
                )}
              </li>
            ))}
          </ul>
        </div>
        
        {/* Mobile Navigation Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-pink-900 overflow-hidden transition-all duration-300">
            <ul className="py-2">
              {navLinks.map((link, index) => (
                <li key={index} className="px-4">
                  <div 
                    className="flex justify-between items-center py-3 text-white"
                    onClick={() => link.dropdown ? toggleMobileDropdown(index) : handleNavigation(link.path, '')}
                  >
                    <a href={link.path} className="text-white font-medium" onClick={(e) => {
                      if (link.dropdown) {
                        e.preventDefault();
                      }
                    }}>
                      {link.title}
                    </a>
                    {link.dropdown && (
                      <span className="text-white text-xs">
                        {dropdownOpen === index ? '▲' : '▼'}
                      </span>
                    )}
                  </div>
                  
                  {link.dropdown && dropdownOpen === index && (
                    <ul className="bg-white rounded-md overflow-hidden mb-2">
                      {link.dropdown.map((item, subIndex) => (
                        <li
                          key={subIndex}
                          className="px-4 py-2 text-gray-800 border-b last:border-none"
                          onClick={() => handleNavigation(link.path, item.id)}
                        >
                          {item.label}
                        </li>
                      ))}
                    </ul>
                  )}
                </li>
              ))}
            </ul>
          </div>
        )}
      </nav>
    </div>
  );
}

export default Navbar;