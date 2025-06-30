// ✅ Enhanced FrontPage for PeerPath
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './FrontPage.css';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import StarBackground from './components/StarBackground';
import TypewriterHeading from './components/TypewriterHeading';
import FallingText from './components/FallingText';
import Counter from './components/Counter';
import InfiniteMenu from './components/InfiniteMenu';
import CircularGallery from './CircularGallery';
import Particles from './components/Particles';


const FrontPage = ({ currentUser, onLogout }) => {
  const navigate = useNavigate();

  const pageVariants = {
    initial: { opacity: 0 },
    in: { opacity: 1 },
    out: { opacity: 0 },
  };

  const pageTransition = {
    type: 'tween',
    ease: 'anticipate',
    duration: 0.5,
  };

  const staggerContainer = {
    animate: {
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  // Fetch usernames for falling text
  const [usernames, setUsernames] = useState([]);
  useEffect(() => {
    fetch('http://localhost:5000/api/users')
      .then(res => {
        if (!res.ok) throw new Error('Network response was not ok');
        return res.json();
      })
      .then(data => {
        console.log('Fetched users from http://localhost:5000/api/users:', data);
        if (Array.isArray(data)) {
          setUsernames(data.map(u => u.username));
        }
      })
      .catch(err => {
        console.error('Error fetching users from http://localhost:5000/api/users:', err);
      });
  }, []);

  const handleFeatureClick = (feature) => {
    navigate(`/${feature}`);
  };

  const handleGetStarted = () => navigate('/dashboard');

  const reviews = [
    { text: "PeerPath made it so easy to find project partners!", name: "Riya Sharma", branch: "CSE, 2nd Year" },
    { text: "The resources section is a goldmine.", name: "Aarav Mehta", branch: "ECE, 3rd Year" },
    { text: "Mentorship helped me ace my exams!", name: "Priya Singh", branch: "ME, 1st Year" },
    { text: "Great for networking and learning.", name: "Nikhil Verma", branch: "EE, 4th Year" },
    { text: "I love the community vibe!", name: "Sneha Patel", branch: "CE, 2nd Year" },
  ];

  return (
    <motion.div
      className="front-page"
      initial="initial"
      animate="in"
      exit="out"
      variants={pageVariants}
      transition={pageTransition}
    >
      {/* Background animation */}
      <motion.div className="front-background" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1 }} />

      {/* Hero Section */}
      <motion.div className="front-content" initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3, duration: 0.8 }}>
        <motion.div className="hero-section">
          <motion.div className="hero-text" initial={{ x: -50, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ delay: 0.4 }}>
            <h1 className="hero-title">
              Welcome to Peer<span className="path-gradient">Path</span>
            </h1>
            <p className="hero-subtitle">Connect, Collaborate, and Grow Together</p>
            <p className="hero-description">Join a community of learners and mentors. Share knowledge, solve problems, and build amazing projects together.</p>
            <motion.button className="get-started-btn" onClick={handleGetStarted} whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>Get Started</motion.button>
          </motion.div>

          <motion.div className="hero-visual" initial={{ opacity: 0, x: 50 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.6 }}>
            <motion.div className="floating-cards" variants={staggerContainer} initial="initial" animate="animate">
              {[
                { icon: '🧑‍🏫', text: 'Mentorship', key: 'mentorship' },
                { icon: '🤝', text: 'Collaboration', key: 'collaboration' },
                { icon: '📚', text: 'Resources', key: 'resources' },
                { icon: '💡', text: 'Innovation', key: 'location' },
              ].map((item, index) => (
                <motion.div
                  className={`card card-${index + 1}`}
                  onClick={() => handleFeatureClick(item.key)}
                  key={item.key}
                  whileHover={{ scale: 1.2, rotate: 5 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <span className="card-icon">{item.icon}</span>
                  <span className="card-text">{item.text}</span>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        </motion.div>

        {/* Feature Cards */}
        <motion.div className="features-section" initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.9 }}>
          <h2>What You Can Do on PeerPath?</h2>
          <motion.div className="features-grid" variants={staggerContainer} initial="initial" animate="animate">
            {[
              { icon: '🎯', title: 'Ask Questions', desc: 'Get help from peers and experts on any topic', path: 'mentorship' },
              { icon: '🚀', title: 'Build Projects', desc: 'Collaborate on exciting projects', path: 'collaboration' },
              { icon: '📖', title: 'Share Knowledge', desc: 'Contribute to the community', path: 'resources' },
              { icon: '🗺️', title: 'Find Partners', desc: 'Connect with nearby people', path: 'location' },
            ].map(({ icon, title, desc, path }) => (
              <motion.div
                className="feature fancy-gradient-card box"
                key={title}
                whileHover={{ scale: 1.1, y: -10 }}
                whileTap={{ scale: 0.95 }}
              >
                <motion.div className="feature-icon" whileHover={{ rotate: 360 }}>{icon}</motion.div>
                <h3>{title}</h3>
                <p>{desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>

        {/* Particles Background for remaining sections */}
        <div style={{ 
          position: 'relative', 
          overflow: 'hidden'
        }}>
          {/* Particles Background */}
          <div style={{ 
            position: 'absolute', 
            inset: 0, 
            zIndex: 0, 
            pointerEvents: 'none', 
            width: '100%', 
            height: '100%' 
          }}>
            <Particles
              particleColors={['#ffffff', '#ffffff']}
              particleCount={200}
              particleSpread={10}
              speed={0.1}
              particleBaseSize={100}
              moveParticlesOnHover={true}
              alphaParticles={false}
              disableRotation={false}
            />
          </div>

          {/* Content with higher z-index */}
          <div style={{ position: 'relative', zIndex: 1 }}>
            {/* Stats Section */}
            <motion.div className="stats-section" initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1.1 }}>
              <h2>Our Impact</h2>
              <div className="stats-grid">
                <motion.div className="stat-card" whileHover={{ scale: 1.05 }}>
                  <div className="stat-number"><Counter end={999} duration={7000} suffix="+" /></div>
                  <div className="stat-label">Active Students</div>
                </motion.div>
                <motion.div className="stat-card" whileHover={{ scale: 1.05 }}>
                  <div className="stat-number"><Counter end={50} duration={7000} suffix="+" /></div>
                  <div className="stat-label">Projects Completed</div>
                </motion.div>
                <motion.div className="stat-card" whileHover={{ scale: 1.05 }}>
                  <div className="stat-number"><Counter end={95} duration={7000} suffix="%" /></div>
                  <div className="stat-label">Success Rate</div>
                </motion.div>
                <motion.div className="stat-card" whileHover={{ scale: 1.05 }}>
                  <div className="stat-number"><Counter end={24} duration={7000} suffix="/7" /></div>
                  <div className="stat-label">Support Available</div>
                </motion.div>
              </div>
            </motion.div>

            {/* Users Already Using - Infinite Gallery */}
            <motion.div className="falling-text-section-card" style={{ width: '100%', maxWidth: 1200, margin: '4rem auto 0 auto', position: 'relative' }} initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1.0 }}>
              <div className="fancy-gradient-card users-infinite-gallery" style={{ width: '100%', maxWidth: 'none', background: 'black', boxShadow: 'none', padding: 0, position: 'relative', borderRadius: 40 }}>
                <h2>Students from All Years Are Already Here – Are You?</h2>
                <div style={{ position: 'relative', width: '100%', overflow: 'hidden', background: 'black', height: 260, display: 'flex', alignItems: 'center', borderRadius: 40 }}>
                  <div style={{ display: 'flex', gap: '2.5rem', height: '100%', alignItems: 'center', animation: 'scroll-users 30s linear infinite' }}>
                    {[...usernames, ...usernames].map((user, idx) => (
                      <div key={user.username || user + idx} style={{ minWidth: 160, height: 220, display: 'flex', flexDirection: 'column', alignItems: 'center', background: 'rgba(20,30,50,0.85)', borderRadius: 32, padding: '2.2rem 2.5rem', boxShadow: '0 4px 24px #00cfff33', justifyContent: 'center', border: '2px solid #00cfff', transition: 'box-shadow 0.3s' }}>
                        <img
                          src={user.profilePhoto || '/peerpath.png'}
                          alt={user.username || user}
                          style={{ width: 110, height: 110, borderRadius: '50%', objectFit: 'cover', marginBottom: 18, border: '3px solid #00cfff99', background: '#222', boxShadow: '0 2px 16px #00cfff44' }}
                          onError={e => { e.target.onerror = null; e.target.src = '/peerpath.png'; }}
                        />
                        <span style={{
                          fontWeight: 700,
                          fontSize: 28,
                          color: '#fff',
                          letterSpacing: '0.5px',
                          marginTop: 6,
                          textAlign: 'center',
                          lineHeight: 1.1
                        }}>{user.username || user}</span>
                      </div>
                    ))}
                  </div>
                  <style>{`
                    @keyframes scroll-users {
                      0% { transform: translateX(0); }
                      100% { transform: translateX(-50%); }
                    }
                  `}</style>
                </div>
              </div>
            </motion.div>

            {/* Infinite Gallery Section */}
            <motion.div className="infinite-gallery-section" initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1.15 }} style={{ marginTop: '0.5rem' }}>
              <h2>Feedback That Fuels PeerPath</h2>
              <InfiniteMenu />
            </motion.div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default FrontPage;
