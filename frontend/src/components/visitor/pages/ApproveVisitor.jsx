import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const ApproveVisitor = () => {
  const { srNo } = useParams();
  const [message, setMessage] = useState('');

  useEffect(() => {
    const approveVisitor = async () => {
      try {
        const response = await axios.patch(`http://localhost:5000/api/visitors/${srNo}/approve`);
        setMessage(response.data.message);
      } catch (error) {
        setMessage('Error approving visitor');
      }
    };

    approveVisitor();
  }, [srNo]);

  return (
    <div style={{ textAlign: 'center', padding: '20px' }}>
      <h2>{message || 'Approving visitor...'}</h2>
    </div>
  );
};

export default ApproveVisitor;