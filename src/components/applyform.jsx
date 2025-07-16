import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios'; // Import axios for making HTTP requests

const ApplyForm = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    name: '',
    jobTitle: '',
    location: '',
    experience: '',
    expectedSalary: '',
    currentSalary: ''
  });
  const [message, setMessage] = useState(''); // State for displaying messages to the user

  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const selectOption = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const showStep2 = () => {
    // Basic validation for Step 1 before proceeding
    if (!formData.name || !formData.jobTitle || !formData.location) {
      setMessage('Please fill in all fields for Step 1.');
      return;
    }
    setMessage(''); // Clear message if validation passes
    setCurrentStep(2);
  };

  const showStep1 = () => {
    setCurrentStep(1);
  };

  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent default form submission behavior

    // Basic validation for Step 2 before submitting
    if (!formData.experience || !formData.expectedSalary || !formData.currentSalary) {
      setMessage('Please select all options for Step 2.');
      return;
    }

    // Enhanced debugging: Log form data before submission
    console.log('Form data being submitted:', formData);
    console.log('Form data keys:', Object.keys(formData));
    console.log('Form data values:', Object.values(formData));

    setMessage('Submitting application...'); // Provide feedback to the user
    try {
      // Send the formData to your new backend API endpoint
      const response = await axios.post('https://localhost:5000/api/application/submit', formData, {
        headers: {
          'Content-Type': 'application/json',
        },
        withCredentials: true
      });

      console.log('Response received:', response);
      console.log('Response status:', response.status);
      console.log('Response data:', response.data);

      if (response.status === 201) {
        setMessage('Application submitted successfully!');
        console.log('Form submitted:', response.data);
        // Optionally clear the form after successful submission
        setFormData({
          name: '',
          jobTitle: '',
          location: '',
          experience: '',
          expectedSalary: '',
          currentSalary: ''
        });
        setCurrentStep(1); // Go back to the first step or a confirmation page
        navigate('/login-signup'); // Navigate to login/signup after successful submission
      }
    } catch (error) {
      console.error('Full error object:', error);
      console.error('Error message:', error.message);
      console.error('Error response:', error.response);
      
      if (error.response) {
        console.error('Response status:', error.response.status);
        console.error('Response headers:', error.response.headers);
        console.error('Response data:', error.response.data);
        setMessage(`Error ${error.response.status}: ${error.response.data?.message || error.response.statusText}`);
      } else if (error.request) {
        console.error('Request made but no response received:', error.request);
        setMessage('No response from server. Please check if the backend is running.');
      } else {
        console.error('Error setting up request:', error.message);
        setMessage('Request setup error: ' + error.message);
      }
    }
  };

  const jobTitles = [
    "Software Engineer", "Data Scientist", "Frontend Developer", "Backend Developer",
    "Full Stack Developer", "DevOps Engineer", "AI/ML Engineer", "Cybersecurity Specialist",
    "Cloud Architect", "Database Administrator", "UI/UX Designer", "Product Manager",
    "QA Engineer", "Network Engineer", "IT Support Specialist", "Business Analyst",
    "Data Engineer", "System Analyst", "Technical Writer", "Mobile App Developer","Student/Unemployed"
  ];

  const indianStates = [
    "Andhra Pradesh", "Arunachal Pradesh", "Assam", "Bihar", "Chhattisgarh",
    "Delhi", "Goa", "Gujarat", "Haryana", "Himachal Pradesh", "Jharkhand",
    "Karnataka", "Kerala", "Madhya Pradesh", "Maharashtra", "Manipur",
    "Meghalaya", "Mizoram", "Nagaland", "Odisha", "Punjab", "Rajasthan",
    "Sikkim", "Tamil Nadu", "Telangana", "Tripura", "Uttar Pradesh",
    "Uttarakhand", "West Bengal"
  ];

  const OptionButton = ({ children, field, value, isSelected, onClick }) => (
    <div
      className={`option ${isSelected ? 'selected' : ''}`}
      onClick={() => onClick(field, value)}
    >
      {children}
    </div>
  );

  return (
    <div>
      <div className="top-bar">
        <img src="https://cdn-icons-png.flaticon.com/512/616/616554.png" alt="Company Logo" />
        <h1>Apply Smart</h1>
      </div>

      <div className="container fade-in">
        {/* Message display area */}
        {message && <div className="form-message">{message}</div>}

        {/* Step 1 */}
        {currentStep === 1 && (
          <div id="step1">
            <h2>Step 1: Basic Information</h2>
            <div className="form-group">
              <label htmlFor="name">Your Name</label>
              <input
                type="text"
                id="name"
                name="name"
                placeholder="Enter your name"
                value={formData.name}
                onChange={handleInputChange}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="jobTitle">Current Job Title</label>
              <select
                id="jobTitle"
                name="jobTitle"
                value={formData.jobTitle}
                onChange={handleInputChange}
                required // Mark as required
              >
                <option value="">Select a job title</option>
                {jobTitles.map((title, index) => (
                  <option key={index} value={title}>{title}</option>
                ))}
              </select>
            </div>

            <div className="form-group">
              <label htmlFor="location">Current Work Location</label>
              <select
                id="location"
                name="location"
                value={formData.location}
                onChange={handleInputChange}
                required // Mark as required
              >
                <option value="">Select a location</option>
                {indianStates.map((state, index) => (
                  <option key={index} value={state}>{state}</option>
                ))}
              </select>
            </div>

            <button className="continue-btn" onClick={showStep2}>Continue</button>
          </div>
        )}

        {/* Step 2 */}
        {currentStep === 2 && (
          <div id="step2">
            <h2>Step 2: Additional Information</h2>

            <div className="form-group">
              <label>Experience</label>
              <div className="options-container">
                <OptionButton
                  field="experience"
                  value="0-1 yr"
                  isSelected={formData.experience === "0-1 yr"}
                  onClick={selectOption}
                >
                  0-1 yr
                </OptionButton>
                <OptionButton
                  field="experience"
                  value="1-5 yr"
                  isSelected={formData.experience === "1-5 yr"}
                  onClick={selectOption}
                >
                  1-5 yr
                </OptionButton>
                <OptionButton
                  field="experience"
                  value="5-10 yr"
                  isSelected={formData.experience === "5-10 yr"}
                  onClick={selectOption}
                >
                  5-10 yr
                </OptionButton>
                <OptionButton
                  field="experience"
                  value="10+ yr"
                  isSelected={formData.experience === "10+ yr"}
                  onClick={selectOption}
                >
                  10+ yr
                </OptionButton>
              </div>
            </div>

            <div className="form-group">
              <label>Expected Salary Range</label>
              <div className="options-container">
                <OptionButton
                  field="expectedSalary"
                  value="0-5 LPA"
                  isSelected={formData.expectedSalary === "0-5 LPA"}
                  onClick={selectOption}
                >
                  0-5 LPA
                </OptionButton>
                <OptionButton
                  field="expectedSalary"
                  value="5-10 LPA"
                  isSelected={formData.expectedSalary === "5-10 LPA"}
                  onClick={selectOption}
                >
                  5-10 LPA
                </OptionButton>
                <OptionButton
                  field="expectedSalary"
                  value="10-20 LPA"
                  isSelected={formData.expectedSalary === "10-20 LPA"}
                  onClick={selectOption}
                >
                  10-20 LPA
                </OptionButton>
                <OptionButton
                  field="expectedSalary"
                  value="20+ LPA"
                  isSelected={formData.expectedSalary === "20+ LPA"}
                  onClick={selectOption}
                >
                  20+ LPA
                </OptionButton>
              </div>
            </div>

            <div className="form-group">
              <label>Current Salary Range</label>
              <div className="options-container">
                <OptionButton
                  field="currentSalary"
                  value="0-5 LPA"
                  isSelected={formData.currentSalary === "0-5 LPA"}
                  onClick={selectOption}
                >
                  0-5 LPA
                </OptionButton>
                <OptionButton
                  field="currentSalary"
                  value="5-10 LPA"
                  isSelected={formData.currentSalary === "5-10 LPA"}
                  onClick={selectOption}
                >
                  5-10 LPA
                </OptionButton>
                <OptionButton
                  field="currentSalary"
                  value="10-20 LPA"
                  isSelected={formData.currentSalary === "10-20 LPA"}
                  onClick={selectOption}
                >
                  10-20 LPA
                </OptionButton>
                <OptionButton
                  field="currentSalary"
                  value="20+ LPA"
                  isSelected={formData.currentSalary === "20+ LPA"}
                  onClick={selectOption}
                >
                  20+ LPA
                </OptionButton>
              </div>
            </div>

            <button className="back-btn" onClick={showStep1}>Back to Step 1</button>
            <button className="continue-btn" onClick={handleSubmit}>Submit</button>
          </div>
        )}
      </div>

      {/* Added CSS for form messages */}
      <style jsx>{`
        body {
          font-family: 'Roboto', sans-serif;
          margin: 0;
          padding: 0;
          background-color: #f9f9f9;
          color: #333;
        }

        .top-bar {
          display: flex;
          align-items: center;
          justify-content: flex-start;
          background-color: #eaeaea;
          padding: 5px 20px;
          color: #333;
          position: sticky;
          top: 0;
          z-index: 1000;
          box-shadow: 0 2px 4px rgba(0,0,0,0.1);
        }

        .top-bar img {
          width: 40px;
          height: 40px;
          margin-right: 10px;
        }

        .top-bar h1 {
          font-size: 20px;
          margin-left: 5px;
          font-weight: 600;
        }

        .container {
          max-width: 600px;
          margin: 80px auto 30px;
          padding: 20px;
          background: #fff;
          border-radius: 15px;
          box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
        }

        h2 {
          font-size: 20px;
          margin-bottom: 20px;
          text-align: center;
        }

        .form-group {
          margin-bottom: 30px;
        }

        label {
          display: block;
          font-weight: 500;
          margin-bottom: 8px;
        }

        .options-container {
          display: flex;
          gap: 15px;
          flex-wrap: wrap;
        }

        .option {
          flex: 1 1 calc(50% - 10px);
          padding: 15px;
          border: 2px solid #ccc;
          border-radius: 15px;
          text-align: center;
          cursor: pointer;
          transition: border-color 0.3s, box-shadow 0.3s;
          font-size: 16px;
          box-sizing: border-box;
        }

        .option:hover {
          border-color: #007bff;
        }

        .option.selected {
          border-color: #007bff;
          box-shadow: 0 0 10px #007bff;
        }

        .continue-btn, .back-btn {
          display: block;
          width: 100%;
          padding: 12px;
          font-size: 18px;
          color: #fff;
          background: #007bff;
          border: none;
          border-radius: 10px;
          cursor: pointer;
          text-align: center;
          transition: background-color 0.3s;
          margin-bottom: 10px;
        }

        .continue-btn:hover, .back-btn:hover {
          background: #0056b3;
        }

        input, select {
          width: 100%;
          padding: 12px;
          border: 1px solid #ccc;
          border-radius: 10px;
          font-size: 16px;
          box-sizing: border-box;
          transition: border-color 0.3s;
        }

        input:focus, select:focus {
          border-color: #007bff;
          outline: none;
        }

        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }

        .fade-in {
          animation: fadeIn 1s ease-in-out;
        }

        .form-message { /* New style for messages */
          background-color: #e0f7fa;
          color: #00796b;
          padding: 10px 15px;
          border-radius: 8px;
          margin-bottom: 20px;
          text-align: center;
          font-weight: 500;
          border: 1px solid #b2ebf2;
        }

        @media (max-width: 768px) {
          .container {
            margin: 20px;
            padding: 15px;
          }

          .option {
            flex: 1 1 100%;
          }

          .top-bar {
            padding: 10px 15px;
          }

          .top-bar h1 {
            font-size: 18px;
          }
        }
      `}</style>
    </div>
  );
};

export default ApplyForm;
