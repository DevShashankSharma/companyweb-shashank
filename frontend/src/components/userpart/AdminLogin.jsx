import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import logo from '../../assets/logo.png';
import { FiUser, FiLock, FiRefreshCw, FiArrowLeft, FiEye, FiEyeOff } from "react-icons/fi";
import AdminVerificationPage from './AdminVerificationPage';
import axios from 'axios';

const generateCaptcha = () => {
  const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
  return Array.from({ length: 5 }, () => chars[Math.floor(Math.random() * chars.length)]).join('');
};

const LoginPage = ({ setLogin, setIsAdminAuthenticated, setUserLogin, setSnackbar, setUserId }) => {
  const navigate = useNavigate();
  const [isRegistered, setIsRegistered] = useState(true);
  const [adminverification, setAdminVerification] = useState(false);

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [captcha, setCaptcha] = useState('');
  const [captchaInput, setCaptchaInput] = useState('');
  const [error, setError] = useState('');

  // For new user registration
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');

  useEffect(() => {
    setCaptcha(generateCaptcha());
    setLogin(true);
  }, [setLogin]);

  const refreshCaptcha = () => {
    setCaptcha(generateCaptcha());
    setCaptchaInput('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (captcha.toLowerCase() !== captchaInput.toLowerCase()) {
      setError('Captcha does not match');
      refreshCaptcha();
      return;
    }

    if (!username || !password) {
      setError('Please fill in all user details.');
      return;
    }

    if (isRegistered) {
      // Login
      try {
        const res = await axios.post('https://goklyn-backend.vercel.app/api/auth/login', { username, password });
        console.log(res.data);
        if (res.data.isAdmin) {
          setAdminVerification(true);
          return;
        }
        if (res.data.success) {
          setUserLogin({ id: res.data.user._id, username: res.data.user.username, loggedin: true });
          localStorage.setItem('userInfo', JSON.stringify({ id: res.data.user._id, username: res.data.user.username, loggedin: true }));
          setSnackbar({ open: true, message: 'User logged in successfully!', severity: 'success' });
          setLogin(false);
          setUserId(res.data.user._id);
          navigate('/');
        } else {
          setError(res.data.message || 'Invalid username or password');
          setUserId('');
        }
      } catch (err) {
        setError(err.response?.data?.message || 'Login failed');
      }
    } else {
      // Register
      if (!name || !email || !phone || !address || !username || !password) {
        setError('Please fill in all user details.');
        return;
      }
      try {
        const res = await axios.post('https://goklyn-backend.vercel.app/api/auth/register', {
          username, password, name, email, phone, address
        });
        if (res.data.success) {
          setUserLogin({ id: res.data.user._id, username: res.data.user.username, loggedin: true });
          localStorage.setItem('userInfo', JSON.stringify({ id: res.data.user._id, username: res.data.user.username, loggedin: true }));
          setSnackbar({ open: true, message: 'User registered successfully!', severity: 'success' });
          setLogin(false);
          setUserId(res.data.user._id);
          navigate('/');
        } else {
          setError(res.data.message || 'Registration failed');
          setUserId('');
        }
      } catch (err) {
        setError(err.response?.data?.message || 'Failed to save user. Please try again.');
      }
    }
  };

  return (
    <div className="min-h-screen max-w-7xl mx-auto m:px-4 sm:px-6 lg:px-8 flex flex-col justify-center sl:justify-between items-center sl:flex-row bg-gradient-to-br from-[#e0e7ff] via-[#f0fdfa] to-[#fef6fb]">
      {/* Left: Company Info */}
      <div className="hidden sl:flex w-full h-[600px] lg:w-1/2 flex-col justify-center items-center px-10 py-12 relative overflow-hidden border-r-2 border-gray-600">
        <div className="w-24 h-20 mb-6 flex items-center justify-center rounded-xl bg-white/30 backdrop-blur-md shadow-2xl ring-1 ring-white/40">
          <img src={logo} alt="Company Logo" className="w-16 h-16 object-contain" />
        </div>
        <h2 className="text-4xl font-extrabold mb-3 text-center tracking-tight drop-shadow-2xl">
          Goklyn Private Limited
        </h2>
        <p className="text-lg text-center max-w-md opacity-95 leading-relaxed">
          Delivering seamless service experiences. Manage your workflows, connect with clients, and oversee operations — all from a unified, intelligent platform
        </p>
        <p className="text-xs mt-10 opacity-60">© 2025 Goklyn Pvt. Ltd. All rights reserved.</p>
      </div>

      {/* Right: Login Form */}
      <div className='sl:h-[600px] w-full lg:w-1/2 overflow-y-auto flex items-center justify-center px-0 m:px-4 sm:px-6 lg:px-8'>
        <div className="w-full flex justify-center backdrop-blur-xl px-2 sst:px-0 m:px-4 py-2 my-auto mx-2">
          <div className="w-full max-w-md m:p-8 sm:p-10">
            <div className="flex flex-col items-center gap-2 mb-2">
              <h2 className="text-2xl sm:text-3xl font-bold text-center mb-6 text-indigo-700 flex items-center justify-center gap-2">
                {isRegistered ? (
                  <span>Log in to your account</span>
                ) : (
                  <span>Create Your Account</span>
                )}
              </h2>
            </div>

            {/* Registered Switch */}
            <div className="flex justify-center mb-4">
              <label className="inline-flex items-center cursor-pointer">
                <span className="mr-2 text-sm text-gray-600">Already have an account?</span>
                <input
                  type="checkbox"
                  className="sr-only peer"
                  checked={isRegistered}
                  onChange={() => setIsRegistered(!isRegistered)}
                />
                <div className="relative w-9 h-5 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600 dark:peer-checked:bg-blue-600"></div>
              </label>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="relative">
                <FiUser className="absolute left-3 top-3 text-blue-400 text-lg" />
                <input
                  type="text"
                  className="w-full pl-10 pr-4 py-2 border border-blue-200 rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none bg-white/80 text-gray-800"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  required
                  placeholder="Username"
                /> 
              </div>
              <div className="relative">
                <FiLock className="absolute left-3 top-3 text-blue-400 text-lg" />
                <input
                  type={showPassword ? "text" : "password"}
                  className="w-full pl-10 pr-10 py-2 border border-blue-200 rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none bg-white/80 text-gray-800"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  placeholder="Password"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-2.5 text-blue-500 focus:outline-none"
                >
                  {showPassword ? <FiEyeOff className="text-xl cursor-pointer" /> : <FiEye className="text-xl cursor-pointer" />}
                </button>
              </div>

              {/* Additional Fields for New User */}
              {!isRegistered && (
                <>
                  <input
                    type="text"
                    className="w-full px-4 py-2 border border-blue-200 rounded-lg focus:ring-2 focus:ring-indigo-400 focus:outline-none bg-white/80 text-gray-800"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Full Name"
                    required
                  />
                  <input
                    type="email"
                    className="w-full px-4 py-2 border border-blue-200 rounded-lg focus:ring-2 focus:ring-indigo-400 focus:outline-none bg-white/80 text-gray-800"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Email"
                    required
                  />
                  <input
                    type="tel"
                    className="w-full px-4 py-2 border border-blue-200 rounded-lg focus:ring-2 focus:ring-indigo-400 focus:outline-none bg-white/80 text-gray-800"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="Phone"
                    required
                  />
                  <textarea
                    rows={2}
                    className="w-full px-4 py-2 border border-blue-200 rounded-lg focus:ring-2 focus:ring-indigo-400 focus:outline-none bg-white/80 text-gray-800"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    placeholder="Address"
                    required
                  />
                </>
              )}

              {/* Captcha */}
              <div className="flex items-center gap-3">
                <span className="bg-gradient-to-r from-blue-100 to-indigo-100 px-4 py-2 font-mono font-bold tracking-widest rounded border border-blue-200 text-blue-700 select-none text-lg shadow">
                  {captcha}
                </span>
                <button
                  type="button"
                  onClick={refreshCaptcha}
                  className="flex items-center gap-1 text-blue-500 hover:text-indigo-500 font-semibold text-sm"
                  title="Refresh Captcha"
                >
                  <FiRefreshCw className="inline" />
                  Refresh
                </button>
              </div>
              <input
                type="text"
                placeholder="Enter Captcha"
                className="w-full px-4 py-2 border border-blue-200 rounded-lg focus:ring-2 focus:ring-indigo-400 focus:outline-none bg-white/80 text-gray-800"
                value={captchaInput}
                onChange={(e) => setCaptchaInput(e.target.value)}
                required
              />

              {error && <p className="text-red-600 text-sm text-center">{error}</p>}

              <button
                type="submit"
                className="w-full bg-gradient-to-r bg-indigo-400 text-white py-2 rounded-xl font-bold text-lg shadow-lg hover:scale-[1.03] hover:shadow-xl transition-all cursor-pointer"
              >
                {isRegistered
                  ? 'Login'
                  : 'Create Account'}
              </button>
            </form>
          </div>
        </div>
      </div>
      <div className="absolute top-2 left-2 z-10 active:scale-[0.9]">
        <button
          onClick={() => {
            navigate('/')
            setLogin(false)
          }}
          className="group flex items-center gap-2 px-5 py-2 rounded-full 
          sl:bg-[rgba(255,255,255)] backdrop-blur-md 
          sl:border border-teal-300 sl:shadow-lg  cursor-pointer
          hover:shadow-xl   
          text-indigo-800 
          font-semibold text-sm transition-all duration-300 ease-in-out"
          title="Back to Home"
        >
          <FiArrowLeft className="text-base scale-[2] sl:scale-[1] transition-transform duration-300 group-hover:-translate-x-1" />
          <span className="tracking-wide hidden sl:block">Back to Home</span>
        </button>
      </div>

      {adminverification && (
        <AdminVerificationPage setLogin={setLogin} setAdminVerification={setAdminVerification} setUserLogin={setUserLogin} setIsAdminAuthenticated={setIsAdminAuthenticated} setSnackbar={setSnackbar} setUserId={setUserId}/>
      )}
    </div>
  );
};

export default LoginPage;
