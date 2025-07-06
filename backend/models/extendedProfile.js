const mongoose = require('mongoose');

const ProfileSchema = new mongoose.Schema({
  userId: {
  type: mongoose.Schema.Types.ObjectId,
  ref: 'User',
  required: true
},
  personalInfo: {
    firstName: String,
    lastName: String,
    gender: String,
    mobile: String,
    email: String,
    address: String,
    city: String,
    state: String,
    zipCode: String,
    country: String,
  },
  jobPreference: {
    linkedin: String,
    twitter: String,
    github: String,
    portfolio: String,
    otherUrl: String,
    currentSalary: String,
    expectedSalary: String,
    noticePeriod: String,
    experience: String,
    highestEducation: String,
    expectedJoining: String,
    willingToRelocate: Boolean,
  },
  workExperience: [{
    company: String,
    position: String,
    startDate: String,
    endDate: String,
    current: Boolean,
    description: String
  }],
  education: [{
    institution: String,
    degree: String,
    field: String,
    startDate: String,
    endDate: String,
    grade: String
  }],
  skills: [{
    name: String,
    level: String
  }],
  languages: [{
    language: String,
    proficiency: String
  }],
  certifications: [{
    name: String,
    issuer: String,
    date: String,
    url: String
  }],
  achievements: [{
    title: String,
    description: String,
    date: String
  }]
}, { timestamps: true });

module.exports = mongoose.model('extendedProfile', ProfileSchema);
