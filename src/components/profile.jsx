import axios from "axios";
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import {
  Bell,
  User,
  Search,
  MapPin,
  Zap,
  CheckCircle,
  AlertCircle,
  Menu,
  X,
  Plus,
  Upload,
  Edit,
  Trash2,
  FileText,
  Briefcase,
  Award,
  Target,
} from "lucide-react";

const Profile = () => {
  const [userName, setUserName] = useState("");
  const [showNotifications, setShowNotifications] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  const navigate = useNavigate();

  // Profile states
  const [hasProfile, setHasProfile] = useState(false);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [profileName, setProfileName] = useState("");
  const [resumeFile, setResumeFile] = useState(null);
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    setIsLoaded(true);
    // Simulate fetching user data
    // setUserName("John Doe");
    
    // Mouse tracking for subtle parallax effects
    const handleMouseMove = (e) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth) * 100,
        y: (e.clientY / window.innerHeight) * 100,
      });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  const handleFileUpload = (e) => {
  const file = e.target.files[0];
  if (file && file.type === "application/pdf") {
    setResumeFile(file);
  } else {
    alert("Please upload a PDF file only");
    e.target.value = "";
  }
};

  const handleCreateProfile = async () => {
  if (!profileName.trim() || !resumeFile) {
    alert("Please fill in all fields");
    return;
  }

  const formData = new FormData();
  formData.append("name", profileName);
  formData.append("resume", resumeFile);

  try {
    const res = await axios.post("http://localhost:5000/api/profile/create", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    const newProfile = res.data.profile;

    setProfile({
      name: newProfile.name,
      resume: newProfile.resumeUrl.split("/").pop(), // show only file name
      createdAt: new Date(newProfile.createdAt).toLocaleDateString(),
    });

    setHasProfile(true);
    setShowCreateModal(false);
    setProfileName("");
    setResumeFile(null);

    navigate("/extendedprofile");
  } catch (error) {
    console.error("Error creating profile:", error);
    alert("Failed to create profile. Try again later.");
  }
};

  const handleDeleteProfile = () => {
    if (window.confirm("Are you sure you want to delete this profile?")) {
      setProfile(null);
      setHasProfile(false);
    }
  };

  const handleUpdateProfile = () => {
    alert("Update functionality will be implemented to edit profile details.");
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        background: `
        radial-gradient(circle at ${mousePosition.x}% ${mousePosition.y}%, rgba(37, 99, 235, 0.08) 0%, transparent 50%),
        linear-gradient(135deg, #f8fafc 0%, #ffffff 40%, #f1f5f9 100%)
      `,
        fontFamily:
          '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
        transition: "background 0.3s ease",
      }}
    >
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
          
          .modal-overlay {
            position: fixed;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background: rgba(15, 23, 42, 0.4);
            backdrop-filter: blur(8px);
            display: flex;
            align-items: center;
            justify-content: center;
            z-index: 1000;
            animation: fadeInUp 0.3s ease;
          }
          
          .modal-content {
            background: white;
            border-radius: 24px;
            padding: 40px;
            max-width: 520px;
            width: 90%;
            max-height: 90vh;
            overflow-y: auto;
            box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25), 0 0 0 1px rgba(255, 255, 255, 0.1);
            animation: scaleIn 0.3s ease;
            border: 1px solid rgba(226, 232, 240, 0.8);
          }
          
          .profile-card {
            background: linear-gradient(135deg, rgba(255, 255, 255, 0.9), rgba(255, 255, 255, 0.7));
            backdrop-filter: blur(20px);
            border-radius: 24px;
            padding: 32px;
            box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
            border: 1px solid rgba(226, 232, 240, 0.6);
            transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
            position: relative;
            overflow: hidden;
          }
          
          .profile-card::before {
            content: '';
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            height: 4px;
            background: linear-gradient(135deg, #2563eb, #7c3aed, #06b6d4);
            opacity: 0;
            transition: opacity 0.3s ease;
          }
          
          .profile-card:hover::before {
            opacity: 1;
          }
          
          .profile-card:hover {
            transform: translateY(-8px);
            box-shadow: 0 32px 64px -12px rgba(0, 0, 0, 0.15);
            border-color: rgba(37, 99, 235, 0.3);
          }
          
          .add-profile-card {
            background: linear-gradient(135deg, rgba(248, 250, 252, 0.8), rgba(241, 245, 249, 0.6));
            backdrop-filter: blur(20px);
            border: 2px dashed #cbd5e1;
            border-radius: 24px;
            padding: 64px 32px;
            text-align: center;
            cursor: pointer;
            transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
            min-height: 280px;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            position: relative;
            overflow: hidden;
          }
          
          .add-profile-card::before {
            content: '';
            position: absolute;
            top: -50%;
            left: -50%;
            width: 200%;
            height: 200%;
            background: radial-gradient(circle, rgba(37, 99, 235, 0.05) 0%, transparent 70%);
            opacity: 0;
            transition: opacity 0.3s ease;
          }
          
          .add-profile-card:hover::before {
            opacity: 1;
          }
          
          .add-profile-card:hover {
            background: linear-gradient(135deg, rgba(239, 246, 255, 0.9), rgba(219, 234, 254, 0.7));
            border-color: #2563eb;
            transform: translateY(-6px);
            box-shadow: 0 20px 25px -5px rgba(37, 99, 235, 0.1);
          }
          
          .status-badge {
            display: inline-flex;
            align-items: center;
            gap: 8px;
            padding: 8px 16px;
            border-radius: 50px;
            font-size: 14px;
            font-weight: 600;
            letter-spacing: 0.025em;
          }
          
          .status-complete {
            background: linear-gradient(135deg, #dcfce7, #bbf7d0);
            color: #166534;
            border: 1px solid #86efac;
          }
          
          .status-pending {
            background: linear-gradient(135deg, #fef3c7, #fde68a);
            color: #92400e;
            border: 1px solid #fbbf24;
          }
          
          .floating-icon {
            animation: float 3s ease-in-out infinite;
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
      <nav
        style={{
          backgroundColor: "rgba(255, 255, 255, 0.95)",
          backdropFilter: "blur(20px)",
          boxShadow: "0 8px 32px rgba(0, 0, 0, 0.1)",
          borderBottom: "1px solid rgba(229, 231, 235, 0.5)",
          position: "sticky",
          top: 0,
          zIndex: 50,
          animation: isLoaded ? "slideDown 0.8s ease" : "",
        }}
      >
        <div
          style={{
            maxWidth: "1280px",
            margin: "0 auto",
            padding: "0 16px",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            height: "72px",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "16px",
              animation: isLoaded ? "fadeInUp 0.8s ease 0.2s both" : "",
            }}
          >
            <img
              src="https://cdn-icons-png.flaticon.com/512/616/616554.png"
              alt="ApplySmart Logo"
              style={{
                width: "48px",
                height: "48px",
                borderRadius: "12px",
                transition: "transform 0.3s ease",
                cursor: "pointer",
              }}
            />
            <h1
              style={{
                fontSize: "28px",
                fontWeight: "bold",
                background: "linear-gradient(135deg, #2563eb, #4f46e5)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
                cursor: "pointer",
              }}
            >
              ApplySmart
            </h1>
          </div>

          {/* Desktop Navigation */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "40px",
              animation: isLoaded ? "fadeInUp 0.8s ease 0.4s both" : "",
            }}
            className="nav-links"
          >
            <Link
              to="/home"
              className="nav-link"
              style={{
                color: "#374151",

                fontWeight: "500",
                paddingBottom: "4px",
                textDecoration: "none",
              }}
            >
              Home
            </Link>
            <Link
              to="/tracker"
              className="nav-link"
              style={{
                color: "#374151",
                fontWeight: "500",
                textDecoration: "none",
                paddingBottom: "4px",
              }}
            >
              Application Tracker
            </Link>
            <Link
              to="/explore-jobs" // 2. Use the 'to' prop to specify the destination
              className="nav-link"
              style={{
                color: "#374151",
                fontWeight: "500",

                textDecoration: "none",
                paddingBottom: "4px",
              }}
            >
              Explore Jobs
            </Link>
            <Link
              to="resume"
              className="nav-link"
              style={{
                color: "#374151",
                fontWeight: "500",
                textDecoration: "none",
                paddingBottom: "4px",
              }}
            >
              Resume Builder
            </Link>
            <Link
              to="/profile-page"
              className="nav-link"
              style={{
                color: "#2563eb",
                fontWeight: "600",
                borderBottom: "2px solid #2563eb",
                textDecoration: "none",
                paddingBottom: "4px",
              }}
            >
              Profile
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="mobile-menu-btn"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            style={{
              display: "none",
              alignItems: "center",
              justifyContent: "center",
              padding: "8px",
              backgroundColor: "transparent",
              border: "none",
              borderRadius: "8px",
              cursor: "pointer",
              transition: "all 0.3s ease",
            }}
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>

          {/* User Actions */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "16px",
              animation: isLoaded ? "fadeInUp 0.8s ease 0.6s both" : "",
            }}
          >
            <button
              onClick={() => setShowNotifications(!showNotifications)}
              style={{
                position: "relative",
                padding: "12px",
                color: "#6b7280",
                backgroundColor: "rgba(255, 255, 255, 0.8)",
                border: "1px solid rgba(229, 231, 235, 0.5)",
                borderRadius: "12px",
                cursor: "pointer",
                transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
                backdropFilter: "blur(10px)",
              }}
            >
              <Bell size={24} />
              <span
                style={{
                  position: "absolute",
                  top: "6px",
                  right: "6px",
                  width: "12px",
                  height: "12px",
                  backgroundColor: "#ef4444",
                  borderRadius: "50%",
                  animation: "pulse 2s infinite",
                }}
              ></span>
            </button>
            <button
              style={{
                padding: "12px",
                color: "#6b7280",
                backgroundColor: "rgba(255, 255, 255, 0.8)",
                border: "1px solid rgba(229, 231, 235, 0.5)",
                borderRadius: "12px",
                cursor: "pointer",
                transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
                backdropFilter: "blur(10px)",
              }}
            >
              <User size={24} />
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div
            style={{
              position: "absolute",
              top: "100%",
              left: 0,
              right: 0,
              backgroundColor: "rgba(255, 255, 255, 0.98)",
              backdropFilter: "blur(20px)",
              borderTop: "1px solid rgba(229, 231, 235, 0.5)",
              padding: "20px",
              animation: "slideDown 0.3s ease",
            }}
          >
            <div
              style={{ display: "flex", flexDirection: "column", gap: "16px" }}
            >
              <a
                href="#"
                style={{
                  color: "#374151",
                  fontWeight: "500",
                  textDecoration: "none",
                }}
              >
                Home
              </a>
              <a
                href="#"
                style={{
                  color: "#374151",
                  fontWeight: "500",
                  textDecoration: "none",
                }}
              >
                Application Tracker
              </a>
              <a
                href="#"
                style={{
                  color: "#374151",
                  fontWeight: "500",
                  textDecoration: "none",
                }}
              >
                Explore Jobs
              </a>
              <a
                href="#"
                style={{
                  color: "#374151",
                  fontWeight: "500",
                  textDecoration: "none",
                }}
              >
                Resume Builder
              </a>
              <a
                href="#"
                style={{
                  color: "#2563eb",
                  fontWeight: "600",
                  textDecoration: "none",
                }}
              >
                Profile
              </a>
            </div>
          </div>
        )}
      </nav>

      {/* Notification Sidebar */}
      {showNotifications && (
        <div
          style={{
            position: "fixed",
            right: 0,
            top: "72px",
            width: "380px",
            height: "calc(100vh - 72px)",
            backgroundColor: "rgba(255, 255, 255, 0.98)",
            backdropFilter: "blur(20px)",
            boxShadow: "-10px 0 50px -10px rgba(0, 0, 0, 0.15)",
            zIndex: 40,
            padding: "32px",
            borderLeft: "1px solid rgba(229, 231, 235, 0.5)",
            animation: "slideDown 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
          }}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              marginBottom: "24px",
            }}
          >
            <h3
              style={{
                fontSize: "24px",
                fontWeight: "bold",
                color: "#1f2937",
                margin: 0,
              }}
            >
              Notifications
            </h3>
            <button
              onClick={() => setShowNotifications(false)}
              style={{
                padding: "8px",
                backgroundColor: "transparent",
                border: "none",
                borderRadius: "8px",
                cursor: "pointer",
                color: "#6b7280",
              }}
            >
              <X size={20} />
            </button>
          </div>
        </div>
      )}

      {/* Main Content */}
      <main
        style={{ maxWidth: "1280px", margin: "0 auto", padding: "60px 16px" }}
      >
        {/* Hero Section */}
        <div
          style={{
            textAlign: "center",
            marginBottom: "80px",
            transform: isLoaded ? "translateY(0)" : "translateY(32px)",
            opacity: isLoaded ? 1 : 0,
            transition: "all 0.8s cubic-bezier(0.4, 0, 0.2, 1) 0.2s",
          }}
        >
          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "12px",
              marginBottom: "24px",
              padding: "8px 20px",
              backgroundColor: "rgba(37, 99, 235, 0.1)",
              borderRadius: "50px",
              border: "1px solid rgba(37, 99, 235, 0.2)",
            }}
          >
            <Briefcase size={18} color="#2563eb" />
            <span
              style={{
                fontSize: "14px",
                fontWeight: "600",
                color: "#2563eb",
                letterSpacing: "0.025em",
              }}
            >
              PROFESSIONAL DASHBOARD
            </span>
          </div>

          <h1
            style={{
              fontSize: "clamp(36px, 5vw, 56px)",
              fontWeight: "800",
              color: "#0f172a",
              marginBottom: "20px",
              lineHeight: "1.1",
              letterSpacing: "-0.025em",
            }}
          >
            Build Your Career{" "}
            <span
              style={{
                background: "linear-gradient(135deg, #2563eb, #7c3aed)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              Profile
            </span>
          </h1>

          <p
            style={{
              fontSize: "20px",
              color: "#64748b",
              maxWidth: "600px",
              margin: "0 auto 32px auto",
              lineHeight: "1.6",
            }}
          >
            Create a comprehensive professional profile to showcase your skills
            and accelerate your job search journey.
          </p>

          <div
            className={`status-badge ${
              hasProfile ? "status-complete" : "status-pending"
            }`}
          >
            {hasProfile ? (
              <>
                <CheckCircle size={16} />
                Profile Active & Ready
              </>
            ) : (
              <>
                <Target size={16} />
                Profile Setup Required
              </>
            )}
          </div>
        </div>

        {/* Profile Section */}
        <div
          style={{
            transform: isLoaded ? "translateY(0)" : "translateY(32px)",
            opacity: isLoaded ? 1 : 0,
            transition: "all 0.8s cubic-bezier(0.4, 0, 0.2, 1) 0.4s",
          }}
        >
          <div style={{ maxWidth: "700px", margin: "0 auto" }}>
            {!hasProfile ? (
              // Add Profile Card
              <div
                className="add-profile-card"
                onClick={() => setShowCreateModal(true)}
              >
                <div
                  style={{
                    width: "100px",
                    height: "100px",
                    background: "linear-gradient(135deg, #2563eb, #7c3aed)",
                    borderRadius: "50%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    marginBottom: "24px",
                    transition: "all 0.3s ease",
                    boxShadow: "0 20px 25px -5px rgba(37, 99, 235, 0.3)",
                  }}
                  className="floating-icon"
                >
                  <Plus size={48} color="white" />
                </div>
                <h3
                  style={{
                    fontSize: "28px",
                    fontWeight: "700",
                    color: "#0f172a",
                    marginBottom: "12px",
                    letterSpacing: "-0.025em",
                  }}
                >
                  Create Your Professional Profile
                </h3>
                <p
                  style={{
                    fontSize: "18px",
                    color: "#64748b",
                    margin: "0 0 20px 0",
                    lineHeight: "1.6",
                  }}
                >
                  Upload your resume and build a comprehensive profile to get
                  discovered by top employers
                </p>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: "24px",
                    marginTop: "20px",
                    fontSize: "14px",
                    color: "#64748b",
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "8px",
                    }}
                  >
                    <Upload size={16} />
                    <span>Upload Resume</span>
                  </div>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "8px",
                    }}
                  >
                    <Award size={16} />
                    <span>Add Skills</span>
                  </div>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "8px",
                    }}
                  >
                    <Zap size={16} />
                    <span>Get Matched</span>
                  </div>
                </div>
              </div>
            ) : (
              // Existing Profile Card
              <div className="profile-card">
                <div
                  style={{
                    display: "flex",
                    alignItems: "flex-start",
                    justifyContent: "space-between",
                    marginBottom: "24px",
                    flexWrap: "wrap",
                    gap: "16px",
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "20px",
                    }}
                  >
                    <div
                      style={{
                        width: "80px",
                        height: "80px",
                        background: "linear-gradient(135deg, #2563eb, #7c3aed)",
                        borderRadius: "20px",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        boxShadow: "0 10px 25px -5px rgba(37, 99, 235, 0.3)",
                      }}
                    >
                      <User size={36} color="white" />
                    </div>
                    <div>
                      <h3
                        style={{
                          fontSize: "28px",
                          fontWeight: "700",
                          color: "#0f172a",
                          margin: "0 0 8px 0",
                          letterSpacing: "-0.025em",
                        }}
                      >
                        {profile?.name}
                      </h3>
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: "12px",
                          marginBottom: "8px",
                        }}
                      >
                        <div
                          style={{
                            display: "flex",
                            alignItems: "center",
                            gap: "8px",
                            padding: "6px 12px",
                            backgroundColor: "#f1f5f9",
                            borderRadius: "8px",
                          }}
                        >
                          <FileText size={16} color="#64748b" />
                          <span
                            style={{
                              fontSize: "14px",
                              color: "#64748b",
                              fontWeight: "500",
                            }}
                          >
                            {profile?.resume}
                          </span>
                        </div>
                      </div>
                      <p
                        style={{
                          fontSize: "14px",
                          color: "#94a3b8",
                          margin: 0,
                        }}
                      >
                        Created on {profile?.createdAt}
                      </p>
                    </div>
                  </div>

                  <div
                    style={{ display: "flex", gap: "12px", flexWrap: "wrap" }}
                  >
                    <button
                      onClick={handleUpdateProfile}
                      style={{
                        padding: "12px 20px",
                        background: "linear-gradient(135deg, #2563eb, #4f46e5)",
                        color: "white",
                        border: "none",
                        borderRadius: "12px",
                        cursor: "pointer",
                        display: "flex",
                        alignItems: "center",
                        gap: "8px",
                        fontSize: "14px",
                        fontWeight: "600",
                        transition: "all 0.3s ease",
                        boxShadow: "0 4px 14px 0 rgba(37, 99, 235, 0.3)",
                      }}
                    >
                      <Edit size={16} />
                      Update Profile
                    </button>
                    <button
                      onClick={handleDeleteProfile}
                      style={{
                        padding: "12px 20px",
                        backgroundColor: "#f8fafc",
                        color: "#ef4444",
                        border: "2px solid #fee2e2",
                        borderRadius: "12px",
                        cursor: "pointer",
                        display: "flex",
                        alignItems: "center",
                        gap: "8px",
                        fontSize: "14px",
                        fontWeight: "600",
                        transition: "all 0.3s ease",
                      }}
                    >
                      <Trash2 size={16} />
                      Delete
                    </button>
                  </div>
                </div>

                <div
                  style={{
                    padding: "24px",
                    background: "linear-gradient(135deg, #f8fafc, #f1f5f9)",
                    borderRadius: "16px",
                    border: "1px solid #e2e8f0",
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      flexWrap: "wrap",
                      gap: "16px",
                    }}
                  >
                    <div>
                      <h4
                        style={{
                          fontSize: "16px",
                          fontWeight: "600",
                          color: "#0f172a",
                          margin: "0 0 4px 0",
                        }}
                      >
                        Profile Status
                      </h4>
                      <p
                        style={{
                          fontSize: "14px",
                          color: "#64748b",
                          margin: 0,
                        }}
                      >
                        Your profile is active and visible to employers
                      </p>
                    </div>
                    <div
                      style={{
                        display: "flex",
                        gap: "8px",
                      }}
                    >
                      <CheckCircle size={18} color="#059669" />
                      <span
                        style={{
                          fontSize: "14px",
                          fontWeight: "600",
                          color: "#059669",
                        }}
                      >
                        Active
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Quick Actions Section */}
        <div
          style={{
            marginTop: "80px",
            transform: isLoaded ? "translateY(0)" : "translateY(32px)",
            opacity: isLoaded ? 1 : 0,
            transition: "all 0.8s cubic-bezier(0.4, 0, 0.2, 1) 0.6s",
          }}
        >
          <div style={{ textAlign: "center", marginBottom: "48px" }}>
            <h2
              style={{
                fontSize: "36px",
                fontWeight: "700",
                color: "#0f172a",
                marginBottom: "16px",
                letterSpacing: "-0.025em",
              }}
            >
              Quick Actions
            </h2>
            <p
              style={{
                fontSize: "18px",
                color: "#64748b",
                maxWidth: "500px",
                margin: "0 auto",
              }}
            >
              Enhance your profile and accelerate your job search with these
              powerful tools
            </p>
          </div>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
              gap: "24px",
              maxWidth: "900px",
              margin: "0 auto",
            }}
          >
            {/* Resume Builder */}
            <div
              style={{
                background:
                  "linear-gradient(135deg, rgba(255, 255, 255, 0.9), rgba(255, 255, 255, 0.7))",
                backdropFilter: "blur(20px)",
                borderRadius: "20px",
                padding: "32px",
                border: "1px solid rgba(226, 232, 240, 0.6)",
                cursor: "pointer",
                transition: "all 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
                position: "relative",
                overflow: "hidden",
              }}
              onMouseOver={(e) => {
                e.currentTarget.style.transform = "translateY(-8px)";
                e.currentTarget.style.boxShadow =
                  "0 25px 50px -12px rgba(0, 0, 0, 0.15)";
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.transform = "translateY(0)";
                e.currentTarget.style.boxShadow =
                  "0 10px 25px -5px rgba(0, 0, 0, 0.1)";
              }}
            >
              <div
                style={{
                  width: "64px",
                  height: "64px",
                  background: "linear-gradient(135deg, #2563eb, #4f46e5)",
                  borderRadius: "16px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  marginBottom: "20px",
                  boxShadow: "0 10px 25px -5px rgba(37, 99, 235, 0.3)",
                }}
              >
                <FileText size={28} color="white" />
              </div>
              <h3
                style={{
                  fontSize: "20px",
                  fontWeight: "600",
                  color: "#0f172a",
                  marginBottom: "12px",
                }}
              >
                Resume Builder
              </h3>
              <p
                style={{
                  fontSize: "16px",
                  color: "#64748b",
                  lineHeight: "1.6",
                  margin: 0,
                }}
              >
                Create a professional ATS-friendly resume with our smart builder
              </p>
            </div>

            {/* Skill Assessment */}
            <div
              style={{
                background:
                  "linear-gradient(135deg, rgba(255, 255, 255, 0.9), rgba(255, 255, 255, 0.7))",
                backdropFilter: "blur(20px)",
                borderRadius: "20px",
                padding: "32px",
                border: "1px solid rgba(226, 232, 240, 0.6)",
                cursor: "pointer",
                transition: "all 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
                position: "relative",
                overflow: "hidden",
              }}
              onMouseOver={(e) => {
                e.currentTarget.style.transform = "translateY(-8px)";
                e.currentTarget.style.boxShadow =
                  "0 25px 50px -12px rgba(0, 0, 0, 0.15)";
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.transform = "translateY(0)";
                e.currentTarget.style.boxShadow =
                  "0 10px 25px -5px rgba(0, 0, 0, 0.1)";
              }}
            >
              <div
                style={{
                  width: "64px",
                  height: "64px",
                  background: "linear-gradient(135deg, #7c3aed, #a855f7)",
                  borderRadius: "16px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  marginBottom: "20px",
                  boxShadow: "0 10px 25px -5px rgba(124, 58, 237, 0.3)",
                }}
              >
                <Award size={28} color="white" />
              </div>
              <h3
                style={{
                  fontSize: "20px",
                  fontWeight: "600",
                  color: "#0f172a",
                  marginBottom: "12px",
                }}
              >
                Skill Assessment
              </h3>
              <p
                style={{
                  fontSize: "16px",
                  color: "#64748b",
                  lineHeight: "1.6",
                  margin: 0,
                }}
              >
                Take skill tests to validate your expertise and boost
                credibility
              </p>
            </div>

            {/* Job Matching */}
            <div
              style={{
                background:
                  "linear-gradient(135deg, rgba(255, 255, 255, 0.9), rgba(255, 255, 255, 0.7))",
                backdropFilter: "blur(20px)",
                borderRadius: "20px",
                padding: "32px",
                border: "1px solid rgba(226, 232, 240, 0.6)",
                cursor: "pointer",
                transition: "all 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
                position: "relative",
                overflow: "hidden",
              }}
              onMouseOver={(e) => {
                e.currentTarget.style.transform = "translateY(-8px)";
                e.currentTarget.style.boxShadow =
                  "0 25px 50px -12px rgba(0, 0, 0, 0.15)";
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.transform = "translateY(0)";
                e.currentTarget.style.boxShadow =
                  "0 10px 25px -5px rgba(0, 0, 0, 0.1)";
              }}
            >
              <div
                style={{
                  width: "64px",
                  height: "64px",
                  background: "linear-gradient(135deg, #06b6d4, #0891b2)",
                  borderRadius: "16px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  marginBottom: "20px",
                  boxShadow: "0 10px 25px -5px rgba(6, 182, 212, 0.3)",
                }}
              >
                <Target size={28} color="white" />
              </div>
              <h3
                style={{
                  fontSize: "20px",
                  fontWeight: "600",
                  color: "#0f172a",
                  marginBottom: "12px",
                }}
              >
                Smart Job Matching
              </h3>
              <p
                style={{
                  fontSize: "16px",
                  color: "#64748b",
                  lineHeight: "1.6",
                  margin: 0,
                }}
              >
                Get personalized job recommendations based on your profile
              </p>
            </div>
          </div>
        </div>
      </main>

      {/* Create Profile Modal */}
      {showCreateModal && (
        <div
          className="modal-overlay"
          onClick={(e) => {
            if (e.target === e.currentTarget) setShowCreateModal(false);
          }}
        >
          <div className="modal-content">
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                marginBottom: "32px",
              }}
            >
              <h2
                style={{
                  fontSize: "28px",
                  fontWeight: "700",
                  color: "#0f172a",
                  margin: 0,
                  letterSpacing: "-0.025em",
                }}
              >
                Create Your Profile
              </h2>
              <button
                onClick={() => setShowCreateModal(false)}
                style={{
                  padding: "8px",
                  backgroundColor: "transparent",
                  border: "none",
                  borderRadius: "8px",
                  cursor: "pointer",
                  color: "#6b7280",
                  transition: "background-color 0.2s ease",
                }}
              >
                <X size={24} />
              </button>
            </div>

            <div style={{ marginBottom: "24px" }}>
              <label
                style={{
                  display: "block",
                  fontSize: "16px",
                  fontWeight: "600",
                  color: "#374151",
                  marginBottom: "8px",
                }}
              >
                Profile Name *
              </label>
              <input
                type="text"
                value={profileName}
                onChange={(e) => setProfileName(e.target.value)}
                placeholder="Enter your professional name"
                style={{
                  width: "100%",
                  padding: "16px",
                  fontSize: "16px",
                  border: "2px solid #e5e7eb",
                  borderRadius: "12px",
                  outline: "none",
                  transition: "border-color 0.2s ease",
                  fontFamily: "inherit",
                }}
                onFocus={(e) => (e.target.style.borderColor = "#2563eb")}
                onBlur={(e) => (e.target.style.borderColor = "#e5e7eb")}
              />
            </div>

            <div style={{ marginBottom: "32px" }}>
              <label
                style={{
                  display: "block",
                  fontSize: "16px",
                  fontWeight: "600",
                  color: "#374151",
                  marginBottom: "8px",
                }}
              >
                Upload Resume *
              </label>
              <div
                style={{
                  border: "2px dashed #d1d5db",
                  borderRadius: "12px",
                  padding: "32px",
                  textAlign: "center",
                  transition: "all 0.2s ease",
                  cursor: "pointer",
                  position: "relative",
                }}
              >
                <input
                  type="file"
                  accept=".pdf"
                  onChange={handleFileUpload}
                  style={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    width: "100%",
                    height: "100%",
                    opacity: 0,
                    cursor: "pointer",
                  }}
                />
                <Upload
                  size={32}
                  color="#9ca3af"
                  style={{ marginBottom: "12px" }}
                />
                <p
                  style={{
                    fontSize: "16px",
                    color: "#6b7280",
                    margin: "0 0 8px 0",
                  }}
                >
                  {resumeFile
                    ? resumeFile.name
                    : "Click to upload or drag and drop"}
                </p>
                <p
                  style={{
                    fontSize: "14px",
                    color: "#9ca3af",
                    margin: 0,
                  }}
                >
                  PDF only, max 10MB
                </p>
              </div>
            </div>

            <div
              style={{
                display: "flex",
                gap: "16px",
                justifyContent: "flex-end",
              }}
            >
              <button
                onClick={() => setShowCreateModal(false)}
                style={{
                  padding: "14px 24px",
                  backgroundColor: "#f8fafc",
                  color: "#64748b",
                  border: "2px solid #e2e8f0",
                  borderRadius: "12px",
                  cursor: "pointer",
                  fontSize: "16px",
                  fontWeight: "600",
                  transition: "all 0.2s ease",
                }}
              >
                Cancel
              </button>
              <button
                onClick={handleCreateProfile}
                style={{
                  padding: "14px 32px",
                  background: "linear-gradient(135deg, #2563eb, #4f46e5)",
                  color: "white",
                  border: "none",
                  borderRadius: "12px",
                  cursor: "pointer",
                  fontSize: "16px",
                  fontWeight: "600",
                  transition: "all 0.2s ease",
                  boxShadow: "0 4px 14px 0 rgba(37, 99, 235, 0.3)",
                  display: "flex",
                  alignItems: "center",
                  gap: "8px",
                }}
              >
                <Plus size={18} />
                Create Profile
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Profile;
