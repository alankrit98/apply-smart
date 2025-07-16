import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios'; 
import { useNavigate } from 'react-router-dom'; 
import { CheckCircle, AlertCircle } from 'lucide-react'; 
import { Bell, User, Search, MapPin, Zap, Menu, X } from 'lucide-react'; // Added missing imports from original home.jsx
import { Briefcase, Users, Star, TrendingUp } from 'lucide-react'; // Added missing imports from original home.jsx

// Configure axios globally to send cookies with requests
axios.defaults.withCredentials = true;

const Home = () => {
  const navigate = useNavigate();
  const [userName, setUserName] = useState("User"); 
  const [isProfileComplete, setIsProfileComplete] = useState(false); 
  const [loading, setLoading] = useState(true);

  // Added states from your original home.jsx that were missing in the previous update
  const [searchField, setSearchField] = useState("");
  const [location, setLocation] = useState("");
  const [hoveredCard, setHoveredCard] = useState(null);
  const [animatedStats, setAnimatedStats] = useState({
    users: 0,
    jobs: 0,
    companies: 0
  });
  const [showNotifications, setShowNotifications] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const [isLocationFocused, setIsLocationFocused] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });


  useEffect(() => {
    const checkProfileStatus = async () => {
      try {
        // First, fetch the user's basic info to get the name
        const userResponse = await axios.get('http://localhost:5000/api/users/profile');
        setUserName(userResponse.data.name || "User");
        
        // Then fetch the user's profile from the backend
        const response = await axios.get('http://localhost:5000/api/profile');

        if (response.data.profile) {
          const profile = response.data.profile;
          // Check if profile has both name and resumeUrl
          const hasBasicProfile = !!profile.name && !!profile.resumeUrl;
          
          // Check extended profile completion
          try {
            const extendedRes = await axios.get('http://localhost:5000/api/extended-profile');
            const hasExtendedProfile = !!extendedRes.data.personalInfo && !!extendedRes.data.personalInfo.firstName;
            setIsProfileComplete(hasBasicProfile && hasExtendedProfile);
          } catch (extendedError) {
            console.log('Extended profile not found');
            setIsProfileComplete(false);
          }
        } else {
          // No profile found
          setIsProfileComplete(false);
        }
      } catch (error) {
        console.error('Error checking profile status:', error);
        if (error.response && error.response.status === 401) {
          console.log('Not authenticated. Redirecting to login.');
          // navigate('/login'); // Uncomment if you want to force login
        } else if (error.response && error.response.status === 404) {
          setIsProfileComplete(false);
        } else {
          setIsProfileComplete(false);
        }
      } finally {
        setLoading(false);
      }
    };

    checkProfileStatus();
  }, []);

  // Existing useEffect for animations and mouse tracking from your original home.jsx
  useEffect(() => {
    setIsLoaded(true);

    const animateStats = () => {
      const targets = { users: 500, jobs: 1200, companies: 300 };
      const duration = 2000;
      const steps = 60;
      const increment = duration / steps;
      
      let currentStep = 0;
      const timer = setInterval(() => {
        currentStep++;
        const progress = currentStep / steps;
        
        setAnimatedStats({
          users: Math.floor(targets.users * progress),
          jobs: Math.floor(targets.jobs * progress),
          companies: Math.floor(targets.companies * progress)
        });
        
        if (currentStep >= steps) {
          clearInterval(timer);
        }
      }, increment);
    };
    
    setTimeout(animateStats, 1000);
  
    // Mouse tracking for subtle parallax effects
    const handleMouseMove = (e) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth) * 100,
        y: (e.clientY / window.innerHeight) * 100
      });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const handleActivateExtension = () => {
    alert("Extension activation feature would be implemented here!");
  };

  const LinkedInLogo = () => (
    <svg viewBox="0 0 24 24" className="w-8 h-8" fill="#0077B5">
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
    </svg>
  );

  const GlassdoorLogo = () => (
    <svg viewBox="0 0 24 24" className="w-8 h-8" fill="#0CAA41">
      <path d="M11.996 0C5.377 0 0 5.377 0 12s5.377 12 11.996 12C18.623 24 24 18.623 24 12S18.623 0 11.996 0zm6.056 17.789c0 .565-.482 1.024-1.078 1.024H7.022c-.596 0-1.078-.459-1.078-1.024V6.211c0-.565.482-1.024 1.078-1.024h9.952c.596 0 1.078.459 1.078 1.024v11.578z"/>
    </svg>
  );

  const IndeedLogo = () => (
    <svg viewBox="0 0 24 24" className="w-8 h-8" fill="#2557A7">
      <path d="M11.566 21.563v-8.762c0-.724-.61-1.304-1.357-1.304-.747 0-1.357.58-1.357 1.304v8.762c-3.897-1.187-6.73-4.77-6.73-9.042C2.122 6.616 6.738 2 12.643 2s10.521 4.616 10.521 10.521c0 4.272-2.833 7.855-6.73 9.042V12.8c0-.724-.61-1.304-1.357-1.304-.747 0-1.357.58-1.357 1.304v8.762z"/>
    </svg>
  );

  const platformCardStyle = {
    padding: '2rem',
    backgroundColor: 'white',
    borderRadius: '1rem',
    boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
    cursor: 'pointer',
    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
    position: 'relative',
    overflow: 'hidden'
  };

  const handleCardHover = (index) => {
    setHoveredCard(index);
  };

  const handleCardLeave = () => {
    setHoveredCard(null);
  };

  const getCardStyle = (index) => ({
    ...platformCardStyle,
    transform: hoveredCard === index ? 'translateY(-0.5rem) scale(1.02)' : 'translateY(0) scale(1)',
    boxShadow: hoveredCard === index 
      ? '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)' 
      : '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
    '::before': hoveredCard === index ? {
      content: '""',
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      background: 'linear-gradient(45deg, transparent 30%, rgba(255,255,255,0.1) 50%, transparent 70%)',
      transform: 'translateX(-100%)',
      animation: 'shimmer 0.6s ease-out'
    } : {}
  });

  const platforms = [
    {
      name: 'LinkedIn',
      description: 'Professional networking and career opportunities',
      logo: <LinkedInLogo />,
      color: '#dbeafe',
      bgColor: '#eff6ff',
      stats: 'Connect with professionals',
      features: ['Professional Network', 'Job Recommendations', 'Skill Endorsements'],
      url: 'https://www.linkedin.com'
    },
    {
      name: 'Glassdoor',
      description: 'Company reviews and salary insights',
      logo: <GlassdoorLogo />,
      color: '#dcfce7',
      bgColor: '#f0fdf4',
      stats: 'Transparent company insights',
      features: ['Company Reviews', 'Salary Data', 'Interview Tips']
    },
    {
      name: 'Indeed',
      description: 'World\'s largest job search engine',
      logo: <IndeedLogo />,
      color: '#e0e7ff',
      bgColor: '#eef2ff',
      stats: 'Millions of job listings',
      features: ['Job Search', 'Resume Builder', 'Company Research']
    }
  ];

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center p-4">
        <p className="text-xl text-gray-700">Loading profile status...</p>
      </div>
    );
  }

  return (
    <div style={{
      minHeight: '100vh',
      background: `
        radial-gradient(circle at ${mousePosition.x}% ${mousePosition.y}%, rgba(37, 99, 235, 0.05) 0%, transparent 50%),
        linear-gradient(135deg, #eff6ff 0%, #ffffff 50%, #eef2ff 100%)
      `,
      fontFamily: 'Arial, sans-serif',
      transition: 'background 0.3s ease'
    }}>
      <style>
        {`
          @keyframes pulse {
            0%, 100% { opacity: 1; }
            50% { opacity: 0.5; }
          }
          
          @keyframes fadeInUp {
            from {
              opacity: 0;
              transform: translate3d(0, 30px, 0);
            }
            to {
              opacity: 1;
              transform: translate3d(0, 0, 0);
            }
          }
          
          @keyframes slideDown {
            from {
              opacity: 0;
              transform: translateY(-20px);
            }
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }
          
          @keyframes scaleIn {
            from {
              opacity: 0;
              transform: scale(0.8);
            }
            to {
              opacity: 1;
              transform: scale(1);
            }
          }
          
          @keyframes shimmer {
            0% { background-position: -1000px 0; }
            100% { background-position: 1000px 0; }
          }
          
          @keyframes float {
            0%, 100% { transform: translateY(0px); }
            50% { transform: translateY(-6px); }
          }
          
          @keyframes glow {
            0%, 100% { box-shadow: 0 0 5px rgba(37, 99, 235, 0.3); }
            50% { box-shadow: 0 0 20px rgba(37, 99, 235, 0.6), 0 0 30px rgba(37, 99, 235, 0.4); }
          }
          
          .nav-link {
            position: relative;
            transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          }
          
          .nav-link::after {
            content: '';
            position: absolute;
            bottom: -4px;
            left: 50%;
            width: 0;
            height: 2px;
            background: linear-gradient(135deg, #2563eb, #4f46e5);
            transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
            transform: translateX(-50%);
          }
          
          .nav-link:hover::after {
            width: 100%;
          }
          
          .nav-link:hover {
            color: #2563eb;
            transform: translateY(-2px);
          }
          
          .notification-item {
            animation: slideDown 0.3s ease forwards;
            opacity: 0;
          }
          
          .notification-item:nth-child(1) { animation-delay: 0.1s; }
          .notification-item:nth-child(2) { animation-delay: 0.2s; }
          .notification-item:nth-child(3) { animation-delay: 0.3s; }
          
          .search-input {
            transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          }
          
          .search-input:focus {
            transform: scale(1.02);
            box-shadow: 0 0 0 3px rgba(37, 99, 235, 0.1), 0 10px 25px -5px rgba(0, 0, 0, 0.1);
          }
          
          .activate-btn {
            position: relative;
            overflow: hidden;
            transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          }
          
          .activate-btn::before {
            content: '';
            position: absolute;
            top: 0;
            left: -100%;
            width: 100%;
            height: 100%;
            background: linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent);
            transition: left 0.5s;
          }
          
          .activate-btn:hover::before {
            left: 100%;
          }
          
          .activate-btn:hover {
            transform: translateY(-2px);
            box-shadow: 0 20px 25px -5px rgba(37, 99, 235, 0.4);
          }
          
          .hero-text {
            background: linear-gradient(135deg, #2563eb, #4f46e5);
            background-size: 200% 200%;
            animation: shimmer 3s ease-in-out infinite;
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            background-clip: text;
          }
          
          .floating-element {
            animation: float 6s ease-in-out infinite;
          }
          
          .logo-glow {
            animation: glow 3s ease-in-out infinite;
            border-radius: 8px;
          }
          
          @media (max-width: 768px) {
            .nav-links { display: none; }
            .hero-title { font-size: 36px !important; }
            .search-grid { grid-template-columns: 1fr !important; }
            .mobile-menu-btn { display: flex !important; }
          }
          
          @media (min-width: 769px) {
            .mobile-menu-btn { display: none !important; }
          }
        `}
      </style>

      {/* Navigation Bar */}
      <nav style={{
        backgroundColor: 'rgba(255, 255, 255, 0.95)',
        backdropFilter: 'blur(20px)',
        boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)',
        borderBottom: '1px solid rgba(229, 231, 235, 0.5)',
        position: 'sticky',
        top: 0,
        zIndex: 50,
        animation: isLoaded ? 'slideDown 0.8s ease' : ''
      }}>
        <div style={{
          maxWidth: '1280px',
          margin: '0 auto',
          padding: '0 16px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          height: '72px'
        }}>
          <div style={{ 
            display: 'flex', 
            alignItems: 'center', 
            gap: '16px',
            animation: isLoaded ? 'fadeInUp 0.8s ease 0.2s both' : ''
          }}>
            <img 
              src="https://cdn-icons-png.flaticon.com/512/616/616554.png" 
              alt="ApplySmart Logo"
              className="logo-glow"
              style={{
                width: '48px',
                height: '48px',
                borderRadius: '12px',
                transition: 'transform 0.3s ease',
                cursor: 'pointer'
              }}
              onMouseEnter={(e) => e.target.style.transform = 'scale(1.1) rotate(5deg)'}
              onMouseLeave={(e) => e.target.style.transform = 'scale(1) rotate(0deg)'}
            />
            <h1 style={{
              fontSize: '28px',
              fontWeight: 'bold',
              background: 'linear-gradient(135deg, #2563eb, #4f46e5)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
              cursor: 'pointer'
            }}>ApplySmart</h1>
          </div>

          {/* Desktop Navigation */}
          <div style={{ 
            display: 'flex', 
            alignItems: 'center', 
            gap: '40px',
            animation: isLoaded ? 'fadeInUp 0.8s ease 0.4s both' : ''
          }} className="nav-links">
            <Link
            to = "/home" className="nav-link" style={{
              color: '#2563eb',
              fontWeight: '600',
              borderBottom: '2px solid #2563eb',
              paddingBottom: '4px',
              textDecoration: 'none'
            }}>Home</Link>
            <Link to = "/tracker" className="nav-link" style={{ 
              color: '#374151', 
              fontWeight: '500', 
              textDecoration: 'none',
              paddingBottom: '4px'
            }}>Application Tracker</Link>
            <Link 
        to="/explore-jobs" // 2. Use the 'to' prop to specify the destination
        className="nav-link" 
        style={{ 
          color: '#374151', 
          fontWeight: '500', 
          textDecoration: 'none',
          paddingBottom: '4px'
        }}
      >
        Explore Jobs
      </Link>
            <Link 
            to = "/resume"
             className="nav-link" style={{ 
              color: '#374151', 
              fontWeight: '500', 
              textDecoration: 'none',
              paddingBottom: '4px'
            }}>Resume Builder</Link>
            <Link
            to = "/profile-page"
             className="nav-link" style={{ 
              color: '#374151', 
              fontWeight: '500', 
              textDecoration: 'none',
              paddingBottom: '4px'
            }}>Profile</Link>
          </div>

          {/* Mobile Menu Button */}
          <button 
            className="mobile-menu-btn"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            style={{
              display: 'none',
              alignItems: 'center',
              justifyContent: 'center',
              padding: '8px',
              backgroundColor: 'transparent',
              border: 'none',
              borderRadius: '8px',
              cursor: 'pointer',
              transition: 'all 0.3s ease'
            }}
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>

          {/* User Actions */}
          <div style={{ 
            display: 'flex', 
            alignItems: 'center', 
            gap: '16px',
            animation: isLoaded ? 'fadeInUp 0.8s ease 0.6s both' : ''
          }}>
            <button 
              onClick={() => setShowNotifications(!showNotifications)}
              style={{
                position: 'relative',
                padding: '12px',
                color: '#6b7280',
                backgroundColor: 'rgba(255, 255, 255, 0.8)',
                border: '1px solid rgba(229, 231, 235, 0.5)',
                borderRadius: '12px',
                cursor: 'pointer',
                transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                backdropFilter: 'blur(10px)'
              }}
              onMouseEnter={(e) => {
                e.target.style.transform = 'translateY(-2px)';
                e.target.style.boxShadow = '0 10px 25px -5px rgba(0, 0, 0, 0.15)';
                e.target.style.backgroundColor = 'rgba(255, 255, 255, 1)';
              }}
              onMouseLeave={(e) => {
                e.target.style.transform = 'translateY(0)';
                e.target.style.boxShadow = 'none';
                e.target.style.backgroundColor = 'rgba(255, 255, 255, 0.8)';
              }}
            >
              <Bell size={24} />
              <span style={{
                position: 'absolute',
                top: '6px',
                right: '6px',
                width: '12px',
                height: '12px',
                backgroundColor: '#ef4444',
                borderRadius: '50%',
                animation: 'pulse 2s infinite'
              }}></span>
            </button>
            <button style={{
              padding: '12px',
              color: '#6b7280',
              backgroundColor: 'rgba(255, 255, 255, 0.8)',
              border: '1px solid rgba(229, 231, 235, 0.5)',
              borderRadius: '12px',
              cursor: 'pointer',
              transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
              backdropFilter: 'blur(10px)'
            }}
            onMouseEnter={(e) => {
              e.target.style.transform = 'translateY(-2px)';
              e.target.style.boxShadow = '0 10px 25px -5px rgba(0, 0, 0, 0.15)';
              e.target.style.backgroundColor = 'rgba(255, 255, 255, 1)';
            }}
            onMouseLeave={(e) => {
              e.target.style.transform = 'translateY(0)';
              e.target.style.boxShadow = 'none';
              e.target.style.backgroundColor = 'rgba(255, 255, 255, 0.8)';
            }}
            >
              <User size={24} />
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div style={{
            position: 'absolute',
            top: '100%',
            left: 0,
            right: 0,
            backgroundColor: 'rgba(255, 255, 255, 0.98)',
            backdropFilter: 'blur(20px)',
            borderTop: '1px solid rgba(229, 231, 235, 0.5)',
            padding: '20px',
            animation: 'slideDown 0.3s ease'
          }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <Link to="/home" style={{ color: '#2563eb', fontWeight: '600', textDecoration: 'none' }}>Home</Link>
              <Link to="/tracker" style={{ color: '#374151', fontWeight: '500', textDecoration: 'none' }}>Application Tracker</Link>
              <Link to="/explore-jobs" style={{ color: '#374151', fontWeight: '500', textDecoration: 'none' }}>Explore Jobs</Link>
              <Link to="/resume" style={{ color: '#374151', fontWeight: '500', textDecoration: 'none' }}>Resume Builder</Link>
              <Link to="/profile-page" style={{ color: '#374151', fontWeight: '500', textDecoration: 'none' }}>Profile</Link>
            </div>
          </div>
        )}
      </nav>

      {/* Enhanced Notification Sidebar */}
      {showNotifications && (
        <div style={{
          position: 'fixed',
          right: 0,
          top: '72px',
          width: '380px',
          height: 'calc(100vh - 72px)',
          backgroundColor: 'rgba(255, 255, 255, 0.98)',
          backdropFilter: 'blur(20px)',
          boxShadow: '-10px 0 50px -10px rgba(0, 0, 0, 0.15)',
          zIndex: 40,
          padding: '32px',
          borderLeft: '1px solid rgba(229, 231, 235, 0.5)',
          animation: 'slideDown 0.4s cubic-bezier(0.4, 0, 0.2, 1)'
        }}>
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: '24px'
          }}>
            <h3 style={{ fontSize: '24px', fontWeight: 'bold', color: '#1f2937', margin: 0 }}>
              Notifications
            </h3>
            <button
              onClick={() => setShowNotifications(false)}
              style={{
                padding: '8px',
                backgroundColor: 'transparent',
                border: 'none',
                borderRadius: '8px',
                cursor: 'pointer',
                color: '#6b7280'
              }}
            >
              <X size={20} />
            </button>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <div className="notification-item" style={{
              padding: '20px',
              background: 'linear-gradient(135deg, #eff6ff, #dbeafe)',
              borderRadius: '16px',
              borderLeft: '4px solid #2563eb',
              boxShadow: '0 4px 15px rgba(37, 99, 235, 0.1)',
              cursor: 'pointer',
              transition: 'all 0.3s ease'
            }}
            onMouseEnter={(e) => e.target.style.transform = 'translateX(8px)'}
            onMouseLeave={(e) => e.target.style.transform = 'translateX(0)'}
            >
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: '12px' }}>
                <div style={{
                  width: '12px',
                  height: '12px',
                  backgroundColor: '#2563eb',
                  borderRadius: '50%',
                  flexShrink: 0,
                  marginTop: '4px'
                }}></div>
                <div>
                  <p style={{ fontSize: '16px', fontWeight: '600', color: '#1f2937', margin: '0 0 4px 0' }}>
                    New Job Match!
                  </p>
                  <p style={{ fontSize: '14px', color: '#6b7280', margin: 0 }}>
                    3 software developer positions match your profile
                  </p>
                  <p style={{ fontSize: '12px', color: '#9ca3af', margin: '8px 0 0 0' }}>
                    2 minutes ago
                  </p>
                </div>
              </div>
            </div>
            <div className="notification-item" style={{
              padding: '20px',
              background: 'linear-gradient(135deg, #f0fdf4, #dcfce7)',
              borderRadius: '16px',
              borderLeft: '4px solid #22c55e',
              boxShadow: '0 4px 15px rgba(34, 197, 94, 0.1)',
              cursor: 'pointer',
              transition: 'all 0.3s ease'
            }}
            onMouseEnter={(e) => e.target.style.transform = 'translateX(8px)'}
            onMouseLeave={(e) => e.target.style.transform = 'translateX(0)'}
            >
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: '12px' }}>
                <div style={{
                  width: '12px',
                  height: '12px',
                  backgroundColor: '#22c55e',
                  borderRadius: '50%',
                  flexShrink: 0,
                  marginTop: '4px'
                }}></div>
                <div>
                  <p style={{ fontSize: '16px', fontWeight: '600', color: '#1f2937', margin: '0 0 4px 0' }}>
                    Application Submitted
                  </p>
                  <p style={{ fontSize: '14px', color: '#6b7280', margin: 0 }}>
                    Your application to TechCorp was submitted successfully
                  </p>
                  <p style={{ fontSize: '12px', color: '#9ca3af', margin: '8px 0 0 0' }}>
                    1 hour ago
                  </p>
                </div>
              </div>
            </div>
            <div className="notification-item" style={{
              padding: '20px',
              background: 'linear-gradient(135deg, #fefbf3, #fef3c7)',
              borderRadius: '16px',
              borderLeft: '4px solid #f59e0b',
              boxShadow: '0 4px 15px rgba(245, 158, 11, 0.1)',
              cursor: 'pointer',
              transition: 'all 0.3s ease'
            }}
            onMouseEnter={(e) => e.target.style.transform = 'translateX(8px)'}
            onMouseLeave={(e) => e.target.style.transform = 'translateX(0)'}
            >
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: '12px' }}>
                <div style={{
                  width: '12px',
                  height: '12px',
                  backgroundColor: '#f59e0b',
                  borderRadius: '50%',
                  flexShrink: 0,
                  marginTop: '4px'
                }}></div>
                <div>
                  <p style={{ fontSize: '16px', fontWeight: '600', color: '#1f2937', margin: '0 0 4px 0' }}>
                    Profile Update Needed
                  </p>
                  <p style={{ fontSize: '14px', color: '#6b7280', margin: 0 }}>
                    Complete your profile to unlock more job matches
                  </p>
                  <p style={{ fontSize: '12px', color: '#9ca3af', margin: '8px 0 0 0' }}>
                    3 hours ago
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Enhanced Main Content */}
      <main style={{ maxWidth: '1280px', margin: '0 auto', padding: '40px 16px' }}>
        {/* Enhanced Profile Status Alert */}
        <div style={{
          marginBottom: '48px',
          padding: '24px',
          borderRadius: '20px',
          display: 'flex',
          alignItems: 'center',
          gap: '16px',
          boxShadow: '0 10px 40px rgba(0, 0, 0, 0.08)',
          border: '1px solid rgba(255, 255, 255, 0.2)',
          backdropFilter: 'blur(20px)',
          transform: isLoaded ? 'translateY(0)' : 'translateY(32px)',
          opacity: isLoaded ? 1 : 0,
          transition: 'all 0.8s cubic-bezier(0.4, 0, 0.2, 1) 0.2s',
          ...(isProfileComplete ? {
            background: 'linear-gradient(135deg, rgba(240, 253, 244, 0.9), rgba(220, 252, 231, 0.9))',
            borderColor: '#22c55e',
            color: '#166534'
          } : {
            background: 'linear-gradient(135deg, rgba(254, 251, 243, 0.9), rgba(254, 243, 199, 0.9))',
            borderColor: '#f59e0b',
            color: '#92400e'
          })
        }}>
          <div className="floating-element">
            {!isProfileComplete ? (
              <AlertCircle size={28} />
            ) : (
              <CheckCircle size={28} />
            )}
          </div>
          <div style={{ flex: 1 }}>
            <p style={{ fontWeight: '600', fontSize: '18px', margin: 0 }}>
              <span style={{ fontWeight: 'bold' }}>{userName ? userName : 'loading...'},</span> 
              {isProfileComplete ? " your profile is complete!" : " please complete your profile."}
            </p>
            {!isProfileComplete && (
              <p style={{ fontSize: '14px', opacity: 0.8, margin: '4px 0 0 0' }}>
                Add your skills, experience, and preferences to get better job matches
              </p>
            )}
          </div>
          {!isProfileComplete && (
            <button style={{
              padding: '12px 24px',
              backgroundColor: '#f59e0b',
              color: 'white',
              border: 'none',
              borderRadius: '12px',
              fontWeight: '600',
              cursor: 'pointer',
              transition: 'all 0.3s ease'
            }}
            onMouseEnter={(e) => e.target.style.transform = 'translateY(-2px)'}
            onMouseLeave={(e) => e.target.style.transform = 'translateY(0)'}
            onClick={() => navigate('/profile-page')}
            >
              Complete Now
            </button>
          )}
        </div>

        {/* Enhanced Hero Section */}
        <div style={{
          textAlign: 'center',
          marginBottom: '64px',
          transform: isLoaded ? 'translateY(0)' : 'translateY(48px)',
          opacity: isLoaded ? 1 : 0,
          transition: 'all 1s cubic-bezier(0.4, 0, 0.2, 1) 0.4s'
        }}>
          <h1 style={{
            fontSize: '56px',
            fontWeight: 'bold',
            color: '#111827',
            marginBottom: '32px',
            lineHeight: '1.1',
            letterSpacing: '-0.02em'
          }} className="hero-title">
            Platform to apply{' '}
            <span className="hero-text">jobs</span>
          </h1>
          <div style={{
            transform: isLoaded ? 'translateY(0)' : 'translateY(24px)',
            opacity: isLoaded ? 1 : 0,
            transition: 'all 1s cubic-bezier(0.4, 0, 0.2, 1) 0.6s'
          }}>
            <p style={{
              fontSize: '24px',
              color: '#6b7280',
              marginBottom: '20px',
              maxWidth: '800px',
              margin: '0 auto 20px auto',
              lineHeight: '1.6',
              fontWeight: '400'
            }}>
              Find and apply to jobs from LinkedIn, Indeed, and more all in one place, with a single search.
            </p>
            <p style={{
              fontSize: '20px',
              color: '#9ca3af',
              fontStyle: 'italic',
              fontWeight: '300'
            }}>Your journey starts here...</p>
          </div>
          
          {/* Floating Elements */}
          <div style={{
            position: 'absolute',
            top: '20%',
            left: '10%',
            width: '60px',
            height: '60px',
            background: 'linear-gradient(135deg, rgba(37, 99, 235, 0.1), rgba(79, 70, 229, 0.1))',
            borderRadius: '50%',
            animation: 'float 8s ease-in-out infinite',
            zIndex: -1
          }}></div>
          <div style={{
            position: 'absolute',
            top: '30%',
            right: '15%',
            width: '40px',
            height: '40px',
            background: 'linear-gradient(135deg, rgba(79, 70, 229, 0.1), rgba(37, 99, 235, 0.1))',
            borderRadius: '50%',
            animation: 'float 6s ease-in-out infinite 2s',
            zIndex: -1
          }}></div>
        </div>

        {/* Enhanced Search Box */}
        <div style={{
          marginBottom: '80px',
          transform: isLoaded ? 'translateY(0)' : 'translateY(48px)',
          opacity: isLoaded ? 1 : 0,
          transition: 'all 1s cubic-bezier(0.4, 0, 0.2, 1) 0.8s',
          position: 'relative'
        }}>
          <div style={{
            maxWidth: '1000px',
            margin: '0 auto',
            backgroundColor: 'rgba(255, 255, 255, 0.95)',
            borderRadius: '24px',
            boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.08), 0 0 0 1px rgba(255, 255, 255, 0.5)',
            border: '1px solid rgba(229, 231, 235, 0.3)',
            padding: '32px',
            backdropFilter: 'blur(20px)',
            position: 'relative',
            overflow: 'hidden'
          }}>
            {/* Animated background gradient */}
            <div style={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              height: '2px',
              background: 'linear-gradient(90deg, transparent, #2563eb, #4f46e5, transparent)',
              backgroundSize: '200% 100%',
              animation: 'shimmer 3s linear infinite'
            }}></div>
            
            <div style={{
              display: 'grid',
              gridTemplateColumns: '1fr 1fr auto',
              gap: '24px',
              alignItems: 'end'
            }} className="search-grid">
              <div>
                <label style={{
                  display: 'block',
                  fontSize: '16px',
                  fontWeight: '700',
                  color: '#374151',
                  marginBottom: '12px',
                  letterSpacing: '-0.01em'
                }}>Job Title or Keywords</label>
                <div style={{ position: 'relative' }}>
                  <Search style={{
                    position: 'absolute',
                    left: '16px',
                    top: '50%',
                    transform: 'translateY(-50%)',
                    color: isSearchFocused ? '#2563eb' : '#9ca3af',
                    width: '22px',
                    height: '22px',
                    transition: 'color 0.3s ease'
                  }} />
                  <input
                    type="text"
                    value={searchField}
                    onChange={(e) => setSearchField(e.target.value)}
                    onFocus={() => setIsSearchFocused(true)}
                    onBlur={() => setIsSearchFocused(false)}
                    placeholder="e.g. Software Developer, Data Scientist"
                    className="search-input"
                    style={{
                      width: '100%',
                      paddingLeft: '52px',
                      paddingRight: '20px',
                      paddingTop: '16px',
                      paddingBottom: '16px',
                      border: `2px solid ${isSearchFocused ? '#2563eb' : '#e5e7eb'}`,
                      borderRadius: '16px',
                      fontSize: '16px',
                      outline: 'none',
                      backgroundColor: 'rgba(255, 255, 255, 0.8)',
                      backdropFilter: 'blur(10px)',
                      fontWeight: '500'
                    }}
                  />
                </div>
              </div>
              <div>
                <label style={{
                  display: 'block',
                  fontSize: '16px',
                  fontWeight: '700',
                  color: '#374151',
                  marginBottom: '12px',
                  letterSpacing: '-0.01em'
                }}>Location</label>
                <div style={{ position: 'relative' }}>
                  <MapPin style={{
                    position: 'absolute',
                    left: '16px',
                    top: '50%',
                    transform: 'translateY(-50%)',
                    color: isLocationFocused ? '#2563eb' : '#9ca3af',
                    width: '22px',
                    height: '22px',
                    transition: 'color 0.3s ease'
                  }} />
                  <input
                    type="text"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    onFocus={() => setIsLocationFocused(true)}
                    onBlur={() => setIsLocationFocused(false)}
                    placeholder="City, State or Remote"
                    className="search-input"
                    style={{
                      width: '100%',
                      paddingLeft: '52px',
                      paddingRight: '20px',
                      paddingTop: '16px',
                      paddingBottom: '16px',
                      border: `2px solid ${isLocationFocused ? '#2563eb' : '#e5e7eb'}`,
                      borderRadius: '16px',
                      fontSize: '16px',
                      outline: 'none',
                      backgroundColor: 'rgba(255, 255, 255, 0.8)',
                      backdropFilter: 'blur(10px)',
                      fontWeight: '500'
                    }}
                  />
                </div>
              </div>
              <button
                onClick={handleActivateExtension}
                className="activate-btn"
                style={{
                  background: 'linear-gradient(135deg, #2563eb, #4f46e5)',
                  color: 'white',
                  padding: '16px 32px',
                  borderRadius: '16px',
                  fontWeight: '700',
                  border: 'none',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '12px',
                  cursor: 'pointer',
                  fontSize: '16px',
                  letterSpacing: '-0.01em',
                  boxShadow: '0 10px 25px -5px rgba(37, 99, 235, 0.3)'
                }}
              >
                <Zap size={22} />
                <span>Activate Extension</span>
              </button>
            </div>
            
            {/* Search suggestions (if search field has content) */}
            {searchField && (
              <div style={{
                marginTop: '20px',
                padding: '16px',
                backgroundColor: 'rgba(239, 246, 255, 0.5)',
                borderRadius: '12px',
                border: '1px solid rgba(37, 99, 235, 0.1)',
                animation: 'fadeInUp 0.3s ease'
              }}>
                <p style={{
                  fontSize: '14px',
                  color: '#6b7280',
                  margin: '0 0 8px 0',
                  fontWeight: '600'
                }}>Popular searches:</p>
                <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                  {['Remote Software Engineer', 'Data Analyst', 'Marketing Manager', 'UX Designer'].map((suggestion, index) => (
                    <span
                      key={index}
                      style={{
                        padding: '6px 12px',
                        backgroundColor: 'rgba(37, 99, 235, 0.1)',
                        color: '#2563eb',
                        borderRadius: '20px',
                        fontSize: '12px',
                        fontWeight: '500',
                        cursor: 'pointer',
                        transition: 'all 0.2s ease'
                      }}
                      onMouseEnter={(e) => {
                        e.target.style.backgroundColor = 'rgba(37, 99, 235, 0.2)';
                        e.target.style.transform = 'translateY(-1px)';
                      }}
                      onMouseLeave={(e) => {
                        e.target.style.backgroundColor = 'rgba(37, 99, 235, 0.1)';
                        e.target.style.transform = 'translateY(0)';
                      }}
                      onClick={() => setSearchField(suggestion)}
                    >
                      {suggestion}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
          
          {/* Background decoration */}
          <div style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: '120%',
            height: '120%',
            background: 'radial-gradient(circle, rgba(37, 99, 235, 0.03) 0%, transparent 70%)',
            borderRadius: '50%',
            zIndex: -1,
            animation: 'pulse 4s ease-in-out infinite'
          }}></div>
        </div>
        <div style={{ 
      maxWidth: '1200px', 
      margin: '0 auto', 
      padding: '2rem',
      fontFamily: 'system-ui, -apple-system, sans-serif'
    }}>
      {/* Animated Statistics Bar */}
      <div style={{
        transform: isLoaded ? 'translateY(0)' : 'translateY(-2rem)',
        opacity: isLoaded ? 1 : 0,
        transition: 'all 0.8s ease-out',
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        borderRadius: '1rem',
        padding: '1.5rem',
        marginBottom: '3rem',
        color: 'white'
      }}>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
          gap: '2rem',
          textAlign: 'center'
        }}>
          <div>
            <div style={{ fontSize: '2rem', fontWeight: 'bold', marginBottom: '0.5rem' }}>
              {animatedStats.users}K+
            </div>
            <div style={{ opacity: 0.9 }}>Active Users</div>
          </div>
          <div>
            <div style={{ fontSize: '2rem', fontWeight: 'bold', marginBottom: '0.5rem' }}>
              {animatedStats.jobs}+
            </div>
            <div style={{ opacity: 0.9 }}>Job Listings</div>
          </div>
          <div>
            <div style={{ fontSize: '2rem', fontWeight: 'bold', marginBottom: '0.5rem' }}>
              {animatedStats.companies}+
            </div>
            <div style={{ opacity: 0.9 }}>Partner Companies</div>
          </div>
        </div>
      </div>

      {/* Main Title */}
      <div style={{
        transform: isLoaded ? 'translateY(0)' : 'translateY(2rem)',
        opacity: isLoaded ? 1 : 0,
        transition: 'all 1s 0.2s ease-out'
      }}>
        <h2 style={{
          fontSize: '2.5rem',
          fontWeight: 'bold',
          textAlign: 'center',
          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          backgroundClip: 'text',
          marginBottom: '1rem'
        }}>
          Integrated Platforms for Jobs
        </h2>
        <p style={{
          textAlign: 'center',
          color: '#6b7280',
          fontSize: '1.125rem',
          marginBottom: '3rem'
        }}>
          Discover opportunities across the web's top job platforms
        </p>
      </div>
      
      {/* Platform Cards */}
      <div style={{
        transform: isLoaded ? 'translateY(0)' : 'translateY(2rem)',
        opacity: isLoaded ? 1 : 0,
        transition: 'all 1s 0.4s ease-out'
      }}>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
          gap: '2rem',
          marginBottom: '3rem'
        }}>
          {platforms.map((platform, index) => (
            <div 
              key={platform.name}
              style={{
                ...getCardStyle(index),
                border: `2px solid ${platform.color}`,
                background: hoveredCard === index 
                  ? `linear-gradient(135deg, ${platform.bgColor} 0%, white 100%)`
                  : 'white'
              }}
              onMouseEnter={() => handleCardHover(index)}
              onMouseLeave={handleCardLeave}
            >
              <div style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                textAlign: 'center'
              }}>
                {/* Animated Icon Container */}
                <div style={{
                  width: '5rem',
                  height: '5rem',
                  backgroundColor: platform.bgColor,
                  borderRadius: '1rem',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginBottom: '1.5rem',
                  transform: hoveredCard === index ? 'scale(1.1) rotate(5deg)' : 'scale(1) rotate(0deg)',
                  transition: 'all 0.3s ease-out',
                  boxShadow: hoveredCard === index ? '0 8px 16px rgba(0,0,0,0.1)' : '0 2px 4px rgba(0,0,0,0.05)'
                }}>
                  {platform.logo}
                </div>

                <h3 style={{
                  fontSize: '1.5rem',
                  fontWeight: '600',
                  color: '#111827',
                  marginBottom: '0.5rem',
                  transform: hoveredCard === index ? 'scale(1.05)' : 'scale(1)',
                  transition: 'all 0.2s ease-out'
                }}>
                  {platform.name}
                </h3>

                <p style={{ 
                  color: '#6b7280', 
                  marginBottom: '1rem',
                  fontSize: '1rem'
                }}>
                  {platform.description}
                </p>

                {/* Feature Pills */}
                <div style={{
                  display: 'flex',
                  flexWrap: 'wrap',
                  gap: '0.5rem',
                  justifyContent: 'center',
                  marginTop: '1rem'
                }}>
                  {platform.features.map((feature, featureIndex) => (
                    <span
                      key={feature}
                      style={{
                        padding: '0.25rem 0.75rem',
                        backgroundColor: hoveredCard === index ? platform.color : '#f3f4f6',
                        color: hoveredCard === index ? '#374151' : '#6b7280',
                        borderRadius: '1rem',
                        fontSize: '0.75rem',
                        fontWeight: '500',
                        transform: hoveredCard === index ? 'translateY(-2px)' : 'translateY(0)',
                        transition: `all 0.2s ease-out ${featureIndex * 0.1}s`,
                        boxShadow: hoveredCard === index ? '0 2px 4px rgba(0,0,0,0.1)' : 'none'
                      }}
                    >
                      {feature}
                    </span>
                  ))}
                </div>
              </div>

              {/* Hover Overlay Effect */}
              {hoveredCard === index && (
                <div style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  right: 0,
                  bottom: 0,
                  background: 'linear-gradient(45deg, transparent 30%, rgba(255,255,255,0.1) 50%, transparent 70%)',
                  transform: 'translateX(-100%)',
                  animation: 'shimmer 0.6s ease-out',
                  pointerEvents: 'none'
                }}
              />
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Call to Action Section */}
      <div style={{
        marginTop: '4rem',
        transform: isLoaded ? 'translateY(0)' : 'translateY(2rem)',
        opacity: isLoaded ? 1 : 0,
        transition: 'all 1s 0.8s ease-out'
      }}>
        <div style={{
          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
          borderRadius: '1.5rem',
          padding: '3rem',
          color: 'white',
          textAlign: 'center',
          position: 'relative',
          overflow: 'hidden'
        }}>
          {/* Floating Particles */}
          <div style={{
            position: 'absolute',
            top: '20%',
            left: '10%',
            width: '4px',
            height: '4px',
            backgroundColor: 'rgba(255,255,255,0.3)',
            borderRadius: '50%',
            animation: 'float 3s ease-in-out infinite'
          }} />
          <div style={{
            position: 'absolute',
            top: '60%',
            right: '15%',
            width: '6px',
            height: '6px',
            backgroundColor: 'rgba(255,255,255,0.2)',
            borderRadius: '50%',
            animation: 'float 4s ease-in-out infinite 0.5s'
          }} />
          <div style={{
            position: 'absolute',
            bottom: '30%',
            left: '20%',
            width: '3px',
            height: '3px',
            backgroundColor: 'rgba(255,255,255,0.4)',
            borderRadius: '50%',
            animation: 'float 3.5s ease-in-out infinite 1s'
          }} />

          <h3 style={{
            fontSize: '2.25rem',
            fontWeight: 'bold',
            marginBottom: '1rem',
            transform: isLoaded ? 'scale(1)' : 'scale(0.9)',
            transition: 'all 0.5s ease-out 1.2s'
          }}>
            Ready to Transform Your Job Search?
          </h3>
          <p style={{
            fontSize: '1.25rem',
            opacity: 0.9,
            marginBottom: '2rem',
            maxWidth: '600px',
            margin: '0 auto 2rem'
          }}>
            Join thousands of professionals who have streamlined their job application process
          </p>
          
          <div style={{
            display: 'flex',
            gap: '1rem',
            justifyContent: 'center',
            flexWrap: 'wrap'
          }}>
            <button style={{
              padding: '1rem 2rem',
              backgroundColor: 'white',
              color: '#667eea',
              fontWeight: '600',
              borderRadius: '0.75rem',
              border: 'none',
              cursor: 'pointer',
              fontSize: '1rem',
              transition: 'all 0.3s ease-out',
              transform: 'translateY(0)',
              boxShadow: '0 4px 6px rgba(0,0,0,0.1)'
            }}
            onMouseEnter={(e) => {
              e.target.style.transform = 'translateY(-2px)';
              e.target.style.boxShadow = '0 8px 15px rgba(0,0,0,0.2)';
            }}
            onClick={() => navigate('/profile-page')}
            onMouseLeave={(e) => {
              e.target.style.transform = 'translateY(0)';
              e.target.style.boxShadow = '0 4px 6px rgba(0,0,0,0.1)';
              
            }}>
              {isProfileComplete ? 'Update Profile' : 'Complete Profile'}
            </button>
            <button style={{
              padding: '1rem 2rem',
              border: '2px solid white',
              backgroundColor: 'transparent',
              color: 'white',
              fontWeight: '600',
              borderRadius: '0.75rem',
              cursor: 'pointer',
              fontSize: '1rem',
              transition: 'all 0.3s ease-out',
              transform: 'translateY(0)'
            }}
            onMouseEnter={(e) => {
              e.target.style.transform = 'translateY(-2px)';
              e.target.style.backgroundColor = 'rgba(255,255,255,0.1)';
            }}

            onMouseLeave={(e) => {
              e.target.style.transform = 'translateY(0)';
              e.target.style.backgroundColor = 'transparent';
            }}
                          onClick= {() => navigate('/explore-jobs')}

            >
              Start Exploring
            </button>
          </div>
        </div>
      </div>

      {/* CSS Animations */}
      <style jsx>{`
        @keyframes shimmer {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }
        
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-10px); }
        }
        
        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.5; }
        }
      `}</style>
    </div>
      </main>
    </div>
  );
};

export default Home;