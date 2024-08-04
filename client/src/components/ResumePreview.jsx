import { useRef } from "react";
import { jsPDF } from "jspdf";

const ResumePreview = ({ resume }) => {
  const resumeRef = useRef(null);

  const generatePDF = () => {
    const doc = new jsPDF();

    doc.html(resumeRef.current, {
      callback: function (doc) {
        doc.save("resume.pdf");
      },
      x: 15,
      y: 15,
      width: 170,
      windowWidth: 650,
    });
  };

  return (
    <div className="max-w-4xl mx-auto p-8">
      <button
        onClick={generatePDF}
        className="mb-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition duration-300"
      >
        Download Resume as PDF
      </button>

      <div
        ref={resumeRef}
        className="bg-white p-8 shadow-lg rounded-lg w-full sm:w-[650px]"
      >
        <h1 className="text-xl font-bold mb-2">{resume.personalInfo.name}</h1>
        <p className="text-sm mb-1">
          {resume.personalInfo.email
            ? `${resume.personalInfo.email}`
            : "resume@resume.com "}{" "}
          || 
         {resume.personalInfo.phone
            ? `${resume.personalInfo.phone}`
            : " 1234567890"}
        </p>
        <p className="text-sm mb-1">{resume.personalInfo.address}</p>
        <p className="text-sm mb-1"> <span className="text-lg font-medium">LinkedIn : </span>{resume.personalInfo.linkedin? `${resume.personalInfo.linkedin}`:" linkedIn.com"}</p>
        <p className="text-sm mb-4">
        <span className="text-lg font-medium">Portfolio : </span> {resume.personalInfo.portfolio? `${resume.personalInfo.portfolio}`:"portfolio.com"}
        </p>

        <h2 className="text-lg font-bold mt-4 mb-2">Summary</h2>
        <p className="text-sm mb-4">{resume.summary}</p>

        <h2 className="text-lg font-bold mt-4 mb-2">Work Experience</h2>
        {resume?.workExperience?.map((exp, index) => (
          <div key={index} className="mb-4">
            <h3 className="text-base font-bold">
              {exp.position} at {exp.company}
            </h3>
            <p className="text-sm">
              {exp.startDate} to {exp.endDate}
            </p>
            <p className="text-sm">{exp.description}</p>
          </div>
        ))}

        <h2 className="text-lg font-bold mt-4 mb-2">Education</h2>
        {resume?.education?.map((edu, index) => (
          <div key={index} className="mb-4">
            <h3 className="text-base font-bold">Course : <span className="ml-2 text-gray-600">{edu.degree}</span> </h3>
            <p className="text-sm">
              {edu.institution} , {edu.year}
            </p>
          </div>
        ))}

        <h2 className="text-lg font-bold mt-4 mb-2">Skills</h2>
        <ul className="list-disc pl-5">
          {resume.skills.map((skill, index) => (
            <li key={index} className="text-sm">
              {skill}
            </li>
          ))}
        </ul>

        <h2 className="text-lg font-bold mt-4 mb-2">Certifications</h2>
        {resume?.certifications?.map((cert, index) => (
          <div key={index} className="mb-4">
            <h3 className="text-base font-bold">{cert.name}</h3>
            <p className="text-sm">
              {cert.organization}, {cert.year}
            </p>
          </div>
        ))}

        <h2 className="text-lg font-bold mt-4 mb-2">Projects</h2>
        {resume?.projects?.map((project, index) => (
          <div key={index} className="mb-4">
            <h3 className="text-base font-bold">{project.name}</h3>
            <p className="text-sm">{project.date}</p>
            <p className="text-sm">{project.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ResumePreview;
