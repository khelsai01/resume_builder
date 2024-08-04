import React, { useEffect, useState } from "react";
import axios from "axios";
import { FaRegLightbulb } from "react-icons/fa";
import { toast } from "react-toastify";
import { useNavigate, useSearchParams } from "react-router-dom";
import ResumePreview from "./ResumePreview";
import { MdDeleteForever } from "react-icons/md";

const ResumeForm = () => {

  const { id } = useSearchParams()
  console.log(id);

  const [resume, setResume] = useState({
    personalInfo: {
      name: "",
      email: "",
      phone: "",
      address: "",
      linkedin: "",
      portfolio: "",
    },
    workExperience: [
      {
        company: "",
        position: "",
        startDate: "",
        endDate: "",
        description: "",
      },
    ],
    education: [{ institution: "", degree: "", year: "" }],
    skills: [""],
    certifications: [{ name: "", organization: "", date: "" }],
    projects: [{ name: "", description: "", date: "" }],
    summary: "",
  });

  const [suggestions, setSuggestions] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const res = axios.get(`https://resume-builder-server-51je.onrender.com/resume/${id}`);
    console.log(res.data.resume);
  
  }, [id])
  

  const handleChange = (e, section, index = null) => {
    const { name, value } = e.target;
    if (section === "personalInfo") {
      setResume({
        ...resume,
        personalInfo: { ...resume.personalInfo, [name]: value },
      });
    } else if (
      section === "workExperience" ||
      section === "education" ||
      section === "certifications" ||
      section === "projects"
    ) {
      const newArray = resume[section].map((item, idx) =>
        idx === index ? { ...item, [name]: value } : item
      );
      setResume({ ...resume, [section]: newArray });
    } else if (section === "skills") {
      const newArray = [...resume.skills];
      newArray[index] = value;
      setResume({ ...resume, skills: newArray });
    } else if (section === "summary") {
      setResume({ ...resume, summary: value });
    }
  };

  const handleAddItem = (section) => {
    const newItem =
      section === "workExperience"
        ? {
            company: "",
            position: "",
            startDate: "",
            endDate: "",
            description: "",
          }
        : section === "education"
        ? { institution: "", degree: "", year: "" }
        : section === "certifications"
        ? { name: "", organization: "", date: "" }
        : section === "projects"
        ? { name: "", description: "", date: "" }
        : "";
    setResume({ ...resume, [section]: [...resume[section], newItem] });
  };

  const handleRemoveItem = (section, index) => {
    const newArray = resume[section].filter((_, idx) => idx !== index);
    setResume({ ...resume, [section]: newArray });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
     const res = await axios.post(
        "https://resume-builder-server-51je.onrender.com/resume/create",
        resume
      );
      console.log(res);
      toast.success("Resume saved successfully!");
      
    } catch (error) {
      toast.error("Failed to save resume!");
    }
  };

  const handleGenerateSuggestions = async () => {
    
    //summary suggestion

    try {
      const response = await axios.post(
        "",
        { resumeSummary: resume.summary }
      );
      const suggestions = response.data.suggestions;

      setResume((prevResume) => ({
        ...prevResume,
        workExperience: prevResume.workExperience.map((exp, index) => {
          if (index === 0) {
            return { ...exp, description: suggestions[0] || exp.description };
          }
          return exp;
        }),
      }));

      setSuggestions(suggestions);
    } catch (error) {
      console.error("Failed to generate suggestions:", error);
    }
  };

  return (
    <div className="flex flex-col md:flex-row gap-6 p-4 font-poppins">
      <form
        onSubmit={handleSubmit}
        className="w-full md:w-1/2 p-6 bg-white rounded-lg shadow-lg border border-gray-200 overflow-y-auto max-h-screen overflow-hidden"
      >
        <h2 className="text-2xl font-bold mb-4">Personal Information</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
          <input
            type="text"
            name="name"
            value={resume.personalInfo.name}
            onChange={(e) => handleChange(e, "personalInfo")}
            placeholder="Name"
            className="border border-gray-300 p-2 rounded"
            required
          />
          <input
            type="email"
            name="email"
            value={resume.personalInfo.email}
            onChange={(e) => handleChange(e, "personalInfo")}
            placeholder="Email"
            className="border border-gray-300 p-2 rounded"
            required
          />
          <input
            type="tel"
            name="phone"
            value={resume.personalInfo.phone}
            onChange={(e) => handleChange(e, "personalInfo")}
            placeholder="Phone"
            className="border border-gray-300 p-2 rounded"
            required
          />
          <input
            type="text"
            name="address"
            value={resume.personalInfo.address}
            onChange={(e) => handleChange(e, "personalInfo")}
            placeholder="Address"
            className="border border-gray-300 p-2 rounded"
          />
          <input
            type="text"
            name="linkedin"
            value={resume.personalInfo.linkedin}
            onChange={(e) => handleChange(e, "personalInfo")}
            placeholder="LinkedIn Profile URL"
            className="border border-gray-300 p-2 rounded"
          />
          <input
            type="text"
            name="portfolio"
            value={resume.personalInfo.portfolio}
            onChange={(e) => handleChange(e, "personalInfo")}
            placeholder="Portfolio URL"
            className="border border-gray-300 p-2 rounded"
          />
        </div>

        <h2 className="text-2xl font-bold mb-4">Summary</h2>
        <textarea
          name="summary"
          value={resume.summary}
          onChange={(e) => handleChange(e, "summary")}
          placeholder="Write a brief summary about yourself"
          className="border border-gray-300 p-2 rounded w-full mb-4"
          rows="4"
        ></textarea>

        <button
          type="button"
          onClick={handleGenerateSuggestions}
          className="text-white bg-violet-500 p-2 rounded flex items-center gap-2 mb-4  hover:text-violet-500 hover:bg-white hover:border-violet-400 hover:border-2 duration-500"
        >
          <FaRegLightbulb /> Generate Suggestions
        </button>

        {suggestions.length > 0 && (
          <div className="mt-4 mb-4">
            <h3 className="text-xl font-semibold mb-2">Suggestions:</h3>
            <ul className="list-disc list-inside pl-4">
              {suggestions.map((suggestion, index) => (
                <li key={index} className="text-gray-700">
                  {suggestion}
                </li>
              ))}
            </ul>
          </div>
        )}

        <h2 className="text-2xl font-bold mb-4">Work Experience</h2>
        {resume.workExperience.map((exp, index) => (
          <div
            key={index}
            className="grid grid-cols-1 gap-4 mb-4 border p-4 rounded border-gray-300"
          >
            <input
              type="text"
              name="company"
              value={exp.company}
              onChange={(e) => handleChange(e, "workExperience", index)}
              placeholder="Company"
              className="border border-gray-300 p-2 rounded"
              required
            />
            <input
              type="text"
              name="position"
              value={exp.position}
              onChange={(e) => handleChange(e, "workExperience", index)}
              placeholder="Position"
              className="border border-gray-300 p-2 rounded"
              required
            />
            <div className="flex gap-4 flex-col  sm:flex-row sm:items-center">
              <label className="block mb-2">From:</label>
              <input
                type="date"
                name="startDate"
                value={exp.startDate}
                onChange={(e) => handleChange(e, "workExperience", index)}
                className="border border-gray-300 p-2 rounded w-1/3"
                required
              />
              <label className="block mb-2">To:</label>
              <input
                type="date"
                name="endDate"
                value={exp.endDate}
                onChange={(e) => handleChange(e, "workExperience", index)}
                className="border border-gray-300 p-2 rounded w-1/3"
                required
              />
            </div>

            <textarea
              name="description"
              value={exp.description}
              onChange={(e) => handleChange(e, "workExperience", index)}
              placeholder="Description"
              className="border border-gray-300 p-2 rounded w-full"
              rows="4"
              required
            ></textarea>
            <MdDeleteForever
              type="button"
              onClick={() => handleRemoveItem("workExperience", index)}
              className="text-red-500 text-3xl hover:scale-110 duration-500"
            />
          </div>
        ))}
        <button
          type="button"
          onClick={() => handleAddItem("workExperience")}
          className="bg-blue-500  text-white p-2  px-4 rounded    hover:text-blue-500 hover:bg-white hover:border-blue-400 hover:border-2 duration-500"
        >
          Add Work Experience
        </button>

        <h2 className="text-2xl font-bold mb-4">Education</h2>
        {resume.education.map((edu, index) => (
          <div
            key={index}
            className="grid grid-cols-1 gap-4 mb-4 border p-4 rounded border-gray-300"
          >
            <input
              type="text"
              name="institution"
              value={edu.institution}
              onChange={(e) => handleChange(e, "education", index)}
              placeholder="Institution"
              className="border border-gray-300 p-2 rounded"
              required
            />
            <input
              type="text"
              name="degree"
              value={edu.degree}
              onChange={(e) => handleChange(e, "education", index)}
              placeholder="Degree"
              className="border border-gray-300 p-2 rounded"
              required
            />
            <label>Year of pass</label>
            <input
              type="date"
              name="year"
              value={edu.year}
              onChange={(e) => handleChange(e, "education", index)}
              className="border border-gray-300 p-2 rounded w-1/3"
              required
            />
            {/* <input
                type="date"
                name="endDate"
                value={edu.endDate}
                onChange={(e) => handleChange(e, "education", index)}
                className="border border-gray-300 p-2 rounded"
                required
              /> */}
            <MdDeleteForever
              type="button"
              onClick={() => handleRemoveItem("education", index)}
              className="text-red-500 text-3xl hover:scale-110 duration-500"
            />
          </div>
        ))}
        <button
          type="button"
          onClick={() => handleAddItem("education")}
          className="bg-blue-500 text-white p-2 px-4 rounded   hover:text-blue-500 hover:bg-white hover:border-blue-400 hover:border-2 duration-500"
        >
          Add Education
        </button>

        <h2 className="text-2xl font-bold mb-4">Skills</h2>
        {resume.skills.map((skill, index) => (
          <div
            key={index}
            className="flex gap-2 justify-center items-center mb-4 border p-4 rounded border-gray-300 "
          >
            <input
              type="text"
              value={skill}
              onChange={(e) => handleChange(e, "skills", index)}
              placeholder="Skill"
              className="border border-gray-300 p-2 rounded w-full"
              required
            />
            <MdDeleteForever
              type="button"
              onClick={() => handleRemoveItem("skills", index)}
              className="text-red-500 text-3xl hover:scale-110 duration-500"
            />
          </div>
        ))}
        <button
          type="button"
          onClick={() => handleAddItem("skills")}
          className="bg-green-500 text-white p-2 rounded   hover:text-green-500 hover:bg-white hover:border-green-400 hover:border-2 duration-500"
        >
          Add Skill
        </button>

        <h2 className="text-2xl font-bold mb-4">Certifications</h2>
        {resume.certifications.map((cert, index) => (
          <div
            key={index}
            className="grid grid-cols-1 gap-4 mb-4 border p-4 rounded border-gray-300"
          >
            <input
              type="text"
              name="name"
              value={cert.name}
              onChange={(e) => handleChange(e, "certifications", index)}
              placeholder="Certification Name"
              className="border border-gray-300 p-2 rounded"
              required
            />
            <input
              type="text"
              name="organization"
              value={cert.organization}
              onChange={(e) => handleChange(e, "certifications", index)}
              placeholder="Organization"
              className="border border-gray-300 p-2 rounded"
              required
            />
            <input
              type="date"
              name="date"
              value={cert.date}
              onChange={(e) => handleChange(e, "certifications", index)}
              className="border border-gray-300 p-2 rounded"
              required
            />
            <MdDeleteForever
              type="button"
              onClick={() => handleRemoveItem("certifications", index)}
              className="text-red-500 text-3xl hover:scale-110 duration-500"
            />
          </div>
        ))}
        <button
          type="button"
          onClick={() => handleAddItem("certifications")}
          className="bg-green-500 text-white p-2 rounded   hover:text-green-500 hover:bg-white hover:border-green-400 hover:border-2 duration-500"
        >
          Add Certification
        </button>

        <h2 className="text-2xl font-bold mb-4">Projects</h2>
        {resume.projects.map((project, index) => (
          <div
            key={index}
            className="grid grid-cols-1 gap-4 mb-4 border p-4 rounded border-gray-300"
          >
            <input
              type="text"
              name="name"
              value={project.name}
              onChange={(e) => handleChange(e, "projects", index)}
              placeholder="Project Name"
              className="border border-gray-300 p-2 rounded"
              required
            />
            <textarea
              name="description"
              value={project.description}
              onChange={(e) => handleChange(e, "projects", index)}
              placeholder="Project Description"
              className="border border-gray-300 p-2 rounded w-full"
              rows="4"
              required
            ></textarea>
            <input
              type="date"
              name="date"
              value={project.date}
              onChange={(e) => handleChange(e, "projects", index)}
              className="border border-gray-300 p-2 rounded"
              required
            />
            <MdDeleteForever
              type="button"
              onClick={() => handleRemoveItem("projects", index)}
              className="text-red-500 text-3xl hover:scale-110 duration-500"
            />
          </div>
        ))}
        <div className="flex  gap-2 justify-start overflow-hidden">
          <button
            type="button"
            onClick={() => handleAddItem("projects")}
            className="bg-green-500 text-white p-2 rounded  hover:text-green-500 hover:bg-white hover:border-green-400 hover:border-2 duration-500"
          >
            Add Project
          </button>

          <button type="submit" className="bg-blue-500 text-white p-2 rounded  hover:text-blue-500 hover:bg-white hover:border-blue-400 hover:border-2 duration-500">
            Save Resume
          </button>
        </div>
      </form> 

      <ResumePreview resume={resume} />
    </div>
  );
};

export default ResumeForm;
