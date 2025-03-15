import React, { useState, useRef, useEffect } from 'react';
import { Camera } from 'lucide-react';
import { useNavigate } from 'react-router-dom';


const User = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(true); // Set to true for demonstration
  const [user, setUser] = useState({
    firstName: 'Sejal',
    lastName: 'Alle',
    email: 'allesejal@gmail.com',
    phone: '+91 8099328668',
    profileImage: '/api/placeholder/150/150'
  });
  const [showPhotoOptions, setShowPhotoOptions] = useState(false);
  const [showWebcam, setShowWebcam] = useState(false);
  const [stream, setStream] = useState(null);
  const fileInputRef = useRef(null);
  const videoRef = useRef(null);
  const photoRef = useRef(null);
  
  // Clean up webcam stream when component unmounts
  useEffect(() => {
    return () => {
      if (stream) {
        stream.getTracks().forEach(track => track.stop());
      }
    };
  }, [stream]);
  
  const handleSignOut = () => {
    setIsLoggedIn(false);
  };
  
  const handleProfileImageClick = () => {
    if (isLoggedIn) {
      setShowPhotoOptions(!showPhotoOptions);
    }
  };
  
  const handleTakePhoto = async () => {
    try {
      const mediaStream = await navigator.mediaDevices.getUserMedia({ video: true });
      setStream(mediaStream);
      setShowWebcam(true);
      setShowPhotoOptions(false);
    } catch (err) {
      console.error("Error accessing webcam:", err);
      alert("Could not access webcam. Please check permissions.");
    }
  };
  
  const handleUploadPhoto = () => {
    fileInputRef.current.click();
    setShowPhotoOptions(false);
  };
  
  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setUser({...user, profileImage: event.target.result});
      };
      reader.readAsDataURL(e.target.files[0]);
    }
  };
  
  useEffect(() => {
    if (videoRef.current && stream) {
      videoRef.current.srcObject = stream;
    }
  }, [stream, showWebcam]);
  
  const handleCaptureWebcam = () => {
    if (videoRef.current && photoRef.current) {
      const videoElement = videoRef.current;
      const canvas = photoRef.current;
      
      // Set canvas dimensions to match video
      canvas.width = videoElement.videoWidth;
      canvas.height = videoElement.videoHeight;
      
      // Draw video frame to canvas
      const context = canvas.getContext('2d');
      context.drawImage(videoElement, 0, 0, canvas.width, canvas.height);
      
      // Convert canvas to data URL
      const photoDataUrl = canvas.toDataURL('image/png');
      
      // Update profile image
      setUser({...user, profileImage: photoDataUrl});
      
      // Clean up
      stream.getTracks().forEach(track => track.stop());
      setStream(null);
      setShowWebcam(false);
    }
  };
  
  const closeWebcam = () => {
    if (stream) {
      stream.getTracks().forEach(track => track.stop());
    }
    setStream(null);
    setShowWebcam(false);
  };

  const logout = () => {
    localStorage.removeItem("isLoggedIn"); // Remove the login status
    setIsLoggedIn(false); // Update state to reflect logout
 
  };
  const navigate = useNavigate();


  
  
  if (!isLoggedIn) {
    return (
      <div className="flex flex-col items-center justify-center h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
        <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
          <h2 className="text-3xl font-bold text-center mb-6 text-indigo-800">Please Login</h2>
          <p className="text-center mb-6 text-gray-600">You need to be logged in to view your profile.</p>
          <button
          className="w-full bg-indigo-600 text-white py-3 rounded-md hover:bg-indigo-700 transition-colors duration-300 font-medium text-lg"
          onClick={() => navigate('/login')}
        >
          Login
        </button>
    
        </div>
      </div>
    );
  }
  
  return (
    <div className="bg-gradient-to-br from-blue-50 to-indigo-100 min-h-screen p-8">
      <div className="max-w-6xl mx-auto bg-white rounded-xl shadow-lg p-8 relative overflow-hidden">
        {/* Background decoration */}
        <div className="absolute top-0 right-0 opacity-10 pointer-events-none">
          <svg width="400" height="400" viewBox="0 0 100 100">
            <circle cx="75" cy="25" r="20" fill="currentColor" className="text-indigo-500" />
            <circle cx="80" cy="80" r="30" fill="currentColor" className="text-blue-400" />
            <path d="M10 90 Q 50 10, 90 90" fill="none" stroke="currentColor" strokeWidth="2" className="text-indigo-600" />
          </svg>
        </div>
        
        <div className="flex flex-col md:flex-row relative z-10">
          {/* Sidebar */}
          <div className="md:w-1/4 border-b md:border-b-0 md:border-r border-indigo-100 pb-6 mb-6 md:pb-0 md:mb-0 md:pr-8">
            <h2 className="font-bold text-xl text-indigo-800 mb-6">User Profile</h2>
            <ul className="space-y-4">
              <li className="text-gray-700 hover:text-indigo-600 transition-colors cursor-pointer font-medium">Orders</li>
              <li className="text-gray-700 hover:text-indigo-600 transition-colors cursor-pointer font-medium">Subscriptions</li>
              <li className="text-gray-700 hover:text-indigo-600 transition-colors cursor-pointer font-medium">Address</li>
              <li className="text-gray-700 hover:text-indigo-600 transition-colors cursor-pointer font-medium">Payments</li>
              <li className="text-gray-700 hover:text-indigo-600 transition-colors cursor-pointer font-medium">Wishlist</li>
            </ul>
            <div className="mt-12">
              <button 
                onClick={logout}
                className="flex items-center text-red-500 hover:text-red-700 transition-colors font-medium"
              >
                <span className="mr-2">⟵</span> Sign out
              </button>
            </div>
          </div>
          
          {/* Main Content */}
          <div className="md:w-3/4 md:pl-8">
            <div className="mb-8">
              <h1 className="text-2xl font-bold text-indigo-800">User Profile</h1>
              <p className="text-gray-600">Manage your details, view your tier status and change your password.</p>
            </div>
            
            {/* Profile Image and Name */}
            <div className="flex flex-col sm:flex-row items-center mb-12">
              <div className="relative group">
                <div 
                  className="w-32 h-32 rounded-full bg-gradient-to-br from-indigo-400 to-blue-500 p-1 overflow-hidden cursor-pointer shadow-lg"
                  onClick={handleProfileImageClick}
                >
                  <img 
                    src={user.profileImage} 
                    alt="Profile" 
                    className="w-full h-full object-cover rounded-full"
                  />
                  <div className="absolute inset-0 bg-black bg-opacity-30 opacity-0 group-hover:opacity-100 flex items-center justify-center rounded-full transition-opacity">
                    <Camera size={32} className="text-white" />
                  </div>
                </div>
                {showPhotoOptions && (
                  <div className="absolute top-full left-0 mt-4 bg-white shadow-xl rounded-lg p-3 w-56 z-10 border border-indigo-100">
                    <button 
                      onClick={handleTakePhoto}
                      className="block w-full text-left px-4 py-3 hover:bg-indigo-50 rounded-md text-indigo-700 font-medium"
                    >
                      Take photo
                    </button>
                    <button 
                      onClick={handleUploadPhoto}
                      className="block w-full text-left px-4 py-3 hover:bg-indigo-50 rounded-md text-indigo-700 font-medium"
                    >
                      Upload photo
                    </button>
                    <input 
                      type="file" 
                      ref={fileInputRef} 
                      onChange={handleFileChange} 
                      className="hidden" 
                      accept="image/*"
                    />
                  </div>
                )}
              </div>
              <div className="mt-4 sm:mt-0 sm:ml-6 text-center sm:text-left">
                <h2 className="text-2xl font-bold text-gray-800">{user.firstName} {user.lastName}</h2>
                <p className="text-indigo-600 text-lg">{user.phone}</p>
              </div>
            </div>
            
            {/* Webcam Modal */}
            {showWebcam && (
              <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4">
                <div className="bg-white p-6 rounded-xl max-w-2xl w-full shadow-2xl">
                  <h3 className="text-2xl font-bold mb-4 text-indigo-800">Take a Profile Photo</h3>
                  <div className="bg-gray-900 rounded-lg overflow-hidden mb-6">
                    <video 
                      ref={videoRef}
                      autoPlay
                      className="w-full h-full"
                    />
                    <canvas ref={photoRef} className="hidden" />
                  </div>
                  <div className="flex justify-between">
                    <button 
                      onClick={closeWebcam}
                      className="px-6 py-3 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-100 font-medium"
                    >
                      Cancel
                    </button>
                    <button 
                      onClick={handleCaptureWebcam}
                      className="px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 font-medium"
                    >
                      Capture Photo
                    </button>
                  </div>
                </div>
              </div>
            )}
            
            {/* General Information */}
            <div className="border border-indigo-100 rounded-xl p-8 mb-8 bg-white shadow-md hover:shadow-lg transition-shadow">
              <h3 className="text-xl font-bold mb-6 text-indigo-800">General Information</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <p className="text-gray-500 mb-1">First name</p>
                  <p className="text-lg font-medium">{user.firstName}</p>
                </div>
                <div>
                  <p className="text-gray-500 mb-1">Last name</p>
                  <p className="text-lg font-medium">{user.lastName}</p>
                </div>
              </div>
              <button className="mt-6 px-6 py-2 bg-indigo-100 text-indigo-700 rounded-lg hover:bg-indigo-200 transition-colors font-medium">
                Update
              </button>
            </div>
            
            {/* Security Section */}
            <div className="border border-indigo-100 rounded-xl p-8 bg-white shadow-md hover:shadow-lg transition-shadow">
              <h3 className="text-xl font-bold mb-6 text-indigo-800">Security</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
                <div>
                  <p className="text-gray-500 mb-1">Email</p>
                  <p className="text-lg font-medium">{user.email}</p>
                </div>
                <div>
                  <p className="text-gray-500 mb-1">Password</p>
                  <p className="text-lg font-medium">••••••</p>
                </div>
                <div>
                  <p className="text-gray-500 mb-1">Phone number</p>
                  <p className="text-lg font-medium">{user.phone}</p>
                </div>
              </div>
              <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
                <button className="px-6 py-3 border border-indigo-300 rounded-lg text-indigo-700 hover:bg-indigo-50 transition-colors font-medium">
                  Change password
                </button>
                <button className="px-6 py-3 border border-indigo-300 rounded-lg text-indigo-700 hover:bg-indigo-50 transition-colors font-medium">
                  Change phone number
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default User;