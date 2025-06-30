import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import LoadingPage from './LoadingPage.jsx';
import SignUp from './SignUp.jsx';
import FrontPage from './FrontPage.jsx';
import Dashboard from './Dashboard.jsx';
import Doubts from './Doubts.jsx';
import Collaboration from './Mentorship.jsx';
import Resources from './Resources.jsx';
import Profile from './Profile.jsx';
import Login from './Login.jsx';
import Register from './Register.jsx';
import Chat from './Chat.jsx';
import Location from './Location.jsx';
import SearchResults from './SearchResults.jsx';
import ProtectedRoute from './ProtectedRoute.jsx';
import ClickSpark from './components/ClickSpark.jsx';
import './App.css';
import CallIcon from '@mui/icons-material/Call';
import EmailIcon from '@mui/icons-material/Email';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import { SvgIcon } from '@mui/material';
import emailjs from 'emailjs-com';
import Particles from './components/Particles';

function GradientCallIcon(props) {
  return (
    <SvgIcon {...props} viewBox="0 0 24 24">
      <defs>
        <linearGradient id="call-gradient" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#8b5cf6" />
          <stop offset="100%" stopColor="#00e0ff" />
        </linearGradient>
      </defs>
      <CallIcon htmlColor="url(#call-gradient)" />
    </SvgIcon>
  );
}

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [showLoadingPage, setShowLoadingPage] = useState(true);

  useEffect(() => {
    const loadingTimer = setTimeout(() => {
      setShowLoadingPage(false);

      const token = localStorage.getItem('token');
      const user = localStorage.getItem('user');

      if (token && user) {
        try {
          const userData = JSON.parse(user);
          setCurrentUser(userData);
          setIsAuthenticated(true);
        } catch (error) {
          setCurrentUser(null);
          setIsAuthenticated(false);
          localStorage.removeItem('token');
          localStorage.removeItem('user');
        }
      } else {
        setCurrentUser(null);
        setIsAuthenticated(false);
      }

      setIsLoading(false);
    }, 2000);

    return () => clearTimeout(loadingTimer);
  }, []);

  const handleLogin = (userData) => {
    setIsAuthenticated(true);
    setCurrentUser(userData);
  };

  const handleRegister = (userData) => {
    setIsAuthenticated(true);
    setCurrentUser(userData);
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setCurrentUser(null);
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  };

  if (showLoadingPage || isLoading) {
    return <LoadingPage />;
  }

  return (
    <ClickSpark 
      sparkColor="#c4b5fd"
      sparkSize={12}
      sparkRadius={20}
      sparkCount={10}
      duration={500}
      easing="ease-out"
      extraScale={1.2}
    >
      <Router>
        <div className="App">
          <Routes>
            <Route path="/login" element={
              !isAuthenticated ? 
              <Login onLogin={handleLogin} /> : 
              <Navigate to="/front" replace />
            } />
            
            <Route path="/signup" element={
              !isAuthenticated ? 
              <SignUp onRegister={handleRegister} /> : 
              <Navigate to="/front" replace />
            } />
            
            <Route path="/register" element={
              !isAuthenticated ? 
              <Register onRegister={handleRegister} /> : 
              <Navigate to="/front" replace />
            } />
            
            <Route path="/front" element={
              <ProtectedRoute>
                <FrontPage currentUser={currentUser} onLogout={handleLogout} />
              </ProtectedRoute>
            } />
            
            <Route path="/dashboard" element={
              <ProtectedRoute>
                <Dashboard currentUser={currentUser} onLogout={handleLogout} />
              </ProtectedRoute>
            } />
            
            <Route path="/doubts" element={
              <ProtectedRoute>
                <Doubts currentUser={currentUser} onLogout={handleLogout} />
              </ProtectedRoute>
            } />
            
            <Route path="/collaboration" element={
              <ProtectedRoute>
                <Collaboration currentUser={currentUser} onLogout={handleLogout} />
              </ProtectedRoute>
            } />
            
            <Route path="/resources" element={
              <ProtectedRoute>
                <Resources currentUser={currentUser} onLogout={handleLogout} />
              </ProtectedRoute>
            } />
            
            <Route path="/profile" element={
              <ProtectedRoute>
                <Profile currentUser={currentUser} onLogout={handleLogout} />
              </ProtectedRoute>
            } />
            
            <Route path="/chat" element={
              <ProtectedRoute>
                <Chat currentUser={currentUser} onLogout={handleLogout} />
              </ProtectedRoute>
            } />
            
            <Route path="/location" element={
              <ProtectedRoute>
                <Location currentUser={currentUser} onLogout={handleLogout} />
              </ProtectedRoute>
            } />
            
            <Route path="/search" element={
              <ProtectedRoute>
                <SearchResults currentUser={currentUser} onLogout={handleLogout} />
              </ProtectedRoute>
            } />
            
            <Route path="/" element={
              isAuthenticated ? 
              <Navigate to="/front" replace /> : 
              <Navigate to="/signup" replace />
            } />
          </Routes>
          <Footer />
        </div>
      </Router>
    </ClickSpark>
  );
}

