import { TiDelete } from "react-icons/ti";
import { CiEdit } from "react-icons/ci";
import { FaPlay, FaBook } from "react-icons/fa";

function Cards({ status, title, date, onDelete, onEdit, onStart }) {
  const statusColors = {
    completed: "#D8E2DC",
    "in progress": "#FFE5D9",
    planned: "#FFCAD4",
  };

  const statusText = {
    completed: "Completed",
    "in progress": "In Progress", 
    planned: "Planned"
  };

  return (
    <div
      className="card"
      style={{
        width: "20vw",
        border: `0.3vh solid ${statusColors[status]}`,
        minHeight: "250px"
      }}
    >
      <div
        className="card-header fw-semibold text-capitalize"
        style={{
          backgroundColor: statusColors[status] || "#fff",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center"
        }}
      >
        {statusText[status]}
        <div className="d-flex gap-2">
          <TiDelete
            style={{ 
              width: "2vw", 
              height: "3vh", 
              cursor: "pointer",
              color: "#9D8189"
            }}
            onClick={onDelete}
            title="Delete Course"
          />
        </div>
      </div>

      <div className="card-body d-flex flex-column justify-content-between">
        <div>
          <h5 className="card-title" style={{ color: "#9D8189" }}>{title}</h5>
          <p className="card-text">Created on: {date}</p>
        </div>
        
        <div className="d-flex flex-column gap-2 mt-3">
          {/* Start/Continue Button - Only for planned and in progress */}
          {(status === "planned" || status === "in progress") && (
            <button
              onClick={onStart}
              className="btn fs-5 d-flex align-items-center justify-content-center"
              style={{
                backgroundColor: statusColors[status],
                color: "white",
                width: "10vw",
                height: "5vh",
                fontWeight: "bold",
              }}
            >
              {status === "in progress" ? "Continue Notes" : "Start Course"}
            </button>
          )}
          
          {/* View Details Button for completed courses - Read Only */}
          {status === "completed" && (
            <button
              onClick={onEdit}
              className="btn fs-5 d-flex align-items-center justify-content-center"
              style={{
                backgroundColor: statusColors[status],
                color: "white",
                width: "10vw",
                height: "5vh",
                fontWeight: "bold",
              }}
            >
              View Details
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default Cards;