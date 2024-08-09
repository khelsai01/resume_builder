import { useState, useEffect } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import ResumeCard from "../components/ResumeCard";
import ResumeDetail from "../components/ResumeDetail";
import { PlusCircleIcon } from "lucide-react";
import Tooltip from "../components/Tooltip";
import NoLogin from "../components/NoLogin";


const Dashboard = () => {
  const [resumes, setResumes] = useState([]);
  const [selectedResume, setSelectedResume] = useState(null);
  const [showDetail, setShowDetail] = useState(false);
  const navigate = useNavigate();

  const token = localStorage.getItem("token") || '';


  useEffect(() => {
    const fetchResumes = async () => {
      try {
        const response = await axios.get(
          "https://resume-builder-server-51je.onrender.com/resume/all",
          {
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${token}`
            }
          }
        );
        console.log(response.data.resumes)
        setResumes(response.data.resumes);
      } catch (error) {
        console.error("Error fetching resumes:", error);
      }
    };

    fetchResumes();
  }, []);

  const handleResumeClick = (resume) => {
    setSelectedResume(resume);
    setShowDetail(true);
  };

  const handleEditClick = (id) => {
    navigate(`/resume/${id}`);
  };

  const handleDeleteClick = async (resumeId) => {
    try {
      await axios.delete(
        `https://resume-builder-server-51je.onrender.com/resume/${resumeId}`,
        {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          }
        }
      );
      setResumes(resumes.filter((resume) => resume._id !== resumeId));
    } catch (error) {
      console.error("Error deleting resume:", error);
    }
  };

  return (
    <div className="p-8 bg-gray-50 min-h-screen">
      {!token ? (<NoLogin />) :(
      <div className="max-w-5xl mx-auto">
        <div className="flex justify-between mb-6">
          <Link to={"/resume"}>
            <button

              className="hidden sm:block px-4 py-2 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 transition duration-300"
            >
              Create Resume
            </button>
            <Tooltip tooltipText="Create New Resume">
              <PlusCircleIcon className="block sm:hidden text-blue-600  font-semibold  hover:scale-125  transition duration-300 ease-in-out" />
            </Tooltip>
          </Link>
        </div>

        {showDetail ? (
          <ResumeDetail
            resume={selectedResume}
            onClose={() => setShowDetail(false)}
          />
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {resumes.map((resume) => (
              <ResumeCard
                key={resume._id}
                resume={resume}
                onClick={() => handleResumeClick(resume)}
                onEdit={handleEditClick}
                onDelete={handleDeleteClick}
              />
            ))}
          </div>
        )}
        </div>
        )}
    </div>
  );
};

export default Dashboard;