function Footer() {
  const [suggestion, setSuggestion] = React.useState("");
  const [name, setName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [submitted, setSubmitted] = React.useState(false);

  const sendEmail = (e) => {
    e.preventDefault();
    emailjs.sendForm(
      'service_oc9j5ws',
      'template_qkszgyo',
      e.target,
      'URmZf3Q1OWHqndVQZ'
    ).then((result) => {
        setSubmitted(true);
        setName("");
        setEmail("");
        setSuggestion("");
        window.alert('Feedback sent!');
    }, (error) => {
        alert('Failed to send. Please try again.');
    });
    e.target.reset();
    setTimeout(() => setSubmitted(false), 3000);
  };

  return (
    <footer className="footer-review enhanced-footer">
      <div className="footer-container footer-modern">
        {/* Left: Contact Us */}
        <div className="footer-section contactus-section">
          <h2 className="footer-heading-orange">Contact Us</h2>
          <div className="footer-contact-info">
            <div className="footer-contact-row">
              <div>
                <div><span className="footer-icon" style={{verticalAlign: 'middle'}}><CallIcon style={{ color: '#ff5c5c', fontSize: '1.2em', verticalAlign: 'middle' }} /></span> <strong>Satyam Sharma</strong></div>
                <div><a href="tel:+918989539749">+91 89895 39749</a></div>
                <div style={{ marginTop: '0.5rem' }}><span className="footer-icon" style={{verticalAlign: 'middle'}}><CallIcon style={{ color: '#ff5c5c', fontSize: '1.2em', verticalAlign: 'middle' }} /></span> <strong>Naitik Verma</strong></div>
                <div><a href="tel:+917869385243">+91 78693 85243</a></div>
              </div>
            </div>
            <div className="footer-contact-row email-row">
              <span className="footer-icon" style={{verticalAlign: 'middle'}}><EmailIcon style={{ color: '#2196f3', fontSize: '1.2em', verticalAlign: 'middle' }} /></span>
              <div className="footer-email-text">
                <a href="mailto:peerpath.manit@outlook.com">peerpath.manit@outlook.com</a>
                <a
                  href="https://mail.google.com/mail/?view=cm&to=peerpath.manit@outlook.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="footer-gmail-link"
                >
                  Send via Gmail
                </a>
              </div>
            </div>
            <div className="footer-contact-row">
              <span className="footer-icon" style={{verticalAlign: 'middle'}}><LocationOnIcon style={{ color: '#ff5c5c', fontSize: '1.2em', verticalAlign: 'middle' }} /></span>
              <span>Maulana Azad National Institute of Technology, Bhopal</span>
            </div>
          </div>
        </div>
        {/* Divider */}
        <div className="footer-divider" />
        {/* Right: Write to us */}
        <div className="footer-section writeus-section">
          <h2 className="footer-heading-orange">Write to us</h2>
          <form onSubmit={sendEmail} className="footer-write-form">
            <input
              type="text"
              name="name"
              value={name}
              onChange={e => setName(e.target.value)}
              placeholder="Fullname"
              required
            />
            <input
              type="email"
              name="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              placeholder="Email"
              required
            />
            <textarea
              name="message"
              value={suggestion}
              onChange={e => setSuggestion(e.target.value)}
              placeholder="Message"
              required
            />
            <button type="submit" className="footer-submit-btn">SUBMIT</button>
            {submitted && <div className="thank-you">Thank you for your message!</div>}
          </form>
        </div>
      </div>
    </footer>
  );
}

export default App;
