import React, { useRef } from "react";
import { jsPDF } from "jspdf";
import { IoMdArrowRoundBack } from "react-icons/io";
import { FiDownload } from "react-icons/fi";

const ResumeDetail = ({ resume = {}, onClose }) => {
  const resumeRef = useRef(null);

  console.log(resume)

  const generatePDF = () => {
    const doc = new jsPDF({
      unit: "px",
      format: "a4",
      putOnlyUsedFonts: true,
    });

    doc.html(resumeRef.current, {
      callback: function (doc) {
        doc.save("resume.pdf");
      },
      x: 15,
      y: 15,
      width: doc.internal.pageSize.getWidth(),
      windowWidth: 750,
    });
  };

  // Function to generate a summary from work experience
  const generateSummary = (experience) => {
    if (!experience || experience.length === 0)
      return "No work experience available.";
    const latestJob = experience[0];
    return `Experienced ${latestJob.position} with a background in ${
      latestJob.company
    }. Skilled in ${resume.skills?.join(", ") || "various skills"}.`;
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-lg border border-gray-200">
      <div className="flex justify-between mb-4">
       
        <IoMdArrowRoundBack  onClick={onClose}
          className="text-gray-600 text-2xl  hover:scale-125 transition duration-500 ease-in-out"/>
        <button
          onClick={generatePDF}
          className=" hidden sm:block px-4 py-2 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 transition duration-300"
        >
          Download as PDF
        </button>
        <FiDownload   onClick={generatePDF} className="block sm:hidden text-3xl text-gray-600 hover:scale-125 transition duration-500 ease-in-out" />
      </div>
      <div ref={resumeRef}>
        <header className="border-b border-gray-300 pb-4 mb-6">
          <h1 className="text-3xl font-bold text-gray-900">
            {resume.personalInfo?.name || "Name Not Available"}
          </h1>
          <p className="text-gray-600">
            {resume.personalInfo?.email || "Email Not Available"} |{" "}
            {resume.personalInfo?.phone || "Phone Not Available"}
          </p>
          <p className="text-gray-600">
            {resume.personalInfo?.address || "Location Not Available"} |{" "}
            <a
              href={resume.personalInfo?.linkedin || "#"}
              className="text-blue-500 hover:underline"
            >
              {resume.personalInfo?.linkedin || "LinkedIn Not Available"}
            </a>
          </p>
        </header>

        {/* Summary */}
        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-gray-800 border-b border-gray-300 pb-2">
            Summary
          </h2>
          <p className="text-gray-700">
            {resume.summary}
          </p>
        </section>

        {/* Work Experience */}
        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-gray-800 border-b border-gray-300 pb-2">
            Work Experience
          </h2>
          {resume?.experience?.length > 0 ? (
            resume?.experience?.map((exp, idx) => (
              <div key={idx} className="mb-6">
                <h3 className="text-xl font-semibold text-gray-800">
                  {exp.position || "Position Not Available"}
                </h3>
                <p className="text-gray-600">
                  {exp.company || "Company Not Available"} |{" "}
                  {new Date(exp.startDate).toLocaleDateString()} -{" "}
                  {new Date(exp.endDate).toLocaleDateString()}
                </p>
                <p className="text-gray-700">
                  {exp.description || "Description Not Available"}
                </p>
              </div>
            ))
          ) : (
            <p className="text-gray-700">No work experience available.</p>
          )}
        </section>

        {/* Education */}
        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-gray-800 border-b border-gray-300 pb-2">
            Education
          </h2>
          {resume.education?.length > 0 ? (
            resume.education.map((edu, idx) => (
              <div key={idx} className="mb-6">
                <h3 className="text-xl font-semibold text-gray-800">
                  {edu.institution || "Institution Not Available"}
                </h3>
                <p className="text-gray-600">
                  {edu.degree || "Degree Not Available"} |{" "}
                  {new Date(edu.startDate).toLocaleDateString()} -{" "}
                  {new Date(edu.endDate).toLocaleDateString()}
                </p>
              </div>
            ))
          ) : (
            <p className="text-gray-700">No education available.</p>
          )}
        </section>

        {/* Skills */}
        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-gray-800 border-b border-gray-300 pb-2">
            Skills
          </h2>
          <p className="text-gray-700">
            {(resume.skills || []).join(", ") || "No skills available."}
          </p>
        </section>

        {/* Certifications */}
        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-gray-800 border-b border-gray-300 pb-2">
            Certifications
          </h2>
          {resume.certifications?.length > 0 ? (
            <ul className="list-disc list-inside text-gray-700">
              {resume.certifications.map((cert, idx) => (
                <li key={idx}>{cert.name || "Certification Not Available"}</li>
              ))}
            </ul>
          ) : (
            <p className="text-gray-700">No certifications available.</p>
          )}
        </section>

        {/* Projects */}
        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-gray-800 border-b border-gray-300 pb-2">
            Projects
          </h2>
          {resume.projects?.length > 0 ? (
            resume.projects.map((proj, idx) => (
              <div key={idx} className="mb-6">
                <h3 className="text-xl font-semibold text-gray-800">
                  {proj.name || "Project Not Available"}
                </h3>
                <p className="text-gray-600">
                  {proj.date || "Date Not Available"}
                </p>
              </div>
            ))
          ) : (
            <p className="text-gray-700">No projects available.</p>
          )}
        </section>
      </div>
    </div>
  );
};

export default ResumeDetail;
