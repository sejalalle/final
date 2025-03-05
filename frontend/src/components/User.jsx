import React, { useState } from 'react';

const User = () => {
  // Sample activity data
  const initialActivities = [
    {
      id: 1,
      type: 'task',
      title: 'Completed dashboard redesign',
      project: 'Marketing Website',
      date: new Date(2025, 1, 24, 14, 30),
      description: 'Finalized the new dashboard layout with improved analytics visualization'
    },
    {
      id: 2,
      type: 'comment',
      title: 'Commented on a task',
      project: 'Mobile App',
      date: new Date(2025, 1, 24, 10, 15),
      description: 'I think we should use a card-based layout for the feed to improve scannability'
    },
    {
      id: 3,
      type: 'project',
      title: 'Created new project',
      project: 'Customer Portal',
      date: new Date(2025, 1, 23, 16, 45),
      description: 'Started a new project for redesigning the customer self-service portal'
    },
    {
      id: 4,
      type: 'task',
      title: 'Updated user flows',
      project: 'Mobile App',
      date: new Date(2025, 1, 22, 9, 0),
      description: 'Revised user flows based on latest user testing feedback'
    },
    {
      id: 5,
      type: 'comment',
      title: 'Commented on a design',
      project: 'Design System',
      date: new Date(2025, 1, 21, 11, 30),
      description: 'The new button design looks great, but I think we need to adjust the padding'
    }
  ];

  // State for activities and filter
  const [activities, setActivities] = useState(initialActivities);
  const [filter, setFilter] = useState('All Activity');
  const [visibleActivities, setVisibleActivities] = useState(3);

  // Filter activities based on selected filter
  const filteredActivities = filter === 'All Activity' 
    ? activities 
    : activities.filter(activity => activity.type === filter.toLowerCase().slice(0, -1));

  // Handle load more button click
  const handleLoadMore = () => {
    setVisibleActivities(prev => Math.min(prev + 3, filteredActivities.length));
  };

  // Format date with relative time (today, yesterday, or date)
  const formatDate = (date) => {
    const now = new Date();
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);
    
    if (date >= today) {
      return `Today at ${date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })};`
    } else if (date >= yesterday) {
      return `Yesterday at ${date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })};`
    } else {
      return date.toLocaleDateString([], { month: 'short', day: 'numeric' }) + 
        ` at ${date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`;
    }
  };

  // Activity icon based on type
  const ActivityIcon = ({ type }) => {
    switch(type) {
      case 'task':
        return (
          <div className="h-8 w-8 rounded-full bg-green-100 flex items-center justify-center">
            <svg className="h-5 w-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4"></path>
            </svg>
          </div>
        );
      case 'comment':
        return (
          <div className="h-8 w-8 rounded-full bg-blue-100 flex items-center justify-center">
            <svg className="h-5 w-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"></path>
            </svg>
          </div>
        );
      case 'project':
        return (
          <div className="h-8 w-8 rounded-full bg-purple-100 flex items-center justify-center">
            <svg className="h-5 w-5 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z"></path>
            </svg>
          </div>
        );
      default:
        return (
          <div className="h-8 w-8 rounded-full bg-gray-100 flex items-center justify-center">
            <svg className="h-5 w-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path>
            </svg>
          </div>
        );
    }
  };

  return (
    <div className="bg-gray-100 min-h-screen">
      {/* Navigation */}
      <nav className="bg-white shadow-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex">
              <div className="flex-shrink-0 flex items-center">
                {/* Logo placeholder */}
                <div className="h-8 w-8 bg-indigo-600 rounded-full"></div>
                <span className="ml-2 font-bold text-lg">ProfileHub</span>
              </div>
            </div>
            <div className="flex items-center">
              <div className="flex items-center space-x-4">
                <button className="text-gray-500 hover:text-gray-700">
                  <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"></path>
                  </svg>
                </button>
                <div className="flex items-center">
                  <img className="h-8 w-8 rounded-full" src="/api/placeholder/32/32" alt="User avatar" />
                  <span className="ml-2 font-medium">John Doe</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
        {/* Profile Header */}
        <div className="bg-white shadow overflow-hidden sm:rounded-lg mb-6">
          <div className="px-4 py-5 sm:px-6 flex justify-between items-center">
            <div className="flex items-center">
              <img className="h-16 w-16 rounded-full" src="/api/placeholder/64/64" alt="User profile" />
              <div className="ml-4">
                <h1 className="text-2xl font-bold text-gray-900">John Doe</h1>
                <p className="text-sm text-gray-500">@johndoe • Joined Jan 2023</p>
              </div>
            </div>
            <button className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-md text-sm font-medium">
              Edit Profile
            </button>
          </div>
          <div className="border-t border-gray-200">
            <dl>
              <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt className="text-sm font-medium text-gray-500">
                  Email address
                </dt>
                <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                  john.doe@example.com
                </dd>
              </div>
              <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt className="text-sm font-medium text-gray-500">
                  Location
                </dt>
                <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                  San Francisco, CA
                </dd>
              </div>
              <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt className="text-sm font-medium text-gray-500">
                  Bio
                </dt>
                <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                  Product designer and developer passionate about creating intuitive user experiences.
                </dd>
              </div>
            </dl>
          </div>
        </div>

        {/* Stats Summary */}
        <div className="grid grid-cols-1 gap-6 md:grid-cols-4 mb-6">
          <div className="bg-white overflow-hidden shadow rounded-lg">
            <div className="px-4 py-5 sm:p-6">
              <dt className="text-sm font-medium text-gray-500 truncate">Customized Boxes</dt>
              <dd className="mt-1 text-3xl font-semibold text-gray-900">142</dd>
            </div>
          </div>

          <div className="bg-white overflow-hidden shadow rounded-lg">
            <div className="px-4 py-5 sm:p-6">
              <dt className="text-sm font-medium text-gray-500 truncate">Add To cart</dt>
              <dd className="mt-1 text-3xl font-semibold text-gray-900">89</dd>
            </div>
          </div>

          <div className="bg-white overflow-hidden shadow rounded-lg">
            <div className="px-4 py-5 sm:p-6">
              <dt className="text-sm font-medium text-gray-500 truncate">Comments</dt>
              <dd className="mt-1 text-3xl font-semibold text-gray-900">37</dd>
            </div>
          </div>

          <div className="bg-white overflow-hidden shadow rounded-lg">
            <div className="px-4 py-5 sm:p-6">
              <dt className="text-sm font-medium text-gray-500 truncate">My Order</dt>
              <dd className="mt-1 text-3xl font-semibold text-gray-900">412</dd>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="border-b border-gray-200 mb-6">
          <nav className="-mb-px flex">
            <a href="#" className="border-indigo-500 text-indigo-600 whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm" aria-current="page">
              Activity
            </a>
            <a href="#" className="border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm ml-8">
              Projects
            </a>
            <a href="#" className="border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm ml-8">
              Teams
            </a>
            <a href="#" className="border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm ml-8">
              Settings
            </a>
          </nav>
        </div>

        {/* Activity Filter */}
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-lg font-medium text-gray-900">Activity History</h2>
          <div className="relative inline-flex shadow-sm rounded-md">
            <select 
              className="block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
              value={filter}
              onChange={(e) => {
                setFilter(e.target.value);
                setVisibleActivities(3);
              }}
            >
              <option>All Activity</option>
              <option>Tasks</option>
              <option>Comments</option>
              <option>Projects</option>
            </select>
          </div>
        </div>

        {/* Activity Timeline */}
        <div className="bg-white shadow overflow-hidden sm:rounded-lg mb-6">
          <ul className="divide-y divide-gray-200">
            {filteredActivities.slice(0, visibleActivities).map((activity) => (
              <li key={activity.id} className="p-4 hover:bg-gray-50">
                <div className="flex space-x-3">
                  <ActivityIcon type={activity.type} />
                  <div className="flex-1 space-y-1">
                    <div className="flex items-center justify-between">
                      <h3 className="text-sm font-medium">{activity.title}</h3>
                      <p className="text-sm text-gray-500">{formatDate(activity.date)}</p>
                    </div>
                    <p className="text-sm text-gray-500">
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-indigo-100 text-indigo-800 mr-2">
                        {activity.project}
                      </span>
                      {activity.description}
                    </p>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>

        {/* Load More Button */}
        {visibleActivities < filteredActivities.length && (
          <div className="flex justify-center">
            <button 
              onClick={handleLoadMore}
              className="mt-4 bg-white hover:bg-gray-50 text-indigo-600 font-medium py-2 px-4 border border-gray-300 rounded-md shadow-sm"
            >
              Load More Activity
            </button>
          </div>
        )}
      </main>
    </div>
  );
};

export default User;