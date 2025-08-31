import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/counselling.css';

function Counselling() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    education: '',
    stream: '',  // For 12th students
    subjects: {}, // For storing marks
    skills: [],
    interests: ''
  });

  const specializationOptions = {
    "bsc": ["Computer Science", "Physics", "Biology", "Chemistry", "Mathematics", "Environmental Science"],
    "bcom": ["Accounting", "Finance", "Marketing", "Business Analytics"],
    "ba": ["Psychology", "History", "Political Science", "Sociology", "Philosophy"],
    "bba": ["Human Resource Management", "International Business", "Marketing", "Finance", "Operations Management"],
    "bca": ["Web Development", "Cybersecurity", "Data Analytics", "Software Development", "Cloud Computing"],
    "btech": ["Computer Science Engineering", "Mechanical Engineering", "Civil Engineering", "Electronics Engineering", "Information Technology"]
  };

  const skillsList = [
    "Python", "Java", "Machine Learning", "Leadership", "Public Speaking",
    "Teamwork", "Creative Writing", "Problem Solving", "Analytical Thinking",
    "Data Visualization", "Digital Marketing", "Graphic Design",
    "Networking", "Cybersecurity", "Web Development", "Research",
    "Critical Thinking", "Time Management", "Adaptability", "Collaboration"
  ];

  const interestsList = [
    "Artificial Intelligence", "Finance", "Psychology", "Environmental Science",
    "Data Analysis", "Creative Writing", "History", "Entrepreneurship",
    "Healthcare", "Marketing", "Philosophy", "Education", "Technology",
    "Social Work", "Law", "Sports Science", "Political Science",
    "Media Studies", "Astronomy", "Economics", "Software Development"
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    console.log(`Field ${name} changed to:`, value);
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubjectMarks = (subject, value) => {
    console.log(`Subject ${subject} marks changed to:`, value);
    setFormData(prev => ({
      ...prev,
      subjects: {
        ...prev.subjects,
        [subject]: value
      }
    }));
  };

  const handleSkillsChange = (skill) => {
    console.log('Skill toggled:', skill);
    setFormData(prev => ({
      ...prev,
      skills: prev.skills.includes(skill)
        ? prev.skills.filter(s => s !== skill)
        : [...prev.skills, skill]
    }));
  };

  const renderSubjectInputs = () => {
    if (formData.education === '10th') {
      return (
        <>
          <div className="form-group">
            <label>Mathematics Marks</label>
            <input
              type="number"
              min="0"
              max="100"
              value={formData.subjects.maths || ''}
              onChange={(e) => handleSubjectMarks('maths', e.target.value)}
              className="form-input"
              required
            />
          </div>
          <div className="form-group">
            <label>English Marks</label>
            <input
              type="number"
              min="0"
              max="100"
              value={formData.subjects.english || ''}
              onChange={(e) => handleSubjectMarks('english', e.target.value)}
              className="form-input"
              required
            />
          </div>
          <div className="form-group">
            <label>Science Marks</label>
            <input
              type="number"
              min="0"
              max="100"
              value={formData.subjects.science || ''}
              onChange={(e) => handleSubjectMarks('science', e.target.value)}
              className="form-input"
              required
            />
          </div>
        </>
      );
    }

    if (formData.education === '12th') {
      if (formData.stream === 'science') {
        return (
          <>
            <div className="form-group">
              <label>Physics Marks</label>
              <input
                type="number"
                min="0"
                max="100"
                value={formData.subjects.physics || ''}
                onChange={(e) => handleSubjectMarks('physics', e.target.value)}
                className="form-input"
                required
              />
            </div>
            <div className="form-group">
              <label>Chemistry Marks</label>
              <input
                type="number"
                min="0"
                max="100"
                value={formData.subjects.chemistry || ''}
                onChange={(e) => handleSubjectMarks('chemistry', e.target.value)}
                className="form-input"
                required
              />
            </div>
            <div className="form-group">
              <label>Select Third Subject</label>
              <select
                value={formData.subjects.thirdSubject || ''}
                onChange={(e) => handleSubjectMarks('thirdSubject', e.target.value)}
                className="form-input"
                required
              >
                <option value="">Select Subject</option>
                <option value="maths">Mathematics</option>
                <option value="biology">Biology</option>
                <option value="computer">Computer Science</option>
              </select>
            </div>
          </>
        );
      }

      if (formData.stream === 'commerce') {
        return (
          <>
            <div className="form-group">
              <label>Economics Marks</label>
              <input
                type="number"
                min="0"
                max="100"
                value={formData.subjects.economics || ''}
                onChange={(e) => handleSubjectMarks('economics', e.target.value)}
                className="form-input"
                required
              />
            </div>
            <div className="form-group">
              <label>Mathematics Marks</label>
              <input
                type="number"
                min="0"
                max="100"
                value={formData.subjects.maths || ''}
                onChange={(e) => handleSubjectMarks('maths', e.target.value)}
                className="form-input"
                required
              />
            </div>
            <div className="form-group">
              <label>English Marks</label>
              <input
                type="number"
                min="0"
                max="100"
                value={formData.subjects.english || ''}
                onChange={(e) => handleSubjectMarks('english', e.target.value)}
                className="form-input"
                required
              />
            </div>
            <div className="form-group">
              <label>Computer Marks</label>
              <input
                type="number"
                min="0"
                max="100"
                value={formData.subjects.computer || ''}
                onChange={(e) => handleSubjectMarks('computer', e.target.value)}
                className="form-input"
                required
              />
            </div>
          </>
        );
      }

      if (formData.stream === 'arts') {
        return (
          <>
            <div className="form-group">
              <label>History Marks</label>
              <input
                type="number"
                min="0"
                max="100"
                value={formData.subjects.history || ''}
                onChange={(e) => handleSubjectMarks('history', e.target.value)}
                className="form-input"
                required
              />
            </div>
            <div className="form-group">
              <label>Psychology Marks</label>
              <input
                type="number"
                min="0"
                max="100"
                value={formData.subjects.psychology || ''}
                onChange={(e) => handleSubjectMarks('psychology', e.target.value)}
                className="form-input"
                required
              />
            </div>
          </>
        );
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validate form data
    if (!formData.education || !formData.skills.length || !formData.interests) {
        alert('Please fill all required fields');
        return;
    }

    try {
        // Log the data being sent
        console.log('Sending form data:', formData);

        const response = await fetch('http://localhost:5001/api/predict', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData)
        });

        // Log response status
        console.log('Response status:', response.status);

        // Check if response is ok
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const result = await response.json();
        console.log('API Response:', result);

        // Validate the response data
        if (!result.success || !result.predictions || !Array.isArray(result.predictions)) {
            throw new Error('Invalid response format from server');
        }

        // Log the predictions before navigation
        console.log('Predictions before navigation:', result.predictions);

        // Navigate with state
        navigate('/results', { 
            state: { 
                predictions: result.predictions,
                formData: formData  // Add this line to pass user input data
            },
            replace: false // Ensure we're adding to history
        });

    } catch (error) {
        console.error('Error in form submission:', error);
        alert(`Error: ${error.message}`);
    }
  };

  return (
    <div className="counselling-page">
      <div className="counselling-container">
        <div className="counselling-box">
          <h2>Career Counselling Form</h2>
          <p className="counselling-subtitle">Fill in your details for personalized guidance</p>

          <form onSubmit={handleSubmit} className="counselling-form">
            <div className="form-group">
              <label>Full Name</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="form-input"
                placeholder="Enter your full name"
                required
              />
            </div>

            <div className="form-group">
              <label>Last Education</label>
              <select
                name="education"
                value={formData.education}
                onChange={handleChange}
                className="form-input"
                required
              >
                <option value="">Select Education Level</option>
                <option value="10th">10th Standard</option>
                <option value="12th">12th Standard</option>
                <option value="undergrad">Undergraduate</option>
              </select>
            </div>

            {formData.education === '12th' && (
              <div className="form-group">
                <label>Stream</label>
                <select
                  name="stream"
                  value={formData.stream}
                  onChange={handleChange}
                  className="form-input"
                  required
                >
                  <option value="">Select Stream</option>
                  <option value="science">Science</option>
                  <option value="commerce">Commerce</option>
                  <option value="arts">Arts</option>
                </select>
              </div>
            )}

            {renderSubjectInputs()}

            {formData.education === 'undergrad' && (
              <>
                <div className="form-group">
                  <label>Program</label>
                  <select
                    name="program"
                    value={formData.program}
                    onChange={handleChange}
                    className="form-input"
                    required
                  >
                    <option value="">Select Program</option>
                    <option value="bsc">B.Sc</option>
                    <option value="bcom">B.Com</option>
                    <option value="ba">BA</option>
                    <option value="bba">BBA</option>
                    <option value="bca">BCA</option>
                    <option value="btech">B.Tech</option>
                  </select>
                </div>

                {formData.program && (
                  <div className="form-group">
                    <label>Specialization</label>
                    <select
                      name="specialization"
                      value={formData.specialization}
                      onChange={handleChange}
                      className="form-input"
                      required
                    >
                      <option value="">Select Specialization</option>
                      {specializationOptions[formData.program]?.map(spec => (
                        <option key={spec} value={spec}>
                          {spec}
                        </option>
                      ))}
                    </select>
                  </div>
                )}
              </>
            )}

            <div className="form-group">
              <label>Skills</label>
              <div className="skills-grid">
                {skillsList.map(skill => (
                  <div key={skill} className="skill-item">
                    <input
                      type="checkbox"
                      id={skill}
                      checked={formData.skills.includes(skill)}
                      onChange={() => handleSkillsChange(skill)}
                    />
                    <label htmlFor={skill}>{skill}</label>
                  </div>
                ))}
              </div>
            </div>

            <div className="form-group">
              <label>Area of Interest</label>
              <select
                name="interests"
                value={formData.interests}
                onChange={handleChange}
                className="form-input"
                required
              >
                <option value="">Select Area of Interest</option>
                {interestsList.map(interest => (
                  <option key={interest} value={interest}>
                    {interest}
                  </option>
                ))}
              </select>
            </div>

            <button type="submit" className="submit-button">
              Get Career Guidance
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Counselling;