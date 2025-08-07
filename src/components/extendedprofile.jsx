import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import {useNavigate} from 'react-router-dom';
import {
  Bell, User, Search, MapPin, Zap, CheckCircle, AlertCircle, Menu, X, Plus, Upload, Edit,
  Trash2, FileText, Briefcase, Award, Target, ChevronDown, ChevronUp, Save, Cancel,
  ArrowLeft, Globe, Linkedin, Twitter, Github, DollarSign, Calendar, GraduationCap,
  Building, Code, Languages, Trophy, Settings
} from 'lucide-react';

const FormField = ({ label, type = 'text', value, onChange, placeholder, options, disabled = false }) => (
    <div style={{ marginBottom: '20px' }}>
      <label style={{
        display: 'block',
        fontSize: '14px',
        fontWeight: '600',
        color: '#374151',
        marginBottom: '6px'
      }}>
        {label}
      </label>
      {type === 'select' ? (
        <select
          value={value}
          onChange={(e) => onChange(e.target.value)}
          disabled={disabled}
          style={{
            width: '100%',
            padding: '12px',
            fontSize: '14px',
            border: '2px solid #e5e7eb',
            borderRadius: '8px',
            outline: 'none',
            transition: 'border-color 0.2s ease',
            backgroundColor: disabled ? '#f9fafb' : 'white'
          }}
        >
          {options.map(option => (
            <option key={option.value} value={option.value}>{option.label}</option>
          ))}
        </select>
      ) : type === 'textarea' ? (
        <textarea
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          disabled={disabled}
          rows={4}
          style={{
            width: '100%',
            padding: '12px',
            fontSize: '14px',
            border: '2px solid #e5e7eb',
            borderRadius: '8px',
            outline: 'none',
            transition: 'border-color 0.2s ease',
            backgroundColor: disabled ? '#f9fafb' : 'white',
            resize: 'vertical'
          }}
        />
      ) : type === 'checkbox' ? (
        <label style={{
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
          cursor: 'pointer'
        }}>
          <input
            type="checkbox"
            checked={value}
            onChange={(e) => onChange(e.target.checked)}
            disabled={disabled}
            style={{
              width: '16px',
              height: '16px',
              accentColor: '#2563eb'
            }}
          />
          <span style={{ fontSize: '14px', color: '#374151' }}>{placeholder}</span>
        </label>
      ) : (
        <input
          type={type}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          disabled={disabled}
          style={{
            width: '100%',
            padding: '12px',
            fontSize: '14px',
            border: '2px solid #e5e7eb',
            borderRadius: '8px',
            outline: 'none',
            transition: 'border-color 0.2s ease',
            backgroundColor: disabled ? '#f9fafb' : 'white'
          }}
        />
      )}
    </div>
  );

    const TabSection = ({ title, icon: Icon, tabName, children, isEditable = true, expandedTabs, editingTabs, toggleTab, toggleEdit, saveTab }) => {
    const isExpanded = expandedTabs[tabName];
    const isEditing = editingTabs[tabName];

    return (
      <div style={{
        background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.9), rgba(255, 255, 255, 0.7))',
        backdropFilter: 'blur(20px)',
        borderRadius: '20px',
        border: '1px solid rgba(226, 232, 240, 0.6)',
        marginBottom: '20px',
        overflow: 'hidden',
        transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
        boxShadow: isExpanded ? '0 20px 25px -5px rgba(0, 0, 0, 0.1)' : '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
      }}>
        <div
          style={{
            padding: '24px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            cursor: 'pointer',
            transition: 'background-color 0.2s ease'
          }}
          onClick={() => toggleTab(tabName)}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            <div style={{
              width: '48px',
              height: '48px',
              background: 'linear-gradient(135deg, #2563eb, #4f46e5)',
              borderRadius: '12px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: '0 4px 14px 0 rgba(37, 99, 235, 0.3)'
            }}>
              <Icon size={24} color="white" />
            </div>
            <h3 style={{
              fontSize: '20px',
              fontWeight: '600',
              color: '#0f172a',
              margin: 0
            }}>
              {title}
            </h3>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            {isEditable && isExpanded && (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  if (isEditing) {
                    saveTab(tabName);
                  } else {
                    toggleEdit(tabName);
                  }
                }}
                style={{
                  padding: '8px 16px',
                  background: isEditing ? 'linear-gradient(135deg, #059669, #047857)' : 'linear-gradient(135deg, #2563eb, #4f46e5)',
                  color: 'white',
                  border: 'none',
                  borderRadius: '8px',
                  cursor: 'pointer',
                  fontSize: '14px',
                  fontWeight: '500',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                  transition: 'all 0.2s ease'
                }}
              >
                {isEditing ? <Save size={16} /> : <Edit size={16} />}
                {isEditing ? 'Save' : 'Edit'}
              </button>
            )}
            {isExpanded ? <ChevronUp size={24} color="#64748b" /> : <ChevronDown size={24} color="#64748b" />}
          </div>
        </div>

        {isExpanded && (
          <div style={{
            padding: '0 24px 24px 24px',
            borderTop: '1px solid rgba(226, 232, 240, 0.6)',
            animation: 'slideDown 0.3s ease'
          }}>
            {children}
          </div>
        )}
      </div>
    );
  };

const ProfileDetailsPage = () => {

  const [showNotifications, setShowNotifications] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const navigate = useNavigate();


  const [expandedTabs, setExpandedTabs] = useState({ personal: true });
  const [editingTabs, setEditingTabs] = useState({});


  const [personalInfo, setPersonalInfo] = useState({
    firstName: '',
    lastName: '',
    gender: '',
    mobile: '',
    email: '',
    address: '',
    city: '',
    state: '',
    zipCode: '',
    country: ''
  });

  const [jobPreference, setJobPreference] = useState({
    linkedin: '',
    twitter: '',
    github: '',
    portfolio: '',
    otherUrl: '',
    currentSalary: '',
    expectedSalary: '',
    noticePeriod: '',
    experience: '',
    highestEducation: '',
    expectedJoining: '',
    willingToRelocate: false
  });

  const [workExperience, setWorkExperience] = useState([]);
  const [education, setEducation] = useState([]);
  const [skills, setSkills] = useState([]);
  const [languages, setLanguages] = useState([]);
  const [certifications, setCertifications] = useState([]);
  const [achievements, setAchievements] = useState([]);
  const [isProfileComplete, setIsProfileComplete] = useState(false);

  // Configure axios to send cookies
  axios.defaults.withCredentials = true;

  useEffect(() => {
    const fetchUserName = async () => {
      try {
        const res = await axios.get('https://localhost:5000/api/users/profile');
        setIsProfileComplete(res.data.isProfileComplete);
      } catch (err) {
        console.error('Failed to fetch user profile', err);
        if (err.response && err.response.status === 401) {
          navigate('/login');
        }
      }
    };

    fetchUserName();
  }, [navigate]);

  useEffect(() => {
    const fetchExtendedProfile = async () => {
      try {
        const res = await axios.get('https://localhost:5000/api/extended-profile');
        
        if (res.data) {
          setPersonalInfo(res.data.personalInfo || {});
          setJobPreference(res.data.jobPreference || {});
          setWorkExperience(res.data.workExperience || []);
          setEducation(res.data.education || []);
          setSkills(res.data.skills || []);
          setLanguages(res.data.languages || []);
          setCertifications(res.data.certifications || []);
          setAchievements(res.data.achievements || []);
        }
      } catch (error) {
        console.error('Error fetching extended profile:', error);
        if (error.response && error.response.status === 404) {
          console.log('No extended profile found yet');
        } else if (error.response && error.response.status === 401) {
          navigate('/login');
        }
      }
    };

    fetchExtendedProfile();
  }, [navigate]);

  useEffect(() => {
    let ticking = false;
    setIsLoaded(true);

    // Mouse tracking for subtle parallax effects
    const handleMouseMove = (e) => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
      setMousePosition({
        x: (e.clientX / window.innerWidth) * 100,
        y: (e.clientY / window.innerHeight) * 100
      });
      ticking = false;
    });
    ticking = true;
  }
};

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const toggleTab = (tabName) => {
    setExpandedTabs(prev => ({
      ...prev,
      [tabName]: !prev[tabName]
    }));
  };

  const toggleEdit = (tabName) => {
    setEditingTabs(prev => ({
      ...prev,
      [tabName]: !prev[tabName]
    }));
  };

  const saveTab = (tabName) => {
    setEditingTabs(prev => ({
      ...prev,
      [tabName]: false
    }));
    // Here you would typically save to backend
    console.log(`Saving ${tabName} data`);
  };

  const cancelEdit = (tabName) => {
    // Implement cancel logic here if needed, e.g., revert to original data
    setEditingTabs(prev => ({
      ...prev,
      [tabName]: false
    }));
    console.log(`Cancelling edit for ${tabName}`);
  };

  const handleSaveProfile = async () => {
    try {
      const res = await axios.post('https://localhost:5000/api/extended-profile/save', {
        personalInfo,
        jobPreference,
        workExperience,
        education,
        skills,
        languages,
        certifications,
        achievements
      });

      if (res.status === 200 || res.status === 201) {
        alert('Profile saved successfully!');
        navigate('/home');
      }
    } catch (err) {
      console.error('Error saving profile:', err);
      if (err.response && err.response.data && err.response.data.message) {
        alert('Error saving profile: ' + err.response.data.message);
      } else if (err.response && err.response.status === 401) {
        alert('Authentication error. Please login again.');
        navigate('/login');
      } else {
        alert('Network error occurred while saving profile');
      }
    }
  };

  const addWorkExperience = () => {
    setWorkExperience([...workExperience, {
      id: Date.now(),
      company: '',
      position: '',
      startDate: '',
      endDate: '',
      current: false,
      description: ''
    }]);
  };

  const addEducation = () => {
    setEducation([...education, {
      id: Date.now(),
      institution: '',
      degree: '',
      field: '',
      startDate: '',
      endDate: '',
      grade: ''
    }]);
  };

  const addSkill = () => {
    setSkills([...skills, {
      id: Date.now(),
      name: '',
      level: 'Beginner'
    }]);
  };

  const addLanguage = () => {
    setLanguages([...languages, {
      id: Date.now(),
      language: '',
      proficiency: 'Basic'
    }]);
  };

  const addCertification = () => {
    setCertifications([...certifications, {
      id: Date.now(),
      name: '',
      issuer: '',
      date: '',
      url: ''
    }]);
  };

  const addAchievement = () => {
    setAchievements([...achievements, {
      id: Date.now(),
      title: '',
      description: '',
      date: ''
    }]);
  };

  const removeItem = (items, setItems, id) => {
    setItems(items.filter(item => item.id !== id));
  };

  const updateItem = (items, setItems, id, field, value) => {
    setItems(items.map(item =>
      item.id === id ? { ...item, [field]: value } : item
    ));
  };




  return (
    <div style={{
      minHeight: '100vh',
      background: `
         radial-gradient(circle at ${mousePosition.x}% ${mousePosition.y}%, rgba(37, 99, 235, 0.08) 0%, transparent 50%),
        linear-gradient(135deg, #f8fafc 0%, #ffffff 40%, #f1f5f9 100%)
      `,
      fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
      transition: 'background 0.3s ease'
    }}>
      <style>
        {`
          @keyframes fadeInUp {
            from {
              opacity: 0;
              transform: translate3d(0, 40px, 0);
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
              transform: scale(0.9);
            }
            to {
              opacity: 1;
              transform: scale(1);
            }
          }

          @keyframes pulse {
            0%, 100% { opacity: 1; }
            50% { opacity: 0.6; }
          }

          @keyframes float {
            0%, 100% { transform: translateY(0px); }
            50% { transform: translateY(-6px); }
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
            transform: translateY(-1px);
          }

          @media (max-width: 768px) {
            .nav-links { display: none; }
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
              style={{
                width: '48px',
                height: '48px',
                borderRadius: '12px',
                transition: 'transform 0.3s ease',
                cursor: 'pointer'
              }}
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
            <Link to = "/tracker"
             className="nav-link" style={{
              color: '#374151',
              fontWeight: '500',
              textDecoration: 'none',
              paddingBottom: '4px'
            }}>Application Tracker</Link>
            <Link to="/explore-jobs" className="nav-link" style={{
              color: '#374151',
              fontWeight: '500',
              textDecoration: 'none',
              paddingBottom: '4px'
            }}>Explore Jobs</Link>
            <Link to = '/resume' className="nav-link" style={{
              color: '#374151',
              fontWeight: '500',
              textDecoration: 'none',
              paddingBottom: '4px'
            }}>Resume Builder</Link>
            <Link to="/profile-page" className="nav-link" style={{
              color: '#2563eb',
              fontWeight: '600',
              borderBottom: '2px solid #2563eb',
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
              <a href="#" style={{ color: '#374151', fontWeight: '500', textDecoration: 'none' }}>Application Tracker</a>
              <Link to="/explore-jobs" style={{ color: '#374151', fontWeight: '500', textDecoration: 'none' }}>Explore Jobs</Link>
              <a href="#" style={{ color: '#374151', fontWeight: '500', textDecoration: 'none' }}>Resume Builder</a>
              <Link to="/profile-page" style={{ color: '#2563eb', fontWeight: '600', textDecoration: 'none' }}>Profile</Link>
            </div>
          </div>
        )}
      </nav>

      {/* Main Content */}
      <main style={{ maxWidth: '1000px', margin: '0 auto', padding: '40px 16px' }}>
        {/* Back to Profile Button */}
        <div style={{ marginBottom: '40px' }}>
          <Link
            to="/profile-page"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              padding: '12px 24px',
              background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.9), rgba(255, 255, 255, 0.7))',
              backdropFilter: 'blur(20px)',
              border: '1px solid rgba(226, 232, 240, 0.6)',
              borderRadius: '12px',
              color: '#2563eb',
              fontWeight: '600',
              textDecoration: 'none',
              transition: 'all 0.3s ease',
              boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
            }}
          >
            <ArrowLeft size={20} />
            Back to Profile
          </Link>
        </div>

        {/* Page Header */}
        <div style={{
          textAlign: 'center',
          marginBottom: '60px',
          transform: isLoaded ? 'translateY(0)' : 'translateY(32px)',
          opacity: isLoaded ? 1 : 0,
          transition: 'all 0.8s cubic-bezier(0.4, 0, 0.2, 1) 0.2s'
        }}>
          <h1 style={{
            fontSize: 'clamp(28px, 4vw, 42px)',
            fontWeight: '800',
            color: '#0f172a',
            marginBottom: '16px',
            lineHeight: '1.1',
            letterSpacing: '-0.025em'
          }}>
            Complete Your{' '}
            <span style={{
              background: 'linear-gradient(135deg, #2563eb, #7c3aed)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text'
            }}>
              Profile Details
            </span>
          </h1>
          <p style={{
            fontSize: '18px',
            color: '#64748b',
            maxWidth: '600px',
            margin: '0 auto',
            lineHeight: '1.6'
          }}>
            Fill in your information to create a comprehensive professional profile that stands out to employers.
          </p>
        </div>

        {/* Profile Sections */}
        <div style={{
          transform: isLoaded ? 'translateY(0)' : 'translateY(32px)',
          opacity: isLoaded ? 1 : 0,
          transition: 'all 0.8s cubic-bezier(0.4, 0, 0.2, 1) 0.4s'
        }}>
          {/* Personal Information */}
          <TabSection
            title="Personal Information"
            icon={User}
            tabName="personal"
            expandedTabs={expandedTabs}
            editingTabs={editingTabs}
            toggleTab={toggleTab}
            toggleEdit={toggleEdit}
            saveTab={saveTab}
            cancelEdit={cancelEdit}
          >
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '20px' }}>
              <FormField
                label="First Name"
                value={personalInfo.firstName}
                onChange={(value) => setPersonalInfo({...personalInfo, firstName: value})}
                placeholder="Enter your first name"
                disabled={!editingTabs.personal}
              />
              <FormField
                label="Last Name"
                value={personalInfo.lastName}
                onChange={(value) => setPersonalInfo({...personalInfo, lastName: value})}
                placeholder="Enter your last name"
                disabled={!editingTabs.personal}
              />
              <FormField
                label="Gender"
                type="select"
                value={personalInfo.gender}
                onChange={(value) => setPersonalInfo({...personalInfo, gender: value})}
                disabled={!editingTabs.personal}
                options={[
                  { value: '', label: 'Select Gender' },
                  { value: 'male', label: 'Male' },
                  { value: 'female', label: 'Female' },
                  { value: 'other', label: 'Other' },
                  { value: 'prefer-not-to-say', label: 'Prefer not to say' }
                ]}
              />
              <FormField
                label="Mobile Number"
                type="tel"
                value={personalInfo.mobile}
                onChange={(value) => setPersonalInfo({...personalInfo, mobile: value})}
                placeholder="Enter your mobile number"
                disabled={!editingTabs.personal}
              />
              <FormField
                label="Email Address"
                type="email"
                value={personalInfo.email}
                onChange={(value) => setPersonalInfo({...personalInfo, email: value})}
                placeholder="Enter your email address"
                disabled={!editingTabs.personal}
              />
              <FormField
                label="Address"
                value={personalInfo.address}
                onChange={(value) => setPersonalInfo({...personalInfo, address: value})}
                placeholder="Enter your address"
                disabled={!editingTabs.personal}
              />
              <FormField
                label="City"
                value={personalInfo.city}
                onChange={(value) => setPersonalInfo({...personalInfo, city: value})}
                placeholder="Enter your city"
                disabled={!editingTabs.personal}
              />
              <FormField
                label="State"
                value={personalInfo.state}
                onChange={(value) => setPersonalInfo({...personalInfo, state: value})}
                placeholder="Enter your state"
                disabled={!editingTabs.personal}
              />
              <FormField
                label="ZIP Code"
                value={personalInfo.zipCode}
                onChange={(value) => setPersonalInfo({...personalInfo, zipCode: value})}
                placeholder="Enter your ZIP code"
                disabled={!editingTabs.personal}
              />
              <FormField
                label="Country"
                value={personalInfo.country}
                onChange={(value) => setPersonalInfo({...personalInfo, country: value})}
                placeholder="Enter your country"
                disabled={!editingTabs.personal}
              />
            </div>
          </TabSection>

          {/* Job Preferences */}
          <TabSection
            title="Job Preferences"
            icon={Target}
            tabName="jobPreference"
            expandedTabs={expandedTabs}
            editingTabs={editingTabs}
            toggleTab={toggleTab}
            toggleEdit={toggleEdit}
            saveTab={saveTab}
            cancelEdit={cancelEdit}
          >
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '20px' }}>
              <FormField
                label="LinkedIn Profile"
                value={jobPreference.linkedin}
                onChange={(value) => setJobPreference({...jobPreference, linkedin: value})}
                placeholder="https://linkedin.com/in/yourprofile"
                disabled={!editingTabs.jobPreference}
              />
              <FormField
                label="Twitter Profile"
                value={jobPreference.twitter}
                onChange={(value) => setJobPreference({...jobPreference, twitter: value})}
                placeholder="https://twitter.com/yourprofile"
                disabled={!editingTabs.jobPreference}
              />
              <FormField
                label="GitHub Profile"
                value={jobPreference.github}
                onChange={(value) => setJobPreference({...jobPreference, github: value})}
                placeholder="https://github.com/yourprofile"
                disabled={!editingTabs.jobPreference}
              />
              <FormField
                label="Portfolio URL"
                value={jobPreference.portfolio}
                onChange={(value) => setJobPreference({...jobPreference, portfolio: value})}
                placeholder="https://yourportfolio.com"
                disabled={!editingTabs.jobPreference}
              />
              <FormField
                label="Other URL"
                value={jobPreference.otherUrl}
                onChange={(value) => setJobPreference({...jobPreference, otherUrl: value})}
                placeholder="Any other relevant URL"
                disabled={!editingTabs.jobPreference}
              />
              <FormField
                label="Current Salary"
                value={jobPreference.currentSalary}
                onChange={(value) => setJobPreference({...jobPreference, currentSalary: value})}
                placeholder="Enter current salary"
                disabled={!editingTabs.jobPreference}
              />
              <FormField
                label="Expected Salary"
                value={jobPreference.expectedSalary}
                onChange={(value) => setJobPreference({...jobPreference, expectedSalary: value})}
                placeholder="Enter expected salary"
                disabled={!editingTabs.jobPreference}
              />
              <FormField
                label="Notice Period"
                value={jobPreference.noticePeriod}
                onChange={(value) => setJobPreference({...jobPreference, noticePeriod: value})}
                placeholder="Enter notice period (e.g., 30 days)"
                disabled={!editingTabs.jobPreference}
              />
              <FormField
                label="Total Experience"
                value={jobPreference.experience}
                onChange={(value) => setJobPreference({...jobPreference, experience: value})}
                placeholder="Enter total experience (e.g., 3 years)"
                disabled={!editingTabs.jobPreference}
              />
              <FormField
                label="Highest Education"
                type="select"
                value={jobPreference.highestEducation}
                onChange={(value) => setJobPreference({...jobPreference, highestEducation: value})}
                disabled={!editingTabs.jobPreference}
                options={[
                  { value: '', label: 'Select Education Level' },
                  { value: 'high-school', label: 'High School' },
                  { value: 'diploma', label: 'Diploma' },
                  { value: 'bachelors', label: "Bachelor's Degree" },
                  { value: 'masters', label: "Master's Degree" },
                  { value: 'phd', label: 'Ph.D.' },
                  { value: 'other', label: 'Other' }
                ]}
              />
              <FormField
                label="Expected Joining Date"
                type="date"
                value={jobPreference.expectedJoining}
                onChange={(value) => setJobPreference({...jobPreference, expectedJoining: value})}
                disabled={!editingTabs.jobPreference}
              />
              <FormField
                label="Willing to Relocate"
                type="checkbox"
                value={jobPreference.willingToRelocate}
                onChange={(value) => setJobPreference({...jobPreference, willingToRelocate: value})}
                placeholder="I am willing to relocate for the right opportunity"
                disabled={!editingTabs.jobPreference}
              />
            </div>
          </TabSection>

          {/* Work Experience */}
          <TabSection
            title="Work Experience"
            icon={Briefcase}
            tabName="workExperience"
            expandedTabs={expandedTabs}
            editingTabs={editingTabs}
            toggleTab={toggleTab}
            toggleEdit={toggleEdit}
            saveTab={saveTab}
            cancelEdit={cancelEdit}
          >
            <div style={{ marginBottom: '24px' }}>
              <button
                onClick={addWorkExperience}
                disabled={!editingTabs.workExperience}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  padding: '12px 24px',
                  background: editingTabs.workExperience ? 'linear-gradient(135deg, #2563eb, #4f46e5)' : '#f3f4f6',
                  color: editingTabs.workExperience ? 'white' : '#9ca3af',
                  border: 'none',
                  borderRadius: '12px',
                  cursor: editingTabs.workExperience ? 'pointer' : 'not-allowed',
                  fontSize: '14px',
                  fontWeight: '600',
                  transition: 'all 0.3s ease',
                  boxShadow: editingTabs.workExperience ? '0 4px 14px 0 rgba(37, 99, 235, 0.3)' : 'none'
                }}
              >
                <Plus size={18} />
                Add Work Experience
              </button>
            </div>

            {workExperience.map((exp, index) => (
              <div key={exp.id} style={{
                background: 'linear-gradient(135deg, rgba(249, 250, 251, 0.9), rgba(255, 255, 255, 0.9))',
                border: '1px solid rgba(229, 231, 235, 0.8)',
                borderRadius: '16px',
                padding: '24px',
                marginBottom: '20px',
                position: 'relative',
                animation: 'scaleIn 0.3s ease'
              }}>
                {editingTabs.workExperience && (
                  <button
                    onClick={() => removeItem(workExperience, setWorkExperience, exp.id)}
                    style={{
                      position: 'absolute',
                      top: '16px',
                      right: '16px',
                      padding: '8px',
                      background: 'linear-gradient(135deg, #ef4444, #dc2626)',
                      color: 'white',
                      border: 'none',
                      borderRadius: '8px',
                      cursor: 'pointer',
                      transition: 'all 0.2s ease'
                    }}
                  >
                    <Trash2 size={16} />
                  </button>
                )}

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '20px' }}>
                  <FormField
                    label="Company Name"
                    value={exp.company}
                    onChange={(value) => updateItem(workExperience, setWorkExperience, exp.id, 'company', value)}
                    placeholder="Enter company name"
                    disabled={!editingTabs.workExperience}
                  />
                  <FormField
                    label="Position"
                    value={exp.position}
                    onChange={(value) => updateItem(workExperience, setWorkExperience, exp.id, 'position', value)}
                    placeholder="Enter your position"
                    disabled={!editingTabs.workExperience}
                  />
                  <FormField
                    label="Start Date"
                    type="date"
                    value={exp.startDate}
                    onChange={(value) => updateItem(workExperience, setWorkExperience, exp.id, 'startDate', value)}
                    disabled={!editingTabs.workExperience}
                  />
                  <FormField
                    label="End Date"
                    type="date"
                    value={exp.endDate}
                    onChange={(value) => updateItem(workExperience, setWorkExperience, exp.id, 'endDate', value)}
                    disabled={!editingTabs.workExperience || exp.current}
                  />
                  <FormField
                    label="Currently Working"
                    type="checkbox"
                    value={exp.current}
                    onChange={(value) => updateItem(workExperience, setWorkExperience, exp.id, 'current', value)}
                    placeholder="I currently work here"
                    disabled={!editingTabs.workExperience}
                  />
                </div>
                <FormField
                  label="Job Description"
                  type="textarea"
                  value={exp.description}
                  onChange={(value) => updateItem(workExperience, setWorkExperience, exp.id, 'description', value)}
                  placeholder="Describe your role and responsibilities..."
                  disabled={!editingTabs.workExperience}
                />
              </div>
            ))}

            {workExperience.length === 0 && (
              <div style={{
                textAlign: 'center',
                padding: '40px',
                color: '#9ca3af',
                fontSize: '16px'
              }}>
                <Building size={48} style={{ margin: '0 auto 16px', opacity: 0.5 }} />
                <p>No work experience added yet. Click "Add Work Experience" to get started.</p>
              </div>
            )}
          </TabSection>

          {/* Education */}
          <TabSection
            title="Education"
            icon={GraduationCap}
            tabName="education"
            expandedTabs={expandedTabs}
            editingTabs={editingTabs}
            toggleTab={toggleTab}
            toggleEdit={toggleEdit}
            saveTab={saveTab}
            cancelEdit={cancelEdit}
          >
            <div style={{ marginBottom: '24px' }}>
              <button
                onClick={addEducation}
                disabled={!editingTabs.education}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  padding: '12px 24px',
                  background: editingTabs.education ? 'linear-gradient(135deg, #2563eb, #4f46e5)' : '#f3f4f6',
                  color: editingTabs.education ? 'white' : '#9ca3af',
                  border: 'none',
                  borderRadius: '12px',
                  cursor: editingTabs.education ? 'pointer' : 'not-allowed',
                  fontSize: '14px',
                  fontWeight: '600',
                  transition: 'all 0.3s ease',
                  boxShadow: editingTabs.education ? '0 4px 14px 0 rgba(37, 99, 235, 0.3)' : 'none'
                }}
              >
                <Plus size={18} />
                Add Education
              </button>
            </div>

            {education.map((edu, index) => (
              <div key={edu.id} style={{
                background: 'linear-gradient(135deg, rgba(249, 250, 251, 0.9), rgba(255, 255, 255, 0.9))',
                border: '1px solid rgba(229, 231, 235, 0.8)',
                borderRadius: '16px',
                padding: '24px',
                marginBottom: '20px',
                position: 'relative',
                animation: 'scaleIn 0.3s ease'
              }}>
                {editingTabs.education && (
                  <button
                    onClick={() => removeItem(education, setEducation, edu.id)}
                    style={{
                      position: 'absolute',
                      top: '16px',
                      right: '16px',
                      padding: '8px',
                      background: 'linear-gradient(135deg, #ef4444, #dc2626)',
                      color: 'white',
                      border: 'none',
                      borderRadius: '8px',
                      cursor: 'pointer',
                      transition: 'all 0.2s ease'
                    }}
                  >
                    <Trash2 size={16} />
                  </button>
                )}

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '20px' }}>
                  <FormField
                    label="Institution"
                    value={edu.institution}
                    onChange={(value) => updateItem(education, setEducation, edu.id, 'institution', value)}
                    placeholder="Enter institution name"
                    disabled={!editingTabs.education}
                  />
                  <FormField
                    label="Degree"
                    value={edu.degree}
                    onChange={(value) => updateItem(education, setEducation, edu.id, 'degree', value)}
                    placeholder="Enter degree"
                    disabled={!editingTabs.education}
                  />
                  <FormField
                    label="Field of Study"
                    value={edu.field}
                    onChange={(value) => updateItem(education, setEducation, edu.id, 'field', value)}
                    placeholder="Enter field of study"
                    disabled={!editingTabs.education}
                  />
                  <FormField
                    label="Start Date"
                    type="date"
                    value={edu.startDate}
                    onChange={(value) => updateItem(education, setEducation, edu.id, 'startDate', value)}
                    disabled={!editingTabs.education}
                  />
                  <FormField
                    label="End Date"
                    type="date"
                    value={edu.endDate}
                    onChange={(value) => updateItem(education, setEducation, edu.id, 'endDate', value)}
                    disabled={!editingTabs.education}
                  />
                  <FormField
                    label="Grade/GPA"
                    value={edu.grade}
                    onChange={(value) => updateItem(education, setEducation, edu.id, 'grade', value)}
                    placeholder="Enter grade or GPA"
                    disabled={!editingTabs.education}
                  />
                </div>
              </div>
            ))}

            {education.length === 0 && (
              <div style={{
                textAlign: 'center',
                padding: '40px',
                color: '#9ca3af',
                fontSize: '16px'
              }}>
                <GraduationCap size={48} style={{ margin: '0 auto 16px', opacity: 0.5 }} />
                <p>No education added yet. Click "Add Education" to get started.</p>
              </div>
            )}
          </TabSection>

          {/* Skills */}
          <TabSection
            title="Skills"
            icon={Code}
            tabName="skills"
            expandedTabs={expandedTabs}
            editingTabs={editingTabs}
            toggleTab={toggleTab}
            toggleEdit={toggleEdit}
            saveTab={saveTab}
            cancelEdit={cancelEdit}
          >
            <div style={{ marginBottom: '24px' }}>
              <button
                onClick={addSkill}
                disabled={!editingTabs.skills}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  padding: '12px 24px',
                  background: editingTabs.skills ? 'linear-gradient(135deg, #2563eb, #4f46e5)' : '#f3f4f6',
                  color: editingTabs.skills ? 'white' : '#9ca3af',
                  border: 'none',
                  borderRadius: '12px',
                  cursor: editingTabs.skills ? 'pointer' : 'not-allowed',
                  fontSize: '14px',
                  fontWeight: '600',
                  transition: 'all 0.3s ease',
                  boxShadow: editingTabs.skills ? '0 4px 14px 0 rgba(37, 99, 235, 0.3)' : 'none'
                }}
              >
                <Plus size={18} />
                Add Skill
              </button>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '20px' }}>
              {skills.map((skill) => (
                <div key={skill.id} style={{
                  background: 'linear-gradient(135deg, rgba(249, 250, 251, 0.9), rgba(255, 255, 255, 0.9))',
                  border: '1px solid rgba(229, 231, 235, 0.8)',
                  borderRadius: '16px',
                  padding: '20px',
                  position: 'relative',
                  animation: 'scaleIn 0.3s ease'
                }}>
                  {editingTabs.skills && (
                    <button
                      onClick={() => removeItem(skills, setSkills, skill.id)}
                      style={{
                        position: 'absolute',
                        top: '12px',
                        right: '12px',
                        padding: '6px',
                        background: 'linear-gradient(135deg, #ef4444, #dc2626)',
                        color: 'white',
                        border: 'none',
                        borderRadius: '6px',
                        cursor: 'pointer',
                        transition: 'all 0.2s ease'
                      }}
                    >
                      <Trash2 size={14} />
                    </button>
                  )}

                  <FormField
                    label="Skill Name"
                    value={skill.name}
                    onChange={(value) => updateItem(skills, setSkills, skill.id, 'name', value)}
                    placeholder="Enter skill name"
                    disabled={!editingTabs.skills}
                  />
                  <FormField
                    label="Proficiency Level"
                    type="select"
                    value={skill.level}
                    onChange={(value) => updateItem(skills, setSkills, skill.id, 'level', value)}
                    disabled={!editingTabs.skills}
                    options={[
                      { value: 'Beginner', label: 'Beginner' },
                      { value: 'Intermediate', label: 'Intermediate' },
                      { value: 'Advanced', label: 'Advanced' },
                      { value: 'Expert', label: 'Expert' }
                    ]}
                  />
                </div>
              ))}
            </div>

            {skills.length === 0 && (
              <div style={{
                textAlign: 'center',
                padding: '40px',
                color: '#9ca3af',
                fontSize: '16px'
              }}>
                <Code size={48} style={{ margin: '0 auto 16px', opacity: 0.5 }} />
                <p>No skills added yet. Click "Add Skill" to get started.</p>
              </div>
            )}
          </TabSection>

          {/* Languages */}
          <TabSection
            title="Languages"
            icon={Languages}
            tabName="languages"
            expandedTabs={expandedTabs}
            editingTabs={editingTabs}
            toggleTab={toggleTab}
            toggleEdit={toggleEdit}
            saveTab={saveTab}
            cancelEdit={cancelEdit}
          >
            <div style={{ marginBottom: '24px' }}>
              <button
                onClick={addLanguage}
                disabled={!editingTabs.languages}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  padding: '12px 24px',
                  background: editingTabs.languages ? 'linear-gradient(135deg, #2563eb, #4f46e5)' : '#f3f4f6',
                  color: editingTabs.languages ? 'white' : '#9ca3af',
                  border: 'none',
                  borderRadius: '12px',
                  cursor: editingTabs.languages ? 'pointer' : 'not-allowed',
                  fontSize: '14px',
                  fontWeight: '600',
                  transition: 'all 0.3s ease',
                  boxShadow: editingTabs.languages ? '0 4px 14px 0 rgba(37, 99, 235, 0.3)' : 'none'
                }}
              >
                <Plus size={18} />
                Add Language
              </button>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '20px' }}>
              {languages.map((lang) => (
                <div key={lang.id} style={{
                  background: 'linear-gradient(135deg, rgba(249, 250, 251, 0.9), rgba(255, 255, 255, 0.9))',
                  border: '1px solid rgba(229, 231, 235, 0.8)',
                  borderRadius: '16px',
                  padding: '20px',
                  position: 'relative',
                  animation: 'scaleIn 0.3s ease'
                }}>
                  {editingTabs.languages && (
                    <button
                      onClick={() => removeItem(languages, setLanguages, lang.id)}
                      style={{
                        position: 'absolute',
                        top: '12px',
                        right: '12px',
                        padding: '6px',
                        background: 'linear-gradient(135deg, #ef4444, #dc2626)',
                        color: 'white',
                        border: 'none',
                        borderRadius: '6px',
                        cursor: 'pointer',
                        transition: 'all 0.2s ease'
                      }}
                    >
                      <Trash2 size={14} />
                    </button>
                  )}

                  <FormField
                    label="Language"
                    value={lang.language}
                    onChange={(value) => updateItem(languages, setLanguages, lang.id, 'language', value)}
                    placeholder="Enter language name"
                    disabled={!editingTabs.languages}
                  />
                  <FormField
                    label="Proficiency Level"
                    type="select"
                    value={lang.proficiency}
                    onChange={(value) => updateItem(languages, setLanguages, lang.id, 'proficiency', value)}
                    disabled={!editingTabs.languages}
                    options={[
                      { value: 'Basic', label: 'Basic' },
                      { value: 'Conversational', label: 'Conversational' },
                      { value: 'Fluent', label: 'Fluent' },
                      { value: 'Native', label: 'Native' }
                    ]}
                  />
                </div>
              ))}
            </div>

            {languages.length === 0 && (
              <div style={{
                textAlign: 'center',
                padding: '40px',
                color: '#9ca3af',
                fontSize: '16px'
              }}>
                <Languages size={48} style={{ margin: '0 auto 16px', opacity: 0.5 }} />
                <p>No languages added yet. Click "Add Language" to get started.</p>
              </div>
            )}
          </TabSection>

          {/* Certifications */}
          <TabSection
            title="Certifications"
            icon={Award}
            tabName="certifications"
            expandedTabs={expandedTabs}
            editingTabs={editingTabs}
            toggleTab={toggleTab}
            toggleEdit={toggleEdit}
            saveTab={saveTab}
            cancelEdit={cancelEdit}
          >
            <div style={{ marginBottom: '24px' }}>
              <button
                onClick={addCertification}
                disabled={!editingTabs.certifications}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  padding: '12px 24px',
                  background: editingTabs.certifications ? 'linear-gradient(135deg, #2563eb, #4f46e5)' : '#f3f4f6',
                  color: editingTabs.certifications ? 'white' : '#9ca3af',
                  border: 'none',
                  borderRadius: '12px',
                  cursor: editingTabs.certifications ? 'pointer' : 'not-allowed',
                  fontSize: '14px',
                  fontWeight: '600',
                  transition: 'all 0.3s ease',
                  boxShadow: editingTabs.certifications ? '0 4px 14px 0 rgba(37, 99, 235, 0.3)' : 'none'
                }}
              >
                <Plus size={18} />
                Add Certification
              </button>
            </div>

            {certifications.map((cert) => (
              <div key={cert.id} style={{
                background: 'linear-gradient(135deg, rgba(249, 250, 251, 0.9), rgba(255, 255, 255, 0.9))',
                border: '1px solid rgba(229, 231, 235, 0.8)',
                borderRadius: '16px',
                padding: '24px',
                marginBottom: '20px',
                position: 'relative',
                animation: 'scaleIn 0.3s ease'
              }}>
                {editingTabs.certifications && (
                  <button
                    onClick={() => removeItem(certifications, setCertifications, cert.id)}
                    style={{
                      position: 'absolute',
                      top: '16px',
                      right: '16px',
                      padding: '8px',
                      background: 'linear-gradient(135deg, #ef4444, #dc2626)',
                      color: 'white',
                      border: 'none',
                      borderRadius: '8px',
                      cursor: 'pointer',
                      transition: 'all 0.2s ease'
                    }}
                  >
                    <Trash2 size={16} />
                  </button>
                )}

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '20px' }}>
                  <FormField
                    label="Certification Name"
                    value={cert.name}
                    onChange={(value) => updateItem(certifications, setCertifications, cert.id, 'name', value)}
                    placeholder="Enter certification name"
                    disabled={!editingTabs.certifications}
                  />
                  <FormField
                    label="Issuing Organization"
                    value={cert.issuer}
                    onChange={(value) => updateItem(certifications, setCertifications, cert.id, 'issuer', value)}
                    placeholder="Enter issuing organization"
                    disabled={!editingTabs.certifications}
                  />
                  <FormField
                    label="Date Issued"
                    type="date"
                    value={cert.date}
                    onChange={(value) => updateItem(certifications, setCertifications, cert.id, 'date', value)}
                    disabled={!editingTabs.certifications}
                  />
                  <FormField
                    label="Certificate URL"
                    value={cert.url}
                    onChange={(value) => updateItem(certifications, setCertifications, cert.id, 'url', value)}
                    placeholder="Enter certificate URL (optional)"
                    disabled={!editingTabs.certifications}
                  />
                </div>
              </div>
            ))}

            {certifications.length === 0 && (
              <div style={{
                textAlign: 'center',
                padding: '40px',
                color: '#9ca3af',
                fontSize: '16px'
              }}>
                <Award size={48} style={{ margin: '0 auto 16px', opacity: 0.5 }} />
                <p>No certifications added yet. Click "Add Certification" to get started.</p>
              </div>
            )}
          </TabSection>

          {/* Achievements */}
          <TabSection
            title="Achievements"
            icon={Trophy}
            tabName="achievements"
            expandedTabs={expandedTabs}
            editingTabs={editingTabs}
            toggleTab={toggleTab}
            toggleEdit={toggleEdit}
            saveTab={saveTab}
            cancelEdit={cancelEdit}
          >
            <div style={{ marginBottom: '24px' }}>
              <button
                onClick={addAchievement}
                disabled={!editingTabs.achievements}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  padding: '12px 24px',
                  background: editingTabs.achievements ? 'linear-gradient(135deg, #2563eb, #4f46e5)' : '#f3f4f6',
                  color: editingTabs.achievements ? 'white' : '#9ca3af',
                  border: 'none',
                  borderRadius: '12px',
                  cursor: editingTabs.achievements ? 'pointer' : 'not-allowed',
                  fontSize: '14px',
                  fontWeight: '600',
                  transition: 'all 0.3s ease',
                  boxShadow: editingTabs.achievements ? '0 4px 14px 0 rgba(37, 99, 235, 0.3)' : 'none'
                }}
              >
                <Plus size={18} />
                Add Achievement
              </button>
            </div>

            {achievements.map((achievement) => (
              <div key={achievement.id} style={{
                background: 'linear-gradient(135deg, rgba(249, 250, 251, 0.9), rgba(255, 255, 255, 0.9))',
                border: '1px solid rgba(229, 231, 235, 0.8)',
                borderRadius: '16px',
                padding: '24px',
                marginBottom: '20px',
                position: 'relative',
                animation: 'scaleIn 0.3s ease'
              }}>
                {editingTabs.achievements && (
                  <button
                    onClick={() => removeItem(achievements, setAchievements, achievement.id)}
                    style={{
                      position: 'absolute',
                      top: '16px',
                      right: '16px',
                      padding: '8px',
                      background: 'linear-gradient(135deg, #ef4444, #dc2626)',
                      color: 'white',
                      border: 'none',
                      borderRadius: '8px',
                      cursor: 'pointer',
                      transition: 'all 0.2s ease'
                    }}
                  >
                    <Trash2 size={16} />
                  </button>
                )}

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '20px' }}>
                  <FormField
                    label="Achievement Title"
                    value={achievement.title}
                    onChange={(value) => updateItem(achievements, setAchievements, achievement.id, 'title', value)}
                    placeholder="Enter achievement title"
                    disabled={!editingTabs.achievements}
                  />
                  <FormField
                    label="Date"
                    type="date"
                    value={achievement.date}
                    onChange={(value) => updateItem(achievements, setAchievements, achievement.id, 'date', value)}
                    disabled={!editingTabs.achievements}
                  />
                </div>
                <FormField
                  label="Description"
                  type="textarea"
                  value={achievement.description}
                  onChange={(value) => updateItem(achievements, setAchievements, achievement.id, 'description', value)}
                  placeholder="Describe your achievement..."
                  disabled={!editingTabs.achievements}
                />
              </div>
            ))}

            {achievements.length === 0 && (
              <div style={{
                textAlign: 'center',
                padding: '40px',
                color: '#9ca3af',
                fontSize: '16px'
              }}>
                <Trophy size={48} style={{ margin: '0 auto 16px', opacity: 0.5 }} />
                <p>No achievements added yet. Click "Add Achievement" to get started.</p>
              </div>
            )}
          </TabSection>
        </div>

        {/* Save Profile Button */}
        <div style={{
          textAlign: 'center',
          marginTop: '60px',
          paddingTop: '40px',
          borderTop: '1px solid rgba(229, 231, 235, 0.6)'
        }}>
          <button
            onClick={handleSaveProfile}
            style={{
              padding: '16px 48px',
              background: 'linear-gradient(135deg, #2563eb, #4f46e5)',
              color: 'white',
              border: 'none',
              borderRadius: '16px',
              fontSize: '18px',
              fontWeight: '600',
              cursor: 'pointer',
              transition: 'all 0.3s ease',
              boxShadow: '0 8px 25px rgba(37, 99, 235, 0.3)',
              display: 'flex',
              alignItems: 'center',
              gap: '12px',
              margin: '0 auto'
            }}
          >
            <Save size={20} />
            Save Complete Profile
          </button>
        </div>
      </main>
      </div>
  );
};
export default ProfileDetailsPage;