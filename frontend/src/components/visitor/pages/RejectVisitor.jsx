import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const RejectVisitor = () => {
  const { srNo } = useParams();
  const [message, setMessage] = useState('');

  useEffect(() => {
    const rejectVisitor = async () => {
      try {
        const response = await axios.patch(`http://localhost:5000/api/visitors/${srNo}/reject`);
        setMessage(response.data.message);
      } catch (error) {
        setMessage('Error rejecting visitor');
      }
    };

    rejectVisitor();
  }, [srNo]);

  return (
    <div style={{ textAlign: 'center', padding: '20px' }}>
      <h2>{message || 'Rejecting visitor...'}</h2>
    </div>
  );
};

export default RejectVisitor;