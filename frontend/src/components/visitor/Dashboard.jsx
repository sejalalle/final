import React, { useState } from 'react';
import { ChevronRight, Users, Calendar, Clock, ClipboardList, Settings, Home, Bell, Search, TrendingUp, AlertTriangle, CheckCircle } from 'lucide-react';import { Routes, Route, useNavigate } from 'react-router-dom';

const StatusCard = ({ title, value, icon: Icon, color }) => (
  <div className={`bg-${color}-50 p-6 rounded-lg flex items-start justify-between`}>
    <div>
      <p className={`text-${color}-600 text-sm font-medium`}>{title}</p><h3 className={`text-2xl font-bold text-${color}-700 mt-2`}>{value}</h3>
    </div>
    <Icon className={`text-${color}-500`} size={24} />
  </div>
);

const RecentVisitorCard = ({ name, purpose, time, status }) => (
  <div className="bg-white p-4 rounded-lg shadow-sm flex items-center justify-between">
    <div>
      <h4 className="font-medium text-gray-800">{name}</h4>
      <p className="text-sm text-gray-500">{purpose}</p>
    </div>
    <div className="text-right">
      <p className="text-sm text-gray-500">{time}</p>
      <span className={`text-xs px-2 py-1 rounded ${
        status === 'Checked In' ? 'bg-green-100 text-green-700' :
        status === 'Pending' ? 'bg-yellow-100 text-yellow-700' :
        'bg-red-100 text-red-700'
      }`}>
        {status}
      </span>
    </div>
  </div>
);

// Separate VisitorForm component that will be in another file
// Create this in src/components/VisitorForm.jsx
const VisitorForm = () => {
  return (
    <div className="p-8">
      <h2 className="text-xl font-semibold mb-6">Visitor Registration</h2>
      <div className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm text-gray-600 mb-1">First Name</label>
            <input type="text" className="w-full p-2 border rounded-md" />
          </div>
          <div>
            <label className="block text-sm text-gray-600 mb-1">Last Name</label>
            <input type="text" className="w-full p-2 border rounded-md" />
          </div>
        </div>
        
        <div>
          <label className="block text-sm text-gray-600 mb-1">Purpose of Visit</label>
          <input type="text" className="w-full p-2 border rounded-md" />
        </div>
        
        <div>
          <label className="block text-sm text-gray-600 mb-1">Host Name</label>
          <input type="text" className="w-full p-2 border rounded-md" />
        </div>
        
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm text-gray-600 mb-1">Visit Date</label>
            <input type="date" className="w-full p-2 border rounded-md" />
          </div>
          <div>
            <label className="block text-sm text-gray-600 mb-1">Expected Time</label>
            <input type="time" className="w-full p-2 border rounded-md" />
          </div>
        </div>
        
        <button className="bg-teal-600 text-white px-6 py-2 rounded-md hover:bg-teal-700">
          Submit
        </button>
      </div>
    </div>
  );
};

