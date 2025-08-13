import React from "react";
import { useLocation } from "react-router-dom";
import { FileText, User, Mail, Phone, Award, Briefcase, GraduationCap, Download } from "lucide-react";

const ResumeAnalysis = () => {
  const location = useLocation();
  const { parsedData } = location.state || {};

  if (!parsedData) {
    return <div className="p-8 text-center text-red-500">No resume data found. Please upload again.</div>;
  }

  return (
    <div className="p-8 bg-gray-50 min-h-screen">
      <h1 className="text-3xl font-bold mb-6">Resume Analysis</h1>

      {/* Personal Info */}
      <div className="grid md:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-xl font-semibold flex items-center gap-2"><User /> Personal Info</h2>
          <p><strong>Name:</strong> {parsedData.name || "N/A"}</p>
          <p><strong>Email:</strong> {parsedData.email || "N/A"}</p>
          <p><strong>Phone:</strong> {parsedData.phone || "N/A"}</p>
        </div>

        {/* Skills */}
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-xl font-semibold flex items-center gap-2"><Award /> Skills</h2>
          <ul className="list-disc list-inside">
            {parsedData.skills?.map((skill, i) => (
              <li key={i}>{skill}</li>
            )) || <li>No skills detected</li>}
          </ul>
        </div>
      </div>

      {/* Experience */}
      <div className="bg-white p-6 rounded-lg shadow mt-6">
        <h2 className="text-xl font-semibold flex items-center gap-2"><Briefcase /> Experience</h2>
        {parsedData.experience?.length ? (
          parsedData.experience.map((exp, i) => (
            <div key={i} className="border-b pb-2 mb-2">
              <p className="font-semibold">{exp.role} - {exp.company}</p>
              <p className="text-sm text-gray-600">{exp.duration}</p>
            </div>
          ))
        ) : (
          <p>No experience found</p>
        )}
      </div>

      {/* Education */}
      <div className="bg-white p-6 rounded-lg shadow mt-6">
        <h2 className="text-xl font-semibold flex items-center gap-2"><GraduationCap /> Education</h2>
        {parsedData.education?.length ? (
          parsedData.education.map((edu, i) => (
            <div key={i} className="border-b pb-2 mb-2">
              <p className="font-semibold">{edu.degree} - {edu.institution}</p>
              <p className="text-sm text-gray-600">{edu.year}</p>
            </div>
          ))
        ) : (
          <p>No education details found</p>
        )}
      </div>

      {/* Suggestions */}
      <div className="bg-white p-6 rounded-lg shadow mt-6">
        <h2 className="text-xl font-semibold flex items-center gap-2"><FileText /> Suggestions</h2>
        <ul className="list-disc list-inside">
          {parsedData.suggestions?.map((suggestion, i) => (
            <li key={i}>{suggestion}</li>
          )) || <li>No suggestions available</li>}
        </ul>
      </div>

      {/* Resume Score */}
      <div className="mt-6 bg-white p-6 rounded-lg shadow">
        <h2 className="text-xl font-semibold">Resume Score</h2>
        <p className="text-2xl font-bold text-blue-600">{parsedData.score || "N/A"} / 100</p>
      </div>

      {/* Download */}
      <div className="mt-6">
        <button className="px-4 py-2 bg-green-600 text-white rounded flex items-center gap-2">
          <Download size={18} /> Download Resume
        </button>
      </div>
    </div>
  );
};

export default ResumeAnalysis;
