import React, { useState, useRef } from 'react';
import { ChevronLeft, ChevronRight, Camera, Save, Printer, Download } from 'lucide-react';
import { jsPDF } from 'jspdf';
import emailjs from '@emailjs/browser';
import WebcamCapture from './WebcamCapture';
import VisitorPass from './VisitorPass1'; // Ensure this is the correct import
import html2canvas from 'html2canvas'; // Import html2canvas

const VisitorForm = ({ onSubmitSuccess }) => {
  const [activeStep, setActiveStep] = useState(0);
  const [showSuccess, setShowSuccess] = useState(false);
  const [errors, setErrors] = useState({});
  const [emailStatus, setEmailStatus] = useState('');
  
  const [visitorData, setVisitorData] = useState({
    srNo: '',
    date: new Date().toISOString().split('T')[0],
    timeIn: '',
    timeOut: '',
    visitorName: '',
    visitorAddress: '',
    purpose: '',
    contactPerson: '',
    contactEmail: '',
    visitorType: '',
    idNumber: '',
    photo: '',
    department: '',
    phone: ''
  });

  const steps = ['Personal Details', 'Visit Information', 'Photo & Declaration', 'Preview'];

  const validateForm = () => {
    const newErrors = {};
    
    if (!visitorData.visitorName) newErrors.visitorName = 'Name is required';
    if (!visitorData.visitorAddress) newErrors.visitorAddress = 'Address is required';
    if (!visitorData.phone) newErrors.phone = 'Phone number is required';
    if (!visitorData.idNumber) newErrors.idNumber = 'ID number is required';
    if (!visitorData.purpose) newErrors.purpose = 'Purpose is required';
    if (!visitorData.contactPerson) newErrors.contactPerson = 'Contact person is required';
    if (!visitorData.contactEmail) {
      newErrors.contactEmail = 'Email is required';
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(visitorData.contactEmail)) {
      newErrors.contactEmail = 'Invalid email address';
    }
    if (!visitorData.department) newErrors.department = 'Department is required';
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const sendApprovalEmail = async () => {
    try {
      const templateParams = {
        to_email: visitorData.contactEmail,
        to_name: visitorData.contactPerson,
        visitor_name: visitorData.visitorName,
        visitor_purpose: visitorData.purpose,
        visit_date: visitorData.date,
        visit_time: visitorData.timeIn,
        department: visitorData.department,
        approve_link: `${window.location.origin}/approve-visitor/${visitorData.srNo}`,
        reject_link: `${window.location.origin}/reject-visitor/${visitorData.srNo}`
      };

      const response = await emailjs.send(
        import.meta.env.VITE_EMAILJS_SERVICE_ID,
        import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
        templateParams,
        import.meta.env.VITE_EMAILJS_PUBLIC_KEY
      );

      return response.status === 200; // Check if the response status is OK
    } catch (error) {
      console.error('Error sending email:', error);
      return false; // Return false if there was an error
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    const isPasswordValid = validatePassword(formData.password);
    const isConfirmPasswordValid = validateConfirmPassword(formData.confirmPassword);
  
    if (!isPasswordValid || !isConfirmPasswordValid) return;
  
    setIsLoading(true);
    try {
      console.log('Form Data:', formData); // Log form data
  
      const response = await fetch('http://localhost:5000/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
  
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
  
      const data = await response.json();
      console.log('Backend Response:', data); // Log backend response
  
      if (data.success && data.user) {
        onSignUpSuccess(data.user);
        navigate('/login');
      } else {
        console.error('Sign up failed:', data.message || 'Unknown error');
        setErrors((prev) => ({ ...prev, general: data.message || 'Sign up failed. Please try again.' }));
      }
    } catch (error) {
      console.error('Sign up failed:', error);
      setErrors((prev) => ({ ...prev, general: 'Sign up failed. Please try again.' }));
    } finally {
      setIsLoading(false);
    }
  };

  const visitorPassRef = useRef(null);

  const handlePrint = async () => {
    const printContent = visitorPassRef.current;
    if (!printContent) {
      console.error("Visitor Pass element not found!");
      return;
    }

    try {
      // Add print-specific styles
      const style = document.createElement('style');
      style.textContent = `
        @media print {
          body * {
            visibility: hidden;
          }
          #visitor-pass-content, #visitor-pass-content * {
            visibility: visible;
          }
          #visitor-pass-content {
            position: absolute;
            left: 0;
            top: 0;
            width: 100%;
          }
        }
      `;
      document.head.appendChild(style);

      window.print();

      // Clean up
      document.head.removeChild(style);
    } catch (error) {
      console.error('Error printing:', error);
    }
  };

  const handleDownloadPDF = async () => {
    const printContent = visitorPassRef.current;
    if (!printContent) {
      console.error("Visitor Pass element not found!");
      return;
    }

    try {
      const canvas = await html2canvas(printContent, {
        scale: 2, // Higher quality
        useCORS: true,
        logging: false,
        allowTaint: true,
        backgroundColor: '#ffffff',
        windowWidth: printContent.scrollWidth,
        windowHeight: printContent.scrollHeight,
        onclone: (clonedDoc) => {
          // Ensure all images are loaded
          const images = clonedDoc.getElementsByTagName('img');
          for (let img of images) {
            img.crossOrigin = "anonymous";
          }
        }
      });

      const imgData = canvas.toDataURL('image/png', 1.0);
      const pdf = new jsPDF({
        orientation: 'portrait',
        unit: 'mm',
        format: 'a4',
        compress: true
      });

      const pageWidth = pdf.internal.pageSize.getWidth();
      const pageHeight = pdf.internal.pageSize.getHeight();
      const imgWidth = pageWidth - 20; // 10mm margins
      const imgHeight = (canvas.height * imgWidth) / canvas.width;

      // Center the image
      const x = 10;
      const y = (pageHeight - imgHeight) / 2;

      pdf.addImage(imgData, 'PNG', x, y, imgWidth, imgHeight, '', 'FAST');
      pdf.save(`visitor-pass-${visitorData.visitorName || 'unnamed'}.pdf`);
    } catch (error) {
      console.error('Error generating PDF:', error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setVisitorData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }
  };

  const handlePhotoCapture = (imageData) => {
    setVisitorData((prevData) => ({
      ...prevData,
      photo: imageData
    }));
  };

  const handleNext = () => {
    if (activeStep === steps.length - 2 && !validateForm()) return;
    setActiveStep((prevStep) => prevStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevStep) => prevStep - 1);
  };

  const renderStepContent = (step) => {
    switch (step) {
      case 0:
        return (
          <div className="space-y-6">
            <h3 className="text-xl font-semibold text-gray-800 flex items-center">
              <span className="bg-teal-50 p-2 rounded-lg mr-2">
                <svg className="w-6 h-6 text-teal-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
              </span>
              Personal Information
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">Visitor Name</label>
                <input
                  type="text"
                  name="visitorName"
                  value={visitorData.visitorName}
                  onChange={handleInputChange}
                  className={`w-full px-4 py-2 border ${errors.visitorName ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent`}
                  placeholder="Enter full name"
                />
                {errors.visitorName && <p className="text-red-500 text-sm mt-1">{errors.visitorName}</p>}
              </div>
              
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">Phone Number</label>
                <input
                  type="tel"
                  name="phone"
                  value={visitorData.phone}
                  onChange={handleInputChange}
                  className={`w-full px-4 py-2 border ${errors.phone ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent`}
                  placeholder="Enter phone number"
                />
                {errors.phone && <p className="text-red-500 text-sm mt-1">{errors.phone}</p>}
              </div>
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">Address</label>
              <textarea
                name="visitorAddress"
                value={visitorData.visitorAddress}
                onChange={handleInputChange}
                className={`w-full px-4 py-2 border ${errors.visitorAddress ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent`}
                rows="3"
                placeholder="Enter complete address"
              ></textarea>
              {errors.visitorAddress && <p className="text-red-500 text-sm mt-1">{errors.visitorAddress}</p>}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">Visitor Type</label>
                <select 
                  name="visitorType"
                  value={visitorData.visitorType}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                >
                  <option value="">Select type</option>
                  <option value="supplier">Supplier</option>
                  <option value="visitor">Visitor</option>
                  <option value="contractor">Contractor</option>
                  <option value="other">Other</option>
                </select>
              </div>

              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">ID Number</label>
                <input
                  type="text"
                  name="idNumber"
                  value={visitorData.idNumber}
                  onChange={handleInputChange}
                  className={`w-full px-4 py-2 border ${errors.idNumber ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent`}
                  placeholder="Enter ID number"
                />
                {errors.idNumber && <p className="text-red-500 text-sm mt-1">{errors.idNumber}</p>}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">Department</label>
                <input
                  type="text"
                  name="department"
                  value={visitorData.department}
                  onChange={handleInputChange}
                  className={`w-full px-4 py-2 border ${errors.department ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent`}
                  placeholder="Enter department"
                />
                {errors.department && <p className="text-red-500 text-sm mt-1">{errors.department}</p>}
              </div>

              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">Contact Person</label>
                <input
                  type="text"
                  name="contactPerson"
                  value={visitorData.contactPerson}
                  onChange={handleInputChange}
                  className={`w-full px-4 py-2 border ${errors.contactPerson ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent`}
                  placeholder="Enter contact person name"
                />
                {errors.contactPerson && <p className="text-red-500 text-sm mt-1">{errors.contactPerson}</p>}
              </div>
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">Contact Person Email</label>
              <input
                type="email"
                name="contactEmail"
                value={visitorData.contactEmail}
                onChange={handleInputChange}
                className={`w-full px-4 py-2 border ${errors.contactEmail ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent`}
                placeholder="Enter contact person email"
              />
              {errors.contactEmail && <p className="text-red-500 text-sm mt-1">{errors.contactEmail}</p>}
            </div>
          </div>
        );

      case 1:
        return (
          <div className="space-y-6">
            <h3 className="text-xl font-semibold text-gray-800 flex items-center">
              <span className="bg-teal-50 p-2 rounded-lg mr-2">
                <svg className="w-6 h-6 text-teal-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </span>
              Visit Information
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">Date</label>
                <input
                  type="date"
                  name="date"
                  value={visitorData.date}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                />
              </div>

              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">Time In</label>
                <input
                  type="time"
                  name="timeIn"
                  value={visitorData.timeIn}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                />
              </div>

              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">Time Out</label>
                <input
                  type="time"
                  name="timeOut"
                  value={visitorData.timeOut}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">Purpose of Visit</label>
              <textarea
                name="purpose"
                value={visitorData.purpose}
                onChange={handleInputChange}
                className={`w-full px-4 py-2 border ${errors.purpose ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent`}
                rows="3"
                placeholder="Enter purpose of visit"
              ></textarea>
              {errors.purpose && <p className="text-red-500 text-sm mt-1">{errors.purpose}</p>}
            </div>
          </div>
        );

      case 2:
        return (
          <div className="space-y-6">
            <h3 className="text-xl font-semibold text-gray-800 flex items-center">
              <span className="bg-teal-50 p-2 rounded-lg mr-2">
                <Camera className="w-6 h-6 text-teal-600" />
              </span>
              Photo & Declaration
            </h3>

            <div className="flex flex-col items-center space-y-4">
              <WebcamCapture onPhotoCapture={handlePhotoCapture} />
            </div>

            <div className="bg-gray-50 p-6 rounded-lg">
              <h4 className="font-medium text-gray-800 mb-2">Declaration</h4>
              <p className="text-sm text-gray-600">
                I hereby declare that the information provided is true and correct. I also understand and agree to follow all the company's visitor policies and guidelines during my visit.
              </p>
            </div>
          </div>
        );

      case 3:
        return (
          <div className="space-y-6">
            <h3 className="text-xl font-semibold text-gray-800 flex items-center">
              <span className="bg-teal-50 p-2 rounded-lg mr-2">
                <svg className="w-6 h-6 text-teal-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </span>
              Preview
            </h3>

            <div className="bg-white p-6 rounded-lg shadow-lg" id="visitor-pass-content">
              <VisitorPass visitorData={visitorData} printRef={visitorPassRef} />
            </div>

            <div className="flex justify-center space-x-4">
              <button 
                onClick={handleSubmit}
                className="flex items-center px-4 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition-colors"
                disabled={emailStatus === 'sending'}
              >
                <Save className="w-5 h-5 mr-2" />
                {emailStatus === 'sending' ? 'Sending...' : 'Save & Send Approval'}
              </button>
              <button 
                onClick={handlePrint}
                className="flex items-center px-4 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition-colors"
              >
                <Printer className="w-5 h-5 mr-2" />
                Print Pass
              </button>
              <button 
                onClick={handleDownloadPDF}
                className="flex items-center px-4 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition-colors"
              >
                <Download className="w-5 h-5 mr-2" />
                Download PDF
              </button>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8 mt-20">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
          <div className="px-8 py-6">
            <h2 className="text-3xl font-bold text-gray-900 mb-8">Visitor Entry Form</h2>
            
            {/* Stepper */}
            <div className="mb-8">
              <div className="flex items-center justify-between">
                {steps.map((step, index) => (
                  <div key={step} className="flex items-center">
                    <div className={`flex items-center justify-center w-10 h-10 rounded-full ${
                      index <= activeStep ? 'bg-teal-600 text-white' : 'bg-gray-200 text-gray-600'
                    }`}>
                      {index + 1}
                    </div>
                    <div className="ml-4">
                      <p className="text-sm font-medium text-gray-900">{step}</p>
                    </div>
                    {index < steps.length - 1 && (
                      <div className="ml-4 flex-grow border-t-2 border-gray-200 w-24" />
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Form Content */}
            <div className="mb-8">
              {renderStepContent(activeStep)}
            </div>

            {/* Navigation Buttons */}
            <div className="flex justify-between pt-6 border-t border-gray-200">
              <button
                onClick={handleBack}
                disabled={activeStep === 0}
                className={`flex items-center px-6 py-2 rounded-lg ${
                  activeStep === 0
                    ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                    : 'bg-teal-600 text-white hover:bg-teal-700'
                }`}
              >
                <ChevronLeft className="w-5 h-5 mr-2" />
                Back
              </button>
              
              {activeStep === steps.length - 1 ? (
                <button
                  onClick={handleSubmit}
                  className="flex items-center px-6 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700"
                  disabled={emailStatus === 'sending'}
                >
                  <Save className="w-5 h-5 mr-2" />
                  {emailStatus === 'sending' ? 'Sending...' : 'Submit'}
                </button>
              ) : (
                <button
                  onClick={handleNext}
                  className="flex items-center px-6 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700"
                >
                  Next
                  <ChevronRight className="w-5 h-5 ml-2" />
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
      
      {showSuccess && (
        <div className="max-w-4xl mx-auto mt-4">
          <div className="bg-green-50 border border-green-200 text-green-800 rounded-lg p-4">
            <p className="flex items-center">
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
              </svg>
              Visitor information saved and approval email sent successfully!
            </p>
          </div>
        </div>
      )}
    </div>
    
  );
}

export default VisitorForm;