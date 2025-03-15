import React, { useState } from 'react';
import { ChevronRight, Users, Calendar, Clock, ClipboardList, Settings, Home } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Sidebar = ({ activeSection, setActiveSection }) => {
  const navigate = useNavigate();
  const [isExpanded, setIsExpanded] = useState(true);
  
  const menuItems = [
    { id: 'home', label: 'Home', icon: Home, path: '/dashboard' },
    { id: 'visitor-form', label: 'Visitor Form', icon: Users, path: '/visitor-form' },
    { id: 'visitor-records', label: 'Visitor Records', icon: ClipboardList, path: '/visitor-records' },
    { id: 'settings', label: 'Settings', icon: Settings, path: '/dashboard/settings' }
  ];

  const handleNavigation = (path, id) => {
    setActiveSection(id);
    navigate(path);
  };

  const toggleSidebar = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <div 
      className={`bg-white shadow-xl h-screen transition-all duration-300 ease-in-out ${
        isExpanded ? 'w-64' : 'w-20'
      } relative overflow-hidden`}
    >
      {/* Toggle button */}
      <button 
        onClick={toggleSidebar}
        className="absolute top-4 right-4 bg-teal-100 rounded-full p-1 text-teal-600 hover:bg-teal-200 transition-colors"
      >
        <ChevronRight 
          size={16} 
          className={`transition-transform duration-300 ${isExpanded ? 'rotate-180' : 'rotate-0'}`} 
        />
      </button>

      {/* Header/Logo */}
      <div className="p-6 border-b border-gray-100">
        <h1 
          className={`font-bold text-teal-600 transition-all duration-300 ${
            isExpanded ? 'text-xl' : 'text-xs transform rotate-90 translate-x-6 whitespace-nowrap'
          }`}
        >
          {isExpanded ? 'Visitor Management' : 'VMS'}
        </h1>
      </div>
      
      {/* Navigation */}
      <nav className="mt-6">
        {menuItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeSection === item.id;

          return (
            <button
              key={item.id}
              onClick={() => handleNavigation(item.path, item.id)}
              className={`group w-full flex items-center px-4 py-3 mb-2 mx-2 rounded-lg transition-all duration-200 ${
                isActive
                  ? 'bg-teal-500 text-white shadow-md' 
                  : 'text-gray-600 hover:bg-teal-50 hover:text-teal-500'
              }`}
            >
              <div className={`flex items-center justify-center transition-all duration-200 ${isActive ? 'text-white' : 'text-teal-500 group-hover:scale-110'}`}>
                <Icon size={20} />
              </div>
              
              <span className={`ml-4 transition-opacity duration-300 ${isExpanded ? 'opacity-100' : 'opacity-0 absolute'}`}>
                {item.label}
              </span>
              
              {isActive && isExpanded && (
                <ChevronRight 
                  className="ml-auto animate-pulse text-white" 
                  size={16} 
                />
              )}
            </button>
          );
        })}
      </nav>

      {/* Footer */}
      <div className={`absolute bottom-0 left-0 right-0 p-4 text-gray-400 text-xs text-center transition-opacity duration-300 ${isExpanded ? 'opacity-100' : 'opacity-0'}`}>
        <p>Version 1.2.0</p>
      </div>
    </div>
  );
};

export default Sidebar;