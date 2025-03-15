import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Alert, Container, CircularProgress, Button, Typography } from '@mui/material';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';

const ApprovalHandler = ({ type }) => {
  const { visitorId } = useParams();
  const navigate = useNavigate();
  const [status, setStatus] = useState('processing');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const handleResponse = async () => {
      try {
        await updateVisitorStatus(visitorId, type);
        setStatus('success');
      } catch (error) {
        console.error('Error updating visitor status:', error);
        setStatus('error');
      } finally {
        setLoading(false);
      }
    };

    handleResponse();

    return () => {
      setStatus('processing');
    };
  }, [visitorId, type, navigate]);

  const updateVisitorStatus = async (srNo, type) => {
    const response = await fetch(`/api/visitor/${srNo}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ status: type === 'approve' ? 'approved' : 'rejected' }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Failed to update visitor status');
    }

    return response.json();
  };

  return (
    <Container maxWidth="sm" sx={{ mt: 4, textAlign: 'center' }}>
      {loading && <CircularProgress />}
      {status === 'success' && (
        <>
          {type === 'approve' ? (
            <CheckCircleOutlineIcon sx={{ fontSize: 60, color: 'green' }} />
          ) : (
            <HighlightOffIcon sx={{ fontSize: 60, color: 'red' }} />
          )}
          <Typography variant="h5" sx={{ mt: 2 }}>
            Visitor has been {type === 'approve' ? 'approved' : 'rejected'} successfully!
          </Typography>
        </>
      )}
      {status === 'error' && (
        <Alert severity="error">
          An error occurred while updating the visitor status. Please try again.
        </Alert>
      )}
      {status !== 'processing' && (
        <>
        {type === 'approve' ? (
          <CheckCircleOutlineIcon sx={{ fontSize: 60, color: 'green' }} />
        ) : (
          <HighlightOffIcon sx={{ fontSize: 60, color: 'red' }} />
        )}
        <Typography variant="h5" sx={{ mt: 2 }}>
          Visitor has been {type === 'approve' ? 'approved' : 'rejected'} successfully!
        </Typography>
      </>
      )}
    </Container>
  );
};

export default ApprovalHandler;