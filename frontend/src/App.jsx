import React, { useState, useEffect } from 'react';
import { Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { ThemeProvider, CssBaseline, createTheme, Container, Box } from '@mui/material';
import './index.css';
import { AuthProvider, useAuth } from "./context/AuthContext"; // Import useAuth

// Components
import Navbarr from './components/Navbarr';
import VideoSection from './components/VideoSection';
import About from './components/About';
import BoxCategories from './components/BoxCategories';
import Cards from './components/Cards';
import Footer from './components/Footer';
import Location from './components/Location';
import Markets from './components/Markets';
import Innovation from './components/Innovation';
import Slider from './components/Sliderr';
import Article1 from './components/Article1';
import Article2 from './components/Article2';
import User from './components/User';
import'./index.css'
import './App.css'
// Pages
import Login from './pages/Login';
import SignUp from './pages/SignUp';
import ForgotPassword from './pages/ForgetPassword';

// Visitor components
import PreArrival from './components/visitor/PreArrival';
import VisitorForm from './components/visitor/VisitorForm';
import VisitorRecords from './components/visitor/VisitorRecords';
import WebcamCapture from './components/visitor/WebcamCapture';
import ApprovalHandler from './components/visitor/ApprovalHandler'; // Ensure this import is correct
import Dashboard from './components/visitor/Dashboard';
import Sidebar from './components/visitor/Sidebar';
import ApproveVisitor from './components/visitor/pages/ApproveVisitor';
import RejectVisitor from './components/visitor/pages/RejectVisitor';

// Mockup Components
import Home from './Mockup/pages/Home';
import Customization from './Mockup/pages/Customization';
import CartPage from './Mockup/pages/CartPage';
import CheckoutPage from './Mockup/pages/CheckoutPage';
import OrderSuccess from './Mockup/pages/OrderSuccess';


// Create a custom Material-UI theme
const theme = createTheme({
  palette: {
    primary: {
      main: '#1976d2',
      light: '#42a5f5',
      dark: '#1565c0',
    },
    secondary: {
      main: '#dc004e',
      light: '#ff4081',
      dark: '#c51162',
    },
    background: {
      default: '#f5f5f5',
      paper: '#ffffff',
    },
  },
  typography: {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
    h1: {
      fontSize: '2.5rem',
      fontWeight: 600,
    },
    h2: {
      fontSize: '2rem',
      fontWeight: 500,
    },
    h3: {
      fontSize: '1.75rem',
      fontWeight: 500,
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none',
          borderRadius: 8,
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 12,
          boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
        },
      },
    },
  },
});

// Layout component for dashboard pages
const DashboardLayout = ({ children }) => (
  <Box sx={{ 
    minHeight: '100vh',
    display: 'flex',
    flexDirection: 'column',
    bgcolor: 'background.default'
  }}>
    <Navbarr />
    <Box sx={{ flex: 1, p: 3 }}>
      {children}
    </Box>
    <Footer />
  </Box>
);

const VisitorLayout = ({ children }) => (
  <Box
    sx={{
      minHeight: "100vh",
      display: "flex",
      flexDirection: "column",
      bgcolor: "background.default",
    }}
  >
    <Container maxWidth="lg" sx={{ flex: 1, py: 4 }}>
      {children}
    </Container>
  </Box>
);

// Layout component for mockup pages (without header/footer for full control)
const MockupLayout = ({ children }) => (
  <Box sx={{ 
    minHeight: '100vh',
    display: 'flex',
    flexDirection: 'column',
    bgcolor: 'background.default'
  }}>
    {children}
  </Box>
);

const App = () => {
  const [currentView, setCurrentView] = useState('login');
  const location = useLocation();

  // Define routes where Navbar and Footer should NOT appear
  const noHeaderFooterRoutes = [
    "/login",
    "/signup",
    "/forgot-password",
    "/visitor-form",
    "/visitor-records",
    "/webcam-capture",
    "/dashboard",
    "/user"
  ];

  const hideHeaderFooter = noHeaderFooterRoutes.some((route) => location.pathname.startsWith(route));

  const handleSignUpSuccess = (data) => {
    console.log('Sign up successful:', data);
    setCurrentView('login');
  };

  const handleLoginSuccess = (data) => {
    console.log('Login successful:', data);
    // Handle login success (e.g., redirect to dashboard)
  };

  const renderAuthView = () => {
    switch (currentView) {
      case 'login': return <Login onSignUpClick={() => setCurrentView('signup')} onForgotPasswordClick={() => setCurrentView('forgotPassword')} />;
      case 'signup': return <SignUp onBack={() => setCurrentView('login')} />;
      case 'forgotPassword': return <ForgotPassword onBack={() => setCurrentView('login')} />;
      default: return <Login />;
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <div className="container-fluid mx-auto">
        {!hideHeaderFooter && <Navbarr />}
        <Routes>
          {/* Authentication Routes */}
          <Route path="/login" element={renderAuthView()} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/user" element={<User />} />
          <Route 
            path="/" 
            element={
              <>
                <VideoSection />
                <BoxCategories />
                <Slider/>
                <Cards />
              </>
            } 
          />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/articles/parksons-mk-printpack-announcement" element={<Article1 />} />
          <Route path="/articles/smart-solutions-for-business" element={<Article2 />} />
          <Route path="/about" element={<About />} />
          <Route path="/markets" element={<Markets />} />
          <Route path="/location" element={<Location />} />
          <Route path="/innovation" element={<Innovation />} />
          <Route path="/mockup" element={<Home />} />
          
          {/* Visitor Management routes */}
          <Route path="/dashboard" element={<Dashboard/>}/>
          <Route path="/visitor-form" element={
            <VisitorLayout>
              <VisitorForm />
            </VisitorLayout>
          } />
          <Route path="/visitor-records" element={
            <VisitorLayout>
              <VisitorRecords />
            </VisitorLayout>
          } />
          <Route path="/webcam-capture" element={
            <VisitorLayout>
              <WebcamCapture />
            </VisitorLayout>
          } />
          <Route path="/approve-visitor/:srNo" element={
            <VisitorLayout>
              <ApprovalHandler type="approve" />
            </VisitorLayout>
          } />
          <Route path="/reject-visitor/:srNo" element={
            <VisitorLayout>
              <ApprovalHandler type="reject" />
            </VisitorLayout>
          } />
          <Route path="/approve-visitor/:srNo" element={<ApproveVisitor />} />
          <Route path="/reject-visitor/:srNo" element={<RejectVisitor />} />
  

          {/* Mockup routes */}
          <Route path="/mockup" element={
            <MockupLayout>
              <Home />
            </MockupLayout>
          } />
          <Route path="/mockup/customization/:boxType" element={
            <MockupLayout>
              <Customization />
            </MockupLayout>
          } />

<Route path="/cart" element={<CartPage />} />  
<Route path="/checkout" element={<CheckoutPage />} />
<Route path="/oderSucess" element={<OrderSuccess/>}/>

          {/* Catch-all route for unknown paths */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
        {!hideHeaderFooter && <Footer />}
      </div>
    </ThemeProvider>
  );
};

export default App;