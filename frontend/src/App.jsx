import { useEffect, useState } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import AOS from 'aos'
import 'aos/dist/aos.css'
import './App.css' 
import axios from "axios";

import Header from './components/Header'
import CompanyOverview from './components/CompanyOverview'
import OurServices from './components/OurServices'
import Projects from './components/project/Projects'
import ContactUs from './components/ContactUs'
import Footer from './components/Footer'
import AdminLogin from './components/userpart/AdminLogin'
import Snackbar from '@mui/material/Snackbar'
import MuiAlert from '@mui/material/Alert'
import NotFound from './components/NotFound'
import UserDashboard from './components/userpart/UserDashboard'
import ScrollToTop from './components/ScrollToTop'
import AboutUs from './components/AboutUs'
import ShowProjects from './components/project/ShowProjects'


function App() {
  const [login, setLogin] = useState(false)
  const [userlogin, setUserLogin] = useState({ id: "", username: "", loggedin: false });
  const [userId, setUserId] = useState("");
  const [isAdminAuthenticated, setIsAdminAuthenticated] = useState(false);
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' }); 


  const checkAdmin = async (id, username) => {
  try {
    const { data } = await axios.post("http://localhost:5000/api/auth/check-admin", {
      id,
      username
    });

    if (data.isAdmin) {
      setIsAdminAuthenticated(true);
    } else {
      setIsAdminAuthenticated(false);
    }
  } catch (error) {
    console.error("Error verifying user:", error);
  }
};
  const setUserInfo = async () => {
    const adminAuth = localStorage.getItem('userInfo');
    const userInfo = JSON.parse(adminAuth); 
    if (!userInfo) {
      setUserLogin({ id: "", username: "", loggedin: false }); 
    }
    else {

      checkAdmin(userInfo.id, userInfo.username);
      setUserLogin({ id: userInfo.id, username: userInfo.username, loggedin: userInfo.loggedin }); 
      setUserId(userInfo.id);
    }
  }
  // Check for existing admin authentication on component mount
  useEffect(() => {
    setUserInfo();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('userInfo');
    setIsAdminAuthenticated(false);
    setSnackbar({ open: true, message: 'User logged out successfully!', severity: 'success' });
    setUserLogin({ id: "", name: "", loggedin: false });
  };

  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: true,
      offset: 100
    })
  }, [])

  // Snackbar close handler
  const handleSnackbarClose = (event, reason) => {
    if (reason === 'clickaway') return;
    setSnackbar({ ...snackbar, open: false });
  };

  return (
    <BrowserRouter>
      <div className="relative min-h-screen overflow-hidden">
        {!login &&
          <Header
            handleLogout={handleLogout}
            setLogin={setLogin}
            userlogin={userlogin}
          />}
        <ScrollToTop />
        <main className="mt-0 sm:mt-8 lg:mt-0">
          <Routes>
            <Route path="/" element={<CompanyOverview isAdminAuthenticated={isAdminAuthenticated} />} />
            <Route path='/about' element={<AboutUs />} />
            <Route path='/contact' element={<ContactUs userId={userId} isAdminAuthenticated={isAdminAuthenticated} userlogin={userlogin} />} />
            <Route path='/services' element={<OurServices />} />
            <Route path="/projects" element={<Projects isAdminAuthenticated={isAdminAuthenticated} />} />
            <Route path="/login" element={<AdminLogin setLogin={setLogin} setIsAdminAuthenticated={setIsAdminAuthenticated} setUserLogin={setUserLogin} setSnackbar={setSnackbar} />} />
            <Route path="/showprojects/:type" element={<ShowProjects isAdminAuthenticated={isAdminAuthenticated} />} />
            {/* if user is logged in then only show UserDashboard */}
            {userlogin.loggedin && <Route path="/dashboard" element={<UserDashboard handleLogout={handleLogout} userId={userId} isAdminAuthenticated={isAdminAuthenticated} />} />}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </main>

        {!login && <Footer />}

        {/* MUI Snackbar Notification */}
        <Snackbar
          open={snackbar.open}
          autoHideDuration={3000}
          onClose={handleSnackbarClose}
          anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
        >
          <MuiAlert
            elevation={6}
            variant="filled"
            onClose={handleSnackbarClose}
            severity={snackbar.severity}
            sx={{ width: '100%' }}
          >
            {snackbar.message}
          </MuiAlert>
        </Snackbar>
      </div>
    </BrowserRouter>
  )
}

export default App
