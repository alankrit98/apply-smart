import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import {useNavigate} from 'react-router-dom';
import { 
  Bell, User, Search, MapPin, Briefcase, DollarSign, Clock, Building, Calendar, 
  ArrowRight, Menu, X, Star, MapPin as LocationIcon, CheckCircle, ExternalLink, 
  Bookmark, Filter, Eye, TrendingUp, Target, Award, ChevronDown, ChevronUp,
  BarChart3, PieChart, Activity, FileText, Send, Heart, Trash2, Edit3
} from 'lucide-react';

const JobTrackerPage = () => {
  const [activeTab, setActiveTab] = useState('applied');
  const [dateFilter, setDateFilter] = useState('all');
  const [customDateRange, setCustomDateRange] = useState({ start: '', end: '' });
  const [showCustomDate, setShowCustomDate] = useState(false);
  const navigate = useNavigate();
  const [isLoaded, setIsLoaded] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [selectedJob, setSelectedJob] = useState(null);
  const [showJobDetails, setShowJobDetails] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isProfileComplete, setIsProfileComplete] = useState("");

  // Sample data for different job categories
  const jobData = {
    saved: [
      {
        id: 1,
        title: "Senior Full Stack Developer",
        company: "TechFlow Inc.",
        location: "San Francisco, CA",
        salary: "$130,000 - $180,000",
        savedDate: "2024-07-05",
        logo: "https://cdn-icons-png.flaticon.com/512/2942/2942156.png",
        rating: 4.6,
        status: "saved",
        description: "Leading full-stack development initiatives with modern technologies."
      },
      {
        id: 2,
        title: "Product Manager",
        company: "Innovation Labs",
        location: "New York, NY",
        salary: "$120,000 - $160,000",
        savedDate: "2024-07-04",
        logo: "https://cdn-icons-png.flaticon.com/512/3135/3135715.png",
        rating: 4.4,
        status: "saved",
        description: "Drive product strategy and execution for cutting-edge solutions."
      },
      {
        id: 3,
        title: "UX Designer",
        company: "Creative Studio",
        location: "Remote",
        salary: "$85,000 - $120,000",
        savedDate: "2024-07-03",
        logo: "https://cdn-icons-png.flaticon.com/512/3135/3135823.png",
        rating: 4.8,
        status: "saved",
        description: "Design intuitive user experiences for digital products."
      }
    ],
    applied: [
      {
        id: 4,
        title: "Senior Software Engineer",
        company: "TechCorp Inc.",
        location: "Seattle, WA",
        salary: "$140,000 - $190,000",
        appliedDate: "2024-07-06",
        logo: "https://cdn-icons-png.flaticon.com/512/2942/2942156.png",
        rating: 4.5,
        status: "applied",
        applicationStatus: "Under Review",
        description: "Build scalable systems and mentor junior developers."
      },
      {
        id: 5,
        title: "Data Scientist",
        company: "DataFlow Analytics",
        location: "Austin, TX",
        salary: "$110,000 - $150,000",
        appliedDate: "2024-07-05",
        logo: "https://cdn-icons-png.flaticon.com/512/3135/3135715.png",
        rating: 4.3,
        status: "applied",
        applicationStatus: "Interview Scheduled",
        description: "Extract insights from complex datasets using ML techniques."
      },
      {
        id: 6,
        title: "DevOps Engineer",
        company: "CloudNine Systems",
        location: "Boston, MA",
        salary: "$120,000 - $170,000",
        appliedDate: "2024-06-15",
        logo: "https://cdn-icons-png.flaticon.com/512/2942/2942204.png",
        rating: 4.7,
        status: "applied",
        applicationStatus: "Final Round",
        description: "Streamline deployment processes and maintain infrastructure."
      },
      {
        id: 7,
        title: "Frontend Developer",
        company: "WebCraft Solutions",
        location: "Los Angeles, CA",
        salary: "$95,000 - $130,000",
        appliedDate: "2024-05-20",
        logo: "https://cdn-icons-png.flaticon.com/512/3135/3135768.png",
        rating: 4.2,
        status: "applied",
        applicationStatus: "Rejected",
        description: "Create engaging user interfaces with modern frameworks."
      }
    ]
  };

  // Filter jobs based on date range
  const getFilteredJobs = (jobs, dateField) => {
    const now = new Date();
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    
    return jobs.filter(job => {
      const jobDate = new Date(job[dateField]);
      
      switch(dateFilter) {
        case 'today':
          return jobDate >= today;
        case 'thisMonth':
          return jobDate.getMonth() === now.getMonth() && jobDate.getFullYear() === now.getFullYear();
        case 'thisYear':
          return jobDate.getFullYear() === now.getFullYear();
        case 'custom':
          if (customDateRange.start && customDateRange.end) {
            const startDate = new Date(customDateRange.start);
            const endDate = new Date(customDateRange.end);
            return jobDate >= startDate && jobDate <= endDate;
          }
          return true;
        default:
          return true;
      }
    });
  };

  const getCurrentJobs = () => {
    const dateField = activeTab === 'saved' ? 'savedDate' : 'appliedDate';
    return getFilteredJobs(jobData[activeTab], dateField);
  };

  const getStatusColor = (status) => {
    switch(status) {
      case 'Under Review': return '#2563eb';
      case 'Interview Scheduled': return '#059669';
      case 'Final Round': return '#d97706';
      case 'Rejected': return '#dc2626';
      case 'Pending Response': return '#7c3aed';
      case 'Accepted': return '#059669';
      default: return '#6b7280';
    }
  };

  const getTabStats = () => {
    return {
  saved: jobData.saved.length,
  applied: jobData.applied.length,
};
  };

  useEffect(() => {
    const fetchUserName = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          console.log('No token found');
          return;
        }

        const res = await axios.get('http://localhost:5000/api/users/profile', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setIsProfileComplete(res.data.isProfileComplete);
      } catch (err) {
        console.error('Failed to fetch user profile', err);
      }
    };

    fetchUserName();
  }, []);

  useEffect(() => {
    setIsLoaded(true);
    
    // Mouse tracking for parallax effects
    const handleMouseMove = (e) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth) * 100,
        y: (e.clientY / window.innerHeight) * 100
      });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const handleJobClick = (job) => {
    setSelectedJob(job);
    setShowJobDetails(true);
  };

  const stats = getTabStats();

  return (
    <div style={{
      minHeight: '100vh',
      background: `
        radial-gradient(circle at ${mousePosition.x}% ${mousePosition.y}%, rgba(37, 99, 235, 0.05) 0%, transparent 50%),
        linear-gradient(135deg, #eff6ff 0%, #ffffff 50%, #eef2ff 100%)
      `,
      fontFamily: 'system-ui, -apple-system, sans-serif',
      transition: 'background 0.3s ease'
    }}>
      <style>
        {`
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

          @keyframes slideIn {
            from {
              opacity: 0;
              transform: translateX(20px);
            }
            to {
              opacity: 1;
              transform: translateX(0);
            }
          }

          @keyframes pulse {
            0%, 100% { opacity: 1; }
            50% { opacity: 0.5; }
          }

          @keyframes float {
            0%, 100% { transform: translateY(0px); }
            50% { transform: translateY(-10px); }
          }

          @keyframes countUp {
            from { opacity: 0; transform: translateY(20px); }
            to { opacity: 1; transform: translateY(0); }
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

          .job-card {
            transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
            cursor: pointer;
          }

          .job-card:hover {
            transform: translateY(-4px);
            box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
          }

          .tab-button {
            transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
            position: relative;
            overflow: hidden;
          }

          .tab-button::before {
            content: '';
            position: absolute;
            top: 0;
            left: -100%;
            width: 100%;
            height: 100%;
            background: linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent);
            transition: left 0.5s;
          }

          .tab-button:hover::before {
            left: 100%;
          }

          .stats-card {
            transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          }

          .stats-card:hover {
            transform: translateY(-2px);
          }

          .filter-button {
            transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          }

          .filter-button:hover {
            transform: scale(1.05);
          }

          @media (max-width: 768px) {
            .nav-links { display: none; }
            .mobile-menu-btn { display: flex !important; }
            .tracker-grid { grid-template-columns: 1fr !important; }
            .stats-grid { grid-template-columns: 1fr !important; }
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
            <Link to="/home" className="nav-link" style={{
              color: '#374151', 
              fontWeight: '500',
              paddingBottom: '4px',
              textDecoration: 'none'
            }}>Home</Link>
            <Link to="/tracker" className="nav-link" style={{ 
              color: '#2563eb',
              fontWeight: '600', 
              borderBottom: '2px solid #2563eb',
              textDecoration: 'none',
              paddingBottom: '4px'
            }}>Application Tracker</Link>
            <Link to="/explore-jobs" className="nav-link" style={{ 
              color: '#374151', 
              fontWeight: '500', 
              textDecoration: 'none',
              paddingBottom: '4px'
            }}>Explore Jobs</Link>
            <Link to="/resume" className="nav-link" style={{ 
              color: '#374151', 
              fontWeight: '500', 
              textDecoration: 'none',
              paddingBottom: '4px'
            }}>Resume Builder</Link>
            <Link to="/profile-page" className="nav-link" style={{
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
              cursor: 'pointer'
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
                transition: 'all 0.3s ease',
                backdropFilter: 'blur(10px)'
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
              transition: 'all 0.3s ease',
              backdropFilter: 'blur(10px)'
            }}>
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
              <Link to="/home" style={{ color: '#374151', fontWeight: '500', textDecoration: 'none' }}>Home</Link>
              <Link to="/application-tracker" style={{ color: '#2563eb', fontWeight: '600', textDecoration: 'none' }}>Application Tracker</Link>
              <Link to="/explore-jobs" style={{ color: '#374151', fontWeight: '500', textDecoration: 'none' }}>Explore Jobs</Link>
              <Link to="/resume" style={{ color: '#374151', fontWeight: '500', textDecoration: 'none' }}>Resume Builder</Link>
              <Link to="/profile-page" style={{ color: '#374151', fontWeight: '500', textDecoration: 'none' }}>Profile</Link>
            </div>
          </div>
        )}
      </nav>

      {/* Main Content */}
      <div style={{ maxWidth: '1440px', margin: '0 auto', padding: '32px 16px' }}>
        {/* Header Section */}
        <div style={{
          marginBottom: '32px',
          transform: isLoaded ? 'translateY(0)' : 'translateY(32px)',
          opacity: isLoaded ? 1 : 0,
          transition: 'all 0.8s ease 0.2s'
        }}>
          <h1 style={{
            fontSize: '48px',
            fontWeight: 'bold',
            textAlign: 'center',
            marginBottom: '16px',
            background: 'linear-gradient(135deg, #2563eb, #4f46e5)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text'
          }}>
            Job Application Tracker
          </h1>
          <p style={{
            textAlign: 'center',
            color: '#6b7280',
            fontSize: '20px',
            marginBottom: '32px'
          }}>
            Track your job applications and manage your career journey
          </p>
        </div>

        {/* Stats Cards */}
        <div className="stats-grid" style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
          gap: '24px',
          marginBottom: '32px',
          animation: isLoaded ? 'fadeInUp 0.8s ease 0.4s both' : ''
        }}>
          <div className="stats-card" style={{
            backgroundColor: 'rgba(255, 255, 255, 0.95)',
            borderRadius: '20px',
            padding: '24px',
            boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.1)',
            border: '1px solid rgba(229, 231, 235, 0.3)',
            backdropFilter: 'blur(20px)'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
              <div style={{
                width: '48px',
                height: '48px',
                backgroundColor: '#dbeafe',
                borderRadius: '12px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}>
                <Bookmark size={24} style={{ color: '#2563eb' }} />
              </div>
              <div>
                <h3 style={{
                  fontSize: '32px',
                  fontWeight: 'bold',
                  color: '#1f2937',
                  margin: 0,
                  animation: 'countUp 1s ease'
                }}>{stats.saved}</h3>
                <p style={{ color: '#6b7280', margin: 0, fontSize: '14px' }}>Saved Jobs</p>
              </div>
            </div>
          </div>

          <div className="stats-card" style={{
            backgroundColor: 'rgba(255, 255, 255, 0.95)',
            borderRadius: '20px',
            padding: '24px',
            boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.1)',
            border: '1px solid rgba(229, 231, 235, 0.3)',
            backdropFilter: 'blur(20px)'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
              <div style={{
                width: '48px',
                height: '48px',
                backgroundColor: '#d1fae5',
                borderRadius: '12px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}>
                <Send size={24} style={{ color: '#059669' }} />
              </div>
              <div>
                <h3 style={{
                  fontSize: '32px',
                  fontWeight: 'bold',
                  color: '#1f2937',
                  margin: 0,
                  animation: 'countUp 1s ease 0.2s both'
                }}>{stats.applied}</h3>
                <p style={{ color: '#6b7280', margin: 0, fontSize: '14px' }}>Applied Jobs</p>
              </div>
            </div>
          </div>

        </div>

        {/* Tabs and Filters */}
        <div style={{
          marginBottom: '32px',
          animation: isLoaded ? 'fadeInUp 0.8s ease 0.6s both' : ''
        }}>
          {/* Tab Navigation */}
          <div style={{
            display: 'flex',
            gap: '8px',
            marginBottom: '24px',
            backgroundColor: 'rgba(255, 255, 255, 0.95)',
            borderRadius: '16px',
            padding: '8px',
            boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
            border: '1px solid rgba(229, 231, 235, 0.3)',
            backdropFilter: 'blur(20px)'
          }}>
            {['saved', 'applied'].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className="tab-button"
                style={{
                  flex: 1,
                  padding: '12px 24px',
                  borderRadius: '12px',
                  border: 'none',
                  fontWeight: '600',
                  cursor: 'pointer',
                  fontSize: '16px',
                  backgroundColor: activeTab === tab ? '#2563eb' : 'transparent',
                  color: activeTab === tab ? 'white' : '#6b7280',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '8px'
                }}
              >
                {tab === 'saved' && <Bookmark size={20} />}
                {tab === 'applied' && <Send size={20} />}
                {tab === 'offers' && <Award size={20} />}
                {tab.charAt(0).toUpperCase() + tab.slice(1)} Jobs
              </button>
            ))}
          </div>

          {/* Date Filters */}
          <div style={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: '12px',
            alignItems: 'center',
            backgroundColor: 'rgba(255, 255, 255, 0.95)',
            borderRadius: '16px',
            padding: '16px',
            boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
            border: '1px solid rgba(229, 231, 235, 0.3)',
            backdropFilter: 'blur(20px)'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Filter size={20} style={{ color: '#6b7280' }} />
              <span style={{ fontWeight: '600', color: '#374151' }}>Filter by:</span>
            </div>
            
            {['all', 'today', 'thisMonth', 'thisYear', 'custom'].map((filter) => (
              <button
                key={filter}
                onClick={() => {
                  setDateFilter(filter);
                  setShowCustomDate(filter === 'custom');
                }}
                className="filter-button"
                style={{
                  padding: '8px 16px',
                  borderRadius: '8px',
                  border: '1px solid #e5e7eb',
                  backgroundColor: dateFilter === filter ? '#2563eb' : 'white',
                  color: dateFilter === filter ? 'white' : '#374151',
                  cursor: 'pointer',
                  fontSize: '14px',
                  fontWeight: '500'
                }}
              >
                {filter === 'all' && 'All Time'}
                {filter === 'today' && 'Today'}
                {filter === 'thisMonth' && 'This Month'}
                {filter === 'thisYear' && 'This Year'}
               {filter === 'custom' && 'Custom Range'}
              </button>
            ))}
            
            {showCustomDate && (
              <div style={{
                display: 'flex',
                gap: '8px',
                alignItems: 'center',
                animation: 'slideIn 0.3s ease'
              }}>
                <input
                  type="date"
                  value={customDateRange.start}
                  onChange={(e) => setCustomDateRange({...customDateRange, start: e.target.value})}
                  style={{
                    padding: '8px 12px',
                    borderRadius: '8px',
                    border: '1px solid #e5e7eb',
                    fontSize: '14px',
                    backgroundColor: 'white'
                  }}
                />
                <span style={{ color: '#6b7280' }}>to</span>
                <input
                  type="date"
                  value={customDateRange.end}
                  onChange={(e) => setCustomDateRange({...customDateRange, end: e.target.value})}
                  style={{
                    padding: '8px 12px',
                    borderRadius: '8px',
                    border: '1px solid #e5e7eb',
                    fontSize: '14px',
                    backgroundColor: 'white'
                  }}
                />
              </div>
            )}
          </div>
        </div>

        {/* Job Cards Grid */}
        <div className="tracker-grid" style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))',
          gap: '24px',
          animation: isLoaded ? 'fadeInUp 0.8s ease 0.8s both' : ''
        }}>
          {getCurrentJobs().map((job, index) => (
            <div
              key={job.id}
              className="job-card"
              onClick={() => handleJobClick(job)}
              style={{
                backgroundColor: 'rgba(255, 255, 255, 0.95)',
                borderRadius: '20px',
                padding: '24px',
                boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.1)',
                border: '1px solid rgba(229, 231, 235, 0.3)',
                backdropFilter: 'blur(20px)',
                position: 'relative',
                overflow: 'hidden',
                animation: `fadeInUp 0.6s ease ${index * 0.1}s both`
              }}
            >
              {/* Card Header */}
              <div style={{
                display: 'flex',
                alignItems: 'flex-start',
                gap: '16px',
                marginBottom: '16px'
              }}>
                <img
                  src={job.logo}
                  alt={`${job.company} logo`}
                  style={{
                    width: '56px',
                    height: '56px',
                    borderRadius: '12px',
                    objectFit: 'cover',
                    boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
                  }}
                />
                <div style={{ flex: 1 }}>
                  <h3 style={{
                    fontSize: '20px',
                    fontWeight: 'bold',
                    color: '#1f2937',
                    margin: '0 0 4px 0',
                    lineHeight: '1.2'
                  }}>{job.title}</h3>
                  <p style={{
                    color: '#6b7280',
                    margin: '0 0 8px 0',
                    fontSize: '16px',
                    fontWeight: '500'
                  }}>{job.company}</p>
                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '4px',
                    marginBottom: '8px'
                  }}>
                    <Star size={16} style={{ color: '#fbbf24', fill: '#fbbf24' }} />
                    <span style={{ color: '#6b7280', fontSize: '14px' }}>{job.rating}</span>
                  </div>
                </div>
                <div style={{
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '8px'
                }}>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      // Add to favorites logic
                    }}
                    style={{
                      padding: '8px',
                      backgroundColor: 'rgba(239, 68, 68, 0.1)',
                      border: 'none',
                      borderRadius: '8px',
                      cursor: 'pointer',
                      transition: 'all 0.3s ease'
                    }}
                  >
                    <Heart size={16} style={{ color: '#ef4444' }} />
                  </button>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      // Delete logic
                    }}
                    style={{
                      padding: '8px',
                      backgroundColor: 'rgba(107, 114, 128, 0.1)',
                      border: 'none',
                      borderRadius: '8px',
                      cursor: 'pointer',
                      transition: 'all 0.3s ease'
                    }}
                  >
                    <Trash2 size={16} style={{ color: '#6b7280' }} />
                  </button>
                </div>
              </div>

              {/* Job Details */}
              <div style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '12px',
                marginBottom: '16px'
              }}>
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px'
                }}>
                  <LocationIcon size={16} style={{ color: '#6b7280' }} />
                  <span style={{ color: '#6b7280', fontSize: '14px' }}>{job.location}</span>
                </div>
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px'
                }}>
                  <DollarSign size={16} style={{ color: '#6b7280' }} />
                  <span style={{ color: '#6b7280', fontSize: '14px' }}>{job.salary}</span>
                </div>
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px'
                }}>
                  <Calendar size={16} style={{ color: '#6b7280' }} />
                  <span style={{ color: '#6b7280', fontSize: '14px' }}>
  {activeTab === 'saved' && `Saved: ${new Date(job.savedDate).toLocaleDateString()}`}
  {activeTab === 'applied' && `Applied: ${new Date(job.appliedDate).toLocaleDateString()}`}
</span>
                </div>
              </div>

              {/* Status Badge */}
              {(job.applicationStatus) && (
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  marginBottom: '12px'
                }}>
                  <div style={{
                    padding: '6px 12px',
                    borderRadius: '20px',
                   backgroundColor: `${getStatusColor(job.applicationStatus)}15`,
border: `1px solid ${getStatusColor(job.applicationStatus)}30`
  }}>
                    <span style={{
                     color: getStatusColor(job.applicationStatus),
                      fontSize: '12px',
                      fontWeight: '600'
                    }}>
                      {job.applicationStatus}
                    </span>
                  </div>
                  {job.deadline && (
                    <div style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '4px'
                    }}>
                      <Clock size={14} style={{ color: '#ef4444' }} />
                      <span style={{ color: '#ef4444', fontSize: '12px', fontWeight: '500' }}>
                        Due: {new Date(job.deadline).toLocaleDateString()}
                      </span>
                    </div>
                  )}
                </div>
              )}

              {/* Job Description */}
              <p style={{
                color: '#6b7280',
                fontSize: '14px',
                lineHeight: '1.5',
                marginBottom: '16px'
              }}>{job.description}</p>

              {/* Action Buttons */}
              <div style={{
                display: 'flex',
                gap: '12px',
                justifyContent: 'flex-end'
              }}>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleJobClick(job);
                  }}
                  style={{
                    padding: '8px 16px',
                    backgroundColor: '#2563eb',
                    color: 'white',
                    border: 'none',
                    borderRadius: '8px',
                    cursor: 'pointer',
                    fontSize: '14px',
                    fontWeight: '500',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '4px',
                    transition: 'all 0.3s ease'
                  }}
                >
                  <Eye size={16} />
                  View Details
                </button>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    // Edit job logic
                  }}
                  style={{
                    padding: '8px 16px',
                    backgroundColor: 'rgba(107, 114, 128, 0.1)',
                    color: '#6b7280',
                    border: '1px solid #e5e7eb',
                    borderRadius: '8px',
                    cursor: 'pointer',
                    fontSize: '14px',
                    fontWeight: '500',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '4px',
                    transition: 'all 0.3s ease'
                  }}
                >
                  <Edit3 size={16} />
                  Edit
                </button>
              </div>

              {/* Floating Animation Element */}
              <div style={{
                position: 'absolute',
                top: '-20px',
                right: '-20px',
                width: '40px',
                height: '40px',
                borderRadius: '50%',
                background: 'linear-gradient(135deg, #2563eb, #4f46e5)',
                opacity: 0.1,
                animation: 'float 3s ease-in-out infinite',
                animationDelay: `${index * 0.2}s`
              }}></div>
            </div>
          ))}
        </div>

        {/* Empty State */}
        {getCurrentJobs().length === 0 && (
          <div style={{
            textAlign: 'center',
            padding: '80px 20px',
            animation: 'fadeInUp 0.8s ease'
          }}>
            <div style={{
              width: '120px',
              height: '120px',
              backgroundColor: 'rgba(107, 114, 128, 0.1)',
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '0 auto 24px'
            }}>
              {activeTab === 'saved' && <Bookmark size={48} style={{ color: '#6b7280' }} />}
              {activeTab === 'applied' && <Send size={48} style={{ color: '#6b7280' }} />}
            </div>
            <h3 style={{
              fontSize: '24px',
              fontWeight: 'bold',
              color: '#1f2937',
              marginBottom: '12px'
            }}>
              No {activeTab} jobs found
            </h3>
            <p style={{
              color: '#6b7280',
              fontSize: '16px',
              marginBottom: '24px'
            }}>
              {activeTab === 'saved' && "You haven't saved any jobs yet. Start exploring and save jobs you're interested in!"}
              {activeTab === 'applied' && "You haven't applied to any jobs yet. Find your dream job and start applying!"}
            </p>
            <button
              onClick={() => {
                // Navigate to explore jobs
                window.location.href = '/explore-jobs';
              }}
              style={{
                padding: '12px 24px',
                backgroundColor: '#2563eb',
                color: 'white',
                border: 'none',
                borderRadius: '12px',
                cursor: 'pointer',
                fontSize: '16px',
                fontWeight: '600',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                transition: 'all 0.3s ease'
              }}
            >
              <Search size={20} />
              Explore Jobs
            </button>
          </div>
        )}
      </div>

      {/* Job Details Modal */}
      {showJobDetails && selectedJob && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: 'rgba(0, 0, 0, 0.5)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 1000,
          padding: '20px',
          animation: 'fadeInUp 0.3s ease'
        }}>
          <div style={{
            backgroundColor: 'white',
            borderRadius: '24px',
            padding: '32px',
            maxWidth: '600px',
            width: '100%',
            maxHeight: '90vh',
            overflowY: 'auto',
            position: 'relative',
            animation: 'slideIn 0.3s ease'
          }}>
            <button
              onClick={() => setShowJobDetails(false)}
              style={{
                position: 'absolute',
                top: '16px',
                right: '16px',
                padding: '8px',
                backgroundColor: 'rgba(107, 114, 128, 0.1)',
                border: 'none',
                borderRadius: '8px',
                cursor: 'pointer'
              }}
            >
              <X size={20} />
            </button>

            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '16px',
              marginBottom: '24px'
            }}>
              <img
                src={selectedJob.logo}
                alt={`${selectedJob.company} logo`}
                style={{
                  width: '64px',
                  height: '64px',
                  borderRadius: '12px',
                  objectFit: 'cover'
                }}
              />
              <div>
                <h2 style={{
                  fontSize: '28px',
                  fontWeight: 'bold',
                  color: '#1f2937',
                  margin: '0 0 8px 0'
                }}>{selectedJob.title}</h2>
                <p style={{
                  color: '#6b7280',
                  margin: '0 0 8px 0',
                  fontSize: '18px'
                }}>{selectedJob.company}</p>
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '4px'
                }}>
                  <Star size={16} style={{ color: '#fbbf24', fill: '#fbbf24' }} />
                  <span style={{ color: '#6b7280', fontSize: '14px' }}>{selectedJob.rating}</span>
                </div>
              </div>
            </div>

            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
              gap: '16px',
              marginBottom: '24px'
            }}>
              <div style={{
                padding: '16px',
                backgroundColor: '#f9fafb',
                borderRadius: '12px'
              }}>
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  marginBottom: '8px'
                }}>
                  <LocationIcon size={16} style={{ color: '#6b7280' }} />
                  <span style={{ fontSize: '14px', fontWeight: '500', color: '#6b7280' }}>Location</span>
                </div>
                <p style={{ margin: 0, fontWeight: '600', color: '#1f2937' }}>{selectedJob.location}</p>
              </div>

              <div style={{
                padding: '16px',
                backgroundColor: '#f9fafb',
                borderRadius: '12px'
              }}>
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  marginBottom: '8px'
                }}>
                  <DollarSign size={16} style={{ color: '#6b7280' }} />
                  <span style={{ fontSize: '14px', fontWeight: '500', color: '#6b7280' }}>Salary</span>
                </div>
                <p style={{ margin: 0, fontWeight: '600', color: '#1f2937' }}>{selectedJob.salary}</p>
              </div>

              <div style={{
                padding: '16px',
                backgroundColor: '#f9fafb',
                borderRadius: '12px'
              }}>
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  marginBottom: '8px'
                }}>
                  <Calendar size={16} style={{ color: '#6b7280' }} />
                  <span style={{ fontSize: '14px', fontWeight: '500', color: '#6b7280' }}>Date</span>
                </div>
                <p style={{ margin: 0, fontWeight: '600', color: '#1f2937' }}>
                  {activeTab === 'saved' && new Date(selectedJob.savedDate).toLocaleDateString()}
                  {activeTab === 'applied' && new Date(selectedJob.appliedDate).toLocaleDateString()}
                </p>
              </div>

              {(selectedJob.applicationStatus) && (
  <div style={{
    padding: '16px',
    backgroundColor: '#f9fafb',
    borderRadius: '12px'
  }}>
    <div style={{
      display: 'flex',
      alignItems: 'center',
      gap: '8px',
      marginBottom: '8px'
    }}>
      <Activity size={16} style={{ color: '#6b7280' }} />
      <span style={{ fontSize: '14px', fontWeight: '500', color: '#6b7280' }}>Status</span>
    </div>
    <p style={{
      margin: 0,
      fontWeight: '600',
      color: getStatusColor(selectedJob.applicationStatus)
    }}>
      {selectedJob.applicationStatus}
    </p>
  </div>
)}
            </div>

            <div style={{ marginBottom: '24px' }}>
              <h3 style={{
                fontSize: '20px',
                fontWeight: 'bold',
                color: '#1f2937',
                marginBottom: '12px'
              }}>Job Description</h3>
              <p style={{
                color: '#6b7280',
                lineHeight: '1.6',
                fontSize: '16px'
              }}>{selectedJob.description}</p>
            </div>

            <div style={{
              display: 'flex',
              gap: '12px',
              justifyContent: 'flex-end'
            }}>
              <button
                onClick={() => setShowJobDetails(false)}
                style={{
                  padding: '12px 24px',
                  backgroundColor: 'rgba(107, 114, 128, 0.1)',
                  color: '#6b7280',
                  border: '1px solid #e5e7eb',
                  borderRadius: '12px',
                  cursor: 'pointer',
                  fontSize: '16px',
                  fontWeight: '500'
                }}
              >
                Close
              </button>
              <button
                onClick={() => {
                  // Navigate to job details page
                  window.open(`/job/${selectedJob.id}`, '_blank');
                }}
                style={{
                  padding: '12px 24px',
                  backgroundColor: '#2563eb',
                  color: 'white',
                  border: 'none',
                  borderRadius: '12px',
                  cursor: 'pointer',
                  fontSize: '16px',
                  fontWeight: '500',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px'
                }}
              >
                <ExternalLink size={16} />
                View Full Job
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Notification Panel */}
      {showNotifications && (
        <div style={{
          position: 'fixed',
          top: '80px',
          right: '16px',
          width: '320px',
          backgroundColor: 'rgba(255, 255, 255, 0.95)',
          backdropFilter: 'blur(20px)',
          borderRadius: '16px',
          padding: '20px',
          boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1)',
          border: '1px solid rgba(229, 231, 235, 0.3)',
          zIndex: 1000,
          animation: 'slideDown 0.3s ease'
        }}>
          <h3 style={{
            fontSize: '18px',
            fontWeight: 'bold',
            color: '#1f2937',
            marginBottom: '16px'
          }}>Recent Notifications</h3>
          <div style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '12px'
          }}>
            <div style={{
              padding: '12px',
              backgroundColor: '#dbeafe',
              borderRadius: '8px',
              borderLeft: '4px solid #2563eb'
            }}>
              <p style={{
                margin: 0,
                fontSize: '14px',
                fontWeight: '500',
                color: '#1f2937'
              }}>Interview scheduled for DataFlow Analytics</p>
              <p style={{
                margin: '4px 0 0 0',
                fontSize: '12px',
                color: '#6b7280'
              }}>2 hours ago</p>
            </div>
            <div style={{
              padding: '12px',
              backgroundColor: '#d1fae5',
              borderRadius: '8px',
              borderLeft: '4px solid #059669'
            }}>
              <p style={{
                margin: 0,
                fontSize: '14px',
                fontWeight: '500',
                color: '#1f2937'
              }}>New job offer from DesignFlow Corp</p>
              <p style={{
                margin: '4px 0 0 0',
                fontSize: '12px',
                color: '#6b7280'
              }}>1 day ago</p>
            </div>
            <div style={{
              padding: '12px',
              backgroundColor: '#fef3c7',
              borderRadius: '8px',
              borderLeft: '4px solid #d97706'
            }}>
              <p style={{
                margin: 0,
                fontSize: '14px',
                fontWeight: '500',
                color: '#1f2937'
              }}>Application deadline reminder</p>
              <p style={{
                margin: '4px 0 0 0',
                fontSize: '12px',
                color: '#6b7280'
              }}>3 days ago</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default JobTrackerPage;