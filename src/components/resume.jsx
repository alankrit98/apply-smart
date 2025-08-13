import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { Bell, User, Menu, X, Upload, FileText, Briefcase, Target, Sparkles, Download, Check, ArrowRight, Star, Zap } from 'lucide-react';

const ResumeBuilderPage = () => {
  const navigate = useNavigate();
  const [isLoaded, setIsLoaded] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  
  // Form states
  const [jobRole, setJobRole] = useState('');
  const [jobDescription, setJobDescription] = useState('');
  const [resumeSource, setResumeSource] = useState('upload'); // 'upload' or 'profile'
  const [uploadedFile, setUploadedFile] = useState(null);
  const [isJobRoleFocused, setIsJobRoleFocused] = useState(false);
  const [isJobDescFocused, setIsJobDescFocused] = useState(false);
  const [isBuilding, setIsBuilding] = useState(false);
  const [isProfileComplete, setIsProfileComplete] = useState(false);

  useEffect(() => {
    const fetchUserName = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          console.log('No token found');
          return;
        }

        const res = await axios.get('https://localhost:5000/api/users/profile', {
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

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setUploadedFile(file);
    }
  };

  const handleBuildResume = async () => {
    if (!jobRole.trim()) {
    alert('Please enter the job role you\'re applying for.');
    return;
  }

  if (resumeSource === 'upload' && !uploadedFile) {
    alert('Please upload your resume.');
    return;
  }

  const formData = new FormData();
  formData.append('resume', uploadedFile);

  try {
    setIsBuilding(true);
    const res = await axios.post('http://localhost:5000/api/parse-resume', formData, {
      headers: { 'Content-Type': 'multipart/form-data' }
    });

    // console.log('Extracted Resume Data:', res.data);
    // alert('Resume parsed successfully! Check console for details.');

    navigate("/resume-analysis", { state: { parsedData: res.data } });

  } catch (error) {
    console.error(error);
    alert('Failed to parse resume.');
  } finally {
    setIsBuilding(false);
  }
  };

  const popularRoles = [
    'Software Engineer', 'Data Scientist', 'Product Manager', 'UX Designer', 
    'Marketing Manager', 'Sales Representative', 'Business Analyst', 'DevOps Engineer'
  ];

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

          @keyframes pulse {
            0%, 100% { opacity: 1; }
            50% { opacity: 0.5; }
          }

          @keyframes float {
            0%, 100% { transform: translateY(0px); }
            50% { transform: translateY(-10px); }
          }

          @keyframes shimmer {
            0% { background-position: -200% 0; }
            100% { background-position: 200% 0; }
          }

          @keyframes spin {
            from { transform: rotate(0deg); }
            to { transform: rotate(360deg); }
          }

          @keyframes glow {
            0%, 100% { box-shadow: 0 0 20px rgba(37, 99, 235, 0.3); }
            50% { box-shadow: 0 0 30px rgba(37, 99, 235, 0.6); }
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

          .form-input {
            transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          }

          .form-input:focus {
            transform: scale(1.02);
            box-shadow: 0 0 0 3px rgba(37, 99, 235, 0.1), 0 10px 25px -5px rgba(0, 0, 0, 0.1);
          }

          .role-tag {
            transition: all 0.3s ease;
            cursor: pointer;
          }

          .role-tag:hover {
            transform: translateY(-2px);
            box-shadow: 0 8px 20px -5px rgba(37, 99, 235, 0.3);
          }

          .upload-area {
            transition: all 0.3s ease;
            cursor: pointer;
          }

          .upload-area:hover {
            transform: translateY(-2px);
            box-shadow: 0 15px 30px -5px rgba(0, 0, 0, 0.1);
          }

          .build-button {
            transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          }

          .build-button:hover {
            transform: translateY(-3px);
            box-shadow: 0 20px 40px -5px rgba(37, 99, 235, 0.4);
          }

          .build-button:active {
            transform: translateY(-1px);
          }

          .building-animation {
            animation: glow 2s ease-in-out infinite;
          }

          @media (max-width: 768px) {
            .nav-links { display: none; }
            .mobile-menu-btn { display: flex !important; }
            .form-grid { grid-template-columns: 1fr !important; }
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
            <Link to = "/tracker" className="nav-link" style={{ 
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
            <Link to = '/resume'
             className="nav-link" style={{
                
                color: '#2563eb',
              fontWeight: '600', 
              borderBottom: '2px solid #2563eb',
               
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
              <a href="#" style={{ color: '#374151', fontWeight: '500', textDecoration: 'none' }}>Home</a>
              <a href="#" style={{ color: '#374151', fontWeight: '500', textDecoration: 'none' }}>Application Tracker</a>
              <a href="#" style={{ color: '#374151', fontWeight: '500', textDecoration: 'none' }}>Explore Jobs</a>
              <a href="#" style={{ color: '#2563eb', fontWeight: '600', textDecoration: 'none' }}>Resume Builder</a>
              <a href="#" style={{ color: '#374151', fontWeight: '500', textDecoration: 'none' }}>Profile</a>
            </div>
          </div>
        )}
      </nav>

      {/* Main Content */}
      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '40px 16px' }}>
        {/* Header Section */}
        <div style={{
          textAlign: 'center',
          marginBottom: '48px',
          transform: isLoaded ? 'translateY(0)' : 'translateY(32px)',
          opacity: isLoaded ? 1 : 0,
          transition: 'all 0.8s ease 0.2s'
        }}>
          <div style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '12px',
            marginBottom: '16px'
          }}>
            <Sparkles size={32} style={{ color: '#2563eb' }} />
            <h1 style={{
              fontSize: '48px',
              fontWeight: 'bold',
              background: 'linear-gradient(135deg, #2563eb, #4f46e5)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
              margin: 0
            }}>
              Resume Builder
            </h1>
            <Sparkles size={32} style={{ color: '#4f46e5' }} />
          </div>
          <p style={{
            fontSize: '20px',
            color: '#6b7280',
            maxWidth: '600px',
            margin: '0 auto',
            lineHeight: '1.6'
          }}>
            Build a tailored resume that matches your target job role and increases your chances of landing interviews
          </p>
        </div>

        {/* Form Section */}
        <div style={{
          backgroundColor: 'rgba(255, 255, 255, 0.95)',
          borderRadius: '24px',
          padding: '40px',
          boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.1)',
          backdropFilter: 'blur(20px)',
          border: '1px solid rgba(229, 231, 235, 0.3)',
          transform: isLoaded ? 'translateY(0)' : 'translateY(32px)',
          opacity: isLoaded ? 1 : 0,
          transition: 'all 0.8s ease 0.4s'
        }}>
          <div className="form-grid" style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: '40px',
            marginBottom: '40px'
          }}>
            {/* Left Column */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
              {/* Job Role Field */}
              <div>
                <label style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  fontSize: '18px',
                  fontWeight: '600',
                  color: '#1f2937',
                  marginBottom: '12px'
                }}>
                  <Target size={20} style={{ color: '#2563eb' }} />
                  Job Role <span style={{ color: '#ef4444' }}>*</span>
                </label>
                <input
                  type="text"
                  value={jobRole}
                  onChange={(e) => setJobRole(e.target.value)}
                  onFocus={() => setIsJobRoleFocused(true)}
                  onBlur={() => setIsJobRoleFocused(false)}
                  placeholder="e.g. Senior Software Engineer"
                  className="form-input"
                  style={{
                    width: '100%',
                    padding: '16px 20px',
                    border: `2px solid ${isJobRoleFocused ? '#2563eb' : '#e5e7eb'}`,
                    borderRadius: '12px',
                    fontSize: '16px',
                    outline: 'none',
                    backgroundColor: 'rgba(255, 255, 255, 0.8)'
                  }}
                />
                <p style={{
                  fontSize: '14px',
                  color: '#6b7280',
                  marginTop: '8px',
                  fontStyle: 'italic'
                }}>
                  Enter the specific job title you're targeting
                </p>
                
                {/* Popular Role Tags */}
                <div style={{ marginTop: '16px' }}>
                  <p style={{
                    fontSize: '14px',
                    color: '#4b5563',
                    marginBottom: '8px',
                    fontWeight: '500'
                  }}>
                    Popular roles:
                  </p>
                  <div style={{
                    display: 'flex',
                    flexWrap: 'wrap',
                    gap: '8px'
                  }}>
                    {popularRoles.map((role, index) => (
                      <span
                        key={index}
                        className="role-tag"
                        onClick={() => setJobRole(role)}
                        style={{
                          padding: '6px 12px',
                          backgroundColor: '#f3f4f6',
                          color: '#4b5563',
                          borderRadius: '20px',
                          fontSize: '12px',
                          fontWeight: '500',
                          border: '1px solid #e5e7eb'
                        }}
                      >
                        {role}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Job Description Field */}
              <div>
                <label style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  fontSize: '18px',
                  fontWeight: '600',
                  color: '#1f2937',
                  marginBottom: '12px'
                }}>
                  <Briefcase size={20} style={{ color: '#2563eb' }} />
                  Job Description <span style={{ color: '#6b7280', fontSize: '14px', fontWeight: '400' }}>(Optional)</span>
                </label>
                <textarea
                  value={jobDescription}
                  onChange={(e) => setJobDescription(e.target.value)}
                  onFocus={() => setIsJobDescFocused(true)}
                  onBlur={() => setIsJobDescFocused(false)}
                  placeholder="Paste the job description here to get better resume optimization..."
                  rows={6}
                  className="form-input"
                  style={{
                    width: '100%',
                    padding: '16px 20px',
                    border: `2px solid ${isJobDescFocused ? '#2563eb' : '#e5e7eb'}`,
                    borderRadius: '12px',
                    fontSize: '16px',
                    outline: 'none',
                    backgroundColor: 'rgba(255, 255, 255, 0.8)',
                    resize: 'vertical',
                    fontFamily: 'inherit'
                  }}
                />
                <p style={{
                  fontSize: '14px',
                  color: '#6b7280',
                  marginTop: '8px',
                  fontStyle: 'italic'
                }}>
                  Adding job description helps us tailor your resume better
                </p>
              </div>
            </div>

            {/* Right Column */}
            <div>
              {/* Resume Source Field */}
              <div>
                <label style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  fontSize: '18px',
                  fontWeight: '600',
                  color: '#1f2937',
                  marginBottom: '12px'
                }}>
                  <FileText size={20} style={{ color: '#2563eb' }} />
                  Resume Source <span style={{ color: '#ef4444' }}>*</span>
                </label>
                
                {/* Radio Options */}
                <div style={{ marginBottom: '20px' }}>
                  <label style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '12px',
                    padding: '16px 20px',
                    border: `2px solid ${resumeSource === 'upload' ? '#2563eb' : '#e5e7eb'}`,
                    borderRadius: '12px',
                    cursor: 'pointer',
                    marginBottom: '12px',
                    backgroundColor: resumeSource === 'upload' ? 'rgba(37, 99, 235, 0.05)' : 'rgba(255, 255, 255, 0.8)',
                    transition: 'all 0.3s ease'
                  }}>
                    <input
                      type="radio"
                      value="upload"
                      checked={resumeSource === 'upload'}
                      onChange={(e) => setResumeSource(e.target.value)}
                      style={{ margin: 0 }}
                    />
                    <Upload size={20} style={{ color: '#2563eb' }} />
                    <span style={{ fontSize: '16px', fontWeight: '500' }}>Upload Resume</span>
                  </label>
                  
                  <label style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '12px',
                    padding: '16px 20px',
                    border: `2px solid ${resumeSource === 'profile' ? '#2563eb' : '#e5e7eb'}`,
                    borderRadius: '12px',
                    cursor: 'pointer',
                    backgroundColor: resumeSource === 'profile' ? 'rgba(37, 99, 235, 0.05)' : 'rgba(255, 255, 255, 0.8)',
                    transition: 'all 0.3s ease'
                  }}>
                    <input
                      type="radio"
                      value="profile"
                      checked={resumeSource === 'profile'}
                      onChange={(e) => setResumeSource(e.target.value)}
                      style={{ margin: 0 }}
                    />
                    <User size={20} style={{ color: '#2563eb' }} />
                    <span style={{ fontSize: '16px', fontWeight: '500' }}>Use from Profile</span>
                  </label>
                </div>

                {/* File Upload Area */}
                {resumeSource === 'upload' && (
                  <div
                    className="upload-area"
                    style={{
                      border: '2px dashed #cbd5e1',
                      borderRadius: '12px',
                      padding: '32px',
                      textAlign: 'center',
                      backgroundColor: 'rgba(248, 250, 252, 0.8)',
                      position: 'relative',
                      overflow: 'hidden'
                    }}
                  >
                    <input
                      type="file"
                      accept=".pdf,.doc,.docx"
                      onChange={handleFileUpload}
                      style={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        width: '100%',
                        height: '100%',
                        opacity: 0,
                        cursor: 'pointer'
                      }}
                    />
                    <div style={{
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      gap: '12px'
                    }}>
                      <Upload size={48} style={{ color: '#2563eb' }} />
                      <div>
                        <p style={{
                          fontSize: '18px',
                          fontWeight: '600',
                          color: '#1f2937',
                          margin: '0 0 4px 0'
                        }}>
                          {uploadedFile ? uploadedFile.name : 'Drop your resume here'}
                        </p>
                        <p style={{
                          fontSize: '14px',
                          color: '#6b7280',
                          margin: 0
                        }}>
                          {uploadedFile ? 'File uploaded successfully!' : 'Supports PDF, DOC, DOCX files'}
                        </p>
                      </div>
                      {uploadedFile && (
                        <div style={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: '8px',
                          color: '#22c55e',
                          fontSize: '14px',
                          fontWeight: '500'
                        }}>
                          <Check size={16} />
                          Ready to build!
                        </div>
                      )}
                    </div>
                  </div>
                )}

                {/* Profile Resume Info */}
                {resumeSource === 'profile' && (
                  <div style={{
                    padding: '24px',
                    backgroundColor: 'rgba(37, 99, 235, 0.05)',
                    border: '1px solid rgba(37, 99, 235, 0.2)',
                    borderRadius: '12px',
                    textAlign: 'center'
                  }}>
                    <User size={48} style={{ color: '#2563eb', marginBottom: '12px' }} />
                    <p style={{
                      fontSize: '16px',
                      fontWeight: '600',
                      color: '#1f2937',
                      margin: '0 0 8px 0'
                    }}>
                      Using Resume from Profile
                    </p>
                    <p style={{
                      fontSize: '14px',
                      color: '#6b7280',
                      margin: 0
                    }}>
                      We'll use the resume saved in your profile to build the optimized version
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Build Button */}
          <div style={{
            textAlign: 'center',
            paddingTop: '20px',
            borderTop: '1px solid rgba(229, 231, 235, 0.5)'
          }}>
            <button
              onClick={handleBuildResume}
              disabled={isBuilding}
              className={`build-button ${isBuilding ? 'building-animation' : ''}`}
              style={{
                background: isBuilding 
                  ? 'linear-gradient(135deg, #6b7280, #9ca3af)' 
                  : 'linear-gradient(135deg, #2563eb, #4f46e5)',
                color: 'white',
                padding: '20px 40px',
                border: 'none',
                borderRadius: '16px',
                fontSize: '20px',
                fontWeight: '700',
                cursor: isBuilding ? 'not-allowed' : 'pointer',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '12px',
                boxShadow: '0 15px 30px -5px rgba(37, 99, 235, 0.4)',
                minWidth: '200px',
                justifyContent: 'center'
              }}
            >
              {isBuilding ? (
                <>
                  <div style={{
                    width: '20px',
                    height: '20px',
                    border: '2px solid #ffffff',
                    borderTop: '2px solid transparent',
                    borderRadius: '50%',
                    animation: 'spin 1s linear infinite'
                  }}></div>
                  Building...
                </>
              ) : (
                <>
                  <Zap size={24} />
                  Build Resume
                  <ArrowRight size={24} />
                </>
              )}
            </button>
            <p style={{
              fontSize: '14px',
              color: '#6b7280',
              marginTop: '16px',
              fontStyle: 'italic'
            }}>
              Our AI will optimize your resume for the job role in seconds
            </p>
          </div>
        </div>

       {/* Features Section */}
        <div style={{
          marginTop: '48px',
          transform: isLoaded ? 'translateY(0)' : 'translateY(32px)',
          opacity: isLoaded ? 1 : 0,
          transition: 'all 0.8s ease 0.6s'
        }}>
          <div style={{
            textAlign: 'center',
            marginBottom: '40px'
          }}>
            <h2 style={{
              fontSize: '36px',
              fontWeight: 'bold',
              color: '#1f2937',
              marginBottom: '12px'
            }}>
              Why Choose Our Resume Builder?
            </h2>
            <p style={{
              fontSize: '18px',
              color: '#6b7280',
              maxWidth: '600px',
              margin: '0 auto'
            }}>
              Powered by advanced AI technology to create resumes that stand out
            </p>
          </div>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: '24px',
            marginBottom: '48px'
          }}>
            {[
              {
                icon: <Target size={32} />,
                title: 'Job-Specific Optimization',
                description: 'Tailors your resume content to match specific job requirements and keywords',
                color: '#2563eb'
              },
              {
                icon: <Zap size={32} />,
                title: 'AI-Powered Analysis',
                description: 'Advanced algorithms analyze job descriptions and optimize your resume accordingly',
                color: '#7c3aed'
              },
              {
                icon: <Star size={32} />,
                title: 'ATS-Friendly Format',
                description: 'Ensures your resume passes through Applicant Tracking Systems successfully',
                color: '#059669'
              },
              {
                icon: <Download size={32} />,
                title: 'Instant Download',
                description: 'Get your optimized resume ready for download in multiple formats',
                color: '#dc2626'
              }
            ].map((feature, index) => (
              <div
                key={index}
                style={{
                  backgroundColor: 'rgba(255, 255, 255, 0.9)',
                  padding: '32px',
                  borderRadius: '20px',
                  border: '1px solid rgba(229, 231, 235, 0.3)',
                  boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.1)',
                  backdropFilter: 'blur(10px)',
                  textAlign: 'center',
                  transition: 'all 0.3s ease',
                  animation: `fadeInUp 0.8s ease ${0.8 + index * 0.2}s both`,
                  cursor: 'pointer'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-8px)';
                  e.currentTarget.style.boxShadow = '0 20px 40px -5px rgba(0, 0, 0, 0.15)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = '0 10px 25px -5px rgba(0, 0, 0, 0.1)';
                }}
              >
                <div style={{
                  width: '64px',
                  height: '64px',
                  backgroundColor: `${feature.color}15`,
                  borderRadius: '16px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  margin: '0 auto 20px',
                  color: feature.color,
                  animation: 'float 3s ease-in-out infinite'
                }}>
                  {feature.icon}
                </div>
                <h3 style={{
                  fontSize: '20px',
                  fontWeight: '700',
                  color: '#1f2937',
                  marginBottom: '12px'
                }}>
                  {feature.title}
                </h3>
                <p style={{
                  fontSize: '16px',
                  color: '#6b7280',
                  lineHeight: '1.6',
                  margin: 0
                }}>
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* How It Works Section */}
        <div style={{
          marginTop: '64px',
          backgroundColor: 'rgba(255, 255, 255, 0.6)',
          borderRadius: '24px',
          padding: '48px',
          backdropFilter: 'blur(20px)',
          border: '1px solid rgba(229, 231, 235, 0.3)',
          transform: isLoaded ? 'translateY(0)' : 'translateY(32px)',
          opacity: isLoaded ? 1 : 0,
          transition: 'all 0.8s ease 1.2s'
        }}>
          <div style={{
            textAlign: 'center',
            marginBottom: '40px'
          }}>
            <h2 style={{
              fontSize: '36px',
              fontWeight: 'bold',
              color: '#1f2937',
              marginBottom: '12px'
            }}>
              How It Works
            </h2>
            <p style={{
              fontSize: '18px',
              color: '#6b7280',
              maxWidth: '600px',
              margin: '0 auto'
            }}>
              Simple 3-step process to get your optimized resume
            </p>
          </div>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
            gap: '32px'
          }}>
            {[
              {
                step: '01',
                title: 'Enter Job Details',
                description: 'Provide the job role and optionally paste the job description',
                icon: <Target size={24} />,
                color: '#2563eb'
              },
              {
                step: '02',
                title: 'Upload Resume',
                description: 'Upload your current resume or use the one from your profile',
                icon: <Upload size={24} />,
                color: '#7c3aed'
              },
              {
                step: '03',
                title: 'Get Optimized Resume',
                description: 'Our AI builds a tailored resume optimized for your target job',
                icon: <Download size={24} />,
                color: '#059669'
              }
            ].map((step, index) => (
              <div
                key={index}
                style={{
                  position: 'relative',
                  textAlign: 'center',
                  animation: `fadeInUp 0.8s ease ${1.4 + index * 0.2}s both`
                }}
              >
                <div style={{
                  position: 'relative',
                  marginBottom: '24px'
                }}>
                  <div style={{
                    width: '80px',
                    height: '80px',
                    backgroundColor: step.color,
                    borderRadius: '50%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    margin: '0 auto',
                    color: 'white',
                    boxShadow: `0 10px 30px -5px ${step.color}40`,
                    animation: 'float 3s ease-in-out infinite'
                  }}>
                    {step.icon}
                  </div>
                  <div style={{
                    position: 'absolute',
                    top: '-8px',
                    right: '-8px',
                    width: '32px',
                    height: '32px',
                    backgroundColor: '#1f2937',
                    borderRadius: '50%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: 'white',
                    fontSize: '14px',
                    fontWeight: '700'
                  }}>
                    {step.step}
                  </div>
                </div>
                <h3 style={{
                  fontSize: '20px',
                  fontWeight: '700',
                  color: '#1f2937',
                  marginBottom: '12px'
                }}>
                  {step.title}
                </h3>
                <p style={{
                  fontSize: '16px',
                  color: '#6b7280',
                  lineHeight: '1.6',
                  margin: 0
                }}>
                  {step.description}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Stats Section */}
        <div style={{
          marginTop: '64px',
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
          gap: '24px',
          transform: isLoaded ? 'translateY(0)' : 'translateY(32px)',
          opacity: isLoaded ? 1 : 0,
          transition: 'all 0.8s ease 1.8s'
        }}>
          {[
            { number: '50K+', label: 'Resumes Built' },
            { number: '85%', label: 'Interview Rate' },
            { number: '3x', label: 'Faster Hiring' },
            { number: '4.9★', label: 'User Rating' }
          ].map((stat, index) => (
            <div
              key={index}
              style={{
                textAlign: 'center',
                padding: '32px 20px',
                backgroundColor: 'rgba(255, 255, 255, 0.8)',
                borderRadius: '16px',
                border: '1px solid rgba(229, 231, 235, 0.3)',
                backdropFilter: 'blur(10px)',
                transition: 'all 0.3s ease',
                animation: `fadeInUp 0.8s ease ${2.0 + index * 0.1}s both`
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-4px)';
                e.currentTarget.style.boxShadow = '0 15px 30px -5px rgba(0, 0, 0, 0.1)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = 'none';
              }}
            >
              <div style={{
                fontSize: '36px',
                fontWeight: 'bold',
                color: '#2563eb',
                marginBottom: '8px'
              }}>
                {stat.number}
              </div>
              <div style={{
                fontSize: '16px',
                color: '#6b7280',
                fontWeight: '500'
              }}>
                {stat.label}
              </div>
            </div>
          ))}
        </div>

        {/* Call to Action */}
        <div style={{
          marginTop: '64px',
          textAlign: 'center',
          padding: '48px 32px',
          backgroundColor: 'rgba(37, 99, 235, 0.05)',
          borderRadius: '24px',
          border: '2px solid rgba(37, 99, 235, 0.1)',
          transform: isLoaded ? 'translateY(0)' : 'translateY(32px)',
          opacity: isLoaded ? 1 : 0,
          transition: 'all 0.8s ease 2.2s'
        }}>
          <h2 style={{
            fontSize: '32px',
            fontWeight: 'bold',
            color: '#1f2937',
            marginBottom: '16px'
          }}>
            Ready to Build Your Perfect Resume?
          </h2>
          <p style={{
            fontSize: '18px',
            color: '#6b7280',
            marginBottom: '32px',
            maxWidth: '600px',
            margin: '0 auto 32px'
          }}>
            Join thousands of job seekers who have successfully landed their dream jobs with our AI-powered resume builder
          </p>
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            style={{
              background: 'linear-gradient(135deg, #2563eb, #4f46e5)',
              color: 'white',
              padding: '16px 32px',
              border: 'none',
              borderRadius: '12px',
              fontSize: '18px',
              fontWeight: '600',
              cursor: 'pointer',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              transition: 'all 0.3s ease',
              boxShadow: '0 10px 25px -5px rgba(37, 99, 235, 0.4)'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-2px)';
              e.currentTarget.style.boxShadow = '0 15px 35px -5px rgba(37, 99, 235, 0.5)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = '0 10px 25px -5px rgba(37, 99, 235, 0.4)';
            }}
          >
            Get Started Now
            <ArrowRight size={20} />
          </button>
        </div>
      </div>

      {/* Notifications Panel */}
      {showNotifications && (
        <div style={{
          position: 'fixed',
          top: '80px',
          right: '16px',
          width: '320px',
          backgroundColor: 'rgba(255, 255, 255, 0.95)',
          backdropFilter: 'blur(20px)',
          borderRadius: '16px',
          boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
          border: '1px solid rgba(229, 231, 235, 0.3)',
          zIndex: 1000,
          animation: 'slideDown 0.3s ease'
        }}>
          <div style={{
            padding: '20px',
            borderBottom: '1px solid rgba(229, 231, 235, 0.3)'
          }}>
            <h3 style={{
              fontSize: '16px',
              fontWeight: '600',
              color: '#1f2937',
              margin: 0
            }}>
              Notifications
            </h3>
          </div>
          <div style={{ padding: '12px' }}>
            <div style={{
              padding: '12px',
              backgroundColor: 'rgba(37, 99, 235, 0.05)',
              borderRadius: '8px',
              marginBottom: '8px'
            }}>
              <p style={{
                fontSize: '14px',
                color: '#1f2937',
                fontWeight: '500',
                margin: '0 0 4px 0'
              }}>
                Resume Builder Updated!
              </p>
              <p style={{
                fontSize: '12px',
                color: '#6b7280',
                margin: 0
              }}>
                New AI features added for better optimization
              </p>
            </div>
            <div style={{
              padding: '12px',
              backgroundColor: 'rgba(34, 197, 94, 0.05)',
              borderRadius: '8px'
            }}>
              <p style={{
                fontSize: '14px',
                color: '#1f2937',
                fontWeight: '500',
                margin: '0 0 4px 0'
              }}>
                Profile Completed!
              </p>
              <p style={{
                fontSize: '12px',
                color: '#6b7280',
                margin: 0
              }}>
                Your profile is now 100% complete
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Floating Elements */}
      <div style={{
        position: 'fixed',
        top: '20%',
        left: '5%',
        width: '60px',
        height: '60px',
        backgroundColor: 'rgba(37, 99, 235, 0.1)',
        borderRadius: '50%',
        animation: 'float 6s ease-in-out infinite',
        zIndex: -1
      }}></div>
      <div style={{
        position: 'fixed',
        top: '60%',
        right: '8%',
        width: '40px',
        height: '40px',
        backgroundColor: 'rgba(124, 58, 237, 0.1)',
        borderRadius: '50%',
        animation: 'float 4s ease-in-out infinite reverse',
        zIndex: -1
      }}></div>
      <div style={{
        position: 'fixed',
        bottom: '20%',
        left: '10%',
        width: '80px',
        height: '80px',
        backgroundColor: 'rgba(5, 150, 105, 0.1)',
        borderRadius: '50%',
        animation: 'float 5s ease-in-out infinite',
        zIndex: -1
      }}></div>
    </div>
  );
};

export default ResumeBuilderPage;