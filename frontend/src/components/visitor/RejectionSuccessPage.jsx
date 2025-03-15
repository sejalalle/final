import React from 'react';
import { useParams } from 'react-router-dom';

const RejectionSuccessPage = () => {
  const { id } = useParams();
  
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 p-4">
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full text-center">
        <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </div>
        <h2 className="text-2xl font-bold text-gray-800 mb-2">Visitor Rejected</h2>
        <p className="text-gray-600 mb-6">
          You have rejected this visitor request. The administrator has been notified.
        </p>
        <p className="text-sm text-gray-500">
          Visitor ID: {id}
        </p>
      </div>
    </div>
  );
};

export default RejectionSuccessPage;