const Dashboard = () => {
  const [activeSection, setActiveSection] = useState('home');
  const navigate = useNavigate();
  
  const menuItems = [
    { id: 'home', label: 'Home', icon: Home, path: '/dashboard' },
    { id: 'visitor-form', label: 'Visitor Form', icon: Users, path: '/visitorForm' },
    { id: 'pre-arrival', label: 'Pre-Arrival', icon: Calendar, path: '/dashboard/pre-arrival' },
    { id: 'visitor-records', label: 'Visitor Records', icon: ClipboardList, path: '/dashboard/records' },
    { id: 'check-in', label: 'Check In/Out', icon: Clock, path: '/dashboard/check-in' },
    { id: 'settings', label: 'Settings', icon: Settings, path: '/dashboard/settings' }
  ];

 
const HomeContent = () => {
  const currentHour = new Date().getHours();
  let greeting = '';
  
  if (currentHour < 12) greeting = 'Good Morning';
  else if (currentHour < 17) greeting = 'Good Afternoon';
  else greeting = 'Good Evening';

  const recentVisitors = [
    { name: 'John Smith', purpose: 'Client Meeting', time: '10:30 AM', status: 'Checked In'},
    { name: 'Sarah Johnson', purpose: 'Interview', time: '11:00 AM', status: 'Pending' },
    { name: 'Mike Brown', purpose: 'Vendor Meeting', time: '2:15 PM', status: 'Cancelled' }
  ];

  return (
    <div className="p-8">
      {/* Header with search and notifications */}
      <div className="flex justify-between items-center mb-8">
        <div>
          <h2 className="text-3xl font-bold text-gray-800">{greeting}!</h2>
          <p className="text-gray-600">Here's what's happening today</p>
        </div>
        <div className="flex items-center space-x-4">
          <div className="relative">
            <input
              type="text"
              placeholder="Search..."
              className="pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-teal-500"
            />
            <Search className="absolute left-3 top-2.5 text-gray-400" size={20} />
          </div>
          <button className="relative p-2 text-gray-400 hover:text-gray-500">
            <Bell size={20} />
            <span className="absolute top-0 right-0 h-2 w-2 bg-red-500 rounded-full"></span>
          </button>
        </div>
      </div>

      {/* Status Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <StatusCard
          title="Today's Visitors"
          value="24"
          icon={Users}
          color="blue"
        />
        <StatusCard
          title="Checked In"
          value="12"
          icon={CheckCircle}
          color="green"
        />
        <StatusCard
          title="Pending Approval"
          value="5"
          icon={AlertTriangle}
          color="yellow"
        />
        <StatusCard
          title="Total This Week"
          value="156"
          icon={TrendingUp}
          color="purple"
        />
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Recent Visitors Section */}
        <div className="lg:col-span-2 bg-white rounded-lg shadow-lg p-6">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-xl font-semibold">Recent Visitors</h3>
            <button className="text-teal-600 hover:text-teal-700 text-sm">View All</button>
          </div>
          <div className="space-y-4">
            {recentVisitors.map((visitor, index) => (
              <RecentVisitorCard key={index} {...visitor} />
            ))}
          </div>
        </div>

        {/* Quick Actions and Updates */}
        <div className="space-y-8">
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h3 className="text-xl font-semibold mb-4">Quick Actions</h3>
            <div className="space-y-3">
              <button className="w-full bg-teal-50 text-teal-700 py-2 px-4 rounded-lg hover:bg-teal-100 flex items-center">
                <Users size={18} className="mr-2" />
                Register New Visitor
              </button>
              <button className="w-full bg-blue-50 text-blue-700 py-2 px-4 rounded-lg hover:bg-blue-100 flex items-center">
                <Clock size={18} className="mr-2" />
                Quick Check-in
              </button>
              <button className="w-full bg-purple-50 text-purple-700 py-2 px-4 rounded-lg hover:bg-purple-100 flex items-center">
                <ClipboardList size={18} className="mr-2" />
                View Reports
              </button>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-lg p-6">
            <h3 className="text-xl font-semibold mb-4">System Updates</h3>
            <div className="space-y-4">
              <div className="border-l-4 border-teal-500 pl-4">
                <p className="text-sm font-medium text-gray-800">New Feature Release</p>
                <p className="text-sm text-gray-500">Mobile check-in now available</p>
                <p className="text-xs text-gray-400 mt-1">2 hours ago</p>
              </div>
              <div className="border-l-4 border-yellow-500 pl-4">
                <p className="text-sm font-medium text-gray-800">Scheduled Maintenance</p>
                <p className="text-sm text-gray-500">System update this weekend</p>
                <p className="text-xs text-gray-400 mt-1">1 day ago</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};


  const handleNavigation = (path, id) => {
    setActiveSection(id);
    navigate(path);
  };

  return (
    <div className="flex min-h-screen bg-gray-50 mt-40">
      {/* Sidebar */}
      <div className="w-64 bg-white shadow-lg">
        <div className="p-6">
          <h1 className="text-2xl font-bold text-teal-600">Visitor Management System</h1>
        </div>
        
        <nav className="mt-6">
          {menuItems.map((item) => {
            const Icon = item.icon;
            return (
              <button
                key={item.id}
                onClick={() => handleNavigation(item.path, item.id)}
                className={`w-full flex items-center px-6 py-3 space-x-4 ${
                  activeSection === item.id
                    ? 'bg-teal-50 border-r-4 border-teal-600 text-teal-600'
                    : 'text-gray-600 hover:bg-gray-50'
                }`}
              >
                <Icon size={20} />
                <span>{item.label}</span>
                {activeSection === item.id && <ChevronRight className="ml-auto" size={16} />}
              </button>
            );
          })}
        </nav>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-auto">
        <Routes>
          <Route path="/" element={<HomeContent />} />
          <Route path="/visitor-form" element={<VisitorForm />} />
          <Route path="/pre-arrival" element={<div className="p-6">Pre-Arrival Content</div>} />
          <Route path="/records" element={<div className="p-6">Visitor Records Content</div>} />
          <Route path="/check-in" element={<div className="p-6">Check In/Out Content</div>} />
          <Route path="/settings" element={<div className="p-6">Settings Content</div>} />
        </Routes>
      </div>
    </div>
  );
};

export default Dashboard;
