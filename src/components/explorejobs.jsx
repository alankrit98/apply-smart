import React, { useState, useEffect } from 'react';
import { Bell, User, Search, MapPin, Briefcase, DollarSign, Clock, Building, Calendar, ArrowRight, Menu, X, Star, MapPin as LocationIcon, CheckCircle, ExternalLink, Bookmark } from 'lucide-react';

const ExploreJobsPage = () => {
  const [searchJob, setSearchJob] = useState("");
  const [searchLocation, setSearchLocation] = useState("");
  const [selectedJob, setSelectedJob] = useState(null);
  const [filteredJobs, setFilteredJobs] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const [isLocationFocused, setIsLocationFocused] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  // Sample job data
  const allJobs = [
    {
      id: 1,
      title: "Senior Software Engineer",
      company: "TechCorp Inc.",
      location: "San Francisco, CA",
      type: "Full-time",
      salary: "$120,000 - $180,000",
      posted: "2 days ago",
      logo: "https://cdn-icons-png.flaticon.com/512/2942/2942156.png",
      rating: 4.5,
      description: "We are looking for a Senior Software Engineer to join our dynamic team. You will be responsible for designing, developing, and maintaining high-quality software solutions.",
      requirements: [
        "5+ years of experience in software development",
        "Proficiency in React, Node.js, and Python",
        "Experience with cloud platforms (AWS, Azure)",
        "Strong problem-solving skills",
        "Bachelor's degree in Computer Science or related field"
      ],
      benefits: [
        "Competitive salary and equity",
        "Health, dental, and vision insurance",
        "Flexible work arrangements",
        "Professional development budget",
        "401(k) matching"
      ]
    },
    {
      id: 2,
      title: "Data Scientist",
      company: "DataFlow Analytics",
      location: "New York, NY",
      type: "Full-time",
      salary: "$95,000 - $140,000",
      posted: "1 day ago",
      logo: "https://cdn-icons-png.flaticon.com/512/3135/3135715.png",
      rating: 4.3,
      description: "Join our data science team to extract insights from complex datasets and drive business decisions through advanced analytics and machine learning.",
      requirements: [
        "3+ years of experience in data science",
        "Proficiency in Python, R, and SQL",
        "Experience with machine learning frameworks",
        "Strong statistical analysis skills",
        "Master's degree preferred"
      ],
      benefits: [
        "Competitive compensation package",
        "Remote work options",
        "Learning and development opportunities",
        "Health and wellness programs",
        "Stock options"
      ]
    },
    {
      id: 3,
      title: "UX/UI Designer",
      company: "Creative Solutions",
      location: "Remote",
      type: "Contract",
      salary: "$70 - $90 per hour",
      posted: "3 days ago",
      logo: "https://cdn-icons-png.flaticon.com/512/3135/3135823.png",
      rating: 4.7,
      description: "We're seeking a talented UX/UI Designer to create intuitive and engaging user experiences for our digital products.",
      requirements: [
        "4+ years of UX/UI design experience",
        "Proficiency in Figma, Sketch, and Adobe Creative Suite",
        "Strong portfolio demonstrating design thinking",
        "Experience with user research and testing",
        "Understanding of responsive design principles"
      ],
      benefits: [
        "Flexible contract terms",
        "Remote work opportunity",
        "Collaborative team environment",
        "Professional growth opportunities",
        "Competitive hourly rates"
      ]
    },
    {
      id: 4,
      title: "Marketing Manager",
      company: "GrowthHub",
      location: "Austin, TX",
      type: "Full-time",
      salary: "$75,000 - $110,000",
      posted: "5 days ago",
      logo: "https://cdn-icons-png.flaticon.com/512/3135/3135768.png",
      rating: 4.2,
      description: "Lead our marketing initiatives and drive brand awareness through innovative campaigns and strategic partnerships.",
      requirements: [
        "3+ years of marketing experience",
        "Experience with digital marketing tools",
        "Strong analytical and communication skills",
        "Knowledge of SEO and content marketing",
        "Bachelor's degree in Marketing or related field"
      ],
      benefits: [
        "Competitive salary and bonuses",
        "Health and dental coverage",
        "Flexible PTO policy",
        "Marketing conference attendance",
        "Career advancement opportunities"
      ]
    },
    {
      id: 5,
      title: "DevOps Engineer",
      company: "CloudNine Systems",
      location: "Seattle, WA",
      type: "Full-time",
      salary: "$110,000 - $160,000",
      posted: "1 week ago",
      logo: "https://cdn-icons-png.flaticon.com/512/2942/2942204.png",
      rating: 4.6,
      description: "Join our DevOps team to streamline development processes and maintain robust infrastructure for our growing platform.",
      requirements: [
        "4+ years of DevOps experience",
        "Experience with Docker, Kubernetes, and CI/CD",
        "Proficiency in scripting languages",
        "Cloud platform expertise (AWS, GCP)",
        "Strong troubleshooting skills"
      ],
      benefits: [
        "Excellent compensation package",
        "Comprehensive health benefits",
        "Work-life balance",
        "Technical training budget",
        "Stock participation plan"
      ]
    },
    {
      id: 6,
      title: "Product Manager",
      company: "InnovateLab",
      location: "Boston, MA",
      type: "Full-time",
      salary: "$100,000 - $150,000",
      posted: "4 days ago",
      logo: "https://cdn-icons-png.flaticon.com/512/3135/3135715.png",
      rating: 4.4,
      description: "Drive product strategy and execution to deliver exceptional user experiences and achieve business objectives.",
      requirements: [
        "5+ years of product management experience",
        "Strong analytical and strategic thinking",
        "Experience with agile methodologies",
        "Excellent communication skills",
        "Technical background preferred"
      ],
      benefits: [
        "Competitive salary and equity",
        "Comprehensive benefits package",
        "Flexible work environment",
        "Professional development support",
        "Innovation time allocation"
      ]
    }
  ];

  useEffect(() => {
    setIsLoaded(true);
    setFilteredJobs(allJobs); // Show all jobs initially as recommendations

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

  const handleSearch = () => {
    const filtered = allJobs.filter(job => {
      const matchesJob = !searchJob || job.title.toLowerCase().includes(searchJob.toLowerCase()) ||
                         job.company.toLowerCase().includes(searchJob.toLowerCase());
      const matchesLocation = !searchLocation || job.location.toLowerCase().includes(searchLocation.toLowerCase());
      return matchesJob && matchesLocation;
    });
    setFilteredJobs(filtered);
    setSelectedJob(null); // Reset selected job when searching
  };

  const handleJobClick = (job) => {
    setSelectedJob(job);
  };

  const handleApplyNow = () => {
    // In a real application, this would navigate to an application form or external link
    alert(`Applying for ${selectedJob.title} at ${selectedJob.company}!`);
  };

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

          @keyframes shimmer {
            0% { background-position: -1000px 0; }
            100% { background-position: 1000px 0; }
          }

          @keyframes float {
            0%, 100% { transform: translateY(0px); }
            50% { transform: translateY(-10px); }
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

          .search-input {
            transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          }

          .search-input:focus {
            transform: scale(1.02);
            box-shadow: 0 0 0 3px rgba(37, 99, 235, 0.1), 0 10px 25px -5px rgba(0, 0, 0, 0.1);
          }

          .job-card {
            transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
            cursor: pointer;
          }

          .job-card:hover {
            transform: translateY(-4px);
            box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
          }

          .job-card.selected {
            transform: translateY(-2px);
            box-shadow: 0 0 0 2px #2563eb, 0 20px 25px -5px rgba(37, 99, 235, 0.25);
          }

          .apply-button {
            transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          }

          .apply-button:hover {
            transform: translateY(-2px);
            box-shadow: 0 10px 25px -5px rgba(37, 99, 235, 0.4);
          }

          .logo-animation {
            animation: float 3s ease-in-out infinite;
          }

          @media (max-width: 768px) {
            .nav-links { display: none; }
            .mobile-menu-btn { display: flex !important; }
            .job-grid { grid-template-columns: 1fr !important; }
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
            <a href="#" className="nav-link" style={{
              color: '#374151',
              fontWeight: '500',
              textDecoration: 'none',
              paddingBottom: '4px'
            }}>Home</a>
            <a href="#" className="nav-link" style={{
              color: '#374151',
              fontWeight: '500',
              textDecoration: 'none',
              paddingBottom: '4px'
            }}>Application Tracker</a>
            <a href="#" className="nav-link" style={{
              color: '#2563eb',
              fontWeight: '600',
              borderBottom: '2px solid #2563eb',
              paddingBottom: '4px',
              textDecoration: 'none'
            }}>Explore Jobs</a>
            <a href="#" className="nav-link" style={{
              color: '#374151',
              fontWeight: '500',
              textDecoration: 'none',
              paddingBottom: '4px'
            }}>Resume Builder</a>
            <a href="#" className="nav-link" style={{
              color: '#374151',
              fontWeight: '500',
              textDecoration: 'none',
              paddingBottom: '4px'
            }}>Profile</a>
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
              <a href="#" style={{ color: '#2563eb', fontWeight: '600', textDecoration: 'none' }}>Explore Jobs</a>
              <a href="#" style={{ color: '#374151', fontWeight: '500', textDecoration: 'none' }}>Resume Builder</a>
              <a href="#" style={{ color: '#374151', fontWeight: '500', textDecoration: 'none' }}>Profile</a>
            </div>
          </div>
        )}
      </nav>

      {/* Main Content */}
      <div style={{ maxWidth: '1440px', margin: '0 auto', padding: '32px 16px' }}>
        {/* Search Section */}
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
            Explore Jobs
          </h1>
          <p style={{
            textAlign: 'center',
            color: '#6b7280',
            fontSize: '20px',
            marginBottom: '32px'
          }}>
            Discover your next career opportunity
          </p>

          {/* Search Box */}
          <div style={{
            maxWidth: '800px',
            margin: '0 auto',
            backgroundColor: 'rgba(255, 255, 255, 0.95)',
            borderRadius: '20px',
            padding: '24px',
            boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1)',
            backdropFilter: 'blur(20px)',
            border: '1px solid rgba(229, 231, 235, 0.3)'
          }}>
            <div style={{
              display: 'grid',
              gridTemplateColumns: '1fr 1fr auto',
              gap: '16px',
              alignItems: 'end'
            }}>
              <div>
                <label style={{
                  display: 'block',
                  fontSize: '14px',
                  fontWeight: '600',
                  color: '#374151',
                  marginBottom: '8px'
                }}>Job Title or Keywords</label>
                <div style={{ position: 'relative' }}>
                  <Search style={{
                    position: 'absolute',
                    left: '16px',
                    top: '50%',
                    transform: 'translateY(-50%)',
                    color: isSearchFocused ? '#2563eb' : '#9ca3af',
                    width: '20px',
                    height: '20px'
                  }} />
                  <input
                    type="text"
                    value={searchJob}
                    onChange={(e) => setSearchJob(e.target.value)}
                    onFocus={() => setIsSearchFocused(true)}
                    onBlur={() => setIsSearchFocused(false)}
                    placeholder="e.g. Software Engineer, Designer"
                    className="search-input"
                    style={{
                      width: '100%',
                      paddingLeft: '48px',
                      paddingRight: '16px',
                      paddingTop: '12px',
                      paddingBottom: '12px',
                      border: `2px solid ${isSearchFocused ? '#2563eb' : '#e5e7eb'}`,
                      borderRadius: '12px',
                      fontSize: '16px',
                      outline: 'none'
                    }}
                  />
                </div>
              </div>
              <div>
                <label style={{
                  display: 'block',
                  fontSize: '14px',
                  fontWeight: '600',
                  color: '#374151',
                  marginBottom: '8px'
                }}>Location</label>
                <div style={{ position: 'relative' }}>
                  <MapPin style={{
                    position: 'absolute',
                    left: '16px',
                    top: '50%',
                    transform: 'translateY(-50%)',
                    color: isLocationFocused ? '#2563eb' : '#9ca3af',
                    width: '20px',
                    height: '20px'
                  }} />
                  <input
                    type="text"
                    value={searchLocation}
                    onChange={(e) => setSearchLocation(e.target.value)}
                    onFocus={() => setIsLocationFocused(true)}
                    onBlur={() => setIsLocationFocused(false)}
                    placeholder="City, State or Remote"
                    className="search-input"
                    style={{
                      width: '100%',
                      paddingLeft: '48px',
                      paddingRight: '16px',
                      paddingTop: '12px',
                      paddingBottom: '12px',
                      border: `2px solid ${isLocationFocused ? '#2563eb' : '#e5e7eb'}`,
                      borderRadius: '12px',
                      fontSize: '16px',
                      outline: 'none'
                    }}
                  />
                </div>
              </div>
              <button
                onClick={handleSearch}
                style={{
                  background: 'linear-gradient(135deg, #2563eb, #4f46e5)',
                  color: 'white',
                  padding: '12px 24px',
                  border: 'none',
                  borderRadius: '12px',
                  fontWeight: '600',
                  cursor: 'pointer',
                  fontSize: '16px',
                  transition: 'all 0.3s ease',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px'
                }}
                onMouseEnter={(e) => e.target.style.transform = 'translateY(-2px)'}
                onMouseLeave={(e) => e.target.style.transform = 'translateY(0)'}
              >
                Search Jobs
              </button>
            </div>
          </div>
        </div>

        {/* Job Content Grid */}
        <div className="job-grid" style={{
          display: 'grid',
          gridTemplateColumns: '400px 1fr',
          gap: '32px',
          minHeight: '600px'
        }}>
          {/* Left Side - Job List */}
          <div style={{
            transform: isLoaded ? 'translateX(0)' : 'translateX(-32px)',
            opacity: isLoaded ? 1 : 0,
            transition: 'all 0.8s ease 0.4s'
          }}>
            <div style={{
              position: 'sticky',
              top: '100px',
              maxHeight: 'calc(100vh - 150px)',
              overflowY: 'auto',
              paddingRight: '16px' // Add padding for scrollbar
            }}>
              <h3 style={{
                fontSize: '20px',
                fontWeight: '600',
                color: '#1f2937',
                marginBottom: '16px'
              }}>
                {searchJob || searchLocation ? 'Search Results' : 'Recommended Jobs'}
              </h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                {filteredJobs.length > 0 ? (
                  filteredJobs.map((job, index) => (
                    <div
                      key={job.id}
                      className={`job-card ${selectedJob?.id === job.id ? 'selected' : ''}`}
                      onClick={() => handleJobClick(job)}
                      style={{
                        backgroundColor: 'white',
                        borderRadius: '16px',
                        padding: '20px',
                        boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
                        border: selectedJob?.id === job.id ? '2px solid #2563eb' : '1px solid rgba(229, 231, 235, 0.5)',
                        animation: `fadeInUp 0.6s ease ${index * 0.1}s both`
                      }}
                    >
                      <div style={{ display: 'flex', alignItems: 'flex-start', gap: '12px' }}>
                        <img
                          src={job.logo}
                          alt={`${job.company} logo`}
                          style={{
                            width: '48px',
                            height: '48px',
                            borderRadius: '8px',
                            objectFit: 'cover'
                          }}
                        />
                        <div style={{ flex: 1, minWidth: 0 }}>
                          <h4 style={{
                            fontSize: '16px',
                            fontWeight: '600',
                            color: '#1f2937',
                            margin: '0 0 4px 0',
                            overflow: 'hidden',
                            textOverflow: 'ellipsis',
                            whiteSpace: 'nowrap'
                          }}>
                            {job.title}
                          </h4>
                          <p style={{
                            fontSize: '14px',
                            color: '#6b7280',
                            margin: '0 0 8px 0'
                          }}>
                            {job.company}
                          </p>
                          <div style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '12px',
                            marginBottom: '8px'
                          }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                              <LocationIcon size={14} style={{ color: '#9ca3af' }} />
                              <span style={{ fontSize: '12px', color: '#6b7280' }}>{job.location}</span>
                            </div>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                              <Clock size={14} style={{ color: '#9ca3af' }} />
                              <span style={{ fontSize: '12px', color: '#6b7280' }}>{job.posted}</span>
                            </div>
                          </div>
                          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <span style={{
                              fontSize: '14px',
                              fontWeight: '600',
                              color: '#059669'
                            }}>
                              {job.salary}
                            </span>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                              <Star size={14} style={{ color: '#f59e0b', fill: '#f59e0b' }} />
                              <span style={{ fontSize: '12px', color: '#6b7280' }}>{job.rating}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  <p style={{ textAlign: 'center', color: '#6b7280', marginTop: '20px' }}>No jobs found matching your criteria.</p>
                )}
              </div>
            </div>
          </div>

          {/* Right Side - Job Details or ApplySmart Logo */}
          <div style={{
            transform: isLoaded ? 'translateX(0)' : 'translateX(32px)',
            opacity: isLoaded ? 1 : 0,
            transition: 'all 0.8s ease 0.6s',
            backgroundColor: 'white',
            borderRadius: '20px',
            padding: '32px',
            boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1)',
            border: '1px solid rgba(229, 231, 235, 0.5)',
            maxHeight: 'calc(100vh - 150px)',
            overflowY: 'auto'
          }}>
            {selectedJob ? (
              <div>
                <div style={{ display: 'flex', alignItems: 'center', marginBottom: '24px' }}>
                  <img
                    src={selectedJob.logo}
                    alt={`${selectedJob.company} logo`}
                    style={{
                      width: '80px',
                      height: '80px',
                      borderRadius: '12px',
                      objectFit: 'cover',
                      marginRight: '20px'
                    }}
                  />
                  <div>
                    <h2 style={{ fontSize: '28px', fontWeight: 'bold', color: '#1f2937', margin: '0 0 8px 0' }}>{selectedJob.title}</h2>
                    <p style={{ fontSize: '18px', color: '#4b5563', margin: '0 0 4px 0' }}>{selectedJob.company}</p>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '4px', color: '#6b7280' }}>
                        <LocationIcon size={16} />
                        <span style={{ fontSize: '14px' }}>{selectedJob.location}</span>
                      </div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '4px', color: '#6b7280' }}>
                        <Clock size={16} />
                        <span style={{ fontSize: '14px' }}>{selectedJob.posted}</span>
                      </div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '4px', color: '#6b7280' }}>
                        <Star size={16} style={{ color: '#f59e0b', fill: '#f59e0b' }} />
                        <span style={{ fontSize: '14px' }}>{selectedJob.rating}</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div style={{ marginBottom: '32px' }}>
                  <h3 style={{ fontSize: '22px', fontWeight: 'bold', color: '#1f2937', marginBottom: '12px' }}>Description</h3>
                  <p style={{ fontSize: '16px', color: '#4b5563', lineHeight: '1.6' }}>{selectedJob.description}</p>
                </div>

                <div style={{ marginBottom: '32px' }}>
                  <h3 style={{ fontSize: '22px', fontWeight: 'bold', color: '#1f2937', marginBottom: '12px' }}>Requirements</h3>
                  <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                    {selectedJob.requirements.map((req, i) => (
                      <li key={i} style={{ display: 'flex', alignItems: 'flex-start', marginBottom: '8px', fontSize: '16px', color: '#4b5563' }}>
                        <CheckCircle size={18} style={{ marginRight: '12px', color: '#22c55e', flexShrink: 0 }} />
                        {req}
                      </li>
                    ))}
                  </ul>
                </div>

                <div style={{ marginBottom: '32px' }}>
                  <h3 style={{ fontSize: '22px', fontWeight: 'bold', color: '#1f2937', marginBottom: '12px' }}>Benefits</h3>
                  <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                    {selectedJob.benefits.map((benefit, i) => (
                      <li key={i} style={{ display: 'flex', alignItems: 'flex-start', marginBottom: '8px', fontSize: '16px', color: '#4b5563' }}>
                        <CheckCircle size={18} style={{ marginRight: '12px', color: '#22c55e', flexShrink: 0 }} />
                        {benefit}
                      </li>
                    ))}
                  </ul>
                </div>

                <div style={{ display: 'flex', gap: '16px', marginTop: '32px' }}>
                  <button
                    onClick={handleApplyNow}
                    className="apply-button"
                    style={{
                      flex: 1,
                      background: 'linear-gradient(135deg, #2563eb, #4f46e5)',
                      color: 'white',
                      padding: '16px 24px',
                      border: 'none',
                      borderRadius: '12px',
                      fontSize: '18px',
                      fontWeight: '600',
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: '8px',
                      boxShadow: '0 10px 20px -5px rgba(37, 99, 235, 0.3)'
                    }}
                  >
                    <ExternalLink size={20} />
                    Apply Now
                  </button>
                  <button
                    style={{
                      padding: '16px 24px',
                      backgroundColor: '#f3f4f6',
                      color: '#4b5563',
                      border: '1px solid #d1d5db',
                      borderRadius: '12px',
                      fontSize: '18px',
                      fontWeight: '600',
                      cursor: 'pointer',
                      transition: 'all 0.3s ease',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: '8px'
                    }}
                    onMouseEnter={(e) => { e.target.style.backgroundColor = '#e5e7eb'; e.target.style.transform = 'translateY(-2px)'; }}
                    onMouseLeave={(e) => { e.target.style.backgroundColor = '#f3f4f6'; e.target.style.transform = 'translateY(0)'; }}
                  >
                    <Bookmark size={20} />
                    Save Job
                  </button>
                </div>
              </div>
            ) : (
              <div style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                height: '100%',
                textAlign: 'center',
                padding: '20px'
              }}>
                <img
                  src="https://cdn-icons-png.flaticon.com/512/616/616554.png"
                  alt="ApplySmart Logo"
                  className="logo-animation"
                  style={{ width: '120px', height: '120px', marginBottom: '24px', opacity: 0.8 }}
                />
                <h3 style={{ fontSize: '24px', fontWeight: 'bold', color: '#1f2937', marginBottom: '12px' }}>
                  Select a Job to View Details
                </h3>
                <p style={{ fontSize: '16px', color: '#6b7280', maxWidth: '300px' }}>
                  Click on any job card from the left panel to see its full description, requirements, and benefits.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExploreJobsPage;
