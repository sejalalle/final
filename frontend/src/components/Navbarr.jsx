import React, { useState, useEffect, useRef } from "react";
import { FaUserCircle, FaShoppingCart, FaBars, FaSearch, FaTimes } from "react-icons/fa";
import { useNavigate, useLocation, Link } from "react-router-dom";

function Navbarr() {
  const [isSticky, setIsSticky] = useState(false);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [dropdownOpen, setDropdownOpen] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredResults, setFilteredResults] = useState([]);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [mobileSearchOpen, setMobileSearchOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false); // State to manage login status
  
  const dropdownRef = useRef(null);

  const location = useLocation();
  const navigate = useNavigate();
  const username = location.state?.username || 'Guest';

  // Check if user is logged in on component mount
  useEffect(() => {
    const loggedInStatus = localStorage.getItem("isLoggedIn");
    if (loggedInStatus === "true") {
      setIsLoggedIn(true);
    }
  }, []);

  // Handle click outside to close dropdown
  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(null);
      }
    }
    
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [dropdownRef]);

  const handleScroll = () => {
    const currentScrollY = window.scrollY;
    setIsSticky(currentScrollY < lastScrollY || currentScrollY <= 100);
    setLastScrollY(currentScrollY);
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  const handleNavigation = (path, sectionId) => {
    navigate(path);
    setMobileMenuOpen(false);
    setDropdownOpen(null); // Close dropdown when navigating
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
    { title: "Mockup", path: "/mockup" },
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
      const results = allSearchOptions.filter(option =>
        option.label.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setFilteredResults(results);
    }
  }, [searchQuery]);

  const handleSearchSelection = (option) => {
    if (!option || !option.label) {
      console.error("Invalid option selected:", option);
      return;
    }
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

  const toggleDropdown = (index) => {
    setDropdownOpen(dropdownOpen === index ? null : index);
  };

  const toggleMobileDropdown = (index) => {
    setDropdownOpen(dropdownOpen === index ? null : index);
  };

  const logout = () => {
    localStorage.removeItem("isLoggedIn");
    setIsLoggedIn(false);
    navigate('/');
  };

  return (
    <div className="w-full">
      <div className="bg-green-300 h-2"></div>
      <nav className="fixed top-0 left-0 w-full z-20 bg-white shadow-md">
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
              {!isLoggedIn && (
                <a href="/login" className="flex items-center space-x-2 text-gray-700">
                  <span className="text-sm font-medium">Login</span>
                </a>
              )}
              {isLoggedIn && (
                <>
                  <a href="/cart" className="text-gray-700">
                    <FaShoppingCart />
                  </a>
                  <Link to="/user" className="flex items-center space-x-2 text-gray-700">
                    <FaUserCircle />
                  </Link>
                </>
              )}
              {/* {isLoggedIn && (
              <button
                type="button"
                onClick={logout}
                className="text-grey-500 hover:text-black-500 font-medium transition-colors duration-200"
              >
                Logout
              </button>
            )} */}
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
          <ul className="flex items-center justify-center space-x-6 py-3" ref={dropdownRef}>
            {navLinks.map((link, index) => (
              <li
                key={index}
                className="relative"
              >
                <a 
                  href={link.path} 
                  className="text-white hover:text-green-300 font-medium"
                  onClick={(e) => {
                    if (link.dropdown) {
                      e.preventDefault();
                      e.stopPropagation();
                      toggleDropdown(index);
                    }
                  }}
                >
                  {link.title}
                </a>
                {link.dropdown && dropdownOpen === index && (
                  <ul className="absolute left-0 mt-2 bg-white shadow-lg rounded-md w-48 z-30">
                    {link.dropdown.map((item, subIndex) => (
                      <li
                        key={subIndex}
                        className="px-4 py-2 hover:bg-green-100 text-gray-800 cursor-pointer border-b last:border-none transition-all duration-200"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleNavigation(link.path, item.id);
                        }}
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

export default Navbarr;