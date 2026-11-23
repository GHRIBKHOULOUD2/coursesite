import React, { useState } from "react";
import { LuUpload } from "react-icons/lu";
import Cards from "../Cards/Cards";
import { BiSolidBookAdd } from "react-icons/bi";
import coursesData from "../Data/Data.json";
import { GoAlertFill } from "react-icons/go";

function Courses() {
  const [error, setError] = useState("");
  const [courses, setCourses] = useState(coursesData);
  const [isFocused, setIsFocused] = useState(false);
  
  // Modal state
  const [showModal, setShowModal] = useState(false);
  const [newCourseTitle, setNewCourseTitle] = useState("");
  const [newCourseStatus, setNewCourseStatus] = useState("planned");

  // Editor page state
  const [editorMode, setEditorMode] = useState(false);
  const [editorCourse, setEditorCourse] = useState(null);
  const [editorNotes, setEditorNotes] = useState("");
  const [isReadOnly, setIsReadOnly] = useState(false);

  const handleSaveInProgress = () => {
    // Update the existing course
    setCourses(courses.map(course => 
      course.id === editorCourse.id 
        ? { ...course, notes: editorNotes, status: "in progress" }
        : course
    ));
    setEditorCourse(null);
    setEditorNotes("");
    setEditorMode(false);
    setIsReadOnly(false);
  };

  const handleCompleteCourse = () => {
    // Update the existing course
    setCourses(courses.map(course => 
      course.id === editorCourse.id 
        ? { ...course, notes: editorNotes, status: "completed" }
        : course
    ));
    setEditorCourse(null);
    setEditorNotes("");
    setEditorMode(false);
    setIsReadOnly(false);
  };

  const handleDelete = (id) => {
    const courseToDelete = courses.find(course => course.id === id);
    
    // Show confirmation alert
    if (window.confirm(`Are you sure you want to delete "${courseToDelete.title}"?`)) {
      setCourses(courses.filter((course) => course.id !== id));
    }
  };

  // Handle editing a course (for in progress/planned)
  const handleEditCourse = (course) => {
    setEditorCourse(course);
    setEditorNotes(course.notes || "");
    setEditorMode(true);
    setIsReadOnly(false); // Editable
  };

  // Handle starting/continuing a course
  const handleStartCourse = (course) => {
    setEditorCourse(course);
    setEditorNotes(course.notes || "");
    setEditorMode(true);
    setIsReadOnly(false); // Editable
  };

  // Handle viewing completed course (read-only)
  const handleViewCompleted = (course) => {
    setEditorCourse(course);
    setEditorNotes(course.notes || "");
    setEditorMode(true);
    setIsReadOnly(true); // Read-only
  };

  const handleAddCourse = () => {
    if (!newCourseTitle) return;

    if (
      courses.some(
        (c) => c.title.toLowerCase() === newCourseTitle.toLowerCase()
      )
    ) {
      setError("This course already exists!");

      setTimeout(() => {
        setError("");
      }, 3000);
      return;
    }

    setCourses([
      ...courses,
      {
        id: Date.now(),
        status: newCourseStatus,
        title: newCourseTitle,
        date: new Date().toISOString().split("T")[0],
        notes: "",
      },
    ]);

    setNewCourseTitle("");
    setNewCourseStatus("planned");
    setShowModal(false);
    setError("");
  };

  return (
    <div style={{ paddingTop: "6vh" }}>
      {/* Error Alert */}
      {error && (
        <div className="alert alert-warning d-flex align-items-center" role="alert" style={{width:"100vw",height:"5vh"}}>
          <GoAlertFill style={{width:"4vw",height:"3vh"}}/>
          <div className="fs-5">{error}</div>
        </div>
      )}
      
      {/* Add/upload/search */}
      <div
        style={{
          display: editorMode ? "none" : "flex",
          flexDirection: "row",
          gap: "4vw",
          marginTop: "4vh",
        }}
      >
        <div
          style={{
            paddingLeft: "5vw",
            display: "flex",
            flexDirection: "row",
            gap: "0vw",
            cursor: "pointer",
          }}
          onClick={() => setShowModal(true)}
        >
          <p className="fw-semibold fs-5" style={{ color: "#9D8189" }}>
            Add new course
          </p>
          <BiSolidBookAdd
            style={{ width: "6vw", height: "4vh", color: "#9D8189" }}
          />
        </div>

        <div
          style={{
            paddingLeft: "5vw",
            display: "flex",
            flexDirection: "row",
            gap: "0vw",
            cursor: "pointer",
          }}
        >
          <p className="fw-semibold fs-5" style={{ color: "#9D8189" }}>
            upload course
          </p>
          <LuUpload
            style={{ width: "6vw", height: "4vh", color: "#9D8189" }}
          />
        </div>
        
        <form
          className="form-inline"
          style={{
            display: "flex",
            flexDirection: "row",
            gap: "2vw",
            marginLeft: "30vw",
          }}
        >
          <input
            className="form-control mr-sm-2"
            type="search"
            placeholder="Search"
            aria-label="Search"
            style={{
              width: "15vw",
              borderColor: isFocused ? "#9D8189" : "",
              outline: "none",
              boxShadow: isFocused ? "0 0 0 0.2rem #9D8189" : "none",
            }}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
          />
          <button
            className="btn btn-outline my-2 my-sm-0 fs-5"
            type="submit"
            style={{
              background: "#FFE5D9",
              color: "#9D8189",
              border: "0.1vh solid #9D8189",
            }}
          >
            Search
          </button>
        </form>
      </div>

      {/* Modal popup */}
      {showModal && (
        <div
          style={{
            position: "fixed",
            top: "0",
            left: "0",
            width: "100%",
            height: "100%",
            background: "rgba(0,0,0,0.5)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            zIndex: "30",
          }}
        >
          <div
            style={{
              background: "#fff",
              padding: "2rem",
              borderRadius: "1rem",
              width: "30vw",
            }}
          >
            <h5 style={{ color: "#9D8189" }}>Add New Course</h5>

            {/* Title input */}
            <input
              type="text"
              placeholder="Course Title"
              value={newCourseTitle}
              onChange={(e) => setNewCourseTitle(e.target.value)}
              className="form-control my-3"
              style={{ border: "1px solid #9D8189" }}
            />

            {/* Status select */}
            <select
              value={newCourseStatus}
              onChange={(e) => setNewCourseStatus(e.target.value)}
              className="form-control mb-3"
              style={{
                border: "1px solid #9D8189",
                outline: "none",
                boxShadow: "none",
              }}
            >
              <option value="planned">Planned</option>
              <option value="in progress">In Progress</option>
            </select>

            {/* Buttons */}
            <button
              className="btn"
              onClick={handleAddCourse}
              disabled={!newCourseTitle}
              style={{
                backgroundColor: "#FFE5D9",
                color: "#000",
                border: "1px solid #FFE5D9",
              }}
            >
              OK
            </button>

            <button
              className="btn ms-3"
              onClick={() => setShowModal(false)}
              style={{
                backgroundColor: "#9D8189",
                color: "#fff",
                border: "1px solid #9D8189",
              }}
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      {/* Editor page */}
      {editorMode ? (
        <div
          style={{
            marginTop: "-3vh",
            background: "#fff",
            padding: "4rem",
            minHeight: "70vh",
            textAlign: "center",
          }}
        >
          <h3 style={{ color: "#9D8189" }}>
            {isReadOnly ? "Viewing: " : "Editing: "}{editorCourse?.title}
            {isReadOnly && <span style={{color: "#666", fontSize: "1rem"}}> (Read Only)</span>}
          </h3>
          
          <textarea
            placeholder={isReadOnly ? "No notes available" : "Write your notes here..."}
            value={editorNotes}
            onChange={(e) => setEditorNotes(e.target.value)}
            readOnly={isReadOnly}
            style={{
              width: "50vw",
              minHeight: "50vh",
              marginTop: "2rem",
              border: `1px solid ${isReadOnly ? "#ccc" : "#9D8189"}`,
              outline: "none",
              boxShadow: "none",
              paddingLeft: "1vw",
              paddingTop: "2vh",
              borderRadius: "0.5rem",
              fontSize: "1rem",
              backgroundColor: isReadOnly ? "#f8f9fa" : "#fff",
              color: isReadOnly ? "#666" : "#000",
              cursor: isReadOnly ? "not-allowed" : "text",
            }}
          />
          <br />

          {/* Show buttons only for non-completed courses */}
          {!isReadOnly && (
            <div style={{ marginTop: "2rem" }}>
              {/* Save as In Progress */}
              <button
                className="btn fs-5 fw-bold"
                style={{
                  backgroundColor: "#FFE5D9",
                  color: "#000",
                  border: "1px solid #FFE5D9",
                  marginRight: "1rem",
                  padding: "0.5rem 1.5rem",
                }}
                onClick={handleSaveInProgress}
              >
                Save as In Progress
              </button>

              {/* Mark as Completed */}
              <button
                className="btn fs-5 fw-bold"
                style={{
                  backgroundColor: "#D8E2DC",
                  color: "#000",
                  border: "1px solid #D8E2DC",
                  marginRight: "1rem",
                  padding: "0.5rem 1.5rem",
                }}
                onClick={handleCompleteCourse}
              >
                Mark as Completed
              </button>

              {/* Cancel */}
              <button
                className="btn fs-5 fw-bold"
                style={{
                  backgroundColor: "#9D8189",
                  color: "#fff",
                  border: "1px solid #9D8189",
                  padding: "0.5rem 1.5rem",
                }}
                onClick={() => {
                  setEditorCourse(null);
                  setEditorMode(false);
                  setIsReadOnly(false);
                }}
              >
                Cancel
              </button>
            </div>
          )}

          {/* Only show Close button for completed courses */}
          {isReadOnly && (
            <div style={{ marginTop: "2rem" }}>
              <button
                className="btn fs-5 fw-bold"
                style={{
                  backgroundColor: "#9D8189",
                  color: "#fff",
                  border: "1px solid #9D8189",
                  padding: "0.5rem 1.5rem",
                }}
                onClick={() => {
                  setEditorCourse(null);
                  setEditorMode(false);
                  setIsReadOnly(false);
                }}
              >
                Close
              </button>
            </div>
          )}
        </div>
      ) : (
        /* Render courses normally */
        <div
          style={{
            paddingLeft: "2vw",
            paddingTop: "10vh",
            display: "grid",
            gridTemplateColumns: "repeat(4, 1fr)",
            gap: "2vw",
            marginBottom: "10vh",
          }}
        >
          {courses.map((course) => (
            <Cards
              key={course.id}
              status={course.status}
              title={course.title}
              date={course.date}
              onDelete={() => handleDelete(course.id)}
              onEdit={() => course.status === "completed" ? handleViewCompleted(course) : handleEditCourse(course)}
              onStart={() => handleStartCourse(course)}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export default Courses;