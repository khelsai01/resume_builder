import React from "react";
import PropTypes from "prop-types";
import { FaEdit } from "react-icons/fa";
import { MdOutlineDeleteForever } from "react-icons/md";
import { EyeIcon } from "lucide-react";
import Tooltip from "./Tooltip";

const ResumeCard = ({ resume, onClick, onEdit, onDelete }) => {
  return (
    <div className="border p-4 bg-white rounded-lg shadow-md flex flex-col gap-2">
      <h3 className="text-xl font-semibold text-violet-700">
        {resume.personalInfo?.name || "Name Not Available"}
      </h3>
      <p className="text-gray-600">
        {resume.personalInfo?.email || "Summary Not Available"}
      </p>
      <p className="text-gray-600">
        {resume.personalInfo?.phone || "Summary Not Available"}
      </p>
      <div className="flex justify-between">
        <Tooltip tooltipText="View Resume">
          <EyeIcon onClick={onClick}  className="text-green-500 hover:scale-110 transition duration-500 ease-in-out"/>
        </Tooltip>

        <Tooltip tooltipText="Edit Resume">
          <FaEdit
            onClick={() => onEdit(resume._id)}
            className=" text-2xl text-blue-500 hover:text-green-700 transition duration-300"
          />
        </Tooltip>
        <Tooltip tooltipText="Delete Resume">
          <MdOutlineDeleteForever
            onClick={() => onDelete(resume._id)}
            className=" text-2xl text-red-500 hover:scale-125 transition duration-500 ease-in-out"
          />
        </Tooltip>
      </div>
    </div>
  );
};

// Define prop types for ResumeCard
ResumeCard.propTypes = {
  resume: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    summary: PropTypes.string.isRequired,
  }).isRequired,
  onClick: PropTypes.func.isRequired,
  onEdit: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
};

export default ResumeCard;
