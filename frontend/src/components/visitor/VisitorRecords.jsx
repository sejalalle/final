import React, { useState, useEffect } from 'react';
import axios from 'axios'; // For making API requests
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  TextField,
  Button,
  Box,
  Typography,
  Chip,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  InputAdornment,
  Card,
  CardContent,
  Grid,
} from '@mui/material';
import {
  Search,
  FilterList,
  Visibility,
  Print,
  Close,
  CalendarToday,
} from '@mui/icons-material';
import { styled } from '@mui/material/styles';

// Styled components (unchanged)
const StyledTableContainer = styled(TableContainer)(({ theme }) => ({
  borderRadius: theme.spacing(2),
  boxShadow: '0 4px 20px rgba(0,0,0,0.05)',
  '& .MuiTableCell-head': {
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.primary.contrastText,
    fontWeight: 'bold',
  },
}));

const StyledSearchField = styled(TextField)(({ theme }) => ({
  '& .MuiOutlinedInput-root': {
    borderRadius: theme.spacing(2),
    backgroundColor: theme.palette.background.paper,
  },
}));

const VisitorRecords = () => {
  const [visitors, setVisitors] = useState([]); // Initialize as an empty array
  const [selectedVisitor, setSelectedVisitor] = useState(null); // State for selected visitor details
  const [filterDate, setFilterDate] = useState(new Date().toISOString().split('T')[0]); // State for date filter
  const [searchTerm, setSearchTerm] = useState(''); // State for search term
  const [showFilters, setShowFilters] = useState(false); // State for showing filters
  const [loading, setLoading] = useState(true); // State for loading
  const [error, setError] = useState(null); // State for error

  // Fetch visitor records from the API
  useEffect(() => {
    const fetchVisitors = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/visitors'); // Replace with your API endpoint

        // Check if the response is valid and contains the `data` property
        if (response.data && response.data.success && Array.isArray(response.data.data)) {
          setVisitors(response.data.data); // Set the visitors array from the `data` property
        } else {
          setError('Invalid data format received from the API.');
        }
      } catch (error) {
        setError('Failed to fetch visitor records. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchVisitors();
  }, []); // Empty dependency array ensures this runs only once on mount

  // Handle viewing visitor details
  const handleViewVisitor = (visitor) => {
    setSelectedVisitor(visitor);
  };

  // Handle closing the visitor details dialog
  const handleClose = () => {
    setSelectedVisitor(null);
  };

  // Handle printing visitor pass
  const handlePrintPass = (visitor) => {
    console.log('Printing pass for:', visitor.name);
    // Implement printing logic here (e.g., using window.print() or a library)
  };

  // Filter visitors based on search term and date
  const filteredVisitors = (visitors || []).filter((visitor) => {
    const name = visitor.name || '';
    const purpose = visitor.purpose || '';
    const contactPerson = visitor.contactPerson || '';

    const matchesSearch =
      name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      purpose.toLowerCase().includes(searchTerm.toLowerCase()) ||
      contactPerson.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesDate = filterDate ? (visitor.checkInTime || '').split('T')[0] === filterDate : true;

    return matchesSearch && matchesDate;
  });

  // Get status color for the chip
  const getStatusColor = (status) => {
    switch (status) {
      case 'completed':
        return 'success';
      case 'active':
        return 'primary';
      case 'pending':
        return 'warning';
      default:
        return 'default';
    }
  };

  return (
    <Box sx={{ p: 3 }}>
      {/* Header Section */}
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Typography variant="h5" color="primary">
          Visitor Records
        </Typography>

        <Box sx={{ display: 'flex', gap: 2 }}>
          <StyledSearchField
            size="small"
            placeholder="Search visitors..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Search color="action" />
                </InputAdornment>
              ),
            }}
          />

          <TextField
            type="date"
            size="small"
            value={filterDate}
            onChange={(e) => setFilterDate(e.target.value)}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <CalendarToday color="action" />
                </InputAdornment>
              ),
            }}
          />

          <Button
            variant="outlined"
            startIcon={<FilterList />}
            onClick={() => setShowFilters(!showFilters)}
          >
            Filters
          </Button>
        </Box>
      </Box>

      {/* Loading and Error States */}
      {loading ? (
        <Typography variant="body1" align="center" sx={{ py: 3 }}>
          Loading visitor records...
        </Typography>
      ) : error ? (
        <Typography variant="body1" color="error" align="center" sx={{ py: 3 }}>
          {error}
        </Typography>
      ) : (
        // Table Section
        <StyledTableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Name</TableCell>
                <TableCell>Email</TableCell>
                <TableCell>Phone</TableCell>
                <TableCell>Purpose</TableCell>
                <TableCell>Department</TableCell>
                <TableCell>Contact Person</TableCell>
                <TableCell>Check-In Time</TableCell>
                <TableCell>Status</TableCell>
                <TableCell align="center">Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredVisitors.map((visitor) => (
                <TableRow key={visitor._id}> {/* Use _id from MongoDB */}
                  <TableCell>{visitor.name || 'N/A'}</TableCell>
                  <TableCell>{visitor.email || 'N/A'}</TableCell>
                  <TableCell>{visitor.phone || 'N/A'}</TableCell>
                  <TableCell>{visitor.purpose || 'N/A'}</TableCell>
                  <TableCell>{visitor.department || 'N/A'}</TableCell>
                  <TableCell>{visitor.contactPerson || 'N/A'}</TableCell>
                  <TableCell>{visitor.checkInTime ? new Date(visitor.checkInTime).toLocaleString() : 'N/A'}</TableCell>
                  <TableCell>
                    <Chip
                      label={visitor.status || 'N/A'}
                      color={getStatusColor(visitor.status)}
                      size="small"
                    />
                  </TableCell>
                  <TableCell align="center">
                    <IconButton color="primary" onClick={() => handleViewVisitor(visitor)}>
                      <Visibility />
                    </IconButton>
                    <IconButton color="primary" onClick={() => handlePrintPass(visitor)}>
                      <Print />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </StyledTableContainer>
      )}

      {/* Visitor Details Dialog */}
      <Dialog open={Boolean(selectedVisitor)} onClose={handleClose} maxWidth="md" fullWidth>
        <DialogTitle>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            Visitor Details
            <IconButton onClick={handleClose}>
              <Close />
            </IconButton>
          </Box>
        </DialogTitle>
        <DialogContent dividers>
          {selectedVisitor && (
            <Grid container spacing={3}>
              <Grid item xs={12} md={4}>
                {/* Placeholder for visitor photo */}
                <Box
                  sx={{
                    width: '100%',
                    height: '200px',
                    backgroundColor: '#f5f5f5',
                    borderRadius: '8px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <Typography color="textSecondary">No Photo</Typography>
                </Box>
              </Grid>
              <Grid item xs={12} md={8}>
                <Card variant="outlined">
                  <CardContent>
                    <Grid container spacing={2}>
                      <Grid item xs={6}>
                        <Typography variant="subtitle2" color="textSecondary">
                          Name
                        </Typography>
                        <Typography variant="body1">{selectedVisitor.name || 'N/A'}</Typography>
                      </Grid>
                      <Grid item xs={6}>
                        <Typography variant="subtitle2" color="textSecondary">
                          Email
                        </Typography>
                        <Typography variant="body1">{selectedVisitor.email || 'N/A'}</Typography>
                      </Grid>
                      <Grid item xs={6}>
                        <Typography variant="subtitle2" color="textSecondary">
                          Phone
                        </Typography>
                        <Typography variant="body1">{selectedVisitor.phone || 'N/A'}</Typography>
                      </Grid>
                      <Grid item xs={6}>
                        <Typography variant="subtitle2" color="textSecondary">
                          Purpose
                        </Typography>
                        <Typography variant="body1">{selectedVisitor.purpose || 'N/A'}</Typography>
                      </Grid>
                      <Grid item xs={6}>
                        <Typography variant="subtitle2" color="textSecondary">
                          Department
                        </Typography>
                        <Typography variant="body1">{selectedVisitor.department || 'N/A'}</Typography>
                      </Grid>
                      <Grid item xs={6}>
                        <Typography variant="subtitle2" color="textSecondary">
                          Contact Person
                        </Typography>
                        <Typography variant="body1">{selectedVisitor.contactPerson || 'N/A'}</Typography>
                      </Grid>
                      <Grid item xs={6}>
                        <Typography variant="subtitle2" color="textSecondary">
                          Check-In Time
                        </Typography>
                        <Typography variant="body1">
                          {selectedVisitor.checkInTime ? new Date(selectedVisitor.checkInTime).toLocaleString() : 'N/A'}
                        </Typography>
                      </Grid>
                      <Grid item xs={6}>
                        <Typography variant="subtitle2" color="textSecondary">
                          Status
                        </Typography>
                        <Typography variant="body1">{selectedVisitor.status || 'N/A'}</Typography>
                      </Grid>
                    </Grid>
                  </CardContent>
                </Card>
              </Grid>
            </Grid>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Close</Button>
          <Button
            variant="contained"
            startIcon={<Print />}
            onClick={() => handlePrintPass(selectedVisitor)}
          >
            Print Pass
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default VisitorRecords;